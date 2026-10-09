/**
 * Screen Wake Lock Manager for World Star Quiz 3D.
 * Prevents mobile and desktop screens from sleeping, locking, or turning off while the game is open.
 */

let wakeLockSentinel = null;
let isKeepAwakeEnabled = true;
let fallbackVideoEl = null;

/**
 * Request native screen wake lock.
 */
export async function requestWakeLock() {
  if (!isKeepAwakeEnabled) return false;

  // 1. Native Screen Wake Lock API (Chrome 84+, Safari 16.4+, Edge, Opera, Samsung Internet)
  if ('wakeLock' in navigator && typeof navigator.wakeLock.request === 'function') {
    try {
      if (!wakeLockSentinel || wakeLockSentinel.released) {
        wakeLockSentinel = await navigator.wakeLock.request('screen');
        wakeLockSentinel.addEventListener('release', () => {
          wakeLockSentinel = null;
        });
        console.log('[WakeLock] Screen wake lock active (Native API)');
        return true;
      }
      return true;
    } catch (err) {
      console.warn('[WakeLock] Native request failed, using fallback:', err.message);
    }
  }

  // 2. Fallback for older iOS / browsers: subtle silent video loop keep-alive
  return enableFallbackKeepAlive();
}

/**
 * Release active screen wake lock.
 */
export async function releaseWakeLock() {
  if (wakeLockSentinel) {
    try {
      await wakeLockSentinel.release();
      wakeLockSentinel = null;
      console.log('[WakeLock] Screen wake lock released');
    } catch (err) {
      console.warn('[WakeLock] Error releasing:', err.message);
    }
  }

  disableFallbackKeepAlive();
}

/**
 * Enable or disable keep-awake from settings.
 */
export function setWakeLockEnabled(enabled) {
  isKeepAwakeEnabled = !!enabled;
  if (isKeepAwakeEnabled) {
    requestWakeLock();
  } else {
    releaseWakeLock();
  }
}

/**
 * Fallback keep-alive video loop for browsers lacking Wake Lock API.
 */
function enableFallbackKeepAlive() {
  if (fallbackVideoEl) return true;
  try {
    // 1px base64 silent mp4/webm keep-alive
    const video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('loop', '');
    video.muted = true;
    video.style.position = 'fixed';
    video.style.left = '-9999px';
    video.style.top = '-9999px';
    video.style.width = '1px';
    video.style.height = '1px';
    video.style.opacity = '0.01';
    video.style.pointerEvents = 'none';

    // Blank silent video data URI
    video.src = 'data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29tYXZjMQAAAAhmcmVlAAAABG1kYXQ=';

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          fallbackVideoEl = video;
          document.body.appendChild(video);
          console.log('[WakeLock] Fallback keep-alive active');
        })
        .catch(() => {});
    }
    return true;
  } catch {
    return false;
  }
}

function disableFallbackKeepAlive() {
  if (fallbackVideoEl) {
    try {
      fallbackVideoEl.pause();
      fallbackVideoEl.remove();
    } catch {}
    fallbackVideoEl = null;
  }
}

/**
 * Initialize Wake Lock listeners and automatic lifecycle management.
 */
export function initWakeLock() {
  // 1. Initial attempt
  requestWakeLock();

  // 2. User interaction trigger (browsers often require user activation)
  const onInteraction = () => {
    requestWakeLock();
  };
  window.addEventListener('pointerdown', onInteraction, { passive: true });
  window.addEventListener('touchstart', onInteraction, { passive: true });
  window.addEventListener('click', onInteraction, { passive: true });
  window.addEventListener('keydown', onInteraction, { passive: true });

  // 3. Page visibility change: automatically re-acquire when player switches back to app
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && isKeepAwakeEnabled) {
      requestWakeLock();
    }
  });

  // 4. Window focus
  window.addEventListener('focus', () => {
    if (isKeepAwakeEnabled) {
      requestWakeLock();
    }
  });
}
