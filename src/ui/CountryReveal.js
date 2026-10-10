import { getFlagHtml } from '../utils/flags.js';
import { getAssetUrl } from '../utils/imageLoader.js';

export class CountryReveal {
  constructor(container) {
    this.container = container;
    this.showCapital = true;
    this.language = 'en';
    this.translations = {};
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="reveal-card-wrapper hidden" id="reveal-card-wrapper">
        <div class="reveal-card-backdrop"></div>
        <div class="reveal-card" id="reveal-card">
          <!-- Status Banner: Dynamic color (Red on wrong, Green on correct, Blue on neutral) -->
          <div class="reveal-header">
            <span class="reveal-status-banner status-neutral" id="reveal-status-banner">
              COUNTRY REVEALED
            </span>
          </div>

          <!-- Celebrity Photo & Name Showcase -->
          <div class="reveal-celebrity-box" id="reveal-celebrity-box">
            <div class="reveal-celebrity-avatar-ring">
              <img id="reveal-star-photo" class="reveal-star-photo" alt="Celebrity Photo" />
            </div>
            <div class="reveal-celebrity-info">
              <span class="reveal-celebrity-tag" id="reveal-star-category">⭐ CELEBRITY</span>
              <h3 class="reveal-celebrity-name" id="reveal-star-name">Celebrity Name</h3>
            </div>
          </div>

          <!-- Wrong choice display (only visible when user chose an incorrect answer) -->
          <div class="reveal-user-wrong-box hidden" id="reveal-wrong-box">
            <span class="wrong-box-label" id="lbl-wrong-attempt">❌ আপনার উত্তর ছিল:</span>
            <span class="wrong-box-val" id="reveal-wrong-val">France</span>
          </div>

          <!-- Big Authentic National Flag -->
          <div class="reveal-flag-row" id="reveal-flag-container">
            <!-- Injected by getFlagHtml -->
          </div>

          <!-- Correct Country Answer Box -->
          <div class="reveal-correct-box">
            <span class="correct-box-tag" id="lbl-correct-country-tag">✅ সঠিক দেশ / CORRECT ANSWER:</span>
            <div class="reveal-country-row">
              <span class="reveal-name-flag" id="reveal-name-flag"></span>
              <h2 class="reveal-country-name" id="reveal-country-name">GERMANY</h2>
              <span class="reveal-country-code" id="reveal-country-code">DE</span>
            </div>
          </div>

          <div class="reveal-meta-row" id="reveal-meta-row">
            <div class="meta-item" id="reveal-capital-box">
              <span class="meta-label" id="lbl-capital">CAPITAL</span>
              <span class="meta-value" id="reveal-capital-val">Berlin</span>
            </div>
            <div class="meta-item">
              <span class="meta-label" id="lbl-nationality">NATIONALITY</span>
              <span class="meta-value" id="reveal-nationality-val">German</span>
            </div>
          </div>

          <p class="reveal-description" id="reveal-description-text"></p>
        </div>
      </div>
    `;

    this.wrapper = this.container.querySelector('#reveal-card-wrapper');
    this.card = this.container.querySelector('#reveal-card');
    this.statusBannerEl = this.container.querySelector('#reveal-status-banner');
    this.starPhotoEl = this.container.querySelector('#reveal-star-photo');
    this.starNameEl = this.container.querySelector('#reveal-star-name');
    this.starCatEl = this.container.querySelector('#reveal-star-category');
    this.wrongBox = this.container.querySelector('#reveal-wrong-box');
    this.wrongAttemptLabel = this.container.querySelector('#lbl-wrong-attempt');
    this.wrongAttemptVal = this.container.querySelector('#reveal-wrong-val');
    this.correctTagEl = this.container.querySelector('#lbl-correct-country-tag');
    this.flagContainer = this.container.querySelector('#reveal-flag-container');
    this.nameFlagEl = this.container.querySelector('#reveal-name-flag');
    this.countryNameEl = this.container.querySelector('#reveal-country-name');
    this.countryCodeEl = this.container.querySelector('#reveal-country-code');
    this.capitalBox = this.container.querySelector('#reveal-capital-box');
    this.capitalValEl = this.container.querySelector('#reveal-capital-val');
    this.nationalityValEl = this.container.querySelector('#reveal-nationality-val');
    this.descriptionEl = this.container.querySelector('#reveal-description-text');
    this.lblCapital = this.container.querySelector('#lbl-capital');
    this.lblNationality = this.container.querySelector('#lbl-nationality');
  }

  setLocalization(translations, lang = 'en') {
    this.language = lang;
    this.translations = translations;
    if (this.lblCapital && translations?.capital) {
      this.lblCapital.textContent = translations.capital.toUpperCase();
    }
    if (this.lblNationality && translations?.nationality) {
      this.lblNationality.textContent = translations.nationality.toUpperCase();
    }
  }

  setShowCapital(show) {
    this.showCapital = !!show;
    if (this.capitalBox) {
      this.capitalBox.style.display = this.showCapital ? 'flex' : 'none';
    }
  }

  show(person, countryData = null, feedback = null) {
    if (!person) return;

    // 0. Render Celebrity Photo & Name
    if (this.starPhotoEl) {
      this.starPhotoEl.src = getAssetUrl(person.image) || getAssetUrl('/favicon.svg');
      this.starPhotoEl.onerror = () => {
        this.starPhotoEl.src = getAssetUrl('/favicon.svg');
      };
    }

    if (this.starNameEl) {
      this.starNameEl.textContent = person.name || 'Celebrity';
    }

    if (this.starCatEl) {
      const catIcons = {
        footballer: '⚽',
        sports: '🏆',
        cricketer: '🏏',
        actress: '💃',
        actor: '🎬',
        singer: '🎤',
        youtuber: '🔴',
        influencer: '✨',
        leader: '🏛️',
        politician: '🗳️',
        gov_head: '👔',
        historical: '📜',
        scientist: '🔬',
        poet: '✒️',
        hero: '⚔️'
      };
      const icon = catIcons[person.category] || '⭐';
      const catName = (person.category || 'celebrity').toUpperCase();
      this.starCatEl.textContent = `${icon} ${catName}`;
    }

    const countryName = this.language === 'bn' && countryData?.nameBn
      ? countryData.nameBn
      : (countryData?.name || person.country);

    const countryCode = person.countryCode || countryData?.code || '';
    const flagEmoji = person.flag || countryData?.flag || '🌐';

    // 1. Render vibrant authentic flag
    this.flagContainer.innerHTML = getFlagHtml(countryCode, flagEmoji, 'large');
    this.nameFlagEl.innerHTML = getFlagHtml(countryCode, flagEmoji, 'small');

    this.countryNameEl.textContent = countryName.toUpperCase();
    this.countryCodeEl.textContent = countryCode;
    this.capitalValEl.textContent = person.capital || countryData?.capital || '—';
    this.nationalityValEl.textContent = person.nationality || '—';
    this.descriptionEl.textContent = person.description || '';

    // 2. Handle feedback states (Incorrect, Correct, Time's Up, Neutral)
    const isBn = this.language === 'bn';

    if (feedback?.isCorrect === false && feedback?.userChoice) {
      // USER GAVE WRONG ANSWER!
      this.statusBannerEl.className = 'reveal-status-banner status-wrong';
      this.statusBannerEl.textContent = isBn ? '❌ ভুল উত্তর!' : '❌ WRONG ANSWER!';

      this.wrongAttemptLabel.textContent = isBn ? '❌ আপনার পছন্দ ছিল:' : '❌ You selected:';
      this.wrongAttemptVal.textContent = feedback.userChoice.name;
      this.wrongBox.classList.remove('hidden');

      this.correctTagEl.textContent = isBn ? '✅ সঠিক দেশ:' : '✅ CORRECT COUNTRY:';
      this.card.classList.add('card-shake');
    } else if (feedback?.isCorrect === true) {
      // USER GAVE CORRECT ANSWER!
      this.statusBannerEl.className = 'reveal-status-banner status-correct';
      this.statusBannerEl.textContent = isBn ? '🎯 চমৎকার! সঠিক উত্তর!' : '🎯 CORRECT ANSWER!';
      this.wrongBox.classList.add('hidden');
      this.correctTagEl.textContent = isBn ? '✅ সঠিক দেশ:' : '✅ CORRECT COUNTRY:';
      this.card.classList.remove('card-shake');
    } else if (feedback?.isTimeout === true) {
      // TIME EXPIRED IN GUESS MODE
      this.statusBannerEl.className = 'reveal-status-banner status-timeout';
      this.statusBannerEl.textContent = isBn ? '⏰ সময় শেষ!' : "⏰ TIME'S UP!";
      this.wrongBox.classList.add('hidden');
      this.correctTagEl.textContent = isBn ? '✅ সঠিক দেশ ছিল:' : '✅ THE CORRECT COUNTRY WAS:';
      this.card.classList.remove('card-shake');
    } else {
      // AUTO QUIZ OR PRACTICE (Neutral reveal)
      this.statusBannerEl.className = 'reveal-status-banner status-neutral';
      this.statusBannerEl.textContent = isBn ? '🌐 দেশ প্রকাশিত' : '🌐 COUNTRY REVEALED';
      this.wrongBox.classList.add('hidden');
      this.correctTagEl.textContent = isBn ? 'সঠিক দেশ:' : 'COUNTRY:';
      this.card.classList.remove('card-shake');
    }

    this.wrapper.classList.remove('hidden');
    this.wrapper.classList.remove('fade-out');
    this.card.classList.add('reveal-pop-in');

    setTimeout(() => {
      this.card.classList.remove('card-shake');
    }, 600);
  }

  hide() {
    this.wrapper.classList.add('fade-out');
    setTimeout(() => {
      this.wrapper.classList.add('hidden');
      this.card.classList.remove('reveal-pop-in');
      this.card.classList.remove('card-shake');
      this.wrapper.classList.remove('fade-out');
    }, 280);
  }
}
