import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const peoplePath = path.join(rootDir, 'src', 'data', 'people.json');
const imagesDir = path.join(rootDir, 'public', 'images', 'people');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const people = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

const wikiOverrides = {
  'Cristiano Ronaldo': 'Cristiano_Ronaldo',
  'Lionel Messi': 'Lionel_Messi',
  'Kylian Mbappé': 'Kylian_Mbappé',
  'Erling Haaland': 'Erling_Haaland',
  'Neymar Jr': 'Neymar',
  'Luka Modrić': 'Luka_Modrić',
  'Robert Lewandowski': 'Robert_Lewandowski',
  'Mohamed Salah': 'Mohamed_Salah',
  'Kevin De Bruyne': 'Kevin_De_Bruyne',
  'Karim Benzema': 'Karim_Benzema',
  'Harry Kane': 'Harry_Kane',
  'Vinicius Jr': 'Vinícius_Júnior',
  'Jude Bellingham': 'Jude_Bellingham',
  'Zinedine Zidane': 'Zinedine_Zidane',
  'Pelé': 'Pelé',
  'Diego Maradona': 'Diego_Maradona',
  'Ronaldinho': 'Ronaldinho',
  'David Beckham': 'David_Beckham',
  'Gianluigi Buffon': 'Gianluigi_Buffon',
  'Manuel Neuer': 'Manuel_Neuer',
  'Son Heung-min': 'Son_Heung-min',
  'Luis Suárez': 'Luis_Suárez_(Uruguayan_footballer)',
  'Virgil van Dijk': 'Virgil_van_Dijk',
  'Toni Kroos': 'Toni_Kroos',
  'Andres Iniesta': 'Andrés_Iniesta',
  'Sadio Mané': 'Sadio_Mané',
  'Michael Jackson': 'Michael_Jackson',
  'Taylor Swift': 'Taylor_Swift',
  'Justin Bieber': 'Justin_Bieber',
  'Ed Sheeran': 'Ed_Sheeran',
  'Beyoncé': 'Beyoncé',
  'Eminem': 'Eminem',
  'Rihanna': 'Rihanna',
  'Shakira': 'Shakira',
  'Freddie Mercury': 'Freddie_Mercury',
  'Adele': 'Adele',
  'Drake': 'Drake_(musician)',
  'Bruno Mars': 'Bruno_Mars',
  'The Weeknd': 'The_Weeknd',
  'Dua Lipa': 'Dua_Lipa',
  'Arijit Singh': 'Arijit_Singh',
  'Shreya Ghoshal': 'Shreya_Ghoshal',
  'Lata Mangeshkar': 'Lata_Mangeshkar',
  'James': 'James_(musician)',
  'Ayub Bachchu': 'Ayub_Bachchu',
  'Runa Laila': 'Runa_Laila',
  'Bob Marley': 'Bob_Marley',
  'Elvis Presley': 'Elvis_Presley',
  'Billie Eilish': 'Billie_Eilish',
  'Atif Aslam': 'Atif_Aslam',
  'Nusrat Fateh Ali Khan': 'Nusrat_Fateh_Ali_Khan',
  'Jungkook': 'Jungkook',
  'Celine Dion': 'Celine_Dion',
  'Leonardo DiCaprio': 'Leonardo_DiCaprio',
  'Tom Cruise': 'Tom_Cruise',
  'Shah Rukh Khan': 'Shah_Rukh_Khan',
  'Amitabh Bachchan': 'Amitabh_Bachchan',
  'Robert Downey Jr': 'Robert_Downey_Jr.',
  'Cillian Murphy': 'Cillian_Murphy',
  'Brad Pitt': 'Brad_Pitt',
  'Johnny Depp': 'Johnny_Depp',
  'Keanu Reeves': 'Keanu_Reeves',
  'Will Smith': 'Will_Smith',
  'Jackie Chan': 'Jackie_Chan',
  'Emma Watson': 'Emma_Watson',
  'Angelina Jolie': 'Angelina_Jolie',
  'Scarlett Johansson': 'Scarlett_Johansson',
  'Chris Hemsworth': 'Chris_Hemsworth',
  'Arnold Schwarzenegger': 'Arnold_Schwarzenegger',
  'Rowan Atkinson': 'Rowan_Atkinson',
  'Virat Kohli': 'Virat_Kohli',
  'Sachin Tendulkar': 'Sachin_Tendulkar',
  'Shakib Al Hasan': 'Shakib_Al_Hasan',
  'Novak Djokovic': 'Novak_Djokovic',
  'Rafael Nadal': 'Rafael_Nadal',
  'Roger Federer': 'Roger_Federer',
  'Serena Williams': 'Serena_Williams',
  'Usain Bolt': 'Usain_Bolt',
  'Michael Jordan': 'Michael_Jordan',
  'LeBron James': 'LeBron_James',
  'Lewis Hamilton': 'Lewis_Hamilton',
  'Tiger Woods': 'Tiger_Woods',
  'MrBeast': 'MrBeast',
  'PewDiePie': 'PewDiePie',
  'Khaby Lame': 'Khaby_Lame',
  'Barack Obama': 'Barack_Obama',
  'Narendra Modi': 'Narendra_Modi',
  'Angela Merkel': 'Angela_Merkel',
  'Nelson Mandela': 'Nelson_Mandela',
  'Queen Elizabeth II': 'Elizabeth_II',
  'Albert Einstein': 'Albert_Einstein',
  'Marie Curie': 'Marie_Curie',
  'Leonardo da Vinci': 'Leonardo_da_Vinci',
  'Mahatma Gandhi': 'Mahatma_Gandhi',
  'Bangabandhu Sheikh Mujibur Rahman': 'Sheikh_Mujibur_Rahman',
  'Christian Bale': 'Christian_Bale',
  'Dwayne Johnson': 'Dwayne_Johnson',
  'Al Pacino': 'Al_Pacino',
  'Robert De Niro': 'Robert_De_Niro',
  'Morgan Freeman': 'Morgan_Freeman',
  'Tom Hanks': 'Tom_Hanks',
  'Denzel Washington': 'Denzel_Washington',
  'Hugh Jackman': 'Hugh_Jackman',
  'Henry Cavill': 'Henry_Cavill',
  'Heath Ledger': 'Heath_Ledger',
  'Ryan Reynolds': 'Ryan_Reynolds',
  'Chris Evans': 'Chris_Evans_(actor)',
  'Aamir Khan': 'Aamir_Khan',
  'Salman Khan': 'Salman_Khan',
  'Hrithik Roshan': 'Hrithik_Roshan',
  'Prabhas': 'Prabhas',
  'Rajinikanth': 'Rajinikanth',
  'Shakib Khan': 'Shakib_Khan',
  'Allu Arjun': 'Allu_Arjun',
  'Daniel Craig': 'Daniel_Craig',
  'Marilyn Monroe': 'Marilyn_Monroe',
  'Audrey Hepburn': 'Audrey_Hepburn',
  'Meryl Streep': 'Meryl_Streep',
  'Natalie Portman': 'Natalie_Portman',
  'Jennifer Lawrence': 'Jennifer_Lawrence',
  'Anne Hathaway': 'Anne_Hathaway',
  'Kate Winslet': 'Kate_Winslet',
  'Margot Robbie': 'Margot_Robbie',
  'Penélope Cruz': 'Penélope_Cruz',
  'Zendaya': 'Zendaya',
  'Deepika Padukone': 'Deepika_Padukone',
  'Priyanka Chopra': 'Priyanka_Chopra',
  'Katrina Kaif': 'Katrina_Kaif',
  'Kareena Kapoor': 'Kareena_Kapoor',
  'Aishwarya Rai': 'Aishwarya_Rai',
  'Alia Bhatt': 'Alia_Bhatt',
  'Samantha Ruth Prabhu': 'Samantha_Ruth_Prabhu',
  'Rashmika Mandanna': 'Rashmika_Mandanna',
  'Pori Moni': 'Porimoni',
  'Isaac Newton': 'Isaac_Newton',
  'Nikola Tesla': 'Nikola_Tesla',
  'Marie Curie': 'Marie_Curie',
  'Galileo Galilei': 'Galileo_Galilei',
  'Charles Darwin': 'Charles_Darwin',
  'Stephen Hawking': 'Stephen_Hawking',
  'Thomas Edison': 'Thomas_Edison',
  'Louis Pasteur': 'Louis_Pasteur',
  'Michael Faraday': 'Michael_Faraday',
  'Alan Turing': 'Alan_Turing',
  'Johannes Kepler': 'Johannes_Kepler',
  'Max Planck': 'Max_Planck',
  'Alfred Nobel': 'Alfred_Nobel',
  'Archimedes': 'Archimedes',
  'Anton van Leeuwenhoek': 'Antonie_van_Leeuwenhoek',
  'Alexander Graham Bell': 'Alexander_Graham_Bell',
  'C. V. Raman': 'C._V._Raman',
  'Jagadish Chandra Bose': 'Jagadish_Chandra_Bose',
  'Satyendra Nath Bose': 'Satyendra_Nath_Bose',
  'Jamal Nazrul Islam': 'Jamal_Nazrul_Islam',
  'Rabindranath Tagore': 'Rabindranath_Tagore',
  'Kazi Nazrul Islam': 'Kazi_Nazrul_Islam',
  'Jibanananda Das': 'Jibanananda_Das',
  'Jasimuddin': 'Jasimuddin',
  'Michael Madhusudan Dutt': 'Michael_Madhusudan_Dutt',
  'Begum Rokeya': 'Begum_Rokeya',
  'Sufia Kamal': 'Sufia_Kamal',
  'Shamsur Rahman': 'Shamsur_Rahman_(poet)',
  'Al Mahmud': 'Al_Mahmud',
  'Mirza Ghalib': 'Ghalib',
  'Allama Iqbal': 'Muhammad_Iqbal',
  'Sarojini Naidu': 'Sarojini_Naidu',
  'William Shakespeare': 'William_Shakespeare',
  'John Keats': 'John_Keats',
  'William Wordsworth': 'William_Wordsworth',
  'Percy Bysshe Shelley': 'Percy_Bysshe_Shelley',
  'Lord Byron': 'Lord_Byron',
  'John Milton': 'John_Milton',
  'William Blake': 'William_Blake',
  'T. S. Eliot': 'T._S._Eliot',
  'Robert Frost': 'Robert_Frost',
  'Emily Dickinson': 'Emily_Dickinson',
  'Walt Whitman': 'Walt_Whitman',
  'Edgar Allan Poe': 'Edgar_Allan_Poe',
  'Maya Angelou': 'Maya_Angelou',
  'Sylvia Plath': 'Sylvia_Plath',
  'Dante Alighieri': 'Dante_Alighieri',
  'Homer': 'Homer',
  'Johann Wolfgang von Goethe': 'Johann_Wolfgang_von_Goethe',
  'Victor Hugo': 'Victor_Hugo',
  'Kalidasa': 'Kalidasa',
  'Rumi': 'Rumi',
  'Hafez': 'Hafez',
  'Omar Khayyam': 'Omar_Khayyam',
  'Saadi Shirazi': 'Saadi_Shirazi',
  'Ferdowsi': 'Ferdowsi',
  'Virgil': 'Virgil',
  'Ovid': 'Ovid',
  'Horace': 'Horace',
  'Sappho': 'Sappho',
  'Hesiod': 'Hesiod',
  'Li Bai': 'Li_Bai',
  'Du Fu': 'Du_Fu',
  'Matsuo Basho': 'Matsuo_Bash%C5%8D',
  'Kabir': 'Kabir',
  'Amir Khusrau': 'Amir_Khusrau',
  'Geoffrey Chaucer': 'Geoffrey_Chaucer',
  'Mirabai': 'Mirabai',
  'Jayadeva': 'Jayadeva',
  'Chandidas': 'Chandidas'
};

