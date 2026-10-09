export class SafeStorage {
  constructor() {
    this.memoryFallback = new Map();
    this.isStorageAvailable = this.checkAvailability();
  }

  checkAvailability() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  getItem(key, defaultValue = null) {
    try {
      if (this.isStorageAvailable) {
        const val = window.localStorage.getItem(key);
        if (val === null) return defaultValue;
        return JSON.parse(val);
      }
      return this.memoryFallback.has(key) ? this.memoryFallback.get(key) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  setItem(key, value) {
    try {
      if (this.isStorageAvailable) {
        window.localStorage.setItem(key, JSON.stringify(value));
      } else {
        this.memoryFallback.set(key, value);
      }
      return true;
    } catch (err) {
      console.warn('Storage setItem failed, falling back to memory:', err);
      this.memoryFallback.set(key, value);
      return false;
    }
  }

  removeItem(key) {
    try {
      if (this.isStorageAvailable) {
        window.localStorage.removeItem(key);
      }
      this.memoryFallback.delete(key);
    } catch {
      // Ignore cleanup error
    }
  }
}

export const storage = new SafeStorage();

export const DEFAULT_SETTINGS = {
  language: 'en', // 'en' or 'bn'
  mode: 'auto', // 'auto', 'guess', 'practice', 'challenge'
  timerDuration: 10, // 3, 5, 10, 15, 20
  revealDuration: 2.5, // seconds
  selectedCategories: ['all'],
  difficulty: 'all',
  soundEnabled: true,
  musicEnabled: false,
  soundVolume: 0.7,
  vfxQuality: 'high', // 'high', 'medium', 'low'
  reducedMotion: false,
  showName: true,
  showCapital: true,
  keepAwake: true,
  challengeQuestionsCount: 10
};

export const STORAGE_KEYS = {
  SETTINGS: 'wsq3d_settings',
  HIGH_SCORE: 'wsq3d_highscore',
  CUSTOM_PEOPLE: 'wsq3d_custom_people'
};

export function loadSettings() {
  const saved = storage.getItem(STORAGE_KEYS.SETTINGS, {});
  const merged = { ...DEFAULT_SETTINGS, ...saved };
  if (saved.timerDuration === 5) {
    merged.timerDuration = 10;
  }
  return merged;
}

export function saveSettings(settings) {
  return storage.setItem(STORAGE_KEYS.SETTINGS, settings);
}

export function loadHighScore() {
  return storage.getItem(STORAGE_KEYS.HIGH_SCORE, {
    bestScore: 0,
    bestStreak: 0,
    gamesPlayed: 0,
    totalCorrect: 0
  });
}

export function saveHighScore(stats) {
  return storage.setItem(STORAGE_KEYS.HIGH_SCORE, stats);
}
