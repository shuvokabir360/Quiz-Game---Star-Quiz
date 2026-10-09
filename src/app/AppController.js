import { GameState, GAME_STATUS } from './GameState.js';
import { RandomSelector } from '../game/RandomSelector.js';
import { TimerController } from '../game/TimerController.js';
import { ScoreController } from '../game/ScoreController.js';
import { AnswerController } from '../game/AnswerController.js';
import { SceneManager } from '../three/SceneManager.js';
import { Header } from '../ui/Header.js';
import { PortraitCard } from '../ui/PortraitCard.js';
import { CountdownTimer } from '../ui/CountdownTimer.js';
import { QuestionBanner } from '../ui/QuestionBanner.js';
import { CountryReveal } from '../ui/CountryReveal.js';
import { MultipleChoice } from '../ui/MultipleChoice.js';
import { GameControls } from '../ui/GameControls.js';
import { SettingsPanel } from '../ui/SettingsPanel.js';
import { ResultsScreen } from '../ui/ResultsScreen.js';
import { AdminPanel } from '../ui/AdminPanel.js';
import { sound } from '../utils/audio.js';
import { storage, STORAGE_KEYS, saveSettings, saveHighScore, loadHighScore } from '../utils/storage.js';
import { preloadNextImage } from '../utils/imageLoader.js';
import { setWakeLockEnabled } from '../utils/wakeLock.js';

import defaultPeople from '../data/people.json';
import countriesData from '../data/countries.json';
import localizationData from '../data/localization.json';

export class AppController {
  constructor(domElements) {
    this.dom = domElements;
    this.state = new GameState();
    this.countries = countriesData;
    this.translations = localizationData;

    // Load people dataset: ensure all 93 stars are loaded with 0 duplicate names, preserving authentic photos & custom uploads
    const savedPeople = storage.getItem(STORAGE_KEYS.CUSTOM_PEOPLE, null);
    if (Array.isArray(savedPeople) && savedPeople.length > 0) {
      const customMap = new Map();
      savedPeople.forEach(p => {
        if (p?.name) customMap.set(p.name.trim().toLowerCase(), p);
      });
      const merged = defaultPeople.map(p => {
        // Official celebrities always use their authentic curated photo from defaultPeople
        return { ...p };
      });
      const defaultNameSet = new Set(defaultPeople.map(p => p.name.trim().toLowerCase()));
      savedPeople.forEach(p => {
        if (p?.name && !defaultNameSet.has(p.name.trim().toLowerCase())) {
          merged.push(p);
          defaultNameSet.add(p.name.trim().toLowerCase());
        }
      });
      this.people = merged;
      storage.setItem(STORAGE_KEYS.CUSTOM_PEOPLE, merged);
    } else {
      this.people = defaultPeople;
      storage.setItem(STORAGE_KEYS.CUSTOM_PEOPLE, defaultPeople);
    }

    // Controllers
    this.randomSelector = new RandomSelector(this.people, {
      historyWindowSize: 8
    });
    this.scoreController = new ScoreController();
    this.answerController = new AnswerController(this.countries);

    this.timerController = new TimerController({
      duration: this.state.settings.timerDuration,
      onTick: (tickInfo) => this.handleTimerTick(tickInfo),
      onComplete: () => this.handleTimerComplete()
    });

    this.revealTimeoutId = null;
    this.nextQuestionTimeoutId = null;
    this.isTransitioning = false;
  }

