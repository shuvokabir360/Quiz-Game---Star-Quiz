import { AppController } from './app/AppController.js';
import { initPWA } from './utils/pwaInstaller.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize PWA installation and Service Worker support
  initPWA();

  const domElements = {
    threeCanvas: document.getElementById('three-canvas-slot'),
    headerContainer: document.getElementById('header-slot'),
    portraitContainer: document.getElementById('portrait-slot'),
    timerContainer: document.getElementById('timer-slot'),
    questionContainer: document.getElementById('question-slot'),
    choiceContainer: document.getElementById('choice-slot'),
    revealContainer: document.getElementById('reveal-slot'),
    controlsContainer: document.getElementById('controls-slot'),
    settingsContainer: document.getElementById('settings-slot'),
    resultsContainer: document.getElementById('results-slot'),
    adminContainer: document.getElementById('admin-slot')
  };

  try {
    const app = new AppController(domElements);
    app.init();
    window.__WSQ3D_APP__ = app;
  } catch (err) {
    console.error('Fatal initialization error:', err);
  }
});
