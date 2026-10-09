import { validatePerson, validatePeopleDataset, VALID_CATEGORIES, VALID_DIFFICULTIES } from '../utils/validation.js';
import countriesData from '../data/countries.json';
import { ImageCropperModal } from './ImageCropperModal.js';
import { getAssetUrl } from '../utils/imageLoader.js';

export class AdminPanel {
  constructor(container, { getPeople, onUpdatePeople }) {
    this.container = container;
    this.getPeople = getPeople;
    this.onUpdatePeople = onUpdatePeople;
    this.countries = countriesData;
    this.editingId = null;
    this.searchQuery = '';
    this.filterCategory = 'all';
    this.selectedPhotoFile = null;
    this.rawPhotoFile = null;
    this.cropper = new ImageCropperModal();
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="admin-modal-backdrop hidden" id="admin-backdrop">
        <div class="admin-modal" role="dialog" aria-modal="true">
          <div class="admin-header">
            <div>
              <h2>🌟 CELEBRITY DATABASE & PHOTO UPLOADER</h2>
              <span class="admin-subtitle">Add new celebrities with photos and automatic country linking</span>
            </div>
            <button id="btn-admin-close" class="close-btn" aria-label="Close Admin Panel">✕</button>
          </div>

          <div class="admin-content-grid">
            <!-- Left: Add/Edit Form -->
            <div class="admin-form-col">
              <h3 id="admin-form-title">➕ Add New Celebrity (নতুন তারকা যুক্ত করুন)</h3>
              
              <form id="admin-person-form" class="admin-form">
                <input type="hidden" id="adm-id" />

                <!-- 1. Photo Upload Box -->
                <div class="form-field">
                  <label>📸 Celebrity Photo / তারকার ছবি (Upload & Crop)</label>
                  <div class="photo-upload-zone" id="adm-photo-zone">
                    <input type="file" id="adm-photo-input" accept="image/*" class="file-hidden-input" />
                    <div class="photo-preview-box" id="adm-preview-box">
                      <img id="adm-photo-preview" class="photo-preview-thumb hidden" alt="Preview" />
                      <div class="photo-preview-actions hidden" id="adm-photo-actions">
                        <button type="button" class="photo-action-btn btn-recrop" id="btn-recrop-photo">
                          <span>✂️</span> Adjust Crop (ক্রপ ঠিক করুন)
                        </button>
                        <button type="button" class="photo-action-btn btn-remove-photo" id="btn-remove-photo">
                          <span>🗑️</span> Remove
                        </button>
                      </div>
                      <div class="upload-prompt" id="adm-upload-prompt">
                        <span class="upload-icon">📁</span>
                        <span class="upload-text">Click to Choose Photo from Device</span>
                        <span class="upload-sub">Supports JPG, PNG, WebP (Crop Available)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 2. Manual Name (Only typed field!) -->
                <div class="form-field">
                  <label>👤 Celebrity Full Name / তারকার পুরো নাম *</label>
                  <input type="text" id="adm-name" required placeholder="e.g. Cristiano Ronaldo / Arijit Singh" />
                </div>

                <!-- 3. Category Dropdown -->
                <div class="form-field">
                  <label>🎭 Profession / Category (পেশা সিলেক্ট করুন) *</label>
                  <select id="adm-category" required>
                    <option value="footballer">⚽ Footballer (ফুটবল তারকা)</option>
                    <option value="singer">🎤 Musician / Singer (সঙ্গীতশিল্পী / গায়ক)</option>
                    <option value="actor">🎬 Actor / Actress (অভিনেতা / অভিনেত্রী)</option>
                    <option value="sports">🏆 Other Sports Star (অন্যান্য ক্রীড়াবিদ)</option>
                    <option value="youtuber">🔴 YouTuber (ইউটিউবার)</option>
                    <option value="influencer">✨ Social Media Star (সোশ্যাল মিডিয়া স্টার)</option>
                    <option value="leader">🏛️ President / Prime Minister (রাষ্ট্রনেতা)</option>
                    <option value="historical">📜 Historical Figure (ঐতিহাসিক ব্যক্তিত্ব)</option>
                    <option value="scientist">🔬 Scientist & Inventor (বিজ্ঞানী ও গবেষক)</option>
                    <option value="poet">✒️ Poet & Author (কবি ও সাহিত্যিক)</option>
                    <option value="hero">⚔️ Hero & Warrior (বীর ও মুক্তিযোদ্ধা)</option>
                  </select>
                </div>

                <!-- 4. Country Dropdown -->
                <div class="form-field">
                  <label>🌐 Country / দেশ (ড্রপডাউন থেকে বেছে নিন) *</label>
                  <select id="adm-country-code" required>
                    <option value="" disabled selected>Select home country...</option>
                    ${this.countries.map(c => `
                      <option value="${c.code}">
                        ${c.flag || '🏳️'} ${c.name} (${c.nameBn || c.name}) [${c.code}]
                      </option>
                    `).join('')}
                  </select>
                </div>

                <!-- 5. Difficulty Level (Optional) -->
                <div class="form-row">
                  <div class="form-field">
                    <label>Difficulty / স্তর</label>
                    <select id="adm-difficulty">
                      <option value="easy">Easy (সহজ - বিশ্বখ্যাত)</option>
                      <option value="medium" selected>Medium (মাঝারি)</option>
                      <option value="hard">Hard (কঠিন)</option>
                    </select>
                  </div>
                  <div class="form-field-checkbox" style="align-self: flex-end; margin-bottom: 8px;">
                    <input type="checkbox" id="adm-active" checked />
                    <label for="adm-active">Active in Quiz</label>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="submit" id="btn-adm-save-person" class="btn-primary-action">
                    💾 Save Celebrity to Game (সংরক্ষণ করুন)
                  </button>
                  <button type="button" id="btn-adm-cancel-edit" class="btn-secondary-action hidden">
                    Cancel Edit
                  </button>
                </div>

                <div id="adm-form-alert" class="admin-alert hidden"></div>
              </form>

              <!-- Import / Export Toolbar -->
              <div class="admin-io-toolbar">
                <button type="button" id="btn-adm-export" class="tool-btn">📥 Export JSON</button>
                <label class="tool-btn file-input-label">
                  📤 Import JSON
                  <input type="file" id="adm-file-import" accept=".json" style="display: none;" />
                </label>
                <button type="button" id="btn-adm-reset-defaults" class="tool-btn text-danger">⚠️ Reset Seed</button>
              </div>
            </div>

            <!-- Right: Search & Table List -->
            <div class="admin-list-col">
              <div class="admin-filter-bar">
                <input type="search" id="adm-search-input" placeholder="Search celebrity or country..." />
                <select id="adm-filter-category">
                  <option value="all">All Categories</option>
                  ${VALID_CATEGORIES.map(c => `<option value="${c}">${c.toUpperCase()}</option>`).join('')}
                </select>
              </div>

              <div class="admin-table-scroll">
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Country</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="adm-table-body"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.backdrop = this.container.querySelector('#admin-backdrop');
    this.btnClose = this.container.querySelector('#btn-admin-close');
    this.form = this.container.querySelector('#admin-person-form');
    this.tableBody = this.container.querySelector('#adm-table-body');
    this.formTitle = this.container.querySelector('#admin-form-title');
    this.btnCancel = this.container.querySelector('#btn-adm-cancel-edit');
    this.formAlert = this.container.querySelector('#adm-form-alert');

    this.photoInput = this.container.querySelector('#adm-photo-input');
    this.photoZone = this.container.querySelector('#adm-photo-zone');
    this.photoPreview = this.container.querySelector('#adm-photo-preview');
    this.photoActions = this.container.querySelector('#adm-photo-actions');
    this.uploadPrompt = this.container.querySelector('#adm-upload-prompt');
    this.btnRecrop = this.container.querySelector('#btn-recrop-photo');
    this.btnRemovePhoto = this.container.querySelector('#btn-remove-photo');

    this.countrySelect = this.container.querySelector('#adm-country-code');
    this.categorySelect = this.container.querySelector('#adm-category');
    this.nameInput = this.container.querySelector('#adm-name');
    this.difficultySelect = this.container.querySelector('#adm-difficulty');
    this.activeCheckbox = this.container.querySelector('#adm-active');

    this.searchInput = this.container.querySelector('#adm-search-input');
    this.filterCatSelect = this.container.querySelector('#adm-filter-category');

    this.btnExport = this.container.querySelector('#btn-adm-export');
    this.fileImport = this.container.querySelector('#adm-file-import');
    this.btnResetDefaults = this.container.querySelector('#btn-adm-reset-defaults');

    this.bindEvents();
  }