  init() {
    this.applyAudioSettings();

    // 1. Initialize 3D Scene
    this.sceneManager = new SceneManager(this.dom.threeCanvas);
    this.sceneManager.setQuality(this.state.settings.vfxQuality);
    this.sceneManager.setReducedMotion(this.state.settings.reducedMotion);

    // 2. Initialize UI Components
    this.header = new Header(this.dom.headerContainer, {
      onToggleSound: () => this.toggleSound(),
      onOpenSettings: () => this.openSettings(),
      onOpenAdmin: () => this.adminPanel.show()
    });

    this.portraitCard = new PortraitCard(this.dom.portraitContainer);
    this.countdownTimer = new CountdownTimer(this.dom.timerContainer);
    this.questionBanner = new QuestionBanner(this.dom.questionContainer);
    this.countryReveal = new CountryReveal(this.dom.revealContainer);

    this.multipleChoice = new MultipleChoice(this.dom.choiceContainer, {
      onSelect: (isCorrect, choice) => this.handleChoiceSelection(isCorrect, choice)
    });

    this.gameControls = new GameControls(this.dom.controlsContainer, {
      onTogglePause: () => this.togglePause(),
      onRevealNow: () => this.revealAnswerNow(),
      onReplay: () => this.replayCurrentQuestion(),
      onNext: () => this.loadNextQuestion(true),
      onToggleFullscreen: () => this.toggleFullscreen()
    });

    this.settingsPanel = new SettingsPanel(this.dom.settingsContainer, {
      onSave: (newSettings) => this.applySettings(newSettings),
      onOpenAdmin: () => this.adminPanel.show(),
      getPeople: () => this.people,
      translations: this.translations
    });

    this.resultsScreen = new ResultsScreen(this.dom.resultsContainer, {
      onPlayAgain: () => this.startChallenge(),
      onBackToAuto: () => {
        this.state.setMode('auto');
        this.applySettings({ ...this.state.settings, mode: 'auto' });
      }
    });

    this.adminPanel = new AdminPanel(this.dom.adminContainer, {
      getPeople: () => this.people,
      onUpdatePeople: (newPeople) => this.updatePeopleDatabase(newPeople)
    });

    // 3. User interaction unlock for audio context
    const unlockAudio = () => {
      sound.ensureContext();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    // 4. Synchronize localization and settings
    this.updateLocalization();
    this.syncFilterRules();

    // 5. Start initial question
    this.startMode(this.state.settings.mode);
  }

  applyAudioSettings() {
    sound.setEnabled(this.state.settings.soundEnabled);
    sound.setVolume(this.state.settings.soundVolume);
    sound.setMusicEnabled(this.state.settings.musicEnabled);
  }

  syncFilterRules() {
    this.randomSelector.setCategories(this.state.settings.selectedCategories);
    this.randomSelector.setDifficulty(this.state.settings.difficulty);
    this.portraitCard.setShowName(this.state.settings.showName);
    this.countryReveal.setShowCapital(this.state.settings.showCapital);
  }

  updateLocalization() {
    const lang = this.state.settings.language || 'en';
    const dict = this.translations[lang] || this.translations.en;

    document.documentElement.lang = lang;
    if (lang === 'bn') {
      document.body.classList.add('lang-bn');
      document.body.classList.remove('lang-en');
    } else {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-bn');
    }

    this.portraitCard.setLocalization(dict, lang);
    this.countdownTimer.setLocalization(dict);
    this.questionBanner?.setLocalization(dict);
    this.multipleChoice?.setLocalization(lang);
    this.countryReveal.setLocalization(dict, lang);
    this.gameControls.setLocalization(dict);
    this.settingsPanel?.setLocalization(this.translations, lang);
  }

  startMode(mode) {
    this.clearAllTimers();
    this.state.setMode(mode);
    this.state.questionNumber = 1;
    this.state.challengeQuestionIndex = 0;
    this.scoreController.reset();

    this.header.updateStats({
      questionNumber: 1,
      score: 0,
      streak: 0,
      mode: this.state.settings.mode
    });

    if (mode === 'challenge') {
      this.startChallenge();
    } else {
      this.loadNextQuestion(false);
    }
  }

  startChallenge() {
    this.clearAllTimers();
    this.scoreController.reset();
    this.state.challengeQuestionIndex = 0;
    this.state.questionNumber = 1;

    this.header.updateStats({
      questionNumber: 1,
      score: 0,
      streak: 0,
      mode: 'challenge'
    });

    this.loadNextQuestion(false);
  }

  clearAllTimers() {
    this.timerController.stop();
    if (this.revealTimeoutId) {
      clearTimeout(this.revealTimeoutId);
      this.revealTimeoutId = null;
    }
    if (this.nextQuestionTimeoutId) {
      clearTimeout(this.nextQuestionTimeoutId);
      this.nextQuestionTimeoutId = null;
    }
  }

  async loadNextQuestion(isManual = false) {
    if (this.isTransitioning && !isManual) return;
    this.clearAllTimers();
    this.countryReveal.hide();

    // Check challenge mode finish
    if (this.state.settings.mode === 'challenge') {
      const maxQ = this.state.settings.challengeQuestionsCount || 10;
      if (this.state.challengeQuestionIndex >= maxQ) {
        this.finishChallenge();
        return;
      }
      this.state.challengeQuestionIndex += 1;
    }

    const nextPerson = this.randomSelector.selectNext();
    if (!nextPerson) {
      alert('No celebrities match your current category/difficulty filter. Please adjust settings.');
      return;
    }

    this.isTransitioning = true;
    this.state.currentPerson = nextPerson;
    this.state.status = GAME_STATUS.COUNTDOWN;

    sound.playTransition();

    // Update Header
    this.header.updateStats({
      questionNumber: this.state.questionNumber,
      score: this.scoreController.score,
      streak: this.scoreController.currentStreak,
      mode: this.state.settings.mode
    });

    // Render portrait card
    const lang = this.state.settings.language || 'en';
    const dict = this.translations[lang] || this.translations.en;
    await this.portraitCard.displayPerson(nextPerson, dict.question);

    // Multiple Choice vs Direct Countdown
    const isChoiceMode = this.state.settings.mode === 'guess' || this.state.settings.mode === 'challenge';
    if (isChoiceMode) {
      const choices = this.answerController.generateChoices(nextPerson, lang);
      this.multipleChoice.setChoices(choices);
      this.multipleChoice.setVisible(true);
    } else {
      this.multipleChoice.setVisible(false);
    }

    // Practice Mode: No timer!
    if (this.state.settings.mode === 'practice') {
      this.countdownTimer.setVisible(false);
    } else {
      this.countdownTimer.setVisible(true);
      this.timerController.setDuration(this.state.settings.timerDuration);
      this.countdownTimer.reset(this.state.settings.timerDuration);
      this.timerController.start();
    }

    this.isTransitioning = false;

    // Quietly preload the next upcoming candidate in the background
    const eligible = this.randomSelector.getEligiblePeople();
    if (eligible.length > 1) {
      const candidate = eligible.find(p => p.id !== nextPerson.id);
      preloadNextImage(candidate);
    }
  }

  handleTimerTick({ remainingSeconds, progress, isUrgent, didSecondChange }) {
    this.countdownTimer.update({ remainingSeconds, progress, isUrgent });
    if (didSecondChange) {
      sound.playTick(isUrgent);
    }
  }

  handleTimerComplete() {
    sound.playTimeUp();

    if (this.state.settings.mode === 'guess' || this.state.settings.mode === 'challenge') {
      this.multipleChoice.lock();
      this.scoreController.recordAnswer(false, 0);
      this.header.updateStats({
        questionNumber: this.state.questionNumber,
        score: this.scoreController.score,
        streak: this.scoreController.currentStreak,
        mode: this.state.settings.mode
      });
      this.triggerReveal({ isTimeout: true });
    } else {
      this.triggerReveal({ isNeutral: true });
    }
  }

  handleChoiceSelection(isCorrect, selectedChoice) {
    this.timerController.stop();

    const timeRatioRemaining = this.timerController.totalDurationMs > 0
      ? this.timerController.remainingMs / this.timerController.totalDurationMs
      : 0;

    const result = this.scoreController.recordAnswer(isCorrect, timeRatioRemaining);

    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    this.header.updateStats({
      questionNumber: this.state.questionNumber,
      score: result.score,
      streak: result.currentStreak,
      mode: this.state.settings.mode
    });

    this.triggerReveal({
      isCorrect,
      userChoice: selectedChoice
    });
  }

  triggerReveal(feedback = null) {
    this.state.status = GAME_STATUS.REVEALED;
    sound.playReveal();

    const countryObj = this.countries.find(
      c => c.code === this.state.currentPerson?.countryCode || c.name === this.state.currentPerson?.country
    );

    this.countryReveal.show(this.state.currentPerson, countryObj, feedback);

    // Auto Quiz and Guess mode advance automatically after reveal duration
    if (this.state.settings.mode !== 'practice') {
      const delayMs = (this.state.settings.revealDuration || 2.5) * 1000;
      this.nextQuestionTimeoutId = setTimeout(() => {
        this.state.questionNumber += 1;
        this.loadNextQuestion(false);
      }, delayMs);
    }
  }

  revealAnswerNow() {
    this.timerController.stop();
    if (this.state.settings.mode === 'guess' || this.state.settings.mode === 'challenge') {
      this.multipleChoice.lock();
    }
    this.triggerReveal();
  }

  replayCurrentQuestion() {
    this.clearAllTimers();
    this.countryReveal.hide();

    const isChoiceMode = this.state.settings.mode === 'guess' || this.state.settings.mode === 'challenge';
    if (isChoiceMode) {
      const lang = this.state.settings.language || 'en';
      const choices = this.answerController.generateChoices(this.state.currentPerson, lang);
      this.multipleChoice.setChoices(choices);
      this.multipleChoice.setVisible(true);
    }

    if (this.state.settings.mode !== 'practice') {
      this.countdownTimer.reset(this.state.settings.timerDuration);
      this.timerController.setDuration(this.state.settings.timerDuration);
      this.timerController.start();
    }
  }

  togglePause() {
    const isPaused = !this.state.isPaused;
    this.state.setPaused(isPaused);
    this.gameControls.setPausedState(isPaused);

    if (isPaused) {
      this.timerController.pause();
      this.sceneManager.pause();
      sound.setMusicEnabled(false);
      if (this.nextQuestionTimeoutId) {
        clearTimeout(this.nextQuestionTimeoutId);
      }
    } else {
      this.timerController.resume();
      this.sceneManager.resume();
      if (this.state.settings.musicEnabled) {
        sound.setMusicEnabled(true);
      }
      if (this.state.status === GAME_STATUS.REVEALED && this.state.settings.mode !== 'practice') {
        this.nextQuestionTimeoutId = setTimeout(() => {
          this.state.questionNumber += 1;
          this.loadNextQuestion(false);
        }, 1500);
      }
    }
  }

  toggleSound() {
    const nextState = !this.state.settings.soundEnabled;
    this.state.settings.soundEnabled = nextState;
    sound.setEnabled(nextState);
    this.header.setSoundState(nextState);
    saveSettings(this.state.settings);
  }

  openSettings() {
    this.settingsPanel.open(this.state.settings);
  }

  applySettings(newSettings) {
    const oldMode = this.state.settings.mode;
    const oldCats = JSON.stringify(this.state.settings.selectedCategories || ['all']);
    const newCats = JSON.stringify(newSettings.selectedCategories || ['all']);

    this.state.settings = { ...newSettings };
    saveSettings(this.state.settings);

    this.applyAudioSettings();
    this.header.setSoundState(this.state.settings.soundEnabled);
    this.sceneManager.setQuality(this.state.settings.vfxQuality);
    this.sceneManager.setReducedMotion(this.state.settings.reducedMotion);
    setWakeLockEnabled(this.state.settings.keepAwake !== false);
    this.syncFilterRules();
    this.updateLocalization();

    if (oldMode !== this.state.settings.mode) {
      this.startMode(this.state.settings.mode);
    } else if (oldCats !== newCats) {
      const currentPerson = this.state.currentPerson;
      const isStillEligible = currentPerson && (
        this.state.settings.selectedCategories.includes('all') ||
        this.state.settings.selectedCategories.includes(currentPerson.category)
      );
      if (!isStillEligible) {
        this.startNewRound();
      }
    }
  }

  finishChallenge() {
    this.clearAllTimers();
    this.state.status = GAME_STATUS.FINISHED;
    const stats = this.scoreController.getStats();

    const high = loadHighScore();
    if (stats.score > high.bestScore || stats.bestStreak > high.bestStreak) {
      saveHighScore({
        bestScore: Math.max(stats.score, high.bestScore),
        bestStreak: Math.max(stats.bestStreak, high.bestStreak),
        gamesPlayed: (high.gamesPlayed || 0) + 1,
        totalCorrect: (high.totalCorrect || 0) + stats.correctCount
      });
    }

    this.resultsScreen.show(stats);
  }

  toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    } catch {}
  }

  updatePeopleDatabase(newPeople) {
    this.people = newPeople;
    storage.setItem(STORAGE_KEYS.CUSTOM_PEOPLE, newPeople);
    this.randomSelector.setPeople(this.people);
  }
}
