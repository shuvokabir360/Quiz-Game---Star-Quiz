import { describe, it, expect } from 'vitest';
import { generateAvatarDataUrl, loadPersonImage } from '../utils/imageLoader.js';
import { validatePerson, validatePeopleDataset } from '../utils/validation.js';
import { SafeStorage } from '../utils/storage.js';

describe('Error Handling and System Resilience', () => {
  it('Requirement 12: Missing image handling generates fallback without throwing', async () => {
    const personWithMissingImage = {
      id: 'missing-01',
      name: 'Mystery Hero',
      category: 'actor',
      flag: '🌐',
      image: 'https://non-existent-domain-404-xyz.com/image.jpg'
    };

    // Synchronous fallback generation
    const fallbackUrl = generateAvatarDataUrl(personWithMissingImage);
    expect(fallbackUrl).toContain('data:image/svg+xml');
    expect(fallbackUrl).toContain('Mystery%20Hero');

    // Async loader
    const loadedSrc = await loadPersonImage(personWithMissingImage, 100);
    expect(loadedSrc).toBeDefined();
    expect(typeof loadedSrc).toBe('string');
  });

  it('Requirement 13: Invalid JSON and schema handling catches errors cleanly', () => {
    // Missing required fields
    const invalidPerson = {
      id: 'invalid-1',
      name: '' // Missing name
    };
    const res = validatePerson(invalidPerson);
    expect(res.valid).toBe(false);
    expect(res.errors.length).toBeGreaterThan(0);

    // Non-array dataset
    const invalidDataset = 'not an array';
    const datasetRes = validatePeopleDataset(invalidDataset);
    expect(datasetRes.valid).toBe(false);
  });

  it('Requirement 14: LocalStorage failures fallback safely to in-memory store', () => {
    // Instantiate SafeStorage and force isStorageAvailable to false
    const fallbackStorage = new SafeStorage();
    fallbackStorage.isStorageAvailable = false;

    const testKey = 'test_setting_key';
    const testVal = { darkMode: true, sound: false };

    fallbackStorage.setItem(testKey, testVal);
    const retrieved = fallbackStorage.getItem(testKey);

    expect(retrieved).toEqual(testVal);
  });
});