  bindEvents() {
    this.btnClose.addEventListener('click', () => this.hide());
    this.backdrop.addEventListener('click', e => {
      if (e.target === this.backdrop) this.hide();
    });

    this.btnCancel.addEventListener('click', () => this.resetForm());

    // Photo file selection & trigger cropper
    this.photoZone.addEventListener('click', e => {
      if (e.target.closest('#adm-photo-actions')) return;
      this.photoInput.click();
    });

    // Drag and drop photo onto upload zone
    this.photoZone.addEventListener('dragover', e => {
      e.preventDefault();
      this.photoZone.style.borderColor = 'var(--color-cyan)';
      this.photoZone.style.background = 'rgba(0, 242, 254, 0.12)';
    });

    this.photoZone.addEventListener('dragleave', () => {
      this.photoZone.style.borderColor = '';
      this.photoZone.style.background = '';
    });

    this.photoZone.addEventListener('drop', e => {
      e.preventDefault();
      this.photoZone.style.borderColor = '';
      this.photoZone.style.background = '';
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) {
        this.openCropperWithFile(file);
      }
    });

    this.photoInput.addEventListener('change', e => {
      const file = e.target.files?.[0];
      if (file) {
        this.openCropperWithFile(file);
      }
    });

    // Re-crop button
    this.btnRecrop.addEventListener('click', e => {
      e.stopPropagation();
      const source = this.rawPhotoFile || this.selectedPhotoFile || this.photoPreview.src;
      if (source) {
        this.cropper.open(source, ({ file, dataUrl }) => {
          this.selectedPhotoFile = file;
          this.photoPreview.src = dataUrl;
          this.photoPreview.classList.remove('hidden');
          this.photoActions.classList.remove('hidden');
          this.uploadPrompt.classList.add('hidden');
        });
      }
    });

