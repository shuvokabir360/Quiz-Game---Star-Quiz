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

// Reclassify existing female stars to category 'actress'
const existingActressesToReclassify = [
  'Emma Watson',
  'Angelina Jolie',
  'Scarlett Johansson',
  'Marilyn Monroe',
  'Audrey Hepburn',
  'Meryl Streep',
  'Natalie Portman',
  'Jennifer Lawrence',
  'Anne Hathaway',
  'Kate Winslet',
  'Margot Robbie',
  'Penélope Cruz',
  'Zendaya',
  'Deepika Padukone',
  'Priyanka Chopra',
  'Katrina Kaif',
  'Kareena Kapoor',
  'Aishwarya Rai',
  'Alia Bhatt',
  'Samantha Ruth Prabhu',
  'Rashmika Mandanna',
  'Joya Ahsan',
  'Pori Moni'
];

for (const p of people) {
  if (existingActressesToReclassify.includes(p.name)) {
    p.category = 'actress';
  }
}

export const actressesData = [
  // --- USA (29) ---
  {
    name: 'Jenna Ortega',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Jenna_Ortega',
    description: 'Breakout star internationally acclaimed as Wednesday Addams in Netflix hit series Wednesday and Scream horror franchise'
  },
  {
    name: 'Sydney Sweeney',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Sydney_Sweeney',
    description: 'Emmy-nominated actress famous for her sensational roles in HBO series Euphoria, The White Lotus, and hit rom-com Anyone But You'
  },
  {
    name: 'Anya Taylor-Joy',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Anya_Taylor-Joy',
    description: 'Golden Globe-winning sensation renowned for The Queen\'s Gambit on Netflix, Dune: Part Two, and Furiosa: A Mad Max Saga'
  },
  {
    name: 'Elizabeth Olsen',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Elizabeth_Olsen',
    description: 'Beloved actress celebrated globally as Wanda Maximoff / Scarlet Witch in Marvel Studios WandaVision and Doctor Strange'
  },
  {
    name: 'Jennifer Aniston',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Jennifer_Aniston',
    description: 'Global superstar celebrated worldwide as Rachel Green on Friends and starring in Apple TV+ flagship series The Morning Show'
  },
  {
    name: 'Courteney Cox',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Courteney_Cox',
    description: 'Famous for portraying Monica Geller on iconic sitcom Friends and tough reporter Gale Weathers in Scream horror franchise'
  },
  {
    name: 'Lisa Kudrow',
    code: 'US',
    nationality: 'American',
    difficulty: 'medium',
    wiki: 'Lisa_Kudrow',
    description: 'Emmy Award-winning actress celebrated worldwide for her quirky, lovable portrayal of Phoebe Buffay on Friends'
  },
  {
    name: 'Kaley Cuoco',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Kaley_Cuoco',
    description: 'Globally adored sitcom star who played Penny in The Big Bang Theory and received acclaim for HBO Max series The Flight Attendant'
  },
  {
    name: 'Emma Stone',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Emma_Stone',
    description: 'Two-time Academy Award-winning powerhouse acclaimed for La La Land, Poor Things, Cruella, and The Favourite'
  },
  {
    name: 'Jessica Chastain',
    code: 'US',
    nationality: 'American',
    difficulty: 'medium',
    wiki: 'Jessica_Chastain',
    description: 'Oscar-winning actress renowned for commanding performances in Interstellar, The Eyes of Tammy Faye, and Scenes from a Marriage'
  },
  {
    name: 'Sandra Bullock',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Sandra_Bullock',
    description: 'Beloved Academy Award-winning Hollywood star famous for Speed, The Blind Side, Gravity, and Netflix record-breaker Bird Box'
  },
  {
    name: 'Julia Roberts',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Julia_Roberts',
    description: 'Academy Award winner and iconic Hollywood leading lady famous for Pretty Woman, Erin Brockovich, and thriller series Homecoming'
  },
  {
    name: 'Dakota Johnson',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Dakota_Johnson',
    description: 'International star famous for playing Anastasia Steele in the Fifty Shades film series, The Lost Daughter, and Madame Web'
  },
  {
    name: 'Blake Lively',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Blake_Lively',
    description: 'Fashion icon and actress famed as Serena van der Woodsen in Gossip Girl, The Age of Adaline, and It Ends with Us'
  },
  {
    name: 'Sarah Jessica Parker',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Sarah_Jessica_Parker',
    description: 'Golden Globe & Emmy-winning superstar famed as style-defining writer Carrie Bradshaw in Sex and the City and And Just Like That...'
  },
  {
    name: 'Kristen Stewart',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Kristen_Stewart',
    description: 'Acclaimed actress who achieved worldwide stardom as Bella Swan in The Twilight Saga and earned Oscar nod for Spencer'
  },
  {
    name: 'Sadie Sink',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Sadie_Sink',
    description: 'Rising Hollywood star celebrated as Max Mayfield in Netflix sci-fi series Stranger Things and acclaimed drama The Whale'
  },
  {
    name: 'Winona Ryder',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Winona_Ryder',
    description: 'Golden Globe winner famous as Joyce Byers in Stranger Things and cult classics Beetlejuice and Edward Scissorhands'
  },
  {
    name: 'Elisabeth Moss',
    code: 'US',
    nationality: 'American',
    difficulty: 'medium',
    wiki: 'Elisabeth_Moss',
    description: 'Critically celebrated Emmy winner renowned for dystopian masterpiece The Handmaid\'s Tale, Mad Men, and The Invisible Man'
  },
  {
    name: 'Laura Dern',
    code: 'US',
    nationality: 'American',
    difficulty: 'medium',
    wiki: 'Laura_Dern',
    description: 'Academy Award-winning actress renowned for Jurassic Park, HBO drama Big Little Lies, and Marriage Story'
  },
  {
    name: 'Reese Witherspoon',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Reese_Witherspoon',
    description: 'Oscar-winning superstar celebrated for Legally Blonde, Walk the Line, Big Little Lies, and The Morning Show'
  },
  {
    name: 'Krysten Ritter',
    code: 'US',
    nationality: 'American',
    difficulty: 'medium',
    wiki: 'Krysten_Ritter',
    description: 'Charismatic actress renowned for portraying tough superhero Jessica Jones in Marvel series and Jane Margolis in Breaking Bad'
  },
  {
    name: 'Rhea Seehorn',
    code: 'US',
    nationality: 'American',
    difficulty: 'medium',
    wiki: 'Rhea_Seehorn',
    description: 'Emmy-nominated actress celebrated for her tour-de-force portrayal of attorney Kim Wexler in Better Call Saul'
  },
  {
    name: 'Gillian Anderson',
    code: 'US',
    nationality: 'American',
    difficulty: 'medium',
    wiki: 'Gillian_Anderson',
    description: 'Multi-award winning star famed for Dana Scully in The X-Files, Margaret Thatcher in The Crown, and sex therapist in Sex Education'
  },
  {
    name: 'Halle Berry',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Halle_Berry',
    description: 'First African American woman to win Best Actress Academy Award (Monster\'s Ball), also starred in X-Men and John Wick: Chapter 3'
  },
  {
    name: 'Zoe Saldana',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Zoe_Saldana',
    description: 'Highest-grossing film actress of all time starring as Neytiri in Avatar, Gamora in Guardians of the Galaxy, and Special Ops: Lioness'
  },
  {
    name: 'Viola Davis',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Viola_Davis',
    description: 'EGOT-winning acting giant famed as Annalise Keating in How to Get Away with Murder, Fences, and The Woman King'
  },
  {
    name: 'Amanda Seyfried',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Amanda_Seyfried',
    description: 'Emmy-winning star famed for Mamma Mia!, Mean Girls, Les Misérables, and portraying Elizabeth Holmes in The Dropout'
  },
  {
    name: 'Alexandra Daddario',
    code: 'US',
    nationality: 'American',
    difficulty: 'easy',
    wiki: 'Alexandra_Daddario',
    description: 'Striking actress famous for HBO series The White Lotus, True Detective, and blockbuster films Percy Jackson and San Andreas'
  },

  // --- UK & Ireland (17) ---
  {
    name: 'Millie Bobby Brown',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Millie_Bobby_Brown',
    description: 'Global pop culture star beloved as Eleven in Netflix megahit Stranger Things and titular detective in Enola Holmes'
  },
  {
    name: 'Emilia Clarke',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Emilia_Clarke',
    description: 'Internationally celebrated as Daenerys Targaryen (Mother of Dragons) in Game of Thrones and romantic hit Me Before You'
  },
  {
    name: 'Sophie Turner',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Sophie_Turner',
    description: 'Acclaimed for playing Sansa Stark in Game of Thrones and mutant superhero Jean Grey in X-Men: Dark Phoenix'
  },
  {
    name: 'Maisie Williams',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Maisie_Williams',
    description: 'Emmy-nominated actress famous for her beloved fierce role as Arya Stark in HBO masterpiece Game of Thrones'
  },
  {
    name: 'Florence Pugh',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Florence_Pugh',
    description: 'One of modern cinema\'s leading talents acclaimed for Oppenheimer, Marvel\'s Black Widow, Little Women, and Dune: Part Two'
  },
  {
    name: 'Lily Collins',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Lily_Collins',
    description: 'Charming leading star of Netflix global streaming sensation Emily in Paris and feature films Love, Rosie and Mank'
  },
  {
    name: 'Bella Ramsey',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Bella_Ramsey',
    description: 'Critically celebrated for starring as Ellie in HBO post-apocalyptic series The Last of Us and Lyanna Mormont in Game of Thrones'
  },
  {
    name: 'Helena Bonham Carter',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Helena_Bonham_Carter',
    description: 'Iconic British acting legend acclaimed for Bellatrix Lestrange in Harry Potter, Fight Club, and Princess Margaret in The Crown'
  },
  {
    name: 'Claire Foy',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Claire_Foy',
    description: 'Emmy & Golden Globe winner renowned for her regal portrayal of Queen Elizabeth II in Netflix hit series The Crown and First Man'
  },
  {
    name: 'Phoebe Dynevor',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Phoebe_Dynevor',
    description: 'Rose to worldwide stardom as Daphne Bridgerton in Netflix record-smashing romantic period drama series Bridgerton'
  },
  {
    name: 'Simone Ashley',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Simone_Ashley',
    description: 'Captivating actress celebrated worldwide as Kate Sharma in Bridgerton Season 2 and Olivia Hanan in Sex Education'
  },
  {
    name: 'Lily James',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Lily_James',
    description: 'Versatile English actress who starred in Disney Cinderella, Downton Abbey, Baby Driver, and acclaimed miniseries Pam & Tommy'
  },
  {
    name: 'Anya Chalotra',
    code: 'GB',
    nationality: 'British',
    difficulty: 'medium',
    wiki: 'Anya_Chalotra',
    description: 'Acclaimed British actress known for her powerful role as sorceress Yennefer of Vengerberg in Netflix fantasy series The Witcher'
  },
  {
    name: 'Freya Allan',
    code: 'GB',
    nationality: 'British',
    difficulty: 'medium',
    wiki: 'Freya_Allan',
    description: 'Rising star who portrays Princess Ciri in Netflix fantasy epic The Witcher and lead in Kingdom of the Planet of the Apes'
  },
  {
    name: 'Vanessa Kirby',
    code: 'GB',
    nationality: 'British',
    difficulty: 'medium',
    wiki: 'Vanessa_Kirby',
    description: 'BAFTA-winning actress renowned as Princess Margaret in The Crown, Mission: Impossible series, and Napoleon'
  },
  {
    name: 'Nicola Coughlan',
    code: 'IE',
    nationality: 'Irish',
    difficulty: 'easy',
    wiki: 'Nicola_Coughlan',
    description: 'Beloved Irish actress starring as Penelope Featherington (Lady Whistledown) in Bridgerton and Clare Devlin in Derry Girls'
  },
  {
    name: 'Saoirse Ronan',
    code: 'IE',
    nationality: 'Irish',
    difficulty: 'easy',
    wiki: 'Saoirse_Ronan',
    description: 'Four-time Oscar-nominated powerhouse actress acclaimed for Lady Bird, Little Women, Atonement, and Brooklyn'
  },

  // --- Australia (4) ---
  {
    name: 'Nicole Kidman',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Nicole_Kidman',
    description: 'Oscar-winning cinematic royalty renowned for Moulin Rouge!, The Others, The Hours, and HBO limited series Big Little Lies'
  },
  {
    name: 'Cate Blanchett',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Cate_Blanchett',
    description: 'Two-time Academy Award winner famed for Galadriel in The Lord of the Rings, Blue Jasmine, Carol, and psychological drama Tár'
  },
  {
    name: 'Sarah Snook',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'medium',
    wiki: 'Sarah_Snook',
    description: 'Golden Globe & Emmy-winning actress internationally acclaimed for playing ruthless media heiress Shiv Roy in HBO drama Succession'
  },
  {
    name: 'Milly Alcock',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'medium',
    wiki: 'Milly_Alcock',
    description: 'Breakout star who captured international acclaim portraying young Princess Rhaenyra Targaryen in HBO House of the Dragon'
  },

  // --- Canada (4) ---
  {
    name: 'Cobie Smulders',
    code: 'CA',
    nationality: 'Canadian',
    difficulty: 'easy',
    wiki: 'Cobie_Smulders',
    description: 'Beloved actress renowned worldwide as Robin Scherbatsky in How I Met Your Mother and Agent Maria Hill in the Marvel Cinematic Universe'
  },
  {
    name: 'Rachel McAdams',
    code: 'CA',
    nationality: 'Canadian',
    difficulty: 'easy',
    wiki: 'Rachel_McAdams',
    description: 'Iconic Canadian leading actress famous for Mean Girls (Regina George), The Notebook, Spotlight, and Marvel Doctor Strange'
  },
  {
    name: 'Tatiana Maslany',
    code: 'CA',
    nationality: 'Canadian',
    difficulty: 'medium',
    wiki: 'Tatiana_Maslany',
    description: 'Emmy-winning talent who gave a virtuosic performance playing multiple clones in Orphan Black and starred in Marvel She-Hulk'
  },
  {
    name: 'Evangeline Lilly',
    code: 'CA',
    nationality: 'Canadian',
    difficulty: 'easy',
    wiki: 'Evangeline_Lilly',
    description: 'Famed for portraying Kate Austen in landmark television series Lost, Tauriel in The Hobbit, and The Wasp in Marvel Cinematic Universe'
  },

  // --- South Africa, Israel, Cuba, Spain, Malaysia (6) ---
  {
    name: 'Charlize Theron',
    code: 'ZA',
    nationality: 'South African',
    difficulty: 'easy',
    wiki: 'Charlize_Theron',
    description: 'Oscar-winning action superstar famed for Furiosa in Mad Max: Fury Road, serial killer Aileen Wuornos in Monster, and The Old Guard'
  },
  {
    name: 'Gal Gadot',
    code: 'IL',
    nationality: 'Israeli',
    difficulty: 'easy',
    wiki: 'Gal_Gadot',
    description: 'Global superstar celebrated as Diana Prince / Wonder Woman in the DC Extended Universe, Fast & Furious films, and Red Notice'
  },
  {
    name: 'Ana de Armas',
    code: 'CU',
    nationality: 'Cuban',
    difficulty: 'easy',
    wiki: 'Ana_de_Armas',
    description: 'Oscar-nominated star renowned for Knives Out, Marilyn Monroe in Blonde, Paloma in No Time to Die, and Blade Runner 2049'
  },
  {
    name: 'Úrsula Corberó',
    code: 'ES',
    nationality: 'Spanish',
    difficulty: 'easy',
    wiki: 'Úrsula_Corberó',
    description: 'Famed worldwide as the fiery narrator Tokyo (Silene Oliveira) in Netflix record-breaking heist drama Money Heist (La Casa de Papel)'
  },
  {
    name: 'Alba Flores',
    code: 'ES',
    nationality: 'Spanish',
    difficulty: 'medium',
    wiki: 'Alba_Flores',
    description: 'Spanish fan favorite acclaimed as the spirited, fearless counterfeit expert Nairobi in Netflix Money Heist and Saray in Vis a Vis'
  },
  {
    name: 'Michelle Yeoh',
    code: 'MY',
    nationality: 'Malaysian',
    difficulty: 'easy',
    wiki: 'Michelle_Yeoh',
    description: 'Historic Academy Award winner for Everything Everywhere All at Once, and star of Crouching Tiger Hidden Dragon and Star Trek'
  },

  // --- South Korea (10) ---
  {
    name: 'Song Hye-kyo',
    code: 'KR',
    nationality: 'South Korean',
    difficulty: 'easy',
    wiki: 'Song_Hye-kyo',
    description: 'Hallyu icon and superstar acclaimed worldwide for Netflix dark revenge drama The Glory and Descendants of the Sun'
  },
  {
    name: 'Son Ye-jin',
    code: 'KR',
    nationality: 'South Korean',
    difficulty: 'easy',
    wiki: 'Son_Ye-jin',
    description: 'Queen of melodrama and K-drama megastar renowned globally for Crash Landing on You and Something in the Rain'
  },
  {
    name: 'Park Shin-hye',
    code: 'KR',
    nationality: 'South Korean',
    difficulty: 'easy',
    wiki: 'Park_Shin-hye',
    description: 'Beloved leading lady of international K-drama hits including The Heirs, Memories of the Alhambra, Pinocchio, and Doctor Slump'
  },
  {
    name: 'Park Eun-bin',
    code: 'KR',
    nationality: 'South Korean',
    difficulty: 'easy',
    wiki: 'Park_Eun-bin',
    description: 'Critically adored actress celebrated for her Daesang-winning lead performance in Netflix hit Extraordinary Attorney Woo'
  },
  {
    name: 'Kim Go-eun',
    code: 'KR',
    nationality: 'South Korean',
    difficulty: 'easy',
    wiki: 'Kim_Go-eun',
    description: 'Acclaimed star renowned for fantasy romance Guardian: The Lonely and Great God (Goblin), Little Women, and blockbuster horror Exhuma'
  },
  {
    name: 'Han So-hee',
    code: 'KR',
    nationality: 'South Korean',
    difficulty: 'easy',
    wiki: 'Han_So-hee',
    description: 'Dynamic leading star acclaimed for Netflix action-thriller series My Name, The World of the Married, and Gyeongseong Creature'
  },
  {
    name: 'Jung Ho-yeon',
    code: 'KR',
    nationality: 'South Korean',
    difficulty: 'easy',
    wiki: 'Jung_Ho-yeon',
    description: 'SAG Award-winning breakout star who captivated the globe as Kang Sae-byeok (Player 067) in Netflix phenomenon Squid Game'
  },
  {
    name: 'Bae Suzy',
    code: 'KR',
    nationality: 'South Korean',
    difficulty: 'easy',
    wiki: 'Bae_Suzy',
    description: 'Nation\'s First Love and superstar lead of popular streaming series Start-Up, Vagabond, Doona!, and acclaimed drama Anna'
  },
  {
    name: 'Kim Ji-won',
    code: 'KR',
    nationality: 'South Korean',
    difficulty: 'easy',
    wiki: 'Kim_Ji-won',
    description: 'Versatile star who captivated audiences in romantic megahit Queen of Tears, Descendants of the Sun, and My Liberation Notes'
  },
  {
    name: 'Park Min-young',
    code: 'KR',
    nationality: 'South Korean',
    difficulty: 'easy',
    wiki: 'Park_Min-young',
    description: 'Romantic-comedy queen celebrated for international hit series Marry My Husband, What\'s Wrong with Secretary Kim, and Healer'
  },

  // --- Turkey (7) ---
  {
    name: 'Hande Erçel',
    code: 'TR',
    nationality: 'Turkish',
    difficulty: 'easy',
    wiki: 'Hande_Erçel',
    description: 'Internationally beloved Turkish star famous for leading rom-com Sen Çal Kapımı (Love is in the Air) and Aşk Laftan Anlamaz'
  },
  {
    name: 'Tuba Büyüküstün',
    code: 'TR',
    nationality: 'Turkish',
    difficulty: 'easy',
    wiki: 'Tuba_Büyüküstün',
    description: 'Emmy-nominated Turkish screen queen famed for Kara Para Aşk (Black Money Love), Brave and Beautiful, and Netflix docudrama Rise of Empires'
  },
  {
    name: 'Beren Saat',
    code: 'TR',
    nationality: 'Turkish',
    difficulty: 'easy',
    wiki: 'Beren_Saat',
    description: 'One of Turkey\'s highest-rated dramatic actresses famed for Aşk-ı Memnu (Forbidden Love), Fatmagül, and Netflix fantasy The Gift (Atiye)'
  },
  {
    name: 'Demet Özdemir',
    code: 'TR',
    nationality: 'Turkish',
    difficulty: 'easy',
    wiki: 'Demet_Özdemir',
    description: 'Charming Turkish actress and dancer famed for worldwide rom-com sensation Erkenci Kuş (Daydreamer), Adım Farah, and Love Tactics'
  },
  {
    name: 'Cansu Dere',
    code: 'TR',
    nationality: 'Turkish',
    difficulty: 'medium',
    wiki: 'Cansu_Dere',
    description: 'Iconic Turkish dramatic actress famous for leading roles in historic crime thriller Ezel, Anne (Mother), and Sadakatsiz (Unfaithful)'
  },
  {
    name: 'Bergüzar Korel',
    code: 'TR',
    nationality: 'Turkish',
    difficulty: 'medium',
    wiki: 'Bergüzar_Korel',
    description: 'Renowned Turkish television star celebrated across the Middle East and South Asia for Binbir Gece (1001 Nights) and Vatanım Sensin'
  },
  {
    name: 'Hazal Kaya',
    code: 'TR',
    nationality: 'Turkish',
    difficulty: 'easy',
    wiki: 'Hazal_Kaya',
    description: 'Beloved Turkish actress who gained massive international fame in Adını Feriha Koydum (Feriha), Bizim Hikaye, and Netflix Midnight at the Pera Palace'
  },

  // --- Pakistan (6) ---
  {
    name: 'Mahira Khan',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Mahira_Khan',
    description: 'Superstar of Pakistani cinema and television famed for landmark drama Humsafar, Bollywood blockbuster Raees, and The Legend of Maula Jatt'
  },
  {
    name: 'Saba Qamar',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Saba_Qamar',
    description: 'Powerhouse actress renowned for Bollywood hit Hindi Medium alongside Irrfan Khan, and acclaimed television dramas Baaghi and Kamli'
  },
  {
    name: 'Mehwish Hayat',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Mehwish_Hayat',
    description: 'Tamgha-e-Imtiaz honoured star who starred in Marvel Studios series Ms. Marvel on Disney+, London Nahi Jaunga, and Jawani Phir Nahi Ani'
  },
  {
    name: 'Maya Ali',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Maya_Ali',
    description: 'Popular and charismatic leading lady of hit Pakistani drama serials Mann Mayal, Diyar-e-Dil, Jo Bichar Gaye, and Sunn Mere Dil'
  },
  {
    name: 'Sanam Saeed',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Sanam_Saeed',
    description: 'Acclaimed actress famed for portraying Kashaf Murtaza in classic drama Zindagi Gulzar Hai and ZEE5 supernatural series Barzakh'
  },
  {
    name: 'Hania Aamir',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Hania_Aamir.png',
    description: 'Sensational leading actress of subcontinental hit drama serials Kabhi Main Kabhi Tum, Mere Humsafar, Mujhe Pyaar Hua Tha, and Ishqiya'
  },

  // --- Bangladesh (6) ---
  {
    name: 'Bidya Sinha Saha Mim',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Bidya_Sinha_Saha_Mim',
    description: 'National Film Award-winning superstar of Bangladeshi cinema celebrated for box office record-breakers Poran, Damal, and Mission Extreme'
  },
  {
    name: 'Mehazabien Chowdhury',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Mehazabien_Chowdhury_cropped_JCI_Bangladesh_Ten_Outstanding_Young_Persons_Award_2023_Ceremony_Dhaka_2023-10-13_%28PID-0013135%29_%28cropped%29.jpg/500px-Mehazabien_Chowdhury_cropped_JCI_Bangladesh_Ten_Outstanding_Young_Persons_Award_2023_Ceremony_Dhaka_2023-10-13_%28PID-0013135%29_%28cropped%29.jpg?utm_source=bn.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    description: 'The queen of Bangladeshi television and OTT web series acclaimed for Chorki thriller Redrum, Saba (TIFF), Kajoler Dinratri, and Punorjonmo'
  },
  {
    name: 'Tasnia Farin',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Tasnia_Farin',
    description: 'Acclaimed actress who won hearts across South Asia in Hoichoi mystery series Karagar, Mostofa Sarwar Farooki Ladies & Gentlemen, and Aaro Ek Prithibi'
  },
  {
    name: 'Nusraat Faria',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Nusraat_Faria',
    description: 'Glamorous leading actress and dancer who portrayed Sheikh Hasina in biopic Mujib: The Making of a Nation, Aashiqui, and Operation Sundarbans'
  },
  {
    name: 'Puja Cherry',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Puja_Cherry',
    description: 'Talented young star who delivered blockbuster performances in beloved cinema hits Poramon 2, Dahan, Noor, Golui, and Shaan'
  },
  {
    name: 'Sabila Nur',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Sabila_Nur',
    description: 'Dynamic leading actress acclaimed for title role in Chorki investigative series Mercules, Ditiyo Koishor, and top television dramas'
  },

  // --- India (11) ---
  {
    name: 'Kiara Advani',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Kiara_Advani',
    description: 'Top Bollywood leading lady celebrated for patriotic blockbuster Shershaah, Kabir Singh, Bhool Bhulaiyaa 2, and Netflix film Guilty'
  },
  {
    name: 'Kriti Sanon',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Kriti_Sanon',
    description: 'National Film Award-winning Bollywood star praised for Mimi, box office comedy hit Crew, and Teri Baaton Mein Aisa Uljha Jiya'
  },
  {
    name: 'Shraddha Kapoor',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Shraddha_Kapoor',
    description: 'Massively popular Bollywood superstar who headlined historic box office monster Stree 2, Stree, Aashiqui 2, and Chhichhore'
  },
  {
    name: 'Radhika Apte',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Radhika_Apte',
    description: 'Queen of Indian streaming known as the face of Netflix India in Sacred Games, Ghoul, Andhadhun, and Monica O My Darling'
  },
  {
    name: 'Sobhita Dhulipala',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'medium',
    wiki: 'Sobhita_Dhulipala',
    description: 'Stunning actress acclaimed for leading Amazon Prime series Made in Heaven (Tara Khanna), The Night Manager, and Dev Patel\'s Monkey Man'
  },
  {
    name: 'Shefali Shah',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'medium',
    wiki: 'Shefali_Shah',
    description: 'International Emmy-nominated tour-de-force who led Netflix global Emmy-winning drama series Delhi Crime as DCP Vartika Chaturvedi'
  },
  {
    name: 'Shweta Tripathi',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'medium',
    wiki: 'Shweta_Tripathi',
    description: 'Critically acclaimed indie powerhouse famed as fearless Golu Gupta in Amazon Prime cult series Mirzapur, Masaan, and Yeh Kaali Kaali Ankhein'
  },
  {
    name: 'Rasika Dugal',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'medium',
    wiki: 'Rasika_Dugal',
    description: 'Finest OTT actress celebrated for her memorable portrayal of Beena Tripathi in Mirzapur, Neeti Singh in Delhi Crime, and Out of Love'
  },
  {
    name: 'Nayanthara',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Nayanthara',
    description: 'Hailed as the Lady Superstar of Indian cinema with dozens of blockbusters, starred alongside Shah Rukh Khan in pan-India blockbuster Jawan'
  },
  {
    name: 'Taapsee Pannu',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Taapsee_Pannu',
    description: 'Fierce and versatile leading actress celebrated for Dunki, courtroom classic Pink, Thappad, and Netflix mystery hit Haseen Dillruba'
  },
  {
    name: 'Vidya Balan',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Vidya_Balan',
    description: 'National Award-winning trailblazer celebrated for female-led revolutions Kahaani, The Dirty Picture, Sherni, and Bhool Bhulaiyaa 3'
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

async function fetchPhotoBuffer(item) {
  if (item.imageUrl) {
    const res = await fetch(item.imageUrl, { headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' } });
    if (!res.ok) throw new Error(`Direct image download failed: HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }

  const wikiKey = item.wiki || item.name;
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiKey)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' } });
  if (!res.ok) throw new Error(`Wikipedia API failed: HTTP ${res.status}`);

  const data = await res.json();
  let imgUrl = data.thumbnail?.source || data.originalimage?.source;
  if (!imgUrl) throw new Error(`No image found in Wikipedia response for ${item.name}`);

  if (imgUrl.includes('/thumb/')) {
    imgUrl = imgUrl.replace(/\/\d+px-/, '/500px-');
  }

  let imgRes = await fetch(imgUrl, { headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' } });
  if (!imgRes.ok) {
    const fb = data.thumbnail?.source || data.originalimage?.source;
    imgRes = await fetch(fb, { headers: { 'User-Agent': 'WorldStarQuiz/1.0 (info@quiz.game)' } });
    if (!imgRes.ok) throw new Error(`Download of image failed: HTTP ${imgRes.status}`);
  }

  return Buffer.from(await imgRes.arrayBuffer());
}

async function main() {
  console.log(`Starting processing 100 actresses...`);
  console.log(`actressesData length: ${actressesData.length}`);

  let nextId = 464;
  const newActresses = [];

  for (let i = 0; i < actressesData.length; i++) {
    const item = actressesData[i];
    const c = countryMap.get(item.code);
    if (!c) throw new Error(`Missing country: ${item.code} for ${item.name}`);

    const slug = getSlug(item.name);
    const fileName = `${slug}.jpg`;
    const pubPath = path.join(publicImagesDir, fileName);
    const rootPath = path.join(rootImagesDir, fileName);
    const distPath = path.join(distImagesDir, fileName);

    // Download image if not exists
    if (!fs.existsSync(pubPath) || fs.statSync(pubPath).size < 3000) {
      let downloaded = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const buf = await fetchPhotoBuffer(item);
          fs.writeFileSync(pubPath, buf);
          fs.writeFileSync(rootPath, buf);
          if (fs.existsSync(distImagesDir)) fs.writeFileSync(distPath, buf);
          console.log(`[${i + 1}/${actressesData.length}] [DOWNLOADED] ${item.name} (${(buf.length / 1024).toFixed(1)} KB) -> ${fileName}`);
          downloaded = true;
          break;
        } catch (err) {
          console.warn(`[RETRY ${attempt}] ${item.name}: ${err.message}`);
          await new Promise(r => setTimeout(r, 1500));
        }
      }
      if (!downloaded) {
        throw new Error(`Failed to download photo for ${item.name}`);
      }
      // Polite rate limit spacing
      await new Promise(r => setTimeout(r, 650));
    } else {
      console.log(`[${i + 1}/${actressesData.length}] [EXISTING] ${item.name} -> ${fileName}`);
      const buf = fs.readFileSync(pubPath);
      fs.writeFileSync(rootPath, buf);
      if (fs.existsSync(distImagesDir)) fs.writeFileSync(distPath, buf);
    }

    const id = `star-${String(nextId++).padStart(3, '0')}`;
    newActresses.push({
      id,
      name: item.name,
      country: c.name,
      countryCode: c.code,
      nationality: item.nationality,
      category: 'actress',
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

  const combined = [...people, ...newActresses];

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
  console.log(`\nSUCCESS: Added ${newActresses.length} new actresses! Total stars now: ${combined.length}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
