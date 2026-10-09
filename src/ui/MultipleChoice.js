import { getFlagHtml } from '../utils/flags.js';

export class MultipleChoice {
  constructor(container, { onSelect }) {
    this.container = container;
    this.onSelect = onSelect;
    this.isLocked = false;
    this.choices = [];
    this.language = 'en';
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="multiple-choice-container" id="mc-container">
        <div class="mc-grid" id="mc-grid"></div>
      </div>
    `;
    this.grid = this.container.querySelector('#mc-grid');
  }

  setLocalization(lang = 'en') {
    this.language = lang;
  }

  setChoices(choices) {
    this.choices = choices || [];
    this.isLocked = false;
    if (!this.grid) return;

    this.grid.innerHTML = '';

    this.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.dataset.index = index;
      btn.dataset.code = choice.code;
      btn.setAttribute('aria-label', choice.name);

      const flagHtml = getFlagHtml(choice.code, choice.flag || '🏳️', 'small');
      const letters = ['A', 'B', 'C', 'D'];
      const letter = letters[index] || '';

      btn.innerHTML = `
        <div class="choice-top-row">
          <span class="choice-letter-badge choice-badge-${index}">${letter}</span>
          <span class="choice-flag-box">${flagHtml}</span>
          <span class="choice-status-badge"></span>
        </div>
        <span class="choice-name">${choice.name}</span>
      `;

      btn.addEventListener('click', () => this.handleSelection(index, btn));
      this.grid.appendChild(btn);
    });
  }

  handleSelection(selectedIndex, clickedBtn) {
    if (this.isLocked) return;
    this.isLocked = true;

    const selectedChoice = this.choices[selectedIndex];
    const isCorrect = !!selectedChoice?.isCorrect;
    const isBn = this.language === 'bn';

    // Lock all buttons
    const buttons = this.grid.querySelectorAll('.choice-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      const choice = this.choices[idx];
      const badge = btn.querySelector('.choice-status-badge');

      if (choice?.isCorrect) {
        btn.classList.add('btn-correct');
        if (badge) {
          badge.textContent = isBn ? '✓ সঠিক' : '✓ Correct';
        }
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add('btn-incorrect');
        if (badge) {
          badge.textContent = isBn ? '✕ ভুল' : '✕ Wrong';
        }
      }
    });

    this.onSelect?.(isCorrect, selectedChoice);
  }

  lock() {
    this.isLocked = true;
    const buttons = this.grid?.querySelectorAll('.choice-btn');
    buttons?.forEach(btn => (btn.disabled = true));
  }

  setVisible(visible) {
    if (this.container) {
      this.container.style.display = visible ? 'block' : 'none';
    }
  }

  clear() {
    if (this.grid) this.grid.innerHTML = '';
    this.isLocked = false;
  }
}
