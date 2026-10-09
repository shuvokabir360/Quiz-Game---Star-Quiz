export class Header {
  constructor(container, { onToggleSound, onOpenSettings, onOpenAdmin }) {
    this.container = container;
    this.onToggleSound = onToggleSound;
    this.onOpenSettings = onOpenSettings;
    this.onOpenAdmin = onOpenAdmin;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <header class="app-header">
        <div class="header-top">
          <div class="brand">
            <span class="brand-badge">3D</span>
            <div class="brand-text">
              <h1 class="brand-title">WORLD STAR QUIZ</h1>
              <span class="brand-tagline">GLOBAL TRIVIA</span>
            </div>
          </div>
          
          <div class="header-actions">
            <button id="btn-quick-add" class="quick-add-btn" title="Add Celebrity Photo">
              <span>➕ Add Star</span>
            </button>
            <button id="btn-sound-toggle" class="icon-btn" title="Toggle Sound" aria-label="Toggle Sound">
              <span class="icon-sound">🔊</span>
            </button>
            <button id="btn-settings-open" class="icon-btn" title="Settings" aria-label="Open Settings">
              <span>⚙️</span>
            </button>
          </div>
        </div>

        <div class="header-stats-bar">
          <div class="stat-pill question-pill">
            <span class="stat-label" id="lbl-question-tag">Q</span>
            <span class="stat-value" id="header-question-num">#1</span>
          </div>

          <div class="mode-pill" id="header-mode-badge">
            <span class="mode-dot"></span>
            <span id="header-mode-text">AUTO</span>
          </div>

          <div class="stat-pill score-pill">
            <span class="stat-label" id="lbl-score-tag">SCORE</span>
            <span class="stat-value" id="header-score-val">0</span>
          </div>

          <div class="stat-pill streak-pill">
            <span class="stat-label">🔥</span>
            <span class="stat-value" id="header-streak-val">0</span>
          </div>
        </div>
      </header>
    `;

    this.btnQuickAdd = this.container.querySelector('#btn-quick-add');
    this.btnSound = this.container.querySelector('#btn-sound-toggle');
    this.btnSettings = this.container.querySelector('#btn-settings-open');
    this.soundIcon = this.container.querySelector('.icon-sound');
    this.questionNumEl = this.container.querySelector('#header-question-num');
    this.scoreEl = this.container.querySelector('#header-score-val');
    this.streakEl = this.container.querySelector('#header-streak-val');
    this.modeEl = this.container.querySelector('#header-mode-text');

    this.btnQuickAdd?.addEventListener('click', () => this.onOpenAdmin?.());
    this.btnSound.addEventListener('click', () => this.onToggleSound?.());
    this.btnSettings.addEventListener('click', () => this.onOpenSettings?.());
  }

  updateStats({ questionNumber = 1, score = 0, streak = 0, mode = 'auto' }) {
    if (this.questionNumEl) this.questionNumEl.textContent = `#${questionNumber}`;
    if (this.scoreEl) this.scoreEl.textContent = score;
    if (this.streakEl) this.streakEl.textContent = streak;
    if (this.modeEl) this.modeEl.textContent = mode.toUpperCase();
  }

  setSoundState(isEnabled) {
    if (this.soundIcon) {
      this.soundIcon.textContent = isEnabled ? '🔊' : '🔇';
    }
  }
}
