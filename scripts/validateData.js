import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validatePeopleDataset } from '../src/utils/validation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const peoplePath = path.resolve(__dirname, '../src/data/people.json');
const people = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

console.log(`--- Validating People Database (${people.length} entries) ---`);

const res = validatePeopleDataset(people);

// Check image path existence
let missingImages = 0;
people.forEach(p => {
  const localRelative = p.image.replace(/^\//, '');
  const localFull = path.resolve(__dirname, '../public', localRelative);
  if (!fs.existsSync(localFull)) {
    console.warn(`[Image Warning] Missing image file on disk: ${p.image} for ${p.name}`);
    missingImages++;
  }
});

if (res.valid && missingImages === 0) {
  console.log(`✅ ALL CHECKS PASSED! ${people.length} records verified.`);
  process.exit(0);
} else {
  if (!res.valid) {
    console.error(`❌ Validation errors found:`);
    res.errors.forEach(err => console.error(`  - ${err}`));
  }
  if (missingImages > 0) {
    console.warn(`⚠️ ${missingImages} image assets are missing on disk (fallback will be used).`);
  }
  process.exit(res.valid ? 0 : 1);
}
