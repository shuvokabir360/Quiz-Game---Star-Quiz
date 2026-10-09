export class QuestionBanner {
  constructor(container) {
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="question-highlight-banner" id="main-question-banner">
        <span class="question-highlight-icon">❓</span>
        <h2 class="question-prompt" id="main-question-prompt">Which country is he from?</h2>
      </div>
    `;
    this.bannerEl = this.container.querySelector('#main-question-banner');
    this.promptEl = this.container.querySelector('#main-question-prompt');
  }

  setLocalization(translations) {
    if (this.promptEl && translations?.question) {
      this.promptEl.textContent = translations.question;
    }
  }

  setText(text) {
    if (this.promptEl && text) {
      this.promptEl.textContent = text;
    }
  }
}
