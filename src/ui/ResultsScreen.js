export class ResultsScreen {
  constructor(container, { onPlayAgain, onBackToAuto }) {
    this.container = container;
    this.onPlayAgain = onPlayAgain;
    this.onBackToAuto = onBackToAuto;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="results-screen-backdrop hidden" id="results-backdrop">
        <div class="results-card" id="results-card">
          <div class="results-trophy">🏆</div>
          <h2 class="results-title" id="results-title-text">CHALLENGE COMPLETE!</h2>
          <p class="results-subtitle" id="results-subtitle-text">Outstanding trivia performance</p>

          <div class="results-score-big">
            <span class="score-num" id="res-score-val">0</span>
            <span class="score-label">POINTS</span>
          </div>

          <div class="results-grid">
            <div class="results-stat-box">
              <span class="stat-icon">🎯</span>
              <span class="stat-num" id="res-accuracy-val">0%</span>
              <span class="stat-name">Accuracy</span>
            </div>
            <div class="results-stat-box">
              <span class="stat-icon">✅</span>
              <span class="stat-num" id="res-correct-val">0</span>
              <span class="stat-name">Correct</span>
            </div>
            <div class="results-stat-box">
              <span class="stat-icon">❌</span>
              <span class="stat-num" id="res-wrong-val">0</span>
              <span class="stat-name">Wrong</span>
            </div>
            <div class="results-stat-box">
              <span class="stat-icon">🔥</span>
              <span class="stat-num" id="res-streak-val">0</span>
              <span class="stat-name">Best Streak</span>
            </div>
          </div>

          <div class="results-actions">
            <button id="btn-challenge-retry" class="btn-primary-action">Play Again 🔄</button>
            <button id="btn-challenge-auto" class="btn-secondary-action">Auto Quiz 🌐</button>
          </div>
        </div>
      </div>
    `;

    this.backdrop = this.container.querySelector('#results-backdrop');
    this.scoreEl = this.container.querySelector('#res-score-val');
    this.accuracyEl = this.container.querySelector('#res-accuracy-val');
    this.correctEl = this.container.querySelector('#res-correct-val');
    this.wrongEl = this.container.querySelector('#res-wrong-val');
    this.streakEl = this.container.querySelector('#res-streak-val');

    this.btnRetry = this.container.querySelector('#btn-challenge-retry');
    this.btnAuto = this.container.querySelector('#btn-challenge-auto');

    this.btnRetry.addEventListener('click', () => {
      this.hide();
      this.onPlayAgain?.();
    });

    this.btnAuto.addEventListener('click', () => {
      this.hide();
      this.onBackToAuto?.();
    });
  }

  show(stats) {
    if (this.scoreEl) this.scoreEl.textContent = stats.score || 0;
    if (this.accuracyEl) this.accuracyEl.textContent = `${stats.accuracy || 0}%`;
    if (this.correctEl) this.correctEl.textContent = stats.correctCount || 0;
    if (this.wrongEl) this.wrongEl.textContent = stats.incorrectCount || 0;
    if (this.streakEl) this.streakEl.textContent = stats.bestStreak || 0;

    this.backdrop.classList.remove('hidden');
  }

  hide() {
    this.backdrop.classList.add('hidden');
  }
}
