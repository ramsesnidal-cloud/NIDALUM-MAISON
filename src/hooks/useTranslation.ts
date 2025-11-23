import { useLanguageStore } from '@/lib/language-store';
import { getTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export const useTranslation = () => {
  const { language } = useLanguageStore();
  const [, setRenderTrigger] = useState(0);

  // Subscribe to language changes and trigger re-render
  useEffect(() => {
    const unsubscribe = useLanguageStore.subscribe(
      (state) => state.language,
      () => {
        setRenderTrigger((prev) => prev + 1);
      }
    );

    return () => unsubscribe();
  }, []);

  const t = (path: string): string => {
    return getTranslation(language, path);
  };

  return { t, language };
};