function getSlug(name) {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function downloadPhoto(person) {
  const slug = getSlug(person.name);
  const fileName = `${slug}.jpg`;
  const filePath = path.join(imagesDir, fileName);

  const wikiKey = wikiOverrides[person.name] || person.name.replace(/\s+/g, '_');
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiKey)}`;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' }
    });
    if (!res.ok) {
      console.warn(`[SKIP] HTTP ${res.status} for ${person.name}`);
      return false;
    }

    const data = await res.json();
    let imgUrl = data.thumbnail?.source || data.originalimage?.source;
    if (!imgUrl) {
      console.warn(`[SKIP] No image found for ${person.name}`);
      return false;
    }

    // Prefer high-res image (500px instead of small thumbnail if possible)
    if (imgUrl.includes('/thumb/')) {
      imgUrl = imgUrl.replace(/\/\d+px-/, '/500px-');
    }

    const imgRes = await fetch(imgUrl, {
      headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' }
    });
    if (!imgRes.ok) {
      console.warn(`[FAIL] Image download failed for ${person.name}`);
      return false;
    }

    const buffer = Buffer.from(await imgRes.arrayBuffer());
    if (buffer.length < 1500) {
      console.warn(`[FAIL] Image too small (${buffer.length}b) for ${person.name}`);
      return false;
    }

    fs.writeFileSync(filePath, buffer);
    person.image = `/images/people/${fileName}`;
    console.log(`[OK] Saved ${person.name} (${(buffer.length / 1024).toFixed(1)} KB) -> ${fileName}`);
    return true;
  } catch (err) {
    console.error(`[ERROR] ${person.name}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`Starting photo download for ${people.length} celebrities...`);
  let successCount = 0;

  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    const ok = await downloadPhoto(person);
    if (ok) successCount++;
    // Small delay to be polite to Wikipedia API
    await new Promise(r => setTimeout(r, 120));
  }

  fs.writeFileSync(peoplePath, JSON.stringify(people, null, 2), 'utf8');
  console.log(`\nCOMPLETED: ${successCount} / ${people.length} photos downloaded and added to people.json!`);
}

main();
