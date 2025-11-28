import { BaseCrudService } from '@/integrations';
import { NidalumApprendrelaLangue } from '@/entities';

/**
 * Service API unifié pour accéder aux données du dictionnaire
 */
export class DictionaryApiService {
  static async getAllWords(): Promise<NidalumApprendrelaLangue[]> {
    const { items } = await BaseCrudService.getAll<NidalumApprendrelaLangue>(
      'nidalumlexicon'
    );
    return items || [];
  }

  static async getWordById(
    wordId: string
  ): Promise<NidalumApprendrelaLangue | null> {
    const word = await BaseCrudService.getById<NidalumApprendrelaLangue>(
      'nidalumlexicon',
      wordId
    );
    return word || null;
  }

  static async searchWords(query: string): Promise<NidalumApprendrelaLangue[]> {
    const words = await this.getAllWords();
    const lowerQuery = query.toLowerCase();

    return words.filter(
      (word) =>
        word.nidalumWord?.toLowerCase().includes(lowerQuery) ||
        word.definition?.toLowerCase().includes(lowerQuery) ||
        word.french?.toLowerCase().includes(lowerQuery) ||
        word.english?.toLowerCase().includes(lowerQuery) ||
        word.german?.toLowerCase().includes(lowerQuery)
    );
  }

  static getCategories(words: NidalumApprendrelaLangue[]): string[] {
    const categories = new Set<string>();
    words.forEach((word) => {
      if (word.category) categories.add(word.category);
    });
    return Array.from(categories).sort();
  }

  static getThemes(words: NidalumApprendrelaLangue[]): string[] {
    const themes = new Set<string>();
    words.forEach((word) => {
      if (word.theme) themes.add(word.theme);
    });
    return Array.from(themes).sort();
  }

  static getLevels(words: NidalumApprendrelaLangue[]): string[] {
    const levels = new Set<string>();
    words.forEach((word) => {
      if (word.level) levels.add(word.level);
    });
    return Array.from(levels).sort();
  }
}

/**
 * Service pour le tuteur IA
 * Nécessite une clé OpenAI dans les variables d'environnement
 */
export class AITutorService {
  private static apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  private static apiUrl = 'https://api.openai.com/v1/chat/completions';

  static async chat(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error(
        'OpenAI API key not configured. Set VITE_OPENAI_API_KEY in .env'
      );
    }

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an expert Nidalum language tutor. Help users learn the Nidalum language with clear explanations, examples, and exercises. Be encouraging and adapt to the user's level.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  static async generateExercise(
    topic: string,
    level: string
  ): Promise<{
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
  }> {
    const prompt = `Generate a Nidalum language exercise about "${topic}" at ${level} level. 
    Return a JSON object with: question, options (array of 4 options for multiple choice), correctAnswer, explanation.
    Format: {"question": "...", "options": ["...", "...", "...", "..."], "correctAnswer": "...", "explanation": "..."}`;

    const response = await this.chat([{ role: 'user', content: prompt }]);

    try {
      return JSON.parse(response);
    } catch {
      throw new Error('Failed to parse exercise response');
    }
  }

  static async correctExercise(
    question: string,
    userAnswer: string,
    correctAnswer: string
  ): Promise<{
    isCorrect: boolean;
    feedback: string;
    explanation: string;
  }> {
    const prompt = `The user answered "${userAnswer}" to the question: "${question}". The correct answer is "${correctAnswer}".
    Provide feedback in JSON format: {"isCorrect": boolean, "feedback": "...", "explanation": "..."}`;

    const response = await this.chat([{ role: 'user', content: prompt }]);

    try {
      return JSON.parse(response);
    } catch {
      throw new Error('Failed to parse correction response');
    }
  }
}
