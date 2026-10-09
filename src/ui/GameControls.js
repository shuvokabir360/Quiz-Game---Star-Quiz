export class GameControls {
  constructor(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.isPaused = false;
    this.isDebouncing = false;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <nav class="bottom-controls" aria-label="Game navigation controls">
        <button id="ctrl-pause" class="ctrl-btn ctrl-primary" title="Pause / Resume">
          <span class="ctrl-icon" id="ctrl-pause-icon">⏸️</span>
          <span class="ctrl-label" id="ctrl-pause-label">Pause</span>
        </button>

        <button id="ctrl-reveal" class="ctrl-btn" title="Reveal Answer Immediately">
          <span class="ctrl-icon">💡</span>
          <span class="ctrl-label" id="ctrl-reveal-label">Answer</span>
        </button>

        <button id="ctrl-replay" class="ctrl-btn" title="Replay Current Question">
          <span class="ctrl-icon">🔄</span>
          <span class="ctrl-label" id="ctrl-replay-label">Replay</span>
        </button>

        <button id="ctrl-next" class="ctrl-btn ctrl-accent" title="Next Question">
          <span class="ctrl-icon">⏭️</span>
          <span class="ctrl-label" id="ctrl-next-label">Next</span>
        </button>

        <button id="ctrl-fullscreen" class="ctrl-btn" title="Toggle Fullscreen">
          <span class="ctrl-icon">⛶</span>
          <span class="ctrl-label" id="ctrl-fs-label">Full</span>
        </button>
      </nav>
    `;

    this.btnPause = this.container.querySelector('#ctrl-pause');
    this.iconPause = this.container.querySelector('#ctrl-pause-icon');
    this.lblPause = this.container.querySelector('#ctrl-pause-label');
    this.btnReveal = this.container.querySelector('#ctrl-reveal');
    this.btnReplay = this.container.querySelector('#ctrl-replay');
    this.btnNext = this.container.querySelector('#ctrl-next');
    this.btnFullscreen = this.container.querySelector('#ctrl-fullscreen');

    this.bindEvents();
  }

  debounce(action) {
    if (this.isDebouncing) return;
    this.isDebouncing = true;
    action();
    setTimeout(() => {
      this.isDebouncing = false;
    }, 250);
  }

  bindEvents() {
    this.btnPause.addEventListener('click', () => {
      this.debounce(() => this.callbacks.onTogglePause?.());
    });

    this.btnReveal.addEventListener('click', () => {
      this.debounce(() => this.callbacks.onRevealNow?.());
    });

    this.btnReplay.addEventListener('click', () => {
      this.debounce(() => this.callbacks.onReplay?.());
    });

    this.btnNext.addEventListener('click', () => {
      this.debounce(() => this.callbacks.onNext?.());
    });

    this.btnFullscreen.addEventListener('click', () => {
      this.debounce(() => this.callbacks.onToggleFullscreen?.());
    });
  }

  setPausedState(isPaused) {
    this.isPaused = isPaused;
    if (this.iconPause) {
      this.iconPause.textContent = isPaused ? '▶️' : '⏸️';
    }
    if (this.lblPause) {
      this.lblPause.textContent = isPaused ? 'Play' : 'Pause';
    }
  }

  setLocalization(translations) {
    if (!translations) return;
    if (this.lblPause) {
      this.lblPause.textContent = this.isPaused
        ? translations.resume || 'Resume'
        : translations.pause || 'Pause';
    }
    const lblReveal = this.container.querySelector('#ctrl-reveal-label');
    if (lblReveal && translations.showAnswer) lblReveal.textContent = translations.showAnswer;

    const lblReplay = this.container.querySelector('#ctrl-replay-label');
    if (lblReplay && translations.replay) lblReplay.textContent = translations.replay;

    const lblNext = this.container.querySelector('#ctrl-next-label');
    if (lblNext && translations.next) lblNext.textContent = translations.next;
  }
}