    // Remove photo button
    this.btnRemovePhoto.addEventListener('click', e => {
      e.stopPropagation();
      this.selectedPhotoFile = null;
      this.rawPhotoFile = null;
      this.photoInput.value = '';
      this.photoPreview.src = '';
      this.photoPreview.classList.add('hidden');
      this.photoActions.classList.add('hidden');
      this.uploadPrompt.classList.remove('hidden');
    });

    this.form.addEventListener('submit', async e => {
      e.preventDefault();
      await this.handleFormSubmit();
    });

    this.searchInput.addEventListener('input', e => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderTable();
    });

    this.filterCatSelect.addEventListener('change', e => {
      this.filterCategory = e.target.value;
      this.renderTable();
    });

    this.btnExport.addEventListener('click', () => this.handleExport());
    this.fileImport.addEventListener('change', e => this.handleImport(e));
    this.btnResetDefaults.addEventListener('click', () => this.handleResetDefaults());
  }

  openCropperWithFile(file) {
    this.rawPhotoFile = file;
    this.cropper.open(file, ({ file: croppedFile, dataUrl }) => {
      this.selectedPhotoFile = croppedFile;
      this.photoPreview.src = dataUrl;
      this.photoPreview.classList.remove('hidden');
      this.photoActions.classList.remove('hidden');
      this.uploadPrompt.classList.add('hidden');
    });
  }

  showAlert(msg, isError = false) {
    this.formAlert.textContent = msg;
    this.formAlert.className = `admin-alert ${isError ? 'alert-error' : 'alert-success'}`;
    this.formAlert.classList.remove('hidden');
    setTimeout(() => {
      this.formAlert.classList.add('hidden');
    }, 4500);
  }

  async handleFormSubmit() {
    const idVal = this.container.querySelector('#adm-id').value;
    const name = this.nameInput.value.trim();
    const category = this.categorySelect.value;
    const countryCode = this.countrySelect.value;
    const difficulty = this.difficultySelect.value || 'easy';
    const isActive = this.activeCheckbox.checked;

    if (!name) {
      this.showAlert('Please enter the celebrity full name', true);
      return;
    }
    if (!countryCode) {
      this.showAlert('Please select a country from the dropdown', true);
      return;
    }

    const countryObj = this.countries.find(c => c.code === countryCode) || {
      name: countryCode,
      code: countryCode,
      flag: '🌐',
      capital: '—'
    };

    // Client-side pure frontend saving (100% standalone, no backend required)
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const existingPerson = idVal ? this.getPeople().find(p => p.id === idVal) : null;
    const imagePath = (this.photoPreview.src && this.photoPreview.src.startsWith('data:'))
      ? this.photoPreview.src
      : (existingPerson?.image || `/images/people/${slug}.jpg`);

    const person = {
      id: idVal || `person-${Date.now()}`,
      name,
      country: countryObj.name,
      countryCode: countryObj.code,
      nationality: `${countryObj.name} Citizen`,
      category,
      image: imagePath,
      flag: countryObj.flag || '🌐',
      capital: countryObj.capital || '—',
      difficulty,
      description: `Famous ${category} from ${countryObj.name}`,
      imageCredit: 'User Entry',
      imageLicense: 'Curated',
      isActive
    };

    const validCheck = validatePerson(person);
    if (!validCheck.valid) {
      this.showAlert(validCheck.errors.join('; '), true);
      return;
    }

    const people = [...this.getPeople()];
    if (idVal) {
      const idx = people.findIndex(p => p.id === idVal);
      if (idx !== -1) people[idx] = person;
    } else {
      people.unshift(person);
    }

    this.onUpdatePeople(people);
    this.showAlert(idVal ? `Updated "${name}"!` : `🎉 Added "${name}" (${countryObj.name})!`);
    this.resetForm();
    this.renderTable();
  }

  editPerson(person) {
    this.editingId = person.id;
    this.formTitle.textContent = `Edit "${person.name}"`;
    this.btnCancel.classList.remove('hidden');

    this.container.querySelector('#adm-id').value = person.id;
    this.nameInput.value = person.name;
    this.categorySelect.value = person.category;
    this.countrySelect.value = person.countryCode;
    this.difficultySelect.value = person.difficulty || 'easy';
    this.activeCheckbox.checked = person.isActive !== false;

    if (person.image) {
      this.photoPreview.src = getAssetUrl(person.image);
      this.photoPreview.classList.remove('hidden');
      this.photoActions.classList.remove('hidden');
      this.uploadPrompt.classList.add('hidden');
    }
  }

  deletePerson(id, name) {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const people = this.getPeople().filter(p => p.id !== id);
      this.onUpdatePeople(people);
      this.showAlert(`Deleted "${name}".`);
      if (this.editingId === id) this.resetForm();
      this.renderTable();
    }
  }

  toggleActive(id) {
    const people = [...this.getPeople()];
    const person = people.find(p => p.id === id);
    if (person) {
      person.isActive = !person.isActive;
      this.onUpdatePeople(people);
      this.renderTable();
    }
  }

  resetForm() {
    this.editingId = null;
    this.selectedPhotoFile = null;
    this.rawPhotoFile = null;
    this.photoInput.value = '';
    this.formTitle.textContent = '➕ Add New Celebrity (নতুন তারকা যুক্ত করুন)';
    this.btnCancel.classList.add('hidden');
    this.form.reset();
    this.container.querySelector('#adm-id').value = '';
    this.activeCheckbox.checked = true;

    this.photoPreview.src = '';
    this.photoPreview.classList.add('hidden');
    this.photoActions.classList.add('hidden');
    this.uploadPrompt.classList.remove('hidden');
  }

  handleExport() {
    const data = JSON.stringify(this.getPeople(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `world_star_quiz_people_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const json = JSON.parse(evt.target.result);
        const check = validatePeopleDataset(json);
        if (!check.valid) {
          alert(`Validation error during import:\n${check.errors.join('\n')}`);
          return;
        }
        if (confirm(`Valid dataset found with ${json.length} people. Replace current database?`)) {
          this.onUpdatePeople(json);
          this.renderTable();
          this.showAlert(`Successfully imported ${json.length} celebrities!`);
        }
      } catch (err) {
        alert(`Failed to parse JSON file: ${err.message}`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  handleResetDefaults() {
    if (confirm('Reset custom changes and restore default curated database?')) {
      localStorage.removeItem('wsq3d_custom_people');
      location.reload();
    }
  }

  renderTable() {
    const people = this.getPeople();
    const filtered = people.filter(p => {
      if (this.filterCategory !== 'all' && p.category !== this.filterCategory) {
        return false;
      }
      if (this.searchQuery) {
        const matchesName = p.name.toLowerCase().includes(this.searchQuery);
        const matchesCountry = p.country.toLowerCase().includes(this.searchQuery);
        if (!matchesName && !matchesCountry) return false;
      }
      return true;
    });

    this.tableBody.innerHTML = '';

    if (filtered.length === 0) {
      this.tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #94a3b8; padding: 24px;">No records match your filter</td></tr>`;
      return;
    }

    filtered.forEach(p => {
      const tr = document.createElement('tr');
      const imgSrc = p.image || '/favicon.svg';

      tr.innerHTML = `
        <td>
          <button class="status-btn ${p.isActive !== false ? 'active' : 'inactive'}" title="Toggle Active">
            ${p.isActive !== false ? '●' : '○'}
          </button>
        </td>
        <td>
          <img src="${imgSrc}" class="table-thumb" alt="${p.name}" onerror="this.src='/favicon.svg'" />
        </td>
        <td class="font-bold">${p.name}</td>
        <td><span class="table-tag">${p.category}</span></td>
        <td>${p.flag || '🌐'} ${p.country}</td>
        <td>
          <div class="row-actions">
            <button class="action-btn-edit" title="Edit">✏️</button>
            <button class="action-btn-del" title="Delete">🗑️</button>
          </div>
        </td>
      `;

      tr.querySelector('.status-btn').addEventListener('click', () => this.toggleActive(p.id));
      tr.querySelector('.action-btn-edit').addEventListener('click', () => this.editPerson(p));
      tr.querySelector('.action-btn-del').addEventListener('click', () => this.deletePerson(p.id, p.name));

      this.tableBody.appendChild(tr);
    });
  }

  show() {
    this.renderTable();
    this.backdrop.classList.remove('hidden');
  }

  hide() {
    this.backdrop.classList.add('hidden');
  }
}
