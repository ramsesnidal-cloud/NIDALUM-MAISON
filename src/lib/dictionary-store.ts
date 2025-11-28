import { create } from 'zustand';
import { NidalumApprendrelaLangue } from '@/entities';

interface DictionaryFilters {
  searchQuery: string;
  category?: string;
  theme?: string;
  level?: string;
  language?: 'fr' | 'en' | 'de';
}

interface DictionaryState {
  words: NidalumApprendrelaLangue[];
  filteredWords: NidalumApprendrelaLangue[];
  favorites: string[];
  searchHistory: string[];
  filters: DictionaryFilters;
  isLoading: boolean;
  
  // Actions
  setWords: (words: NidalumApprendrelaLangue[]) => void;
  setFilters: (filters: Partial<DictionaryFilters>) => void;
  applyFilters: () => void;
  addFavorite: (wordId: string) => void;
  removeFavorite: (wordId: string) => void;
  isFavorite: (wordId: string) => boolean;
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  setLoading: (loading: boolean) => void;
}

export const useDictionaryStore = create<DictionaryState>((set, get) => ({
  words: [],
  filteredWords: [],
  favorites: [],
  searchHistory: [],
  filters: {
    searchQuery: '',
    language: 'fr',
  },
  isLoading: false,

  setWords: (words) => set({ words }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  applyFilters: () => {
    const { words, filters } = get();
    let filtered = [...words];

    // Search query filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (word) =>
          word.nidalumWord?.toLowerCase().includes(query) ||
          word.definition?.toLowerCase().includes(query) ||
          word.french?.toLowerCase().includes(query) ||
          word.english?.toLowerCase().includes(query) ||
          word.german?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((word) => word.category === filters.category);
    }

    // Theme filter
    if (filters.theme) {
      filtered = filtered.filter((word) => word.theme === filters.theme);
    }

    // Level filter
    if (filters.level) {
      filtered = filtered.filter((word) => word.level === filters.level);
    }

    set({ filteredWords: filtered });
  },

  addFavorite: (wordId) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, wordId])],
    })),

  removeFavorite: (wordId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== wordId),
    })),

  isFavorite: (wordId) => {
    const { favorites } = get();
    return favorites.includes(wordId);
  },

  addSearchHistory: (query) => {
    if (!query.trim()) return;
    set((state) => ({
      searchHistory: [
        query,
        ...state.searchHistory.filter((q) => q !== query),
      ].slice(0, 10),
    }));
  },

  clearSearchHistory: () => set({ searchHistory: [] }),

  setLoading: (loading) => set({ isLoading: loading }),
}));
