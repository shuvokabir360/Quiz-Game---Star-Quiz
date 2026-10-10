import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const peoplePath = path.join(__dirname, '../src/data/people.json');
const countriesPath = path.join(__dirname, '../src/data/countries.json');

const people = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));
const countryMap = new Map(countries.map(c => [c.code, c]));

const politiciansData = [
  // United States
  {
    name: 'George Washington',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    description: 'First President of the United States and revolutionary commander who led the nation to independence'
  },
  {
    name: 'John F. Kennedy',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    description: '35th US President remembered for his charismatic leadership, Cuban Missile Crisis management, and Apollo space program'
  },
  {
    name: 'Franklin D. Roosevelt',
    code: 'US',
    nationality: 'American',
    difficulty: 'medium',
    description: '32nd US President who guided America through the Great Depression with the New Deal and World War II'
  },
  {
    name: 'Donald Trump',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    description: '45th and 47th President of the United States, prominent businessman, and influential political leader'
  },
  {
    name: 'Joe Biden',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    description: '46th President of the United States and long-serving statesman who previously served as Vice President'
  },

  // United Kingdom
  {
    name: 'Winston Churchill',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    description: 'Iconic British Prime Minister who led the United Kingdom to victory in World War II with resolute oratory'
  },
  {
    name: 'Margaret Thatcher',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    description: 'First female Prime Minister of the United Kingdom, renowned worldwide as the formidable Iron Lady'
  },
  {
    name: 'Tony Blair',
    code: 'GB',
    nationality: 'British',
    difficulty: 'medium',
    description: 'Long-serving British Prime Minister who modernized the Labour Party and helped broker the Good Friday Peace Agreement'
  },

  // France
  {
    name: 'Charles de Gaulle',
    code: 'FR',
    nationality: 'French',
    difficulty: 'medium',
    description: 'Revered French general who led Free France during WWII and founded the Fifth Republic as President'
  },
  {
    name: 'Emmanuel Macron',
    code: 'FR',
    nationality: 'French',
    difficulty: 'easy',
    description: 'President of France and youngest head of state in modern French history, champion of European integration'
  },

  // Germany
  {
    name: 'Angela Merkel',
    code: 'DE',
    nationality: 'German',
    difficulty: 'easy',
    description: 'Chancellor of Germany from 2005 to 2021, widely regarded as the de facto leader of the European Union'
  },
  {
    name: 'Otto von Bismarck',
    code: 'DE',
    nationality: 'German',
    difficulty: 'medium',
    description: 'Master 19th-century statesman and Iron Chancellor who unified Germany into a dominant European power'
  },

  // Russia
  {
    name: 'Vladimir Putin',
    code: 'RU',
    nationality: 'Russian',
    difficulty: 'easy',
    description: 'Longtime President and defining political leader of the Russian Federation in the 21st century'
  },
  {
    name: 'Mikhail Gorbachev',
    code: 'RU',
    nationality: 'Russian',
    difficulty: 'medium',
    description: 'Final leader of the Soviet Union whose reforms of Glasnost and Perestroika brought an end to the Cold War'
  },
  {
    name: 'Vladimir Lenin',
    code: 'RU',
    nationality: 'Russian',
    difficulty: 'medium',
    description: 'Bolshevik revolutionary, political theorist, and founding head of government of Soviet Russia'
  },

  // China
  {
    name: 'Xi Jinping',
    code: 'CN',
    nationality: 'Chinese',
    difficulty: 'easy',
    description: 'General Secretary of the Chinese Communist Party and President of China, driving the Belt and Road Initiative'
  },
  {
    name: 'Mao Zedong',
    code: 'CN',
    nationality: 'Chinese',
    difficulty: 'easy',
    description: 'Founding father of the People Republic of China and pivotal figure in 20th-century world history'
  },
  {
    name: 'Deng Xiaoping',
    code: 'CN',
    nationality: 'Chinese',
    difficulty: 'medium',
    description: 'Visionary paramount leader who transformed China through bold economic opening and market-oriented reforms'
  },

  // India
  {
    name: 'Narendra Modi',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    description: '14th Prime Minister of India, prominent world leader who has served consecutive terms since 2014'
  },
  {
    name: 'Jawaharlal Nehru',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    description: 'First Prime Minister of independent India, non-aligned movement architect, and builder of modern democratic institutions'
  },
  {
    name: 'Indira Gandhi',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    description: 'First and only female Prime Minister of India, known for her decisive governance and strong geopolitical stance'
  },
  {
    name: 'A. P. J. Abdul Kalam',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    description: '11th President of India, renowned aerospace scientist fondly celebrated across the world as the People President'
  },
  {
    name: 'Atal Bihari Vajpayee',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'medium',
    description: 'Esteemed poet and three-time Prime Minister of India who championed landmark economic and infrastructure development'
  },

  // Bangladesh
  {
    name: 'Ziaur Rahman',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    description: 'President of Bangladesh, Sector Commander in the 1971 Liberation War, and founder of the Bangladesh Nationalist Party'
  },
  {
    name: 'Tajuddin Ahmad',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    description: 'First Prime Minister of Bangladesh who ably directed the wartime Mujibnagar government during the 1971 Liberation War'
  },
  {
    name: 'A. K. Fazlul Huq',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'medium',
    description: 'Legendary political giant known as Sher-e-Bangla (Tiger of Bengal) and prime sponsor of the historic 1940 Lahore Resolution'
  },
  {
    name: 'Huseyn Shaheed Suhrawardy',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'medium',
    description: 'Eminent Bengali statesman, celebrated lawyer, mentor of democracy, and 5th Prime Minister of Pakistan'
  },
  {
    name: 'Maulana Abdul Hamid Khan Bhashani',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'medium',
    description: 'Inspirational grassroots political visionary known as Mazlum Jananeta (Leader of the Oppressed) and pioneer of mass rights'
  },

  // Pakistan
  {
    name: 'Muhammad Ali Jinnah',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    description: 'Revered founder of Pakistan and lawyer-statesman honored universally as Quaid-e-Azam (Great Leader)'
  },
  {
    name: 'Imran Khan',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    description: '22nd Prime Minister of Pakistan, founder of Tehreek-e-Insaf, and legendary 1992 Cricket World Cup-winning captain'
  },
  {
    name: 'Benazir Bhutto',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    description: 'First woman democratically elected to lead a Muslim-majority nation, serving two terms as Prime Minister of Pakistan'
  },
  {
    name: 'Zulfikar Ali Bhutto',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'medium',
    description: 'Charismatic 9th Prime Minister of Pakistan, founder of the Pakistan Peoples Party, and architect of the 1973 Constitution'
  },

  // Turkey
  {
    name: 'Recep Tayyip Erdoğan',
    code: 'TR',
    nationality: 'Turkish',
    difficulty: 'easy',
    description: 'Influential Turkish politician who served as Prime Minister and has served as President of Turkey since 2014'
  },
  {
    name: 'Mustafa Kemal Atatürk',
    code: 'TR',
    nationality: 'Turkish',
    difficulty: 'easy',
    description: 'Field marshal and founding father of modern Turkey who established a progressive secular republic'
  },

  // Singapore
  {
    name: 'Lee Kuan Yew',
    code: 'SG',
    nationality: 'Singaporean',
    difficulty: 'easy',
    description: 'Founding father of modern Singapore who transformed an island resource-scarce nation into a first-world metropolis'
  },

  // Malaysia
  {
    name: 'Mahathir Mohamad',
    code: 'MY',
    nationality: 'Malaysian',
    difficulty: 'easy',
    description: 'Fourth and seventh Prime Minister of Malaysia whose vision transformed Malaysia into a modern industrialized powerhouse'
  },

  // Canada
  {
    name: 'Justin Trudeau',
    code: 'CA',
    nationality: 'Canadian',
    difficulty: 'easy',
    description: '23rd Prime Minister of Canada and charismatic leader of the Liberal Party who took office in 2015'
  },
  {
    name: 'Pierre Trudeau',
    code: 'CA',
    nationality: 'Canadian',
    difficulty: 'medium',
    description: '15th Prime Minister of Canada who established the Canadian Charter of Rights and Freedoms and Official Multiculturalism'
  },

  // Japan
  {
    name: 'Shinzo Abe',
    code: 'JP',
    nationality: 'Japanese',
    difficulty: 'easy',
    description: 'Longest-serving Prime Minister in Japanese history known worldwide for Abenomics economic reforms and global diplomacy'
  },

  // Cuba
  {
    name: 'Fidel Castro',
    code: 'CU',
    nationality: 'Cuban',
    difficulty: 'easy',
    description: 'Revolutionary leader and President of Cuba who governed the Caribbean island nation for nearly five decades'
  },

  // Brazil
  {
    name: 'Luiz Inácio Lula da Silva',
    code: 'BR',
    nationality: 'Brazilian',
    difficulty: 'easy',
    description: 'President of Brazil and revered trade unionist who spearheaded landmark anti-poverty social welfare programs'
  },

  // Venezuela
  {
    name: 'Hugo Chávez',
    code: 'VE',
    nationality: 'Venezuelan',
    difficulty: 'easy',
    description: 'President of Venezuela who pioneered the Bolivarian Revolution and championed socialist integration across Latin America'
  },

  // Palestine
  {
    name: 'Yasser Arafat',
    code: 'PS',
    nationality: 'Palestinian',
    difficulty: 'easy',
    description: 'Chairman of the Palestine Liberation Organization, Nobel Peace Prize laureate, and historic symbol of Palestinian self-determination'
  },

  // Egypt
  {
    name: 'Gamal Abdel Nasser',
    code: 'EG',
    nationality: 'Egyptian',
    difficulty: 'medium',
    description: 'Second President of Egypt who nationalized the Suez Canal and became the foremost champion of Pan-Arab nationalism'
  },
  {
    name: 'Anwar Sadat',
    code: 'EG',
    nationality: 'Egyptian',
    difficulty: 'medium',
    description: 'Third President of Egypt and Nobel Peace Prize laureate who signed the historic Camp David Peace Accords'
  },

  // Ghana
  {
    name: 'Kwame Nkrumah',
    code: 'GH',
    nationality: 'Ghanaian',
    difficulty: 'medium',
    description: 'First President of Ghana who led the Gold Coast to independence and served as an outspoken leader of Pan-African unity'
  },

  // Kenya
  {
    name: 'Jomo Kenyatta',
    code: 'KE',
    nationality: 'Kenyan',
    difficulty: 'medium',
    description: 'Anti-colonial activist and first President of Kenya, revered as the founding father of the modern Kenyan nation'
  },

  // New Zealand
  {
    name: 'Jacinda Ardern',
    code: 'NZ',
    nationality: 'New Zealander',
    difficulty: 'easy',
    description: '40th Prime Minister of New Zealand acclaimed globally for empathetic leadership during major national crises'
  },

  // Italy
  {
    name: 'Silvio Berlusconi',
    code: 'IT',
    nationality: 'Italian',
    difficulty: 'medium',
    description: 'Four-time Prime Minister of Italy, influential media tycoon, and defining force in modern Italian politics'
  },

  // Saudi Arabia
  {
    name: 'King Faisal',
    code: 'SA',
    nationality: 'Saudi',
    difficulty: 'medium',
    description: 'King of Saudi Arabia whose visionary leadership modernized the kingdom and guided the Islamic solidarity movement'
  }
];

