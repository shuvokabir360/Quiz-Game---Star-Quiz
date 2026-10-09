import { loadSettings } from '../utils/storage.js';

export const GAME_STATUS = {
  IDLE: 'idle',
  COUNTDOWN: 'countdown',
  REVEALED: 'revealed',
  PAUSED: 'paused',
  FINISHED: 'finished'
};

export class GameState {
  constructor() {
    this.status = GAME_STATUS.IDLE;
    this.currentPerson = null;
    this.questionNumber = 1;
    this.challengeQuestionIndex = 0;
    this.settings = loadSettings();
    this.isPaused = false;
    this.statusBeforePause = GAME_STATUS.IDLE;
  }

  setMode(mode) {
    this.settings.mode = mode;
  }

  setPaused(paused) {
    if (paused) {
      this.statusBeforePause = this.status;
      this.status = GAME_STATUS.PAUSED;
      this.isPaused = true;
    } else {
      this.status = this.statusBeforePause || GAME_STATUS.COUNTDOWN;
      this.isPaused = false;
    }
  }
}
