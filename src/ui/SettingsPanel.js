import { VALID_CATEGORIES, VALID_DIFFICULTIES } from '../utils/validation.js';
import { triggerInstallPrompt } from '../utils/pwaInstaller.js';

export class SettingsPanel {
  constructor(container, { onSave, onOpenAdmin, getPeople, translations }) {
    this.container = container;
    this.onSave = onSave;
    this.onOpenAdmin = onOpenAdmin;
    this.getPeople = getPeople;
    this.translations = translations;
    this.settings = {};
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="settings-drawer-backdrop hidden" id="settings-backdrop">
        <aside class="settings-drawer" id="settings-drawer" role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <div class="settings-header">
            <h2 id="settings-title">GAME SETTINGS</h2>
            <button id="btn-settings-close" class="close-btn" aria-label="Close Settings">✕</button>
          </div>

          <div class="settings-body">
            <!-- Mode Selector -->
            <div class="setting-group">
              <label class="setting-label">Game Mode</label>
              <div class="pill-group" id="setting-mode-pills">
                <button type="button" class="pill-opt" data-mode="auto">Auto</button>
                <button type="button" class="pill-opt" data-mode="guess">Guess</button>
                <button type="button" class="pill-opt" data-mode="practice">Practice</button>
                <button type="button" class="pill-opt" data-mode="challenge">Challenge (10)</button>
              </div>
            </div>

            <!-- Language -->
            <div class="setting-group">
              <label class="setting-label">Language</label>
              <div class="pill-group" id="setting-lang-pills">
                <button type="button" class="pill-opt" data-lang="en">English 🇬🇧</button>
                <button type="button" class="pill-opt" data-lang="bn">বাংলা 🇧🇩</button>
              </div>
            </div>

            <!-- Timer Duration -->
            <div class="setting-group">
              <label class="setting-label">Countdown Duration</label>
              <div class="pill-group" id="setting-timer-pills">
                <button type="button" class="pill-opt" data-timer="3">3s</button>
                <button type="button" class="pill-opt" data-timer="5">5s</button>
                <button type="button" class="pill-opt" data-timer="10">10s</button>
                <button type="button" class="pill-opt" data-timer="15">15s</button>
                <button type="button" class="pill-opt" data-timer="20">20s</button>
              </div>
            </div>

            <!-- Reveal Duration -->
            <div class="setting-group">
              <label class="setting-label">Answer Display Delay</label>
              <div class="pill-group" id="setting-reveal-pills">
                <button type="button" class="pill-opt" data-reveal="1.5">1.5s</button>
                <button type="button" class="pill-opt" data-reveal="2.5">2.5s</button>
                <button type="button" class="pill-opt" data-reveal="4">4s</button>
              </div>
            </div>

            <!-- Difficulty -->
            <div class="setting-group">
              <label class="setting-label">Difficulty Level</label>
              <div class="pill-group" id="setting-diff-pills">
                <button type="button" class="pill-opt" data-diff="all">All</button>
                <button type="button" class="pill-opt" data-diff="easy">Easy</button>
                <button type="button" class="pill-opt" data-diff="medium">Medium</button>
                <button type="button" class="pill-opt" data-diff="hard">Hard</button>
              </div>
            </div>

            <!-- Categories Multi-Select (Dynamically Generated) -->
            <div class="setting-group">
              <label class="setting-label">Celebrity Categories</label>
              <div class="pill-grid" id="setting-cat-pills"></div>
            </div>

            <!-- Audio Settings -->
            <div class="setting-group">
              <label class="setting-label">Audio & SFX</label>
              <div class="toggle-row">
                <span>Sound Effects</span>
                <input type="checkbox" id="set-sound-fx" class="switch-checkbox" />
              </div>
              <div class="toggle-row">
                <span>Background Cosmic Audio</span>
                <input type="checkbox" id="set-music" class="switch-checkbox" />
              </div>
              <div class="slider-row">
                <span>Volume</span>
                <input type="range" id="set-volume" min="0" max="1" step="0.05" class="custom-slider" />
              </div>
            </div>

            <!-- Visual Settings -->
            <div class="setting-group">
              <label class="setting-label">Graphics & Performance</label>
              <div class="pill-group" id="setting-vfx-pills">
                <button type="button" class="pill-opt" data-vfx="high">High 3D</button>
                <button type="button" class="pill-opt" data-vfx="medium">Medium</button>
                <button type="button" class="pill-opt" data-vfx="low">Low (Battery)</button>
              </div>
              <div class="toggle-row" style="margin-top: 10px;">
                <span>Reduced Motion</span>
                <input type="checkbox" id="set-reduced-motion" class="switch-checkbox" />
              </div>
            </div>

            <!-- Display Preferences -->
            <div class="setting-group">
              <label class="setting-label">Display Options</label>
              <div class="toggle-row">
                <span>Show Person's Name</span>
                <input type="checkbox" id="set-show-name" class="switch-checkbox" />
              </div>
              <div class="toggle-row">
                <span>Show Capital City</span>
                <input type="checkbox" id="set-show-capital" class="switch-checkbox" />
              </div>
            </div>

            <!-- Install App / Add to Home Screen -->
            <div class="setting-group pwa-trigger-group">
              <button id="btn-install-app" type="button" class="btn-install-pwa">
                📲 Add to Home Screen / অ্যাপ ইনস্টল করুন
              </button>
            </div>

            <!-- Admin Panel Button -->
            <div class="setting-group admin-trigger-group">
              <button id="btn-open-admin" type="button" class="btn-admin-panel">
                🛠️ Open Database Editor (Admin)
              </button>
            </div>
          </div>

          <div class="settings-footer">
            <button id="btn-save-settings" class="btn-primary-action">Close & Apply</button>
          </div>
        </aside>
      </div>
    `;

    this.backdrop = this.container.querySelector('#settings-backdrop');
    this.btnClose = this.container.querySelector('#btn-settings-close');
    this.btnSave = this.container.querySelector('#btn-save-settings');
    this.btnAdmin = this.container.querySelector('#btn-open-admin');

    // Controls
    this.soundFxCheckbox = this.container.querySelector('#set-sound-fx');
    this.musicCheckbox = this.container.querySelector('#set-music');
    this.volumeSlider = this.container.querySelector('#set-volume');
    this.reducedMotionCheckbox = this.container.querySelector('#set-reduced-motion');
    this.showNameCheckbox = this.container.querySelector('#set-show-name');
    this.showCapitalCheckbox = this.container.querySelector('#set-show-capital');

    this.bindEvents();
  }

  bindEvents() {
    this.btnClose.addEventListener('click', () => this.close());
    this.btnSave.addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', e => {
      if (e.target === this.backdrop) this.close();
    });

    this.btnAdmin.addEventListener('click', () => {
      this.close();
      this.onOpenAdmin?.();
    });

    const btnInstall = this.container.querySelector('#btn-install-app');
    if (btnInstall) {
      btnInstall.addEventListener('click', () => {
        triggerInstallPrompt();
      });
    }

    // Pill selectors
    this.setupPillGroup('#setting-mode-pills', 'data-mode', val => {
      this.settings.mode = val;
    });

    this.setupPillGroup('#setting-lang-pills', 'data-lang', val => {
      this.settings.language = val;
      this.renderCategoryPills();
    });

    this.setupPillGroup('#setting-timer-pills', 'data-timer', val => {
      this.settings.timerDuration = Number(val);
    });

    this.setupPillGroup('#setting-reveal-pills', 'data-reveal', val => {
      this.settings.revealDuration = Number(val);
    });

    this.setupPillGroup('#setting-diff-pills', 'data-diff', val => {
      this.settings.difficulty = val;
    });

    this.setupPillGroup('#setting-vfx-pills', 'data-vfx', val => {
      this.settings.vfxQuality = val;
    });

    // Inputs
    this.soundFxCheckbox.addEventListener('change', e => {
      this.settings.soundEnabled = e.target.checked;
    });

    this.musicCheckbox.addEventListener('change', e => {
      this.settings.musicEnabled = e.target.checked;
    });

    this.volumeSlider.addEventListener('input', e => {
      this.settings.soundVolume = Number(e.target.value);
    });

    this.reducedMotionCheckbox.addEventListener('change', e => {
      this.settings.reducedMotion = e.target.checked;
    });

    this.showNameCheckbox.addEventListener('change', e => {
      this.settings.showName = e.target.checked;
    });

    this.showCapitalCheckbox.addEventListener('change', e => {
      this.settings.showCapital = e.target.checked;
    });
  }

  renderCategoryPills() {
    const catContainer = this.container.querySelector('#setting-cat-pills');
    if (!catContainer) return;

    // Discover all unique categories dynamically from people database & VALID_CATEGORIES
    const people = typeof this.getPeople === 'function' ? this.getPeople() : [];
    const categorySet = new Set(VALID_CATEGORIES);
    people.forEach(p => {
      if (p?.category && typeof p.category === 'string') {
        categorySet.add(p.category.trim().toLowerCase());
      }
    });

    // Compute live count per category
    const counts = { all: people.length };
    people.forEach(p => {
      if (p?.category) {
        const cat = p.category.trim().toLowerCase();
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });

    const categoryIcons = {
      all: '⭐',
      footballer: '⚽',
      sports: '🏆',
      actor: '🎬',
      singer: '🎤',
      scientist: '🔬',
      youtuber: '🔴',
      influencer: '✨',
      leader: '🏛️',
      historical: '📜',
      poet: '✒️',
      hero: '⚔️'
    };

    const lang = this.settings.language || 'en';
    const dict = this.translations?.[lang]?.categories || {};

    const categoryList = ['all', ...Array.from(categorySet).filter(c => c !== 'all')];

    catContainer.innerHTML = categoryList.map(cat => {
      const icon = categoryIcons[cat] || '🌟';
      let label = dict[cat];
      if (!label) {
        label = cat.charAt(0).toUpperCase() + cat.slice(1);
      }
      const count = counts[cat] !== undefined ? ` (${counts[cat]})` : '';
      return `<button type="button" class="pill-opt pill-toggle" data-cat="${cat}">${icon} ${label}${count}</button>`;
    }).join('');

    // Bind click events on all category toggle buttons
    catContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        let selected = [...(this.settings.selectedCategories || ['all'])];

        if (cat === 'all') {
          selected = ['all'];
        } else {
          selected = selected.filter(c => c !== 'all');
          if (selected.includes(cat)) {
            selected = selected.filter(c => c !== cat);
            if (selected.length === 0) selected = ['all'];
          } else {
            selected.push(cat);
          }
        }

        this.settings.selectedCategories = selected;
        this.updateCategoryPills();
      });
    });

    this.updateCategoryPills();
  }

  setupPillGroup(containerSelector, attrName, onChange) {
    const group = this.container.querySelector(containerSelector);
    if (!group) return;

    group.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const val = btn.getAttribute(attrName);
      if (val !== null) {
        group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        onChange(val);
      }
    });
  }

  updateCategoryPills() {
    const selected = this.settings.selectedCategories || ['all'];
    const catPills = this.container.querySelectorAll('#setting-cat-pills button');
    catPills.forEach(btn => {
      const cat = btn.dataset.cat;
      if (selected.includes(cat)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  setLocalization(translations, lang = 'en') {
    this.translations = translations;
    this.settings.language = lang;
    this.renderCategoryPills();
  }

  open(currentSettings) {
    this.settings = { ...currentSettings };

    // Sync UI with current settings
    this.setActivePill('#setting-mode-pills', 'data-mode', this.settings.mode);
    this.setActivePill('#setting-lang-pills', 'data-lang', this.settings.language);
    this.setActivePill('#setting-timer-pills', 'data-timer', String(this.settings.timerDuration));
    this.setActivePill('#setting-reveal-pills', 'data-reveal', String(this.settings.revealDuration));
    this.setActivePill('#setting-diff-pills', 'data-diff', this.settings.difficulty);
    this.setActivePill('#setting-vfx-pills', 'data-vfx', this.settings.vfxQuality);

    this.renderCategoryPills();

    this.soundFxCheckbox.checked = !!this.settings.soundEnabled;
    this.musicCheckbox.checked = !!this.settings.musicEnabled;
    this.volumeSlider.value = this.settings.soundVolume ?? 0.7;
    this.reducedMotionCheckbox.checked = !!this.settings.reducedMotion;
    this.showNameCheckbox.checked = !!this.settings.showName;
    this.showCapitalCheckbox.checked = !!this.settings.showCapital;

    this.backdrop.classList.remove('hidden');
  }

  setActivePill(containerSelector, attrName, value) {
    const group = this.container.querySelector(containerSelector);
    if (!group) return;
    group.querySelectorAll('button').forEach(btn => {
      if (btn.getAttribute(attrName) === String(value)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  close() {
    this.backdrop.classList.add('hidden');
    this.onSave?.(this.settings);
  }
}
