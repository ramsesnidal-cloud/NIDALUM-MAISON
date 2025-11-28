import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, UserPlus, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '@/lib/language-store';
import { getTranslation } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMember } from '@/integrations';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const location = useLocation();
  const { language } = useLanguageStore();
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    useLanguageStore.getState().initializeLanguage();
  }, []);

  // Subscribe to language changes
  useEffect(() => {
    const unsubscribe = useLanguageStore.subscribe(
      (state) => state.language,
      () => {
        setRenderTrigger((prev) => prev + 1);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setExpandedMenu(null);
  }, [location.pathname]);

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
        { name: getTranslation(language, 'nav.lexicalArchives'), href: '/lexical-archives' },
        { name: language === 'fr' ? 'Grand Lexique' : language === 'de' ? 'Großes Lexikon' : 'Complete Lexicon', href: '/grand-lexique' },
        { name: language === 'fr' ? 'Dictionnaire complet' : language === 'de' ? 'Vollständiges Wörterbuch' : 'Complete Dictionary', href: '/dictionary' },
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
    { name: language === 'fr' ? 'Tuteur IA' : language === 'de' ? 'KI-Tutor' : 'AI Tutor', href: '/ai-tutor' },
    { name: getTranslation(language, 'nav.academy'), href: '/academy' },
    { name: getTranslation(language, 'nav.publications'), href: '/publications' },
    { name: getTranslation(language, 'nav.resources'), href: '/resources' },
    { name: getTranslation(language, 'nav.author'), href: '/author' },
    { name: getTranslation(language, 'nav.contact'), href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
      <nav className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-background font-heading font-bold text-lg sm:text-xl">N</span>
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-heading text-lg sm:text-xl text-primary tracking-wider">NIDALUM</span>
              <span className="font-paragraph text-xs text-secondary tracking-widest">LANGUAGE INSTITUTE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
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

            {/* Auth Section */}
            {isLoading ? null : isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <User size={18} />
                  {member?.profile?.nickname || 'Profil'}
                </Link>
                <button
                  onClick={() => actions.logout()}
                  className="flex items-center gap-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 px-4 py-2 transition-colors"
                >
                  <LogOut size={18} />
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-secondary text-background font-paragraph font-semibold px-4 py-2 hover:bg-secondary/90 transition-all duration-300"
              >
                <UserPlus className="w-4 h-4" />
                {getTranslation(language, 'nav.signup')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button & Language Switcher */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
              <div className="py-4 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
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
                
                {/* Mobile Auth Section */}
                {isLoading ? null : isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 mx-4 mt-4 px-4 py-3 bg-primary/20 text-primary font-paragraph font-semibold hover:bg-primary/30 transition-all duration-300"
                    >
                      <User className="w-4 h-4" />
                      {member?.profile?.nickname || 'Profil'}
                    </Link>
                    <button
                      onClick={() => {
                        actions.logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 mx-4 mt-2 w-[calc(100%-2rem)] bg-red-600/20 text-red-400 font-paragraph font-semibold px-4 py-3 hover:bg-red-600/30 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 mx-4 mt-4 bg-secondary text-background font-paragraph font-semibold px-4 py-3 hover:bg-secondary/90 transition-all duration-300"
                  >
                    <UserPlus className="w-4 h-4" />
                    {getTranslation(language, 'nav.signup')}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
