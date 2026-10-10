/**
 * Validation utilities for people and country datasets.
 */

export const VALID_CATEGORIES = [
  'footballer',
  'cricketer',
  'sports',
  'actor',
  'singer',
  'youtuber',
  'influencer',
  'leader',
  'politician',
  'gov_head',
  'historical',
  'scientist',
  'poet',
  'hero'
];

export const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];

export function validatePerson(person, existingIds = new Set()) {
  const errors = [];

  if (!person || typeof person !== 'object') {
    return { valid: false, errors: ['Person record must be an object'] };
  }

  if (!person.id || typeof person.id !== 'string' || !person.id.trim()) {
    errors.push('Missing or invalid person ID');
  } else if (existingIds.has(person.id)) {
    errors.push(`Duplicate ID: ${person.id}`);
  }

  if (!person.name || typeof person.name !== 'string' || !person.name.trim()) {
    errors.push('Missing or invalid name');
  }

  if (!person.country || typeof person.country !== 'string' || !person.country.trim()) {
    errors.push('Missing or invalid country');
  }

  if (!person.countryCode || typeof person.countryCode !== 'string' || !/^[A-Z]{2}$/.test(person.countryCode)) {
    errors.push(`Invalid countryCode "${person.countryCode}". Must be 2-letter uppercase ISO code.`);
  }

  if (!VALID_CATEGORIES.includes(person.category)) {
    errors.push(`Invalid category "${person.category}". Allowed: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (!VALID_DIFFICULTIES.includes(person.difficulty)) {
    errors.push(`Invalid difficulty "${person.difficulty}". Allowed: ${VALID_DIFFICULTIES.join(', ')}`);
  }

  if (!person.image || typeof person.image !== 'string') {
    errors.push('Missing or invalid image path');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validatePeopleDataset(dataset) {
  if (!Array.isArray(dataset)) {
    return { valid: false, errors: ['Dataset must be an array of person objects'], count: 0 };
  }

  const errors = [];
  const ids = new Set();
  const names = new Set();

  dataset.forEach((person, index) => {
    const res = validatePerson(person, ids);
    if (!res.valid) {
      errors.push(`Item ${index} (${person?.name || 'unknown'}): ${res.errors.join('; ')}`);
    } else {
      ids.add(person.id);
    }

    if (person && person.name) {
      const lower = person.name.toLowerCase().trim();
      if (names.has(lower)) {
        errors.push(`Duplicate person name: "${person.name}" at index ${index}`);
      }
      names.add(lower);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    count: dataset.length
  };
}
