/**
 * Image Loader with preloading, cache, and high-tech SVG holographic fallback generator.
 */

const imageCache = new Map();

// Category themed color palettes and icons
const CATEGORY_THEMES = {
  footballer: { bg1: '#0f2027', bg2: '#203a43', bg3: '#2c5364', accent: '#00ffcc', icon: '⚽' },
  sports: { bg1: '#1f1c2c', bg2: '#928dab', bg3: '#141e30', accent: '#ffaa00', icon: '🏆' },
  cricketer: { bg1: '#064e3b', bg2: '#047857', bg3: '#065f46', accent: '#fbbf24', icon: '🏏' },
  actress: { bg1: '#831843', bg2: '#db2777', bg3: '#be185d', accent: '#f472b6', icon: '💃' },
  actor: { bg1: '#3a1c71', bg2: '#d76d77', bg3: '#ffaf7b', accent: '#ff007f', icon: '🎬' },
  singer: { bg1: '#130cb7', bg2: '#52e5e7', bg3: '#0f0c29', accent: '#9b51e0', icon: '🎤' },
  youtuber: { bg1: '#eb3349', bg2: '#f45c43', bg3: '#31102b', accent: '#ff416c', icon: '🔴' },
  influencer: { bg1: '#8a2387', bg2: '#e94057', bg3: '#f27121', accent: '#f72585', icon: '✨' },
  leader: { bg1: '#0f0c29', bg2: '#302b63', bg3: '#24243e', accent: '#ffd700', icon: '🏛️' },
  politician: { bg1: '#0a192f', bg2: '#1b2a4a', bg3: '#0f172a', accent: '#38bdf8', icon: '🗳️' },
  gov_head: { bg1: '#064e3b', bg2: '#065f46', bg3: '#022c22', accent: '#34d399', icon: '👔' },
  historical: { bg1: '#2c3e50', bg2: '#3498db', bg3: '#2980b9', accent: '#00e5ff', icon: '📜' },
  scientist: { bg1: '#0a192f', bg2: '#172a45', bg3: '#020c1b', accent: '#00f5d4', icon: '🔬' },
  poet: { bg1: '#1a102f', bg2: '#2d1b4e', bg3: '#0f051d', accent: '#e0aaff', icon: '✒️' },
  hero: { bg1: '#2b0f0f', bg2: '#4a1515', bg3: '#1a0505', accent: '#ff6b6b', icon: '⚔️' }
};

/**
 * Generate a futuristic glowing 3D-styled SVG avatar for any person.
 */
export function generateAvatarDataUrl(person) {
  const theme = CATEGORY_THEMES[person?.category] || {
    bg1: '#0f172a',
    bg2: '#1e293b',
    bg3: '#0f172a',
    accent: '#38bdf8',
    icon: '👤'
  };

  const name = person?.name || 'Star';
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('');
  const flag = person?.flag || '🌐';
  const categoryLabel = (person?.category || 'Star').toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${theme.bg2}"/>
        <stop offset="70%" stop-color="${theme.bg1}"/>
        <stop offset="100%" stop-color="${theme.bg3}"/>
      </radialGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.accent}"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
      <filter id="neon" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <circle cx="200" cy="200" r="198" fill="url(#bg)"/>
    <circle cx="200" cy="200" r="150" fill="url(#glow)"/>
    
    <!-- Cyberpunk grid/rings -->
    <circle cx="200" cy="200" r="135" fill="none" stroke="${theme.accent}" stroke-width="1.5" stroke-dasharray="6,8" opacity="0.4"/>
    <circle cx="200" cy="200" r="115" fill="#0b1120" stroke="url(#ringGrad)" stroke-width="3" filter="url(#neon)"/>
    
    <!-- Flag badge -->
    <circle cx="280" cy="120" r="22" fill="#030712" stroke="${theme.accent}" stroke-width="2"/>
    <text x="280" y="128" font-size="22" text-anchor="middle" dominant-baseline="middle">${flag}</text>
    
    <!-- Initials -->
    <text x="200" y="195" font-family="'Roboto', 'Tiro Bangla', sans-serif" font-weight="900" font-size="64" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="2">${initials}</text>
    
    <!-- Name Label -->
    <text x="200" y="260" font-family="'Roboto', 'Tiro Bangla', sans-serif" font-weight="800" font-size="16" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${name}</text>
    
    <!-- Category Icon and Pill -->
    <g transform="translate(200, 315)">
      <rect x="-70" y="-14" width="140" height="28" rx="14" fill="rgba(15, 23, 42, 0.85)" stroke="${theme.accent}" stroke-width="1.5"/>
      <text x="-45" y="2" font-size="14" text-anchor="middle" dominant-baseline="middle">${theme.icon}</text>
      <text x="12" y="1" font-family="'Roboto', 'Tiro Bangla', sans-serif" font-size="10" font-weight="700" fill="${theme.accent}" text-anchor="middle" dominant-baseline="middle" letter-spacing="1.5">${categoryLabel}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Resolve absolute or relative asset paths according to Vite's base URL (e.g. GitHub Pages)
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('data:') || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Preload and return guaranteed-usable image URL.
 */
export async function loadPersonImage(person, timeoutMs = 4000) {
  if (!person) return '';
  const src = getAssetUrl(person.image);

  if (!src) {
    return generateAvatarDataUrl(person);
  }

  // If local static asset or valid base64 user photo, resolve immediately
  if (src.includes('/images/') || (src.startsWith('data:image/') && !src.startsWith('data:image/svg+xml'))) {
    return src;
  }

  if (imageCache.get(src) === src) {
    return src;
  }

  const fallback = generateAvatarDataUrl(person);

  // If environment has no DOM Image, return fallback directly
  if (typeof Image === 'undefined') {
    return fallback;
  }

  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        // Do NOT permanently poison cache with fallback on slow load
        resolve(fallback);
      }
    }, timeoutMs);

    img.onload = () => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        imageCache.set(src, src);
        resolve(src);
      }
    };

    img.onerror = () => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        imageCache.set(src, fallback);
        resolve(fallback);
      }
    };

    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      settled = true;
      clearTimeout(timer);
      imageCache.set(src, src);
      resolve(src);
    }
  });
}

/**
 * Preload an upcoming person's image quietly.
 */
export function preloadNextImage(person) {
  if (person) {
    loadPersonImage(person, 4000).catch(() => {});
  }
}
