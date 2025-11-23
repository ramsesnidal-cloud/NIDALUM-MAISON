import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '@/lib/language-store';
import { getTranslation } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language } = useLanguageStore();

  useEffect(() => {
    useLanguageStore.getState().initializeLanguage();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: getTranslation(language, 'nav.home'), href: '/' },
    { 
      name: getTranslation(language, 'nav.language'), 
      href: '/alphabet',
      submenu: [
        { name: getTranslation(language, 'nav.alphabet'), href: '/alphabet' },
        { name: getTranslation(language, 'nav.grammar'), href: '/grammar' },
        { name: getTranslation(language, 'nav.phonetics'), href: '/phonetics' },
        { name: getTranslation(language, 'nav.lexicon'), href: '/lexicon' },
      ]
    },
    { 
      name: getTranslation(language, 'nav.spirituality'), 
      href: '/chants',
      submenu: [
        { name: getTranslation(language, 'nav.chants'), href: '/chants' },
        { name: getTranslation(language, 'nav.origins'), href: '/origins' },
      ]
    },
    { name: getTranslation(language, 'nav.academy'), href: '/academy' },
    { name: getTranslation(language, 'nav.publications'), href: '/publications' },
    { name: getTranslation(language, 'nav.resources'), href: '/resources' },
    { name: getTranslation(language, 'nav.author'), href: '/author' },
    { name: getTranslation(language, 'nav.contact'), href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
      <nav className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-background font-heading font-bold text-xl">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl text-primary tracking-wider">NIDALUM</span>
              <span className="font-paragraph text-xs text-secondary tracking-widest">LANGUAGE INSTITUTE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={`font-paragraph text-sm tracking-wide transition-colors ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-primary/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        to={subitem.href}
                        className={`block px-4 py-3 font-paragraph text-sm transition-colors ${
                          isActive(subitem.href)
                            ? 'text-primary bg-primary/10'
                            : 'text-foreground hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Sign Up Button */}
            <Link
              to="/signup"
              className="flex items-center gap-2 bg-secondary text-background font-paragraph font-semibold px-4 py-2 hover:bg-secondary/90 transition-all duration-300"
            >
              <UserPlus className="w-4 h-4" />
              {getTranslation(language, 'nav.signup')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => !item.submenu && setIsOpen(false)}
                      className={`block px-4 py-3 font-paragraph text-sm transition-colors ${
                        isActive(item.href)
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="pl-4 space-y-1 mt-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            to={subitem.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 font-paragraph text-xs transition-colors ${
                              isActive(subitem.href)
                                ? 'text-secondary'
                                : 'text-foreground/70 hover:text-secondary'
                            }`}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Sign Up Button */}
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 mx-4 mt-4 bg-secondary text-background font-paragraph font-semibold px-4 py-3 hover:bg-secondary/90 transition-all duration-300"
                >
                  <UserPlus className="w-4 h-4" />
                  {getTranslation(language, 'nav.signup')}
                </Link>

                {/* Mobile Language Switcher */}
                <div className="mx-4 mt-4 pt-4 border-t border-primary/20">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
