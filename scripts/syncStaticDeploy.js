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
