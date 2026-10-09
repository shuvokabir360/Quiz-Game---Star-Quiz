import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const docsDir = path.join(rootDir, 'docs');

console.log('[DeploySync] Synchronizing production build for GitHub Pages...');

// 1. Ensure dist exists
if (!fs.existsSync(distDir)) {
  console.error('[DeploySync] Error: dist directory does not exist! Run npm run build first.');
  process.exit(1);
}

// Normalize dist/index.html manifest and icon links so they point cleanly to static assets
const distIndex = path.join(distDir, 'index.html');
if (fs.existsSync(distIndex)) {
  let html = fs.readFileSync(distIndex, 'utf8');

  // Point manifest directly to ./manifest.json
  html = html.replace(/<link\s+rel=["']manifest["'][^>]*>/i, '<link rel="manifest" href="./manifest.json" />');

  // Normalize icons to clean static paths
  html = html.replace(/<link\s+rel=["']icon["']\s+type=["']image\/svg\+xml["'][^>]*>/i, '<link rel="icon" type="image/svg+xml" href="./favicon.svg" />');
  html = html.replace(/<link\s+rel=["']icon["']\s+type=["']image\/png["'][^>]*>/i, '<link rel="icon" type="image/png" sizes="32x32" href="./icons/favicon-32.png" />');
  html = html.replace(/<link\s+rel=["']apple-touch-icon["']\s+href=[^>]*>/i, '<link rel="apple-touch-icon" href="./icons/apple-touch-icon.png" />');
  html = html.replace(/<link\s+rel=["']apple-touch-icon["']\s+sizes=["']180x180["'][^>]*>/i, '<link rel="apple-touch-icon" sizes="180x180" href="./icons/apple-touch-icon.png" />');
  html = html.replace(/<link\s+rel=["']apple-touch-icon["']\s+sizes=["']192x192["'][^>]*>/i, '<link rel="apple-touch-icon" sizes="192x192" href="./icons/icon-192.png" />');
  html = html.replace(/<link\s+rel=["']apple-touch-icon["']\s+sizes=["']512x512["'][^>]*>/i, '<link rel="apple-touch-icon" sizes="512x512" href="./icons/icon-512.png" />');

  fs.writeFileSync(distIndex, html, 'utf8');
  console.log('[DeploySync] Normalized manifest & icon paths in dist/index.html');
}

// 2. Folders to sync from dist -> root
const foldersToSync = ['assets', 'images', 'icons'];
for (const folder of foldersToSync) {
  const src = path.join(distDir, folder);
  const dest = path.join(rootDir, folder);
  if (fs.existsSync(src)) {
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.cpSync(src, dest, { recursive: true });
    console.log(`[DeploySync] Copied dist/${folder} -> ./${folder}`);
  }
}

// 3. Static files to sync from dist -> root
const filesToSync = [
  'index.html',
  'manifest.json',
  'manifest.webmanifest',
  'sw.js',
  'favicon.svg',
  'apple-touch-icon.png',
  '.nojekyll'
];
for (const file of filesToSync) {
  const src = path.join(distDir, file);
  const dest = path.join(rootDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`[DeploySync] Synced dist/${file} -> ./${file}`);
  }
}

// 4. Ensure .nojekyll exists in root
const noJekyllPath = path.join(rootDir, '.nojekyll');
if (!fs.existsSync(noJekyllPath)) {
  fs.writeFileSync(noJekyllPath, '# Disable Jekyll on GitHub Pages\n', 'utf8');
}

// 5. Copy full dist to docs/ (supporting both root and /docs configs)
if (fs.existsSync(docsDir)) {
  fs.rmSync(docsDir, { recursive: true, force: true });
}
fs.cpSync(distDir, docsDir, { recursive: true });
if (fs.existsSync(path.join(docsDir, '.git'))) {
  fs.rmSync(path.join(docsDir, '.git'), { recursive: true, force: true });
}
console.log('[DeploySync] Synced full dist -> ./docs');

console.log('[DeploySync] All production assets, images, icons and files synchronized to root and docs!');
