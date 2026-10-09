/**
 * Multiple choice option generation and answer evaluation.
 */

export class AnswerController {
  constructor(countries = []) {
    this.countries = countries;
  }

  setCountries(countries) {
    this.countries = Array.isArray(countries) ? countries : [];
  }

  /**
   * Generates 4 choices: 1 correct + 3 distinct valid incorrect countries.
   */
  generateChoices(person, language = 'en') {
    if (!person || this.countries.length === 0) return [];

    const correctCountry = this.countries.find(
      c => c.code === person.countryCode || c.name.toLowerCase() === person.country.toLowerCase()
    ) || {
      code: person.countryCode,
      name: person.country,
      nameBn: person.country,
      flag: person.flag,
      capital: person.capital
    };

    // Filter out the correct country to find candidates for distractors
    const candidates = this.countries.filter(
      c => c.code !== correctCountry.code && c.name.toLowerCase() !== correctCountry.name.toLowerCase()
    );

    // Shuffle and pick 3
    const shuffledDistractors = [...candidates].sort(() => Math.random() - 0.5);
    const chosenDistractors = shuffledDistractors.slice(0, 3);

    // Combine and shuffle the 4 choices
    const allFour = [
      {
        code: correctCountry.code,
        name: language === 'bn' ? correctCountry.nameBn : correctCountry.name,
        flag: correctCountry.flag,
        isCorrect: true
      },
      ...chosenDistractors.map(c => ({
        code: c.code,
        name: language === 'bn' ? c.nameBn : c.name,
        flag: c.flag,
        isCorrect: false
      }))
    ];

    // Shuffle final options
    return allFour.sort(() => Math.random() - 0.5);
  }

  evaluateChoice(selectedChoice, person) {
    if (!selectedChoice || !person) return false;
    return (
      selectedChoice.isCorrect === true ||
      selectedChoice.code === person.countryCode ||
      selectedChoice.name.toLowerCase() === person.country.toLowerCase()
    );
  }
}
