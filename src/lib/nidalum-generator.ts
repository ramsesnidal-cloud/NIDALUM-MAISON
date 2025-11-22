/**
 * Nidalum Word Generator
 * Generates coherent Nidalum words based on linguistic patterns
 */

const CONSONANTS = ['k', 'n', 'd', 'r', 's', 't', 'l', 'm', 'sh', 'th', 'ph'];
const VOWELS = ['a', 'e', 'i', 'o', 'u', 'ā', 'ē', 'ī', 'ō', 'ū'];
const SUFFIXES = ['um', 'an', 'en', 'tō', 'sha', 'ra', 'shi', 'ren', 'tē'];

const CATEGORIES = [
  'Cosmologie',
  'Spiritualité',
  'Nature',
  'Émotion',
  'Action',
  'Objet',
  'Concept',
  'Rituel'
];

const THEMES = [
  'Souma-Ra',
  'Divinité',
  'Transformation',
  'Sagesse',
  'Harmonie',
  'Mystère',
  'Énergie',
  'Connexion'
];

export function generateNidalumWord(): string {
  let word = '';
  const syllables = Math.floor(Math.random() * 3) + 2; // 2-4 syllables

  for (let i = 0; i < syllables; i++) {
    const consonant = CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
    const vowel = VOWELS[Math.floor(Math.random() * VOWELS.length)];
    word += consonant + vowel;
  }

  // Add suffix for some words
  if (Math.random() > 0.5) {
    word += '-' + SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
  }

  return word;
}

export function generatePronunciationGuide(word: string): string {
  // Simplified pronunciation guide based on the word
  return word.toLowerCase().replace(/[āēīōū]/g, (char) => {
    const map: Record<string, string> = {
      'ā': 'ah', 'ē': 'eh', 'ī': 'ee', 'ō': 'oh', 'ū': 'oo'
    };
    return map[char] || char;
  });
}

export function generateDefinition(word: string, category: string): string {
  const definitions: Record<string, string[]> = {
    'Cosmologie': [
      'Aspect de l\'univers cosmique',
      'Force céleste primordiale',
      'Manifestation de l\'ordre universel',
      'Principe cosmique fondamental'
    ],
    'Spiritualité': [
      'Connexion avec le divin',
      'Essence spirituelle profonde',
      'Chemin vers l\'illumination',
      'Sagesse ancestrale'
    ],
    'Nature': [
      'Élément naturel sacré',
      'Force de la création',
      'Manifestation terrestre',
      'Cycle de la vie'
    ],
    'Émotion': [
      'État de l\'âme',
      'Sentiment profond',
      'Vibration émotionnelle',
      'Résonance intérieure'
    ],
    'Action': [
      'Acte de transformation',
      'Mouvement sacré',
      'Manifestation de volonté',
      'Processus de création'
    ],
    'Objet': [
      'Artefact sacré',
      'Outil de rituel',
      'Symbole cosmique',
      'Objet de pouvoir'
    ],
    'Concept': [
      'Idée universelle',
      'Principe abstrait',
      'Vérité cosmique',
      'Sagesse intemporelle'
    ],
    'Rituel': [
      'Cérémonie sacrée',
      'Pratique spirituelle',
      'Acte de communion',
      'Invocation divine'
    ]
  };

  const categoryDefs = definitions[category] || definitions['Concept'];
  return categoryDefs[Math.floor(Math.random() * categoryDefs.length)];
}

export function generateExampleSentence(word: string): string {
  const patterns = [
    `${word} souma-ra kēla`,
    `Nidar ${word}-an kēla-shi`,
    `${word}-tō souma-ra-en`,
    `Kēla ${word} souma-ra-sha`,
    `${word} ren kēla-ren`
  ];

  return patterns[Math.floor(Math.random() * patterns.length)];
}

export function generateEtymology(word: string, theme: string): string {
  const etymologies = [
    `Dérivé de racines anciennes liées à ${theme}`,
    `Composé de éléments primaires de ${theme}`,
    `Évolution linguistique du concept de ${theme}`,
    `Fusion de termes sacrés de ${theme}`,
    `Manifestation verbale de ${theme}`
  ];

  return etymologies[Math.floor(Math.random() * etymologies.length)];
}

export function getRandomCategory(): string {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
}

export function getRandomTheme(): string {
  return THEMES[Math.floor(Math.random() * THEMES.length)];
}

export function generateCompleteWord(overrides?: {
  category?: string;
  theme?: string;
}) {
  const word = generateNidalumWord();
  const category = overrides?.category || getRandomCategory();
  const theme = overrides?.theme || getRandomTheme();

  return {
    nidalumWord: word,
    definition: generateDefinition(word, category),
    category,
    theme,
    pronunciationGuide: generatePronunciationGuide(word),
    exampleSentence: generateExampleSentence(word),
    etymology: generateEtymology(word, theme)
  };
}
