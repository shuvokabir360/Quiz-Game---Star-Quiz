/**
 * Score, streak, accuracy, and challenge statistics engine.
 */

export class ScoreController {
  constructor() {
    this.reset();
  }

  reset() {
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.questionsAnswered = 0;
    this.currentStreak = 0;
    this.bestStreak = 0;
  }

  recordAnswer(isCorrect, timeRatioRemaining = 0) {
    this.questionsAnswered += 1;

    if (isCorrect) {
      this.correctCount += 1;
      this.currentStreak += 1;
      if (this.currentStreak > this.bestStreak) {
        this.bestStreak = this.currentStreak;
      }

      // Base points
      const basePoints = 100;
      // Speed bonus: up to 50 bonus points if answered swiftly
      const speedBonus = Math.round(Math.max(0, timeRatioRemaining) * 50);
      // Streak multiplier: 1.2x at 3+, 1.5x at 5+, 2.0x at 8+
      let streakMultiplier = 1.0;
      if (this.currentStreak >= 8) streakMultiplier = 2.0;
      else if (this.currentStreak >= 5) streakMultiplier = 1.5;
      else if (this.currentStreak >= 3) streakMultiplier = 1.2;

      const earned = Math.round((basePoints + speedBonus) * streakMultiplier);
      this.score += earned;

      return {
        isCorrect: true,
        earned,
        score: this.score,
        currentStreak: this.currentStreak,
        bestStreak: this.bestStreak
      };
    } else {
      this.incorrectCount += 1;
      this.currentStreak = 0;

      return {
        isCorrect: false,
        earned: 0,
        score: this.score,
        currentStreak: 0,
        bestStreak: this.bestStreak
      };
    }
  }

  getAccuracy() {
    if (this.questionsAnswered === 0) return 0;
    return Math.round((this.correctCount / this.questionsAnswered) * 100);
  }

  getStats() {
    return {
      score: this.score,
      correctCount: this.correctCount,
      incorrectCount: this.incorrectCount,
      questionsAnswered: this.questionsAnswered,
      accuracy: this.getAccuracy(),
      currentStreak: this.currentStreak,
      bestStreak: this.bestStreak
    };
  }
}
