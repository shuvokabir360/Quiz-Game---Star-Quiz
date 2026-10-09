/**
 * PWA Installer and Service Worker Manager for World Star Quiz 3D.
 * Handles Service Worker registration and "Add to Home Screen" installation triggers.
 */

let deferredPrompt = null;
let isAppInstalled = false;

// Check if running in standalone mode (already installed on Home Screen)
export function isRunningStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.includes('android-app://')
  );
}

// Detect iOS devices
export function isIosDevice() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream
  );
}

export function initPWA() {
  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          console.log('[PWA] Service Worker registered successfully:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  // 2. Capture BeforeInstallPrompt event (Android / Chrome / Edge / Desktop)
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default mini-infobar so our custom button can trigger install
    e.preventDefault();
    deferredPrompt = e;
    console.log('[PWA] beforeinstallprompt captured!');
    updateInstallButtons(true);
  });

  // 3. App Installed Event
  window.addEventListener('appinstalled', () => {
    isAppInstalled = true;
    deferredPrompt = null;
    console.log('[PWA] App successfully installed to Home Screen!');
    updateInstallButtons(false);
  });
}

// Trigger installation prompt or show iOS guidance
export async function triggerInstallPrompt() {
  if (isRunningStandalone()) {
    showNotification('✅ World Star Quiz 3D ইতিমধ্যে ইনস্টল করা আছে!');
    return { outcome: 'already_installed' };
  }

  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log('[PWA] User response to install prompt:', choiceResult.outcome);
    deferredPrompt = null;
    updateInstallButtons(false);
    return choiceResult;
  }

  // iOS Safari guidance
  if (isIosDevice()) {
    showNotification(
      '📱 iPhone/iPad এ ইনস্টল করতে: Safari-র নিচের Share (📤) আইকনে চাপ দিন এবং "Add to Home Screen" (+) সিলেক্ট করুন!'
    );
    return { outcome: 'ios_instructions' };
  }

  // Fallback for browsers when prompt not ready yet
  showNotification(
    '📲 ব্রাউজারের থ্রি-ডট (⋮) মেন্যু থেকে "Install app" বা "Add to Home screen" চাপুন।'
  );
  return { outcome: 'manual_instructions' };
}

function updateInstallButtons(available) {
  const buttons = document.querySelectorAll('.btn-install-pwa');
  buttons.forEach((btn) => {
    if (available) {
      btn.classList.add('pwa-ready');
    }
  });
}

function showNotification(text) {
  let toast = document.getElementById('pwa-install-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'pwa-install-toast';
    toast.className = 'pwa-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}
