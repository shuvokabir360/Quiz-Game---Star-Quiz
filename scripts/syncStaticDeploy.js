import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const docsDir = path.join(rootDir, 'docs');
const assetsDir = path.join(rootDir, 'assets');

console.log('[DeploySync] Synchronizing production build for GitHub Pages...');

// 1. Ensure dist exists
if (!fs.existsSync(distDir)) {
  console.error('[DeploySync] Error: dist directory does not exist! Run npm run build first.');
  process.exit(1);
}

// 2. Copy dist/assets -> ./assets
if (fs.existsSync(assetsDir)) {
  fs.rmSync(assetsDir, { recursive: true, force: true });
}
fs.cpSync(path.join(distDir, 'assets'), assetsDir, { recursive: true });
console.log('[DeploySync] Copied dist/assets -> ./assets');

// 3. Copy dist/ -> ./docs (for GitHub Pages /docs folder support)
if (fs.existsSync(docsDir)) {
  fs.rmSync(docsDir, { recursive: true, force: true });
}
fs.cpSync(distDir, docsDir, { recursive: true });
// Remove .git if inside docs
if (fs.existsSync(path.join(docsDir, '.git'))) {
  fs.rmSync(path.join(docsDir, '.git'), { recursive: true, force: true });
}
console.log('[DeploySync] Copied dist -> ./docs');

// 4. Copy dist/index.html -> ./index.html
fs.copyFileSync(path.join(distDir, 'index.html'), path.join(rootDir, 'index.html'));
console.log('[DeploySync] Synced dist/index.html -> ./index.html');

// 5. Ensure .nojekyll exists in root
const noJekyllPath = path.join(rootDir, '.nojekyll');
if (!fs.existsSync(noJekyllPath)) {
  fs.writeFileSync(noJekyllPath, '# Disable Jekyll on GitHub Pages\n', 'utf8');
  console.log('[DeploySync] Created .nojekyll in root');
}

console.log('[DeploySync] Production synchronization complete! GitHub Pages is fully supported across all configs.');
