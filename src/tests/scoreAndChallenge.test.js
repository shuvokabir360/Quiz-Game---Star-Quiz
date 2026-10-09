import { describe, it, expect } from 'vitest';
import { ScoreController } from '../game/ScoreController.js';

describe('Score and Challenge Engine', () => {
  it('Requirement 10: Score calculations include base points, speed bonus, and streak multiplier', () => {
    const sc = new ScoreController();

    // 1st correct answer with 80% time remaining
    const r1 = sc.recordAnswer(true, 0.8);
    expect(r1.isCorrect).toBe(true);
    // Base 100 + speed bonus (0.8 * 50 = 40) = 140
    expect(r1.earned).toBe(140);
    expect(r1.score).toBe(140);
    expect(r1.currentStreak).toBe(1);

    // 2nd correct answer
    sc.recordAnswer(true, 0.5);
    expect(sc.currentStreak).toBe(2);

    // 3rd correct answer (streak >= 3 triggers 1.2x multiplier)
    const r3 = sc.recordAnswer(true, 0.5);
    expect(sc.currentStreak).toBe(3);
    // Base 100 + bonus 25 = 125 * 1.2 = 150
    expect(r3.earned).toBe(150);

    // Incorrect answer resets streak
    const r4 = sc.recordAnswer(false, 0);
    expect(r4.currentStreak).toBe(0);
    expect(sc.bestStreak).toBe(3);
    expect(sc.getAccuracy()).toBe(75); // 3 out of 4 correct
  });

  it('Requirement 11: Challenge completion tracks stats properly across 10 questions', () => {
    const sc = new ScoreController();

    for (let i = 0; i < 10; i++) {
      sc.recordAnswer(i < 8, 0.5); // 8 correct, 2 incorrect
    }

    const stats = sc.getStats();
    expect(stats.questionsAnswered).toBe(10);
    expect(stats.correctCount).toBe(8);
    expect(stats.incorrectCount).toBe(2);
    expect(stats.accuracy).toBe(80);
    expect(stats.score).toBeGreaterThan(800);
  });
});
