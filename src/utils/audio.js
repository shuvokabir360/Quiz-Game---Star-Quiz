/**
 * Web Audio API synthesizer for World Star Quiz 3D.
 * Generates crisp, futuristic sound effects and ambient sci-fi background audio
 * with zero external asset dependencies, 100% reliability, and low latency.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.musicEnabled = false;
    this.volume = 0.7;
    this.masterGain = null;
    this.musicOscillators = [];
    this.musicGain = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
    } catch (err) {
      console.warn('AudioContext failed to initialize:', err);
    }
  }

  ensureContext() {
    if (!this.isInitialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  setMusicEnabled(enabled) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startAmbientMusic();
    } else {
      this.stopAmbientMusic();
    }
  }

  playTick(urgent = false) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = urgent ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(urgent ? 880 : 520, now);
      osc.frequency.exponentialRampToValueAtTime(urgent ? 1200 : 220, now + 0.06);

      gain.gain.setValueAtTime(urgent ? 0.35 : 0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Ignore audio error
    }
  }

  playTimeUp() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.4);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {}
  }

  playCorrect() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.07;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(start);
        osc.stop(start + 0.26);
      });
    } catch {}
  }

  playIncorrect() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.setValueAtTime(110, now + 0.15);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  playReveal() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Futuristic swell
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  playTransition() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.17);
    } catch {}
  }

  startAmbientMusic() {
    if (!this.musicEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    this.stopAmbientMusic();

    try {
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      // Sci-fi drone chords: D minor / suspended (D3, A3, F3, E4)
      const freqs = [146.83, 220.0, 349.23, 329.63];
      freqs.forEach(freq => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.connect(this.musicGain);
        osc.start();
        this.musicOscillators.push(osc);
      });
    } catch {}
  }

  stopAmbientMusic() {
    if (this.musicOscillators.length > 0) {
      this.musicOscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.musicOscillators = [];
    }
    if (this.musicGain) {
      try {
        this.musicGain.disconnect();
      } catch {}
      this.musicGain = null;
    }
  }
}

export const sound = new SoundController();
