import { loadPersonImage, generateAvatarDataUrl, getAssetUrl } from '../utils/imageLoader.js';

export class PortraitCard {
  constructor(container) {
    this.container = container;
    this.currentPerson = null;
    this.showName = true;
    this.language = 'en';
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="portrait-card-wrapper" id="portrait-card-wrapper">
        <div class="portrait-card" id="portrait-card">
          <div class="card-glow-edge"></div>
          
          <div class="card-inner">
            <!-- 1. Photo Frame at top with 4-sided perimeter timer bar -->
            <div class="card-image-frame" id="card-img-frame">
              <div class="image-loader-spinner" id="card-img-spinner"></div>
              <div class="portrait-photo-frame portrait-circle-wrapper" id="portrait-circle-wrapper">
                <!-- 4-Sided SVG Perimeter Timer Bar around the Photo -->
                <svg class="photo-timer-svg" id="photo-timer-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <rect class="photo-timer-track" x="2" y="2" width="96" height="96" rx="7.5" ry="7.5" />
                  <rect class="photo-timer-bar timer-cyan" id="photo-timer-bar" x="2" y="2" width="96" height="96" rx="7.5" ry="7.5" pathLength="100" />
                </svg>

                <div class="portrait-frame-glow portrait-circle-glow"></div>
                <img id="card-portrait-img" class="portrait-img" alt="Celebrity portrait" />
              </div>
            </div>

            <!-- 2. Celebrity name and Photo Bar text MOVED BELOW THE PHOTO -->
            <div class="card-identity-box" id="card-identity-box">
              <h2 class="person-name" id="card-person-name">Loading...</h2>
              
              <!-- Badges from photo bar & Timer Countdown HUD (Moved Below Photo) -->
              <div class="card-badge-row card-meta-below" id="card-badge-row">
                <span class="category-badge" id="card-category-badge">
                  <span class="category-icon" id="card-cat-icon">⭐</span>
                  <span class="category-text" id="card-cat-name">CELEBRITY</span>
                </span>
                <span class="difficulty-badge" id="card-diff-badge">EASY</span>
                <span class="timer-countdown-badge timer-cyan" id="card-timer-badge">
                  <span class="timer-badge-icon">⏱️</span>
                  <span class="timer-badge-number" id="card-timer-val">10</span><span class="timer-badge-unit">s</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.cardWrapper = this.container.querySelector('#portrait-card-wrapper');
    this.cardElement = this.container.querySelector('#portrait-card');
    this.imageEl = this.container.querySelector('#card-portrait-img');
    this.spinnerEl = this.container.querySelector('#card-img-spinner');
    this.categoryIconEl = this.container.querySelector('#card-cat-icon');
    this.categoryNameEl = this.container.querySelector('#card-cat-name');
    this.difficultyEl = this.container.querySelector('#card-diff-badge');
    this.personNameEl = this.container.querySelector('#card-person-name');
    this.promptEl = this.container.querySelector('#card-question-prompt');
  }

  setLocalization(translations, lang = 'en') {
    this.language = lang;
    this.translations = translations;
    if (this.promptEl && translations?.question) {
      this.promptEl.textContent = translations.question;
    }
  }

  setShowName(show) {
    this.showName = !!show;
    if (this.personNameEl) {
      this.personNameEl.style.display = this.showName ? 'block' : 'none';
    }
  }

  async displayPerson(person, promptText = null) {
    if (!person) return;
    this.currentPerson = person;

    // Start exit transition
    this.cardElement.classList.add('transitioning-out');

    // Wait slightly for exit animation to hit midpoint
    await new Promise(r => setTimeout(r, 120));

    // Choose photo source: prefer authentic image file or custom upload, avoid old SVG initials
    const photoSrc = (person.image && !person.image.startsWith('data:image/svg+xml'))
      ? getAssetUrl(person.image)
      : generateAvatarDataUrl(person);

    this.imageEl.onerror = () => {
      this.imageEl.onerror = null;
      this.imageEl.src = generateAvatarDataUrl(person);
    };

    // Update contents
    this.imageEl.src = photoSrc;
    this.imageEl.alt = person.name;

    const catIcons = {
      footballer: '⚽',
      sports: '🏆',
      actor: '🎬',
      singer: '🎤',
      youtuber: '🔴',
      influencer: '✨',
      leader: '🏛️',
      historical: '📜',
      scientist: '🔬',
      poet: '✒️',
      hero: '⚔️'
    };

    if (this.categoryIconEl) this.categoryIconEl.textContent = catIcons[person.category] || '⭐';
    if (this.categoryNameEl) {
      const catKey = person.category;
      const localizedCat = this.translations?.categories?.[catKey] || person.category;
      this.categoryNameEl.textContent = localizedCat.toUpperCase();
      const badgeEl = this.categoryNameEl.closest('.category-badge');
      if (badgeEl) {
        badgeEl.className = `category-badge cat-${person.category || 'celebrity'}`;
      }
    }

    if (this.difficultyEl) {
      this.difficultyEl.textContent = (person.difficulty || 'EASY').toUpperCase();
      this.difficultyEl.className = `difficulty-badge diff-${person.difficulty || 'easy'}`;
    }

    if (this.personNameEl) {
      this.personNameEl.textContent = person.name;
      this.personNameEl.style.display = this.showName ? 'block' : 'none';
    }

    if (this.promptEl && promptText) {
      this.promptEl.textContent = promptText;
    }

    // Enter transition
    this.cardElement.classList.remove('transitioning-out');
    this.cardElement.classList.add('transitioning-in');

    setTimeout(() => {
      this.cardElement.classList.remove('transitioning-in');
    }, 350);
  }
}
