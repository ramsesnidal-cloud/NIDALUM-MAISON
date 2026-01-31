import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserPlus, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '@/lib/language-store';
import { getTranslation } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useMember } from '@/integrations';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language } = useLanguageStore();
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    useLanguageStore.getState().initializeLanguage();
  }, []);

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
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: 'HOME', href: '/' },
    { name: 'PORTFOLIO', href: '/portfolio' },
    { name: 'CINEMA', href: '/videos' },
    { 
      name: 'LANGUAGE', 
      href: '/alphabet',
      submenu: [
        { name: 'ALPHABET', href: '/alphabet' },
        { name: 'GRAMMAR', href: '/grammar' },
        { name: 'PHONETICS', href: '/phonetics' },
        { name: 'LEXICON', href: '/lexicon' },
        { name: 'LEXICAL ARCHIVES', href: '/lexical-archives' },
        { name: 'LINGUISTIC REPERTOIRE', href: '/repertoire-linguistique' },
        { name: 'NIDALUM GRAMMAR', href: '/grammaire-nidalum' },
        { name: 'COMPLETE LEXICON', href: '/grand-lexique' },
        { name: 'COMPLETE DICTIONARY', href: '/dictionary' },
      ]
    },
    { 
      name: 'SPIRITUALITY', 
      href: '/chants',
      submenu: [
        { name: 'RITUAL CHANTS', href: '/chants' },
        { name: 'ORIGINS', href: '/origins' },
      ]
    },
    { name: 'PUBLICATIONS', href: '/publications' },
    { name: 'RESOURCES', href: '/resources' },
    { name: 'THE ARCHITECT', href: '/author' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-luxury-gold/20">
      <nav className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
            <div className="w-8 sm:w-10 h-8 sm:h-10 border border-luxury-gold flex items-center justify-center flex-shrink-0">
              <span className="text-luxury-gold font-heading font-bold text-lg sm:text-xl">◆</span>
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-heading text-lg sm:text-xl text-luxury-gold tracking-wider">NIDALUM</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12 xl:space-x-16">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={`font-paragraph text-sm tracking-wide transition-colors ${
                    isActive(item.href)
                      ? 'text-luxury-gold'
                      : 'text-luxury-text hover:text-luxury-gold'
                  }`}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-black border border-luxury-gold/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        to={subitem.href}
                        className={`block px-4 py-3 font-paragraph text-sm transition-colors ${
                          isActive(subitem.href)
                            ? 'text-luxury-gold bg-luxury-gold/10'
                            : 'text-luxury-text hover:text-luxury-gold hover:bg-luxury-gold/5'
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
                  className="flex items-center gap-2 text-luxury-text hover:text-luxury-gold transition-colors"
                >
                  <User size={18} />
                  {member?.profile?.nickname || 'PROFILE'}
                </Link>
                <button
                  onClick={() => actions.logout()}
                  className="flex items-center gap-2 border border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold hover:text-black px-4 py-2 transition-colors"
                >
                  <LogOut size={18} />
                  SIGN OUT
                </button>
              </div>
            ) : (
              <Link
                to="/signup"
                className="flex items-center gap-2 border border-luxury-gold text-luxury-gold font-paragraph font-semibold px-4 py-2 hover:bg-luxury-gold hover:text-black transition-all duration-300"
              >
                <UserPlus className="w-4 h-4" />
                SIGN UP
              </Link>
            )}
          </div>

          {/* Mobile Menu Button & Language Switcher */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-luxury-text hover:text-luxury-gold transition-colors p-2"
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
              <div className="py-4 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto bg-black/50">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => !item.submenu && setIsOpen(false)}
                      className={`block px-4 py-3 font-paragraph text-sm transition-colors ${
                        isActive(item.href)
                          ? 'text-luxury-gold bg-luxury-gold/10'
                          : 'text-luxury-text hover:text-luxury-gold'
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
                                ? 'text-luxury-gold'
                                : 'text-luxury-text/70 hover:text-luxury-gold'
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
                      className="flex items-center gap-2 mx-4 mt-4 px-4 py-3 border border-luxury-gold/50 text-luxury-gold font-paragraph font-semibold hover:bg-luxury-gold/10 transition-all duration-300"
                    >
                      <User className="w-4 h-4" />
                      {member?.profile?.nickname || 'PROFILE'}
                    </Link>
                    <button
                      onClick={() => {
                        actions.logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 mx-4 mt-2 w-[calc(100%-2rem)] border border-red-500/50 text-red-400 font-paragraph font-semibold px-4 py-3 hover:bg-red-500/10 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4" />
                      SIGN OUT
                    </button>
                  </>
                ) : (
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 mx-4 mt-4 border border-luxury-gold text-luxury-gold font-paragraph font-semibold px-4 py-3 hover:bg-luxury-gold hover:text-black transition-all duration-300"
                  >
                    <UserPlus className="w-4 h-4" />
                    SIGN UP
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
