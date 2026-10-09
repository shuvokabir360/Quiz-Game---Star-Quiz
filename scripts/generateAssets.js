import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const peoplePath = path.resolve(__dirname, '../src/data/people.json');
const people = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

const outDir = path.resolve(__dirname, '../public/images/people');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const CATEGORY_THEMES = {
  footballer: { bg1: '#0f2027', bg2: '#203a43', bg3: '#2c5364', accent: '#00ffcc', icon: '⚽' },
  sports: { bg1: '#1f1c2c', bg2: '#928dab', bg3: '#141e30', accent: '#ffaa00', icon: '🏆' },
  actor: { bg1: '#3a1c71', bg2: '#d76d77', bg3: '#ffaf7b', accent: '#ff007f', icon: '🎬' },
  singer: { bg1: '#130cb7', bg2: '#52e5e7', bg3: '#0f0c29', accent: '#9b51e0', icon: '🎤' },
  youtuber: { bg1: '#eb3349', bg2: '#f45c43', bg3: '#31102b', accent: '#ff416c', icon: '🔴' },
  influencer: { bg1: '#8a2387', bg2: '#e94057', bg3: '#f27121', accent: '#f72585', icon: '✨' },
  leader: { bg1: '#0f0c29', bg2: '#302b63', bg3: '#24243e', accent: '#ffd700', icon: '🏛️' },
  historical: { bg1: '#2c3e50', bg2: '#3498db', bg3: '#2980b9', accent: '#00e5ff', icon: '📜' }
};

people.forEach(p => {
  const theme = CATEGORY_THEMES[p.category] || {
    bg1: '#0f172a',
    bg2: '#1e293b',
    bg3: '#0f172a',
    accent: '#38bdf8',
    icon: '👤'
  };

  const initials = p.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
  <defs>
    <linearGradient id="bg_${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.bg1}"/>
      <stop offset="50%" stop-color="${theme.bg2}"/>
      <stop offset="100%" stop-color="${theme.bg3}"/>
    </linearGradient>
    <radialGradient id="glow_${p.id}" cx="50%" cy="38%" r="65%">
      <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ring_${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.accent}"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="url(#bg_${p.id})"/>
  <circle cx="200" cy="180" r="140" fill="url(#glow_${p.id})"/>
  
  <circle cx="200" cy="180" r="115" fill="none" stroke="${theme.accent}" stroke-width="2" stroke-dasharray="6,8" opacity="0.6"/>
  <circle cx="200" cy="180" r="100" fill="#0b1120" stroke="url(#ring_${p.id})" stroke-width="4"/>
  
  <circle cx="270" cy="115" r="24" fill="#030712" stroke="${theme.accent}" stroke-width="2"/>
  <text x="270" y="123" font-size="24" text-anchor="middle" dominant-baseline="middle">${p.flag || '🌐'}</text>
  
  <text x="200" y="192" font-family="'Outfit', sans-serif" font-weight="900" font-size="64" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="2">${initials}</text>
  
  <g transform="translate(200, 310)">
    <rect x="-85" y="-17" width="170" height="34" rx="17" fill="rgba(15, 23, 42, 0.85)" stroke="${theme.accent}" stroke-width="1.5"/>
    <text x="-55" y="3" font-size="16" text-anchor="middle" dominant-baseline="middle">${theme.icon}</text>
    <text x="15" y="2" font-family="'Outfit', sans-serif" font-size="11" font-weight="800" fill="${theme.accent}" text-anchor="middle" dominant-baseline="middle" letter-spacing="1.5">${p.category.toUpperCase()}</text>
  </g>

  <rect x="25" y="375" width="350" height="75" rx="14" fill="rgba(3, 7, 18, 0.75)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1"/>
  <text x="200" y="410" font-family="'Outfit', sans-serif" font-weight="800" font-size="20" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${p.name}</text>
  <text x="200" y="433" font-family="'Inter', sans-serif" font-weight="600" font-size="12" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">VERIFIED CELEBRITY PORTRAIT</text>
</svg>`;

  const filename = path.basename(p.image);
  fs.writeFileSync(path.join(outDir, filename), svg);
});

console.log(`Generated ${people.length} portrait assets successfully in ${outDir}`);
