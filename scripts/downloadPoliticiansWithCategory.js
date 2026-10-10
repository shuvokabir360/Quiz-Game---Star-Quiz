import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const peoplePath = path.join(rootDir, 'src', 'data', 'people.json');
const publicImagesDir = path.join(rootDir, 'public', 'images', 'people');
const rootImagesDir = path.join(rootDir, 'images', 'people');
const distImagesDir = path.join(rootDir, 'dist', 'images', 'people');

for (const dir of [publicImagesDir, rootImagesDir, distImagesDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const wikiOverrides = {
  'George Washington': 'George_Washington',
  'John F. Kennedy': 'John_F._Kennedy',
  'Franklin D. Roosevelt': 'Franklin_D._Roosevelt',
  'Donald Trump': 'Donald_Trump',
  'Joe Biden': 'Joe_Biden',
  'Winston Churchill': 'Winston_Churchill',
  'Margaret Thatcher': 'Margaret_Thatcher',
  'Tony Blair': 'Tony_Blair',
  'Charles de Gaulle': 'Charles_de_Gaulle',
  'Emmanuel Macron': 'Emmanuel_Macron',
  'Angela Merkel': 'Angela_Merkel',
  'Otto von Bismarck': 'Otto_von_Bismarck',
  'Vladimir Putin': 'Vladimir_Putin',
  'Mikhail Gorbachev': 'Mikhail_Gorbachev',
  'Vladimir Lenin': 'Vladimir_Lenin',
  'Xi Jinping': 'Xi_Jinping',
  'Mao Zedong': 'Mao_Zedong',
  'Deng Xiaoping': 'Deng_Xiaoping',
  'Narendra Modi': 'Narendra_Modi',
  'Jawaharlal Nehru': 'Jawaharlal_Nehru',
  'Indira Gandhi': 'Indira_Gandhi',
  'A. P. J. Abdul Kalam': 'A._P._J._Abdul_Kalam',
  'Atal Bihari Vajpayee': 'Atal_Bihari_Vajpayee',
  'Ziaur Rahman': 'Ziaur_Rahman',
  'Tajuddin Ahmad': 'Tajuddin_Ahmad',
  'A. K. Fazlul Huq': 'A._K._Fazlul_Huq',
  'Huseyn Shaheed Suhrawardy': 'Huseyn_Shaheed_Suhrawardy',
  'Maulana Abdul Hamid Khan Bhashani': 'Abdul_Hamid_Khan_Bhashani',
  'Muhammad Ali Jinnah': 'Muhammad_Ali_Jinnah',
  'Imran Khan': 'Imran_Khan',
  'Benazir Bhutto': 'Benazir_Bhutto',
  'Zulfikar Ali Bhutto': 'Zulfikar_Ali_Bhutto',
  'Recep Tayyip Erdoğan': 'Recep_Tayyip_Erdoğan',
  'Mustafa Kemal Atatürk': 'Mustafa_Kemal_Atatürk',
  'Lee Kuan Yew': 'Lee_Kuan_Yew',
  'Mahathir Mohamad': 'Mahathir_Mohamad',
  'Justin Trudeau': 'Justin_Trudeau',
  'Pierre Trudeau': 'Pierre_Trudeau',
  'Shinzo Abe': 'Shinzo_Abe',
  'Fidel Castro': 'Fidel_Castro',
  'Luiz Inácio Lula da Silva': 'Luiz_Inácio_Lula_da_Silva',
  'Hugo Chávez': 'Hugo_Chávez',
  'Yasser Arafat': 'Yasser_Arafat',
  'Gamal Abdel Nasser': 'Gamal_Abdel_Nasser',
  'Anwar Sadat': 'Anwar_Sadat',
  'Kwame Nkrumah': 'Kwame_Nkrumah',
  'Jomo Kenyatta': 'Jomo_Kenyatta',
  'Jacinda Ardern': 'Jacinda_Ardern',
  'Silvio Berlusconi': 'Silvio_Berlusconi',
  'King Faisal': 'Faisal_of_Saudi_Arabia'
};

const politicianNames = new Set(Object.keys(wikiOverrides));

function getSlug(name) {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function fetchPhotoBuffer(wikiKey) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiKey)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  let imgUrl = data.thumbnail?.source || data.originalimage?.source;
  if (!imgUrl) throw new Error('No image found in Wikipedia summary');

  // Request 500px thumbnail for clean sharp high quality
  if (imgUrl.includes('/thumb/')) {
    imgUrl = imgUrl.replace(/\/\d+px-/, '/500px-');
  }

  const imgRes = await fetch(imgUrl, {
    headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' }
  });
  if (!imgRes.ok) {
    // Fallback to original thumbnail
    const fallbackUrl = data.thumbnail?.source || data.originalimage?.source;
    const fbRes = await fetch(fallbackUrl, {
      headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' }
    });
    if (!fbRes.ok) throw new Error(`Image download failed: ${imgRes.status}`);
    return Buffer.from(await fbRes.arrayBuffer());
  }

  return Buffer.from(await imgRes.arrayBuffer());
}

async function main() {
  const people = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
  console.log(`Processing people.json (${people.length} stars)...`);

  let countUpdated = 0;
  let countDownloaded = 0;

  for (const person of people) {
    if (politicianNames.has(person.name)) {
      // 1. Assign to distinct category 'politician'
      person.category = 'politician';
      countUpdated++;

      const slug = getSlug(person.name);
      const fileName = `${slug}.jpg`;
      const pubPath = path.join(publicImagesDir, fileName);
      const rootPath = path.join(rootImagesDir, fileName);
      const distPath = path.join(distImagesDir, fileName);

      person.image = `/images/people/${fileName}`;

      // Check if image already exists and has valid size
      if (fs.existsSync(pubPath) && fs.statSync(pubPath).size > 5000) {
        console.log(`[EXISTING] ${person.name} (${(fs.statSync(pubPath).size / 1024).toFixed(1)} KB)`);
        // Ensure synced to root & dist
        const buf = fs.readFileSync(pubPath);
        fs.writeFileSync(rootPath, buf);
        if (fs.existsSync(distImagesDir)) fs.writeFileSync(distPath, buf);
        continue;
      }

      const wikiKey = wikiOverrides[person.name];
      try {
        const buf = await fetchPhotoBuffer(wikiKey);
        fs.writeFileSync(pubPath, buf);
        fs.writeFileSync(rootPath, buf);
        if (fs.existsSync(distImagesDir)) fs.writeFileSync(distPath, buf);
        countDownloaded++;
        console.log(`[DOWNLOADED] ${person.name} -> ${fileName} (${(buf.length / 1024).toFixed(1)} KB)`);
      } catch (err) {
        console.error(`[ERROR] Failed to download for ${person.name}: ${err.message}`);
      }

      // Polite delay
      await new Promise(r => setTimeout(r, 100));
    }
  }

  fs.writeFileSync(peoplePath, JSON.stringify(people, null, 2), 'utf8');
  console.log(`\nDONE: Updated ${countUpdated} people to category 'politician'. Downloaded ${countDownloaded} photos.`);
}

main();
