# 🌟 World Star Quiz 3D (বিশ্ব তারকা কুইজ ৩ডি)

**World Star Quiz 3D** is a production-ready, mobile-first 3D animated trivia quiz application built with **HTML5, CSS3, JavaScript (ES Modules), Three.js, and Vite**.

Players test their global knowledge by guessing the home countries of globally recognized figures:
* **International Football Stars** (Cristiano Ronaldo, Lionel Messi, Kylian Mbappé, Erling Haaland, Neymar Jr, Sadio Mané)
* **Other Sports Icons** (Michael Jordan, Usain Bolt, Virat Kohli, Roger Federer, Rafael Nadal)
* **Actors & Actresses** (Leonardo DiCaprio, Emma Watson, Shah Rukh Khan, Jackie Chan)
* **Singers & Musicians** (Taylor Swift, Freddie Mercury, Shakira)
* **YouTubers & Influencers** (MrBeast, PewDiePie, Khaby Lame)
* **World Leaders & Historic Figures** (Barack Obama, Nelson Mandela, Angela Merkel, Narendra Modi, Sheikh Mujibur Rahman, Albert Einstein, Marie Curie, Leonardo da Vinci, Mahatma Gandhi)

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000/`.

### 3. Run Automated Vitest Test Suite
```bash
npm test
```
Executes all unit and integration tests covering duplicate prevention, timer accuracy, scoring rules, and error resilience.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized, tree-shaken static bundle in the `/dist` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🎮 Game Modes

1. **Auto Quiz (Default)**:
   Automatic, continuous gameplay. A celebrity portrait appears with a circular countdown ring (default 5s). When the timer expires, the correct country flag and facts are revealed with a smooth 3D animation, followed by the next random celebrity.
2. **Guess the Country**:
   Interactive 4-choice quiz. Players select from four country options before time runs out. Provides instant color feedback, tracks streaks, calculates speed bonuses, and records score.
3. **Practice Mode**:
   Self-paced exploration. Players inspect the celebrity at leisure without a countdown timer and reveal answers manually.
4. **Challenge Mode**:
   High-stakes 10-question challenge with accuracy rating, streak tracker, and final scoreboard screen.

---

## 🌐 Localization Support
Full support for **English** and **Bengali (বাংলা)**:
- Question prompts ("Which country is this person from?" / "এই বিখ্যাত ব্যক্তি কোন দেশের?")
- Country names (e.g. Portugal / পর্তুগাল, Argentina / আর্জেন্টিনা, Bangladesh / বাংলাদেশ)
- Header stats, categories, and settings.

---

## 🎨 Visual Identity & 3D Three.js Architecture
- **9:16 Portrait Aspect Ratio**: Mobile-first design (1080×1920 reference) centered in an aesthetic viewport on desktop screens.
- **Three.js Cybernetic Background**: Real-time 3D rotating globe, atmospheric rings, drifting stars, floating energy particles, and perspective parallax.
- **Procedural Web Audio Engine**: Zero-dependency sound synthesizer using the Web Audio API for timer ticks, reveal whooshes, celebratory chords, and ambient cosmic audio.
- **Resilient Holographic Portrait Fallbacks**: If a remote image or asset is unavailable, the engine automatically renders a high-definition SVG cyberpunk avatar badge with category-themed gradients and verified initials.

---

## 🛠️ Data Management & Admin Panel

The app includes a built-in **Database Editor (Admin Panel)** accessible from the Settings menu (⚙️):
- **Add / Edit Celebrities**: Easily enter names, categories, countries, ISO codes, flags, capitals, and descriptions.
- **Toggle Active Status**: Temporarily disable or enable individual celebrities in the quiz pool.
- **Search & Filter**: Find celebrities instantly by name or category.
- **Export / Import JSON**: Download the complete question database or import custom JSON datasets with automated schema validation.

### Adding New Celebrities Manually
You can add records directly to [src/data/people.json](file:///d:/Game/Quiz%20Game/src/data/people.json):
```json
{
  "id": "person-031",
  "name": "Kylian Mbappé",
  "country": "France",
  "countryCode": "FR",
  "nationality": "French",
  "category": "footballer",
  "image": "/images/people/kylian-mbappe.jpg",
  "flag": "🇫🇷",
  "capital": "Paris",
  "difficulty": "easy",
  "description": "World Cup winner and superstar forward",
  "imageCredit": "Wikimedia Commons",
  "imageLicense": "CC BY-SA 4.0",
  "isActive": true
}
```

Validate your database anytime with:
```bash
node scripts/validateData.js
```

---

## 📁 Directory Structure
```
├── index.html                   # Mobile-first 9:16 application root
├── package.json                 # Scripts and dependencies
├── vite.config.js               # Vite & Vitest configuration
├── public/                      # Static assets
│   ├── images/people/           # Generated SVG portraits & local images
│   └── favicon.svg
├── scripts/
│   ├── generateAssets.js        # Script to produce local SVG portraits
│   └── validateData.js          # Standalone dataset schema validator
├── src/
│   ├── main.js                  # Application entry point
│   ├── app/
│   │   ├── AppController.js     # Master game loop & orchestration
│   │   └── GameState.js         # State machine & lifecycle management
│   ├── game/
│   │   ├── RandomSelector.js    # Seeded RNG & duplicate prevention
│   │   ├── TimerController.js   # Precision elapsed-time countdown
│   │   ├── ScoreController.js   # Score, streak multiplier & accuracy
│   │   └── AnswerController.js  # 4-choice option generator
│   ├── three/
│   │   ├── SceneManager.js      # Three.js lifecycle, WebGL fallback
│   │   ├── Globe.js             # 3D cybernetic globe & orbital rings
│   │   ├── ParticleField.js     # Drifting cosmic stars
│   │   ├── Lighting.js          # Dynamic directional & point lighting
│   │   └── CameraController.js  # Smooth parallax perspective camera
│   ├── ui/
│   │   ├── Header.js            # Stats bar, logo, sound/settings toggles
│   │   ├── PortraitCard.js      # 3D card with smooth transitions
│   │   ├── CountdownTimer.js    # Circular animated progress ring
│   │   ├── CountryReveal.js     # 3D answer card with flags and trivia
│   │   ├── MultipleChoice.js    # Interactive 4-choice buttons
│   │   ├── GameControls.js      # Pause, Replay, Reveal, Next, Fullscreen
│   │   ├── SettingsPanel.js     # Drawer with options & category filters
│   │   ├── ResultsScreen.js     # Challenge mode final summary
│   │   └── AdminPanel.js        # Local CRUD database management modal
│   ├── data/
│   │   ├── people.json          # Curated database of 30 world figures
│   │   ├── countries.json       # ISO codes, flags, capitals, EN/BN names
│   │   └── localization.json    # EN & BN bilingual dictionaries
│   ├── utils/
│   │   ├── audio.js             # Web Audio API sound effects
│   │   ├── imageLoader.js       # Preloader & holographic avatar fallback
│   │   ├── storage.js           # Safe LocalStorage with memory fallback
│   │   └── validation.js        # Dataset & schema validation rules
│   ├── styles/
│   │   ├── main.css             # Theme variables, 9:16 layout container
│   │   ├── game.css             # HUD, modals, drawers & widgets
│   │   └── animations.css       # Keyframes & reduced-motion support
│   └── tests/                   # Automated Vitest test suite
```

---

## 🧪 Automated Test Suite
Run tests with:
```bash
npm test
```
Tests cover all 15 core engine specifications:
1. Random person selection
2. Consecutive duplicate prevention
3. Category & difficulty filtering
4. Countdown completion
5. Timer pause & resume
6. Answer reveal timing
7. Automatic next question
8. Manual next question
9. Replay current question
10. Score calculation & speed bonuses
11. Challenge completion & statistics
12. Missing image handling & SVG fallbacks
13. Invalid JSON data handling
14. LocalStorage failure tolerance
15. Single-person dataset loop safety
