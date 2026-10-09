import { describe, it, expect } from 'vitest';
import { RandomSelector } from '../game/RandomSelector.js';

describe('Random Person Selection and Duplicate Prevention', () => {
  const samplePeople = [
    { id: 'p1', name: 'Person One', category: 'footballer', difficulty: 'easy', isActive: true },
    { id: 'p2', name: 'Person Two', category: 'footballer', difficulty: 'medium', isActive: true },
    { id: 'p3', name: 'Person Three', category: 'actor', difficulty: 'easy', isActive: true },
    { id: 'p4', name: 'Person Four', category: 'actor', difficulty: 'hard', isActive: true },
    { id: 'p5', name: 'Person Five', category: 'singer', difficulty: 'medium', isActive: true },
    { id: 'p6', name: 'Person Six', category: 'singer', difficulty: 'easy', isActive: false } // Inactive
  ];

  it('Requirement 1: Randomly selects an eligible person from active pool', () => {
    const selector = new RandomSelector(samplePeople);
    const chosen = selector.selectNext();
    expect(chosen).toBeDefined();
    expect(chosen.isActive).toBe(true);
    expect(chosen.id).not.toBe('p6'); // Never pick inactive
  });

  it('Requirement 2: Consecutive duplicate prevention across consecutive draws', () => {
    const selector = new RandomSelector(samplePeople, { historyWindowSize: 3 });
    let lastId = null;
    for (let i = 0; i < 20; i++) {
      const current = selector.selectNext();
      expect(current.id).not.toBe(lastId);
      lastId = current.id;
    }
  });

  it('Requirement 3: Filters by category accurately', () => {
    const selector = new RandomSelector(samplePeople);
    selector.setCategories(['actor']);

    for (let i = 0; i < 10; i++) {
      const chosen = selector.selectNext();
      expect(chosen.category).toBe('actor');
      expect(['p3', 'p4']).toContain(chosen.id);
    }
  });

  it('Requirement 3b: Filters by difficulty accurately', () => {
    const selector = new RandomSelector(samplePeople);
    selector.setDifficulty('easy');

    for (let i = 0; i < 10; i++) {
      const chosen = selector.selectNext();
      expect(chosen.difficulty).toBe('easy');
      expect(['p1', 'p3']).toContain(chosen.id);
    }
  });

  it('Requirement 15: Single-person dataset behavior does not freeze or crash', () => {
    const singleDataset = [
      { id: 'solo-1', name: 'Solo Star', category: 'sports', difficulty: 'easy', isActive: true }
    ];
    const selector = new RandomSelector(singleDataset);

    const first = selector.selectNext();
    expect(first.id).toBe('solo-1');

    const second = selector.selectNext();
    expect(second.id).toBe('solo-1'); // Gracefully handles single item repeatedly without loop or crash
  });

  it('Empty eligible pool returns null without infinite looping', () => {
    const selector = new RandomSelector(samplePeople);
    selector.setCategories(['youtuber']); // No youtubers in sample
    expect(selector.selectNext()).toBeNull();
  });
});
