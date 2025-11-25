import { useState, useRef, useEffect } from 'react';
import { useLanguageStore } from '@/lib/language-store';
import { languages, Language } from '@/lib/i18n';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((l) => l.code === language);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // If less than 200px below, show dropdown above
    if (spaceBelow < 200 && spaceAbove > 200) {
      setDropdownPosition('top');
    } else {
      setDropdownPosition('bottom');
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-foreground hover:text-primary hover:bg-primary/10 transition-colors font-paragraph text-sm whitespace-nowrap"
      >
        <span>{currentLanguage?.name}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: dropdownPosition === 'bottom' ? -8 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dropdownPosition === 'bottom' ? -8 : 8 }}
            className={`absolute ${dropdownPosition === 'bottom' ? 'top-full' : 'bottom-full'} right-0 ${dropdownPosition === 'bottom' ? 'mt-2' : 'mb-2'} w-40 bg-background border border-primary/20 rounded-md shadow-lg z-50`}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-3 font-paragraph text-sm transition-colors ${
                  language === lang.code
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
