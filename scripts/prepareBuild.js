import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const indexPath = path.join(rootDir, 'index.html');

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');

  // Ensure manifest link points to ./manifest.json
  html = html.replace(/<link\s+rel=["']manifest["']\s+href=["'][^"']+["']\s*\/?>/i, '<link rel="manifest" href="./manifest.json" />');

  // Strip bundled CSS from head so Vite can inject fresh bundle
  html = html.replace(/<link\s+rel=["']stylesheet["']\s+crossorigin\s+href=["']\.\/assets\/index-[^"']+\.css["']\s*\/?>\s*/gi, '');

  // Strip bundled JS
  html = html.replace(/<script\s+type=["']module["']\s+crossorigin\s+src=["']\.\/assets\/index-[^"']+\.js["']><\/script>\s*/gi, '');

  // Strip any old src/main.js script tags to avoid duplicates
  html = html.replace(/<script\s+type=["']module["']\s+src=["'](?:\/|\.\/)src\/main\.js["']><\/script>\s*/gi, '');

  // Insert fresh source script before </body>
  html = html.replace('</body>', '  <script type="module" src="./src/main.js"></script>\n</body>');

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('[PrepareBuild] Reset index.html to source entry: ./src/main.js');
}
