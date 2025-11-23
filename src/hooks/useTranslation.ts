import { useLanguageStore } from '@/lib/language-store';
import { getTranslation } from '@/lib/i18n';

export const useTranslation = () => {
  const { language } = useLanguageStore();

  const t = (path: string): string => {
    return getTranslation(language, path);
  };

  return { t, language };
};
