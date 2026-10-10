import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'public/images/people');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const rawName = req.body.name || 'celebrity';
    const slug = rawName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'star';
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const uniqueSuffix = Date.now();
    cb(null, `${slug}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|avif|svg/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    const mime = file.mimetype.toLowerCase();
    if (allowed.test(ext) || allowed.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WebP, AVIF, SVG) are allowed!'));
    }
  }
});

const peopleFilePath = path.join(__dirname, 'src/data/people.json');
const countriesFilePath = path.join(__dirname, 'src/data/countries.json');

function getPeople() {
  try {
    const data = fs.readFileSync(peopleFilePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function savePeople(people) {
  fs.writeFileSync(peopleFilePath, JSON.stringify(people, null, 2), 'utf8');
}

function getCountries() {
  try {
    const data = fs.readFileSync(countriesFilePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// GET all countries
app.get('/api/countries', (req, res) => {
  res.json(getCountries());
});

// GET all people
app.get('/api/people', (req, res) => {
  res.json(getPeople());
});

// POST upload new celebrity
app.post('/api/upload-celebrity', upload.single('photo'), (req, res) => {
  try {
    const { name, category, countryCode, difficulty = 'easy', description = '' } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Celebrity name is required!' });
    }
    if (!category) {
      return res.status(400).json({ error: 'Category is required!' });
    }
    if (!countryCode) {
      return res.status(400).json({ error: 'Country selection is required!' });
    }

    const countries = getCountries();
    const country = countries.find(c => c.code === countryCode.toUpperCase()) || {
      code: countryCode.toUpperCase(),
      name: countryCode,
      flag: '🌐',
      capital: '—'
    };

    let imagePath = '';
    if (req.file) {
      imagePath = `/images/people/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imagePath = req.body.imageUrl.trim();
    } else {
      const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      imagePath = `/images/people/${slug}.jpg`;
    }

    const newPerson = {
      id: req.body.id || `custom-${Date.now()}`,
      name: name.trim(),
      category: category.trim(),
      country: country.name,
      countryCode: country.code,
      flag: country.flag,
      capital: country.capital,
      image: imagePath,
      difficulty,
      description: description.trim()
    };

    const people = getPeople();
    const existingIndex = people.findIndex(
      p => (req.body.id && p.id === req.body.id) || p.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    let personToReturn;
    if (existingIndex !== -1) {
      const existing = people[existingIndex];
      personToReturn = {
        ...existing,
        ...newPerson,
        id: existing.id
      };
      people[existingIndex] = personToReturn;
      console.log(`[Backend] Updated existing celebrity: "${personToReturn.name}" (${personToReturn.country}) - Image: ${imagePath}`);
    } else {
      people.unshift(newPerson);
      personToReturn = newPerson;
      console.log(`[Backend] Added new celebrity: "${newPerson.name}" (${newPerson.country}) - Image: ${imagePath}`);
    }

    savePeople(people);

    res.json({
      success: true,
      message: `"${personToReturn.name}" successfully saved to the quiz database!`,
      person: personToReturn
    });
  } catch (err) {
    console.error('[Backend Error]', err);
    res.status(500).json({ error: err.message || 'Server error while adding celebrity' });
  }
});

// DELETE a celebrity
app.delete('/api/people/:id', (req, res) => {
  try {
    const { id } = req.params;
    let people = getPeople();
    const initialLen = people.length;
    people = people.filter(p => p.id !== id);

    if (people.length === initialLen) {
      return res.status(404).json({ error: 'Person not found' });
    }

    savePeople(people);
    res.json({ success: true, message: 'Person deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve public static assets
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`🚀 Quiz Game Backend API running at http://localhost:${PORT}`);
});
