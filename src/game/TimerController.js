/**
 * Precision Timer Controller based on performance.now() elapsed time.
 * Resilient against frame drops, tab switching, and window blurring.
 */

export class TimerController {
  constructor(options = {}) {
    this.duration = options.duration ?? 10; // seconds
    this.onTick = options.onTick || (() => {});
    this.onComplete = options.onComplete || (() => {});
    
    this.remainingMs = this.duration * 1000;
    this.totalDurationMs = this.duration * 1000;
    this.isRunning = false;
    this.isPaused = false;
    this.lastTimestamp = 0;
    this.animFrameId = null;
    this.lastReportedSec = -1;
  }

  setDuration(seconds) {
    this.duration = Number(seconds) || 10;
    this.totalDurationMs = this.duration * 1000;
    this.reset();
  }

  start() {
    this.cancelFrame();
    this.remainingMs = this.totalDurationMs;
    this.isRunning = true;
    this.isPaused = false;
    this.lastTimestamp = performance.now();
    this.lastReportedSec = Math.ceil(this.duration);

    // Initial tick callback
    this.onTick({
      remainingSeconds: Math.ceil(this.duration),
      progress: 1.0,
      isUrgent: this.duration <= 1
    });

    this.loop();
  }

  pause() {
    if (!this.isRunning || this.isPaused) return;
    this.isPaused = true;
    this.cancelFrame();
  }

  resume() {
    if (!this.isRunning || !this.isPaused) return;
    this.isPaused = false;
    this.lastTimestamp = performance.now();
    this.loop();
  }

  reset() {
    this.cancelFrame();
    this.isRunning = false;
    this.isPaused = false;
    this.remainingMs = this.totalDurationMs;
    this.lastReportedSec = -1;

    this.onTick({
      remainingSeconds: Math.ceil(this.duration),
      progress: 1.0,
      isUrgent: false
    });
  }

  stop() {
    this.cancelFrame();
    this.isRunning = false;
    this.isPaused = false;
  }

  cancelFrame() {
    if (this.animFrameId !== null) {
      if (typeof cancelAnimationFrame !== 'undefined') {
        cancelAnimationFrame(this.animFrameId);
      } else {
        clearTimeout(this.animFrameId);
      }
      this.animFrameId = null;
    }
  }

  loop = () => {
    if (!this.isRunning || this.isPaused) return;

    const now = performance.now();
    const delta = now - this.lastTimestamp;
    this.lastTimestamp = now;

    this.remainingMs = Math.max(0, this.remainingMs - delta);
    const progress = this.totalDurationMs > 0 ? this.remainingMs / this.totalDurationMs : 0;
    const remainingSeconds = Math.ceil(this.remainingMs / 1000);
    const isUrgent = this.remainingMs <= 1500;

    const didSecondChange = remainingSeconds !== this.lastReportedSec;
    this.lastReportedSec = remainingSeconds;

    this.onTick({
      remainingSeconds,
      progress,
      isUrgent,
      didSecondChange
    });

    if (this.remainingMs <= 0) {
      this.isRunning = false;
      this.onComplete();
      return;
    }

    if (typeof requestAnimationFrame !== 'undefined') {
      this.animFrameId = requestAnimationFrame(this.loop);
    } else {
      this.animFrameId = setTimeout(this.loop, 16);
    }
  };
}
