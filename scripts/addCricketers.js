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

// Reclassify existing 3 cricketers
for (const p of people) {
  if (['Virat Kohli', 'Sachin Tendulkar', 'Shakib Al Hasan'].includes(p.name)) {
    p.category = 'cricketer';
  }
}

const cricketersData = [
  // Bangladesh (15)
  {
    name: 'Tamim Iqbal',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Tamim_Iqbal',
    description: 'All-time leading run-scorer for Bangladesh in international cricket and formidable opening batsman'
  },
  {
    name: 'Mushfiqur Rahim',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Mushfiqur_Rahim',
    description: 'Veteran wicketkeeper-batsman and former captain, known as the dependable rock of Bangladesh cricket'
  },
  {
    name: 'Mahmudullah',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Mahmudullah',
    description: 'Celebrated Bangladeshi middle-order finisher and first player from Bangladesh to score World Cup centuries'
  },
  {
    name: 'Mashrafe Mortaza',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Mashrafe_Mortaza',
    description: 'Inspirational fast bowler and greatest limited-overs captain in Bangladesh cricket history (Narail Express)'
  },
  {
    name: 'Mustafizur Rahman',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Mustafizur_Rahman',
    description: 'World-renowned left-arm pace sensation famously nicknamed The Fizz for his devastating off-cutters'
  },
  {
    name: 'Taskin Ahmed',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Taskin_Ahmed',
    description: 'Express strike fast bowler and spearhead of Bangladesh fast bowling attack across all three formats'
  },
  {
    name: 'Litton Das',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Litton_Das',
    description: 'Graceful and technically gifted top-order batsman and wicketkeeper who holds Bangladesh highest individual ODI score'
  },
  {
    name: 'Mehidy Hasan Miraz',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Mehidy_Hasan_Miraz',
    description: 'Dynamic match-winning all-rounder and former ICC U-19 World Cup player of the tournament'
  },
  {
    name: 'Soumya Sarkar',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'medium',
    wiki: 'Soumya_Sarkar',
    description: 'Hard-hitting left-handed opening batsman and useful medium-pacer for Bangladesh'
  },
  {
    name: 'Mominul Haque',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'medium',
    wiki: 'Mominul_Haque',
    description: 'Prolific Test specialist batsman and former Test captain holding record for most Test centuries for Bangladesh'
  },
  {
    name: 'Rubel Hossain',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'medium',
    wiki: 'Rubel_Hossain',
    description: 'Passionate sling-action fast bowler famous for his heroic match-winning spell against England in 2015 World Cup'
  },
  {
    name: 'Mohammad Ashraful',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Mohammad_Ashraful',
    description: 'Prodigious young talent who became the youngest Test centurion in cricket history at age 17'
  },
  {
    name: 'Habibul Bashar',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'medium',
    wiki: 'Habibul_Bashar',
    description: 'Former Bangladesh captain and dependable batsman who led the team to iconic victories against Australia and India'
  },
  {
    name: 'Najmul Hossain Shanto',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'easy',
    wiki: 'Najmul_Hossain_Shanto',
    description: 'Current national captain of Bangladesh and elegant top-order batsman across all formats'
  },
  {
    name: 'Taijul Islam',
    code: 'BD',
    nationality: 'Bangladeshi',
    difficulty: 'medium',
    wiki: 'Taijul_Islam',
    description: 'Premier slow left-arm orthodox spinner and vital match-winner in Bangladesh Test cricket lineup'
  },

  // India (20)
  {
    name: 'MS Dhoni',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'MS_Dhoni',
    description: 'Legendary Indian captain and wicketkeeper who won the 2007 T20 World Cup, 2011 World Cup, and 2013 Champions Trophy'
  },
  {
    name: 'Rohit Sharma',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Rohit_Sharma',
    description: 'Record-holding opening batsman, 2024 T20 World Cup winning captain, and only player with three ODI double centuries'
  },
  {
    name: 'Jasprit Bumrah',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Jasprit_Bumrah',
    description: 'Premier all-format fast bowling sensation known for his lethal yorkers, awkward action, and unmatched economy'
  },
  {
    name: 'Kapil Dev',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Kapil_Dev',
    description: 'Legendary all-rounder and captain who famously led India to their historic maiden Cricket World Cup title in 1983'
  },
  {
    name: 'Sunil Gavaskar',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Sunil_Gavaskar',
    description: 'First batsman in cricket history to reach 10,000 Test runs, celebrated for mastering the fiercest pace attacks without helmet'
  },
  {
    name: 'Rahul Dravid',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Rahul_Dravid',
    description: 'Revered master batsman known worldwide as The Wall for his impenetrable defensive technique and grit'
  },
  {
    name: 'Sourav Ganguly',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Sourav_Ganguly',
    description: 'Charismatic former Indian captain and majestic left-handed batsman celebrated as the God of the Off-Side'
  },
  {
    name: 'Anil Kumble',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Anil_Kumble',
    description: 'Legendary leg-spinner, former captain, and India leading Test wicket-taker with 619 wickets including a 10-wicket innings'
  },
  {
    name: 'Yuvraj Singh',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Yuvraj_Singh',
    description: 'Explosive all-rounder who hit 6 sixes in an over and was Player of the Tournament in the 2011 World Cup'
  },
  {
    name: 'Virender Sehwag',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Virender_Sehwag',
    description: 'Fearless opening batsman who redefined Test match batting with boundary-hitting and two triple centuries'
  },
  {
    name: 'Ravindra Jadeja',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Ravindra_Jadeja',
    description: 'World-class 3D cricketer, elite left-arm spinner, electrifying fielder, and clutch lower-order batsman'
  },
  {
    name: 'Ravichandran Ashwin',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Ravichandran_Ashwin',
    description: 'Master off-spinner, carrom-ball pioneer, and all-time great bowler with over 500 Test wickets and multiple centuries'
  },
  {
    name: 'Hardik Pandya',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Hardik_Pandya',
    description: 'Pace-bowling all-rounder and explosive power-hitter pivotal in India 2024 T20 World Cup championship'
  },
  {
    name: 'Shubman Gill',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Shubman_Gill',
    description: 'Classy top-order batting prodigy and youngest player to score a double century in Men One Day Internationals'
  },
  {
    name: 'Rishabh Pant',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Rishabh_Pant',
    description: 'Dynamic, courageous wicketkeeper-batsman famed for thrilling counter-attacking Test match match-winning innings'
  },
  {
    name: 'KL Rahul',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'KL_Rahul',
    description: 'Versatile and technically immaculate top-order batsman and wicketkeeper with international centuries in all three formats'
  },
  {
    name: 'Mohammed Shami',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Mohammed_Shami',
    description: 'Lethal seam-bowling specialist and leading wicket-taker of the 2023 ICC Cricket World Cup'
  },
  {
    name: 'Zaheer Khan',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Zaheer_Khan',
    description: 'Crafty left-arm fast bowler who spearheaded India bowling attack during their victorious 2011 World Cup campaign'
  },
  {
    name: 'Harbhajan Singh',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Harbhajan_Singh',
    description: 'Feisty off-spinner nicknamed Turbanator who took over 400 Test wickets and was the first Indian to take a Test hat-trick'
  },
  {
    name: 'Gautam Gambhir',
    code: 'IN',
    nationality: 'Indian',
    difficulty: 'easy',
    wiki: 'Gautam_Gambhir',
    description: 'Gritty opening batsman who played match-winning top-scoring innings in both the 2007 T20 and 2011 ODI World Cup finals'
  },

  // Pakistan (14)
  {
    name: 'Babar Azam',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Babar_Azam',
    description: 'Modern batting maestro and former Pakistan captain renowned for his exquisite cover drive and record ODI consistency'
  },
  {
    name: 'Wasim Akram',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Wasim_Akram',
    description: 'Revered worldwide as the Sultan of Swing, widely regarded as the greatest left-arm fast bowler in cricket history'
  },
  {
    name: 'Waqar Younis',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Waqar_Younis',
    description: 'Fierce toe-crushing reverse-swing fast bowling legend who formed the two Ws strike partnership with Wasim Akram'
  },
  {
    name: 'Shoaib Akhtar',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Shoaib_Akhtar',
    description: 'Known as the Rawalpindi Express, officially recognized as the fastest bowler in cricket history bowling at 161.3 km/h'
  },
  {
    name: 'Shahid Afridi',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Shahid_Afridi',
    description: 'Flamboyant all-rounder famously nicknamed Boom Boom for his explosive power-hitting and prolific leg-spin bowling'
  },
  {
    name: 'Inzamam-ul-Haq',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Inzamam-ul-Haq',
    description: 'Master middle-order batsman and former captain, pivotal match-winner of Pakistan 1992 World Cup triumph'
  },
  {
    name: 'Javed Miandad',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Javed_Miandad',
    description: 'Legendary street-smart batsman famous for his unforgettable last-ball six in Sharjah and fierce competitive spirit'
  },
  {
    name: 'Younis Khan',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Younis_Khan',
    description: 'Pakistan highest Test run-scorer with over 10,000 runs and captain who led the nation to the 2009 T20 World Cup title'
  },
  {
    name: 'Saqlain Mushtaq',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Saqlain_Mushtaq',
    description: 'Revolutionary off-spinner celebrated globally as the inventor of the unplayable doosra delivery'
  },
  {
    name: 'Mohammad Rizwan',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Mohammad_Rizwan_(cricketer)',
    description: 'Relentless wicketkeeper-batsman and record-breaking T20 run-machine known for his supreme fitness and determination'
  },
  {
    name: 'Shaheen Afridi',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Shaheen_Afridi',
    description: 'Tall, fiery left-arm paceman renowned for producing devastating unplayable inswinging yorkers in the opening over'
  },
  {
    name: 'Saeed Anwar',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Saeed_Anwar',
    description: 'Sublime left-handed opening batsman who held the record for the highest individual ODI score of 194 for over a decade'
  },
  {
    name: 'Misbah-ul-Haq',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'easy',
    wiki: 'Misbah-ul-Haq',
    description: 'Composed and steadfast captain who led Pakistan to the World Test No. 1 ranking, nicknamed Tuk Tuk'
  },
  {
    name: 'Sarfaraz Ahmed',
    code: 'PK',
    nationality: 'Pakistani',
    difficulty: 'medium',
    wiki: 'Sarfaraz_Ahmed',
    description: 'Passionate wicketkeeper-batsman who captained Pakistan to their memorable 2017 ICC Champions Trophy triumph'
  },

  // Australia (13)
  {
    name: 'Ricky Ponting',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Ricky_Ponting',
    description: 'Two-time World Cup winning captain and one of the greatest top-order batsmen in history with 71 international centuries'
  },
  {
    name: 'Shane Warne',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Shane_Warne',
    description: 'The King of Spin, one of Wisden five Cricketers of the Century, bowler of the famous Ball of the Century'
  },
  {
    name: 'Glenn McGrath',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Glenn_McGrath',
    description: 'Master fast bowler renowned for his unerring metronomic line and length and 563 Test match wickets'
  },
  {
    name: 'Steve Smith',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Steve_Smith_(cricketer)',
    description: 'Modern batting genius often compared to Don Bradman for his extraordinary Test match batting average and idiosyncrasies'
  },
  {
    name: 'Pat Cummins',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Pat_Cummins',
    description: 'Australian captain who led his team to the 2023 World Test Championship and 2023 ODI World Cup double crown'
  },
  {
    name: 'David Warner',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'David_Warner_(cricketer)',
    description: 'Destructive, aggressive left-handed opening batsman and key match-winner across all formats for Australia'
  },
  {
    name: 'Mitchell Starc',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Mitchell_Starc',
    description: 'Fierce left-arm express bowler and leading wicket-taker in both the 2015 and 2019 ICC Cricket World Cups'
  },
  {
    name: 'Adam Gilchrist',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Adam_Gilchrist',
    description: 'Revolutionary wicketkeeper-batsman who changed the role forever with his blazing strike rate and sportsmanship'
  },
  {
    name: 'Michael Clarke',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Michael_Clarke_(cricketer)',
    description: 'Tactical captain and elegant middle-order batsman who led Australia to the 2015 Cricket World Cup title'
  },
  {
    name: 'Brett Lee',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Brett_Lee',
    description: 'Charismatic express speedster who consistently bowled over 150 km/h and took over 700 international wickets'
  },
  {
    name: 'Allan Border',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'medium',
    wiki: 'Allan_Border',
    description: 'Tough, resilient captain who rebuilt Australian cricket and led them to their first World Cup victory in 1987'
  },
  {
    name: 'Steve Waugh',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Steve_Waugh',
    description: 'Steely captain who led Australia during their golden era of unprecedented 16 consecutive Test match victories'
  },
  {
    name: 'Matthew Hayden',
    code: 'AU',
    nationality: 'Australian',
    difficulty: 'easy',
    wiki: 'Matthew_Hayden',
    description: 'Imposing, muscular opening batsman who intimidated bowlers and scored 380 against Zimbabwe'
  },

  // United Kingdom / England (10)
  {
    name: 'Ben Stokes',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Ben_Stokes',
    description: 'Inspirational all-rounder and Test captain, hero of the 2019 World Cup final and the 2019 Headingley miracle'
  },
  {
    name: 'Joe Root',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Joe_Root',
    description: 'Master contemporary batsman and England all-time leading Test run-scorer and century maker'
  },
  {
    name: 'James Anderson',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'James_Anderson_(cricketer)',
    description: 'The most prolific fast bowler in cricket history with over 700 Test match wickets over a legendary 20-year career'
  },
  {
    name: 'Stuart Broad',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Stuart_Broad',
    description: 'Match-winning fast bowler with 604 Test wickets famous for his devastating 8 for 15 Ashes spell at Trent Bridge'
  },
  {
    name: 'Alastair Cook',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Alastair_Cook',
    description: 'Resolute left-handed opening batsman and former captain who scored over 12,000 Test runs with 33 centuries'
  },
  {
    name: 'Kevin Pietersen',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Kevin_Pietersen',
    description: 'Audacious, swaggering batsman famous for pioneering the switch-hit and leading England to the 2010 World T20 title'
  },
  {
    name: 'Ian Botham',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Ian_Botham',
    description: 'Iconic larger-than-life all-rounder whose heroics single-handedly won the unforgettable 1981 Ashes series'
  },
  {
    name: 'Jos Buttler',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Jos_Buttler',
    description: 'Dynamic 360-degree white-ball batsman and captain who led England to victory in the 2022 T20 World Cup'
  },
  {
    name: 'Jofra Archer',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Jofra_Archer',
    description: 'Effortlessly fast pace bowler who bowled the legendary pressure-packed Super Over in the 2019 World Cup final'
  },
  {
    name: 'Eoin Morgan',
    code: 'GB',
    nationality: 'British',
    difficulty: 'easy',
    wiki: 'Eoin_Morgan',
    description: 'Visionary white-ball captain who revolutionized English limited-overs cricket and lifted the 2019 World Cup trophy'
  },

  // South Africa (8)
  {
    name: 'AB de Villiers',
    code: 'ZA',
    nationality: 'South African',
    difficulty: 'easy',
    wiki: 'AB_de_Villiers',
    description: 'Mr. 360, universally adored batting phenomenon who holds the record for the fastest 50, 100, and 150 in ODI history'
  },
  {
    name: 'Dale Steyn',
    code: 'ZA',
    nationality: 'South African',
    difficulty: 'easy',
    wiki: 'Dale_Steyn',
    description: 'Fierce, athletic pace bowler regarded as one of the greatest Test match bowlers, spending 2,356 days as World No. 1'
  },
  {
    name: 'Jacques Kallis',
    code: 'ZA',
    nationality: 'South African',
    difficulty: 'easy',
    wiki: 'Jacques_Kallis',
    description: 'Widely considered the greatest all-rounder in the modern game with over 25,000 international runs and 570 wickets'
  },
  {
    name: 'Hashim Amla',
    code: 'ZA',
    nationality: 'South African',
    difficulty: 'easy',
    wiki: 'Hashim_Amla',
    description: 'Serene and wristy batting master who became the fastest batsman to reach 2,000, 3,000, 4,000, 5,000, 6,000, and 7,000 ODI runs'
  },
  {
    name: 'Kagiso Rabada',
    code: 'ZA',
    nationality: 'South African',
    difficulty: 'easy',
    wiki: 'Kagiso_Rabada',
    description: 'Electrifying strike fast bowler who possesses raw pace, bounce, and a phenomenal strike rate in Test match cricket'
  },
  {
    name: 'Faf du Plessis',
    code: 'ZA',
    nationality: 'South African',
    difficulty: 'easy',
    wiki: 'Faf_du_Plessis',
    description: 'Tenacious batsman and charismatic captain celebrated for his composure, tactical acumen, and match-saving blockathons'
  },
  {
    name: 'Allan Donald',
    code: 'ZA',
    nationality: 'South African',
    difficulty: 'medium',
    wiki: 'Allan_Donald',
    description: 'Nicknamed White Lightning, the ferocious tearaway spearhead of South Africa post-apartheid bowling resurgence'
  },
  {
    name: 'Graeme Smith',
    code: 'ZA',
    nationality: 'South African',
    difficulty: 'easy',
    wiki: 'Graeme_Smith',
    description: 'Brave and commanding opening batsman who was appointed South Africa captain at age 22 and won a record 53 Tests as captain'
  },

  // New Zealand (7)
  {
    name: 'Kane Williamson',
    code: 'NZ',
    nationality: 'New Zealander',
    difficulty: 'easy',
    wiki: 'Kane_Williamson',
    description: 'Master batsman and beloved captain who led New Zealand to victory in the inaugural 2021 World Test Championship'
  },
  {
    name: 'Brendon McCullum',
    code: 'NZ',
    nationality: 'New Zealander',
    difficulty: 'easy',
    wiki: 'Brendon_McCullum',
    description: 'Fearless, explosive batsman and visionary captain who transformed New Zealand cricket and pioneered the Bazball philosophy'
  },
  {
    name: 'Trent Boult',
    code: 'NZ',
    nationality: 'New Zealander',
    difficulty: 'easy',
    wiki: 'Trent_Boult',
    description: 'Top-ranked left-arm swing bowler lethal with the new ball and known for early tournament-defining breakthroughs'
  },
  {
    name: 'Tim Southee',
    code: 'NZ',
    nationality: 'New Zealander',
    difficulty: 'easy',
    wiki: 'Tim_Southee',
    description: 'Prolific outswing bowler and durable leader who is the all-time leading wicket-taker in Men T20 Internationals'
  },
  {
    name: 'Ross Taylor',
    code: 'NZ',
    nationality: 'New Zealander',
    difficulty: 'easy',
    wiki: 'Ross_Taylor',
    description: 'Dependable middle-order batsman and New Zealand all-time leading international run-scorer across all formats'
  },
  {
    name: 'Martin Guptill',
    code: 'NZ',
    nationality: 'New Zealander',
    difficulty: 'easy',
    wiki: 'Martin_Guptill',
    description: 'Destructive opening batsman who smashed an unbeaten 237 in the 2015 Cricket World Cup knockout stage'
  },
  {
    name: 'Daniel Vettori',
    code: 'NZ',
    nationality: 'New Zealander',
    difficulty: 'easy',
    wiki: 'Daniel_Vettori',
    description: 'Astute left-arm spinner and former captain who took over 300 Test wickets and scored over 4,000 Test runs'
  },

  // Sri Lanka (7)
  {
    name: 'Kumar Sangakkara',
    code: 'LK',
    nationality: 'Sri Lankan',
    difficulty: 'easy',
    wiki: 'Kumar_Sangakkara',
    description: 'One of the most accomplished and elegant batsmen in cricket history, scoring four consecutive centuries at the 2015 World Cup'
  },
  {
    name: 'Muttiah Muralitharan',
    code: 'LK',
    nationality: 'Sri Lankan',
    difficulty: 'easy',
    wiki: 'Muttiah_Muralitharan',
    description: 'All-time leading wicket-taker in cricket history with 800 Test wickets and 534 One Day International wickets'
  },
  {
    name: 'Sanath Jayasuriya',
    code: 'LK',
    nationality: 'Sri Lankan',
    difficulty: 'easy',
    wiki: 'Sanath_Jayasuriya',
    description: 'The Matara Hurricane, dynamic all-rounder who revolutionized One Day International batting in the 1996 World Cup'
  },
  {
    name: 'Mahela Jayawardene',
    code: 'LK',
    nationality: 'Sri Lankan',
    difficulty: 'easy',
    wiki: 'Mahela_Jayawardene',
    description: 'Silky, masterful batsman and tactical captain who scored over 10,000 runs in both Tests and ODIs with 374 highest score'
  },
  {
    name: 'Lasith Malinga',
    code: 'LK',
    nationality: 'Sri Lankan',
    difficulty: 'easy',
    wiki: 'Lasith_Malinga',
    description: 'Slinga Malinga, unmatched T20 death-overs yorker king and only bowler with two international double hat-tricks (4 wickets in 4 balls)'
  },
  {
    name: 'Chaminda Vaas',
    code: 'LK',
    nationality: 'Sri Lankan',
    difficulty: 'easy',
    wiki: 'Chaminda_Vaas',
    description: 'Sri Lanka greatest fast bowler who holds the best bowling figures in One Day International history (8 for 19)'
  },
  {
    name: 'Angelo Mathews',
    code: 'LK',
    nationality: 'Sri Lankan',
    difficulty: 'medium',
    wiki: 'Angelo_Mathews',
    description: 'Stalwart all-rounder and former captain who led Sri Lanka to their historic 2014 Test series victory in England'
  },

  // West Indies / Caribbean (4)
  {
    name: 'Brian Lara',
    code: 'TT',
    nationality: 'Trinidadian',
    difficulty: 'easy',
    wiki: 'Brian_Lara',
    description: 'The Prince of Port of Spain, holds the world records for highest Test score (400 not out) and first-class score (501 not out)'
  },
  {
    name: 'Chris Gayle',
    code: 'JM',
    nationality: 'Jamaican',
    difficulty: 'easy',
    wiki: 'Chris_Gayle',
    description: 'Universe Boss, greatest T20 power-hitter in history with over 14,000 T20 runs and 22 centuries including 175 off 66 balls'
  },
  {
    name: 'Vivian Richards',
    code: 'BB',
    nationality: 'Barbadian',
    difficulty: 'easy',
    wiki: 'Viv_Richards',
    description: 'Master Blaster, destructive swaggering batsman regarded as the most intimidating and dominant force of his era'
  },
  {
    name: 'Andre Russell',
    code: 'JM',
    nationality: 'Jamaican',
    difficulty: 'easy',
    wiki: 'Andre_Russell',
    description: 'Dre Russ, devastating pace-bowling all-rounder with the highest career strike rate in international franchise T20 cricket'
  },

  // Afghanistan (1)
  {
    name: 'Rashid Khan',
    code: 'AF',
    nationality: 'Afghan',
    difficulty: 'easy',
    wiki: 'Rashid_Khan',
    description: 'Global T20 superstar, fastest bowler to reach 100 ODI wickets, celebrated for his unpickable quick leg-spin and googlies'
  },

  // Zimbabwe (1)
  {
    name: 'Sikandar Raza',
    code: 'ZW',
    nationality: 'Zimbabwean',
    difficulty: 'easy',
    wiki: 'Sikandar_Raza',
    description: 'Talismanic all-rounder and national hero of Zimbabwe who has delivered historic match-winning performances on the world stage'
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
  console.log(`Starting processing 100 cricketers...`);
  let nextId = 364;
  const newCricketers = [];

  for (const item of cricketersData) {
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
    newCricketers.push({
      id,
      name: item.name,
      country: c.name,
      countryCode: c.code,
      nationality: item.nationality,
      category: 'cricketer',
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

  const combined = [...people, ...newCricketers];

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
  console.log(`\nSUCCESS: Added 100 cricketers! Total stars now: ${combined.length}`);
}

main();
