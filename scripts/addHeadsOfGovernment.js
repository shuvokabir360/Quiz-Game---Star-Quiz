import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const peoplePath = path.join(rootDir, 'src', 'data', 'people.json');
const countriesPath = path.join(rootDir, 'src', 'data', 'countries.json');
const publicImagesDir = path.join(rootDir, 'public', 'images', 'people');
const rootImagesDir = path.join(rootDir, 'images', 'people');
const distImagesDir = path.join(rootDir, 'dist', 'images', 'people');

for (const dir of [publicImagesDir, rootImagesDir, distImagesDir]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const people = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));
const countryMap = new Map(countries.map(c => [c.code, c]));

const govHeadsData = [
  {
    name: 'Sheikh Hasina',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Sheikh_Hasina',
    description: 'Longest-serving Prime Minister in the history of Bangladesh who governed for over two decades'
  },
  {
    name: 'Khaleda Zia',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Khaleda_Zia',
    description: 'First female Prime Minister of Bangladesh and chairperson of the Bangladesh Nationalist Party'
  },
  {
    name: 'Manmohan Singh',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Manmohan_Singh',
    description: '13th Prime Minister of India, renowned economist who spearheaded historic 1991 economic reforms'
  },
  {
    name: 'Lal Bahadur Shastri',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'medium',
    wiki: 'Lal_Bahadur_Shastri',
    description: '2nd Prime Minister of India, beloved statesman celebrated for his inspiring slogan Jai Jawan Jai Kisan'
  },
  {
    name: 'Rajiv Gandhi',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Rajiv_Gandhi',
    description: '6th Prime Minister of India, youngest Indian prime minister who spearheaded modern telecommunications'
  },
  {
    name: 'Boris Johnson',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Boris_Johnson',
    description: 'British Prime Minister who achieved a historic parliamentary majority and finalized Brexit'
  },
  {
    name: 'David Cameron',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'David_Cameron',
    description: 'British Prime Minister from 2010 to 2016 who led the first UK coalition government in modern history'
  },
  {
    name: 'Gordon Brown',
    code: 'GB',
    nationality: 'British',
    difficulty: 'medium',
    wiki: 'Gordon_Brown',
    description: 'British Prime Minister and Chancellor of the Exchequer who led global financial crisis response in 2008'
  },
  {
    name: 'John Major',
    code: 'GB',
    nationality: 'British',
    difficulty: 'medium',
    wiki: 'John_Major',
    description: 'British Prime Minister from 1990 to 1997 who initiated pivotal Northern Ireland peace diplomacy'
  },
  {
    name: 'Harold Wilson',
    code: 'GB',
    nationality: 'British',
    difficulty: 'medium',
    wiki: 'Harold_Wilson',
    description: 'Two-time British Prime Minister of the 1960s and 70s who expanded social modernization and education'
  },
  {
    name: 'Neville Chamberlain',
    code: 'GB',
    nationality: 'British',
    difficulty: 'medium',
    wiki: 'Neville_Chamberlain',
    description: 'British Prime Minister best known for signing the 1938 Munich Agreement prior to World War II'
  },
  {
    name: 'Rishi Sunak',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Rishi_Sunak',
    description: 'First British-Asian Prime Minister of the United Kingdom and former Chancellor of the Exchequer'
  },
  {
    name: 'Keir Starmer',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Keir_Starmer',
    description: 'Prime Minister of the United Kingdom and leader of the Labour Party who assumed office in 2024'
  },
  {
    name: 'Olaf Scholz',
    code: 'DE',
    nationality: 'German',
    difficulty: 'easy',
    wiki: 'Olaf_Scholz',
    description: 'Chancellor of Germany since 2021 who led the historic Zeitenwende foreign policy shift'
  },
  {
    name: 'Helmut Kohl',
    code: 'DE',
    nationality: 'German',
    difficulty: 'medium',
    wiki: 'Helmut_Kohl',
    description: 'Chancellor of Germany who oversaw German reunification and was honorary Citizen of Europe'
  },
  {
    name: 'Konrad Adenauer',
    code: 'DE',
    nationality: 'German',
    difficulty: 'medium',
    wiki: 'Konrad_Adenauer',
    description: 'First Chancellor of post-WWII West Germany who rebuilt the country into a prosperous democracy'
  },
  {
    name: 'Willy Brandt',
    code: 'DE',
    nationality: 'German',
    difficulty: 'medium',
    wiki: 'Willy_Brandt',
    description: 'Chancellor of West Germany and Nobel Peace Prize laureate celebrated for his Ostpolitik reconciliation'
  },
  {
    name: 'François Mitterrand',
    code: 'FR',
    nationality: 'French',
    difficulty: 'medium',
    wiki: 'François_Mitterrand',
    description: 'Longest-serving President of France who fostered European integration and the creation of the Euro'
  },
  {
    name: 'Jacques Chirac',
    code: 'FR',
    nationality: 'French',
    difficulty: 'easy',
    wiki: 'Jacques_Chirac',
    description: 'President and two-time Prime Minister of France who famously opposed the 2003 military invasion of Iraq'
  },
  {
    name: 'Nicolas Sarkozy',
    code: 'FR',
    nationality: 'French',
    difficulty: 'easy',
    wiki: 'Nicolas_Sarkozy',
    description: 'President of France from 2007 to 2012 who mediated the 2008 Russo-Georgian peace ceasefire'
  },
  {
    name: 'François Hollande',
    code: 'FR',
    nationality: 'French',
    difficulty: 'easy',
    wiki: 'François_Hollande',
    description: 'President of France from 2012 to 2017 who hosted the landmark 2015 Paris Climate Agreement'
  },
  {
    name: 'Dmitry Medvedev',
    code: 'RU',
    nationality: 'Russian',
    difficulty: 'easy',
    wiki: 'Dmitry_Medvedev',
    description: 'Russian political leader who served as President (2008–2012) and Prime Minister of Russia'
  },
  {
    name: 'Boris Yeltsin',
    code: 'RU',
    nationality: 'Russian',
    difficulty: 'medium',
    wiki: 'Boris_Yeltsin',
    description: 'First President of the Russian Federation following the dissolution of the Soviet Union in 1991'
  },
  {
    name: 'Nikita Khrushchev',
    code: 'RU',
    nationality: 'Russian',
    difficulty: 'medium',
    wiki: 'Nikita_Khrushchev',
    description: 'Leader of the Soviet Union during the Cold War, Cuban Missile Crisis, and dawn of the Space Race'
  },
  {
    name: 'Joseph Stalin',
    code: 'RU',
    nationality: 'Russian',
    difficulty: 'easy',
    wiki: 'Joseph_Stalin',
    description: 'General Secretary of the Communist Party who led the Soviet Union to victory in World War II'
  },
  {
    name: 'Zhou Enlai',
    code: 'CN',
    nationality: 'Chinese',
    difficulty: 'medium',
    wiki: 'Zhou_Enlai',
    description: 'First Premier of the People Republic of China and master diplomat who facilitated opening to the West'
  },
  {
    name: 'Wen Jiabao',
    code: 'CN',
    nationality: 'Chinese',
    difficulty: 'medium',
    wiki: 'Wen_Jiabao',
    description: 'Premier of the People Republic of China from 2003 to 2013 during a decade of unprecedented growth'
  },
  {
    name: 'Li Keqiang',
    code: 'CN',
    nationality: 'Chinese',
    difficulty: 'medium',
    wiki: 'Li_Keqiang',
    description: 'Premier of the People Republic of China from 2013 to 2023 who guided national modernization policies'
  },
  {
    name: 'Shigeru Yoshida',
    code: 'JP',
    nationality: 'Japanese',
    difficulty: 'medium',
    wiki: 'Shigeru_Yoshida',
    description: 'Key post-war Prime Minister of Japan who formulated the Yoshida Doctrine focusing on economic recovery'
  },
  {
    name: 'Junichiro Koizumi',
    code: 'JP',
    nationality: 'Japanese',
    difficulty: 'easy',
    wiki: 'Junichiro_Koizumi',
    description: 'Charismatic Prime Minister of Japan from 2001 to 2006 who implemented landmark postal and fiscal reforms'
  },
  {
    name: 'Fumio Kishida',
    code: 'JP',
    nationality: 'Japanese',
    difficulty: 'easy',
    wiki: 'Fumio_Kishida',
    description: 'Prime Minister of Japan from 2021 to 2024 who successfully hosted the 49th G7 Summit in Hiroshima'
  },
  {
    name: 'Nawaz Sharif',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Nawaz_Sharif',
    description: 'Three-time Prime Minister of Pakistan and prominent political leader of the Pakistan Muslim League'
  },
  {
    name: 'Shehbaz Sharif',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Shehbaz_Sharif',
    description: 'Prime Minister of Pakistan and veteran administrative leader celebrated for rapid infrastructure projects'
  },
  {
    name: 'Liaquat Ali Khan',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'medium',
    wiki: 'Liaquat_Ali_Khan',
    description: 'First Prime Minister of Pakistan and right-hand statesman to Quaid-e-Azam Muhammad Ali Jinnah'
  },
  {
    name: 'Anwar Ibrahim',
    code: 'MY',
    nationality: 'Malaysian',
    difficulty: 'easy',
    wiki: 'Anwar_Ibrahim',
    description: '10th Prime Minister of Malaysia and long-time reformist leader behind the Madani national vision'
  },
  {
    name: 'Lawrence Wong',
    code: 'SG',
    nationality: 'Singaporean',
    difficulty: 'easy',
    wiki: 'Lawrence_Wong',
    description: '4th Prime Minister of Singapore who previously guided national crisis task forces as Finance Minister'
  },
  {
    name: 'Goh Chok Tong',
    code: 'SG',
    nationality: 'Singaporean',
    difficulty: 'medium',
    wiki: 'Goh_Chok_Tong',
    description: '2nd Prime Minister of Singapore who successfully led the city-state for 14 transformative years'
  },
  {
    name: 'Anthony Albanese',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Anthony_Albanese',
    description: '31st Prime Minister of Australia and leader of the Australian Labor Party who took office in 2022'
  },
  {
    name: 'John Howard',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'medium',
    wiki: 'John_Howard',
    description: '25th Prime Minister of Australia, second longest-serving prime minister in Australian national history'
  },
  {
    name: 'Bob Hawke',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'medium',
    wiki: 'Bob_Hawke',
    description: '23rd Prime Minister of Australia who floated the national currency and established universal healthcare'
  },
  {
    name: 'Stephen Harper',
    code: 'CA',
    nationality: 'Canadian',
    difficulty: 'easy',
    wiki: 'Stephen_Harper',
    description: '22nd Prime Minister of Canada who led the nation for nearly a decade and founded the modern Conservative Party'
  },
  {
    name: 'Jean Chrétien',
    code: 'CA',
    nationality: 'Canadian',
    difficulty: 'medium',
    wiki: 'Jean_Chrétien',
    description: '20th Prime Minister of Canada who eliminated federal budget deficits and expanded trade partnerships'
  },
  {
    name: 'Giorgia Meloni',
    code: 'IT',
    nationality: 'Italian',
    difficulty: 'easy',
    wiki: 'Giorgia_Meloni',
    description: 'First female Prime Minister in Italian history and president of the Council of Ministers of Italy'
  },
  {
    name: 'Mario Draghi',
    code: 'IT',
    nationality: 'Italian',
    difficulty: 'medium',
    wiki: 'Mario_Draghi',
    description: 'Prime Minister of Italy and former President of the European Central Bank renowned for saving the Euro'
  },
  {
    name: 'Pedro Sánchez',
    code: 'ES',
    nationality: 'Spanish',
    difficulty: 'easy',
    wiki: 'Pedro_Sánchez',
    description: 'Prime Minister of Spain since 2018 and Secretary-General of the Spanish Socialist Workers Party'
  },
  {
    name: 'Mariano Rajoy',
    code: 'ES',
    nationality: 'Spanish',
    difficulty: 'medium',
    wiki: 'Mariano_Rajoy',
    description: 'Prime Minister of Spain from 2011 to 2018 who steered the Spanish economy through the European debt crisis'
  },
  {
    name: 'Mark Rutte',
    code: 'NL',
    nationality: 'Dutch',
    difficulty: 'easy',
    wiki: 'Mark_Rutte',
    description: 'Longest-serving Prime Minister in Dutch history who subsequently assumed the office of NATO Secretary General'
  },
  {
    name: 'António Guterres',
    code: 'PT',
    nationality: 'Portuguese',
    difficulty: 'easy',
    wiki: 'António_Guterres',
    description: 'Prime Minister of Portugal from 1995 to 2002 and current 9th Secretary-General of the United Nations'
  },
  {
    name: 'Donald Tusk',
    code: 'PL',
    nationality: 'Polish',
    difficulty: 'easy',
    wiki: 'Donald_Tusk',
    description: 'Prime Minister of Poland and former President of the European Council leading central European diplomacy'
  },
  {
    name: 'Jens Stoltenberg',
    code: 'NO',
    nationality: 'Norwegian',
    difficulty: 'easy',
    wiki: 'Jens_Stoltenberg',
    description: 'Two-time Prime Minister of Norway and long-serving Secretary General of NATO during a historic era'
  }
];

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
  const res = await fetch(url, { headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  let imgUrl = data.thumbnail?.source || data.originalimage?.source;
  if (!imgUrl) throw new Error('No image in Wikipedia response');

  if (imgUrl.includes('/thumb/')) {
    imgUrl = imgUrl.replace(/\/\d+px-/, '/500px-');
  }

  let imgRes = await fetch(imgUrl, { headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' } });
  if (!imgRes.ok) {
    const fb = data.thumbnail?.source || data.originalimage?.source;
    imgRes = await fetch(fb, { headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' } });
    if (!imgRes.ok) throw new Error('Download failed');
  }

  return Buffer.from(await imgRes.arrayBuffer());
}

async function main() {
  console.log(`Starting processing 50 heads of government...`);
  let nextId = 314;
  const newGovHeads = [];

  for (const item of govHeadsData) {
    const c = countryMap.get(item.code);
    if (!c) throw new Error(`Missing country: ${item.code}`);

    const slug = getSlug(item.name);
    const fileName = `${slug}.jpg`;
    const pubPath = path.join(publicImagesDir, fileName);
    const rootPath = path.join(rootImagesDir, fileName);
    const distPath = path.join(distImagesDir, fileName);

    // Download image if not exists
    if (!fs.existsSync(pubPath) || fs.statSync(pubPath).size < 5000) {
      try {
        const buf = await fetchPhotoBuffer(item.wiki);
        fs.writeFileSync(pubPath, buf);
        fs.writeFileSync(rootPath, buf);
        if (fs.existsSync(distImagesDir)) fs.writeFileSync(distPath, buf);
        console.log(`[DOWNLOADED] ${item.name} (${(buf.length / 1024).toFixed(1)} KB) -> ${fileName}`);
      } catch (err) {
        console.error(`[ERROR] ${item.name}: ${err.message}`);
      }
      await new Promise(r => setTimeout(r, 120));
    } else {
      console.log(`[EXISTING] ${item.name} -> ${fileName}`);
      const buf = fs.readFileSync(pubPath);
      fs.writeFileSync(rootPath, buf);
      if (fs.existsSync(distImagesDir)) fs.writeFileSync(distPath, buf);
    }

    const id = `star-${String(nextId++).padStart(3, '0')}`;
    newGovHeads.push({
      id,
      name: item.name,
      country: c.name,
      countryCode: c.code,
      nationality: item.nationality,
      category: 'gov_head',
      image: `/images/people/${fileName}`,
      flag: c.flag,
      capital: c.capital,
      difficulty: item.difficulty,
      description: item.description,
      imageCredit: 'Curated',
      imageLicense: 'Public Domain',
      isActive: true
    });
  }

  const combined = [...people, ...newGovHeads];

  // Sanity check
  const idSet = new Set();
  const nameSet = new Set();
  for (const p of combined) {
    if (idSet.has(p.id)) throw new Error(`Duplicate id: ${p.id}`);
    idSet.add(p.id);
    const lower = p.name.trim().toLowerCase();
    if (nameSet.has(lower)) throw new Error(`Duplicate name: ${p.name}`);
    nameSet.add(lower);
  }

  fs.writeFileSync(peoplePath, JSON.stringify(combined, null, 2), 'utf8');
  console.log(`\nSUCCESS: Added 50 heads of government! Total stars now: ${combined.length}`);
}

main();