let nextNum = 264;
const newPeople = politiciansData.map(item => {
  const c = countryMap.get(item.code);
  if (!c) throw new Error(`Missing country: ${item.code}`);
  const slug = item.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const id = `star-${String(nextNum++).padStart(3, '0')}`;
  return {
    id,
    name: item.name,
    country: c.name,
    countryCode: c.code,
    nationality: item.nationality,
    category: 'leader',
    image: `/images/people/${slug}.jpg`,
    flag: c.flag,
    capital: c.capital,
    difficulty: item.difficulty,
    description: item.description,
    imageCredit: 'Curated',
    imageLicense: 'Public Domain',
    isActive: true
  };
});

console.log(`Generated ${newPeople.length} politicians. First ID: ${newPeople[0].id}, Last ID: ${newPeople[newPeople.length - 1].id}`);

// Combine
const combined = [...people, ...newPeople];

// Sanity check
const idSet = new Set();
const nameSet = new Set();
for (const p of combined) {
  if (idSet.has(p.id)) throw new Error(`Duplicate id: ${p.id}`);
  idSet.add(p.id);
  const lowerName = p.name.trim().toLowerCase();
  if (nameSet.has(lowerName)) throw new Error(`Duplicate name: ${p.name}`);
  nameSet.add(lowerName);
}

fs.writeFileSync(peoplePath, JSON.stringify(combined, null, 2), 'utf8');
console.log(`Successfully updated people.json! Total stars: ${combined.length}`);
