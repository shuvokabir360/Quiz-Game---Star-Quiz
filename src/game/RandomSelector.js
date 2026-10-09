/**
 * Random selection engine with recent-history memory, duplicate suppression,
 * single-item safety, category filtering, and optional seeded RNG.
 */

export class RandomSelector {
  constructor(people = [], options = {}) {
    this.allPeople = people;
    this.historyWindowSize = options.historyWindowSize ?? 8;
    this.seed = options.seed ?? null;
    this.recentIds = [];
    this.currentCategories = ['all'];
    this.currentDifficulty = 'all';
  }

  setPeople(people) {
    this.allPeople = Array.isArray(people) ? people : [];
    this.clearHistory();
  }

  setCategories(categories) {
    this.currentCategories = Array.isArray(categories) && categories.length > 0 ? categories : ['all'];
    this.clearHistory();
  }

  setDifficulty(difficulty) {
    this.currentDifficulty = difficulty || 'all';
    this.clearHistory();
  }

  clearHistory() {
    this.recentIds = [];
  }

  /**
   * Deterministic Mulberry32 seeded RNG if seed is provided, otherwise Math.random().
   */
  nextRandom() {
    if (this.seed !== null) {
      let t = (this.seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    return Math.random();
  }

  getEligiblePeople() {
    return this.allPeople.filter(person => {
      if (!person || person.isActive === false) return false;

      // Category check
      if (!this.currentCategories.includes('all')) {
        if (!this.currentCategories.includes(person.category)) {
          return false;
        }
      }

      // Difficulty check
      if (this.currentDifficulty !== 'all') {
        if (person.difficulty !== this.currentDifficulty) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Selects next random person without consecutive duplicate and avoiding recent window.
   */
  selectNext() {
    const eligible = this.getEligiblePeople();
    if (eligible.length === 0) {
      return null;
    }

    if (eligible.length === 1) {
      const single = eligible[0];
      this.recentIds = [single.id];
      return single;
    }

    // Determine safe window size based on pool count
    // Window must be smaller than eligible length so there's always at least 1 non-recent candidate
    const effectiveWindow = Math.min(this.historyWindowSize, eligible.length - 1);
    const activeRecent = this.recentIds.slice(-effectiveWindow);

    // Candidates not in recent history
    let pool = eligible.filter(p => !activeRecent.includes(p.id));

    // Fallback: at minimum avoid immediately previous person
    if (pool.length === 0) {
      const lastId = this.recentIds[this.recentIds.length - 1];
      pool = eligible.filter(p => p.id !== lastId);
      if (pool.length === 0) {
        pool = eligible;
      }
    }

    const randomIndex = Math.floor(this.nextRandom() * pool.length);
    const selected = pool[randomIndex];

    this.recentIds.push(selected.id);
    if (this.recentIds.length > this.historyWindowSize * 2) {
      this.recentIds.splice(0, this.recentIds.length - this.historyWindowSize);
    }

    return selected;
  }
}
