import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Language } from './i18n';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  initializeLanguage: () => void;
}

const getDefaultLanguage = (): Language => {
  // Check localStorage first
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('nidalum-language');
    if (saved === 'fr' || saved === 'en' || saved === 'de') {
      return saved;
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'fr') return 'fr';
    if (browserLang === 'de') return 'de';
    if (browserLang === 'en') return 'en';
  }

  // Default to French
  return 'fr';
};

export const useLanguageStore = create<LanguageStore>()(
  subscribeWithSelector((set) => ({
    language: 'fr',
    setLanguage: (lang: Language) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('nidalum-language', lang);
      }
      set({ language: lang });
    },
    initializeLanguage: () => {
      const lang = getDefaultLanguage();
      set({ language: lang });
    },
  }))
);
