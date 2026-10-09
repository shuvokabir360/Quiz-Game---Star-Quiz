import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TimerController } from '../game/TimerController.js';

describe('TimerController and Timing Requirements', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Requirement 4: Countdown starts and reports completion accurately', () => {
    const onTick = vi.fn();
    const onComplete = vi.fn();

    const timer = new TimerController({
      duration: 3,
      onTick,
      onComplete
    });

    timer.start();
    expect(timer.isRunning).toBe(true);

    // Fast-forward 3.2 seconds
    vi.advanceTimersByTime(3200);

    expect(onComplete).toHaveBeenCalled();
    expect(timer.isRunning).toBe(false);
  });

  it('Requirement 5: Timer pause and resume maintains remaining time', () => {
    const onTick = vi.fn();
    const onComplete = vi.fn();

    const timer = new TimerController({
      duration: 10,
      onTick,
      onComplete
    });

    timer.start();
    vi.advanceTimersByTime(3000); // 3 seconds elapsed, 7s remaining
    expect(timer.remainingMs).toBeLessThanOrEqual(7100);

    timer.pause();
    expect(timer.isPaused).toBe(true);

    const pausedMs = timer.remainingMs;
    vi.advanceTimersByTime(4000); // Advance while paused
    expect(timer.remainingMs).toBe(pausedMs); // Did not drop while paused

    timer.resume();
    expect(timer.isPaused).toBe(false);
    vi.advanceTimersByTime(7500); // Resume to finish

    expect(onComplete).toHaveBeenCalled();
  });

  it('Requirement 9: Reset and Replay sets timer back to initial duration', () => {
    const onTick = vi.fn();
    const timer = new TimerController({
      duration: 5,
      onTick
    });

    timer.start();
    vi.advanceTimersByTime(3000);

    timer.reset();
    expect(timer.remainingMs).toBe(5000);
    expect(timer.isRunning).toBe(false);
  });
});
