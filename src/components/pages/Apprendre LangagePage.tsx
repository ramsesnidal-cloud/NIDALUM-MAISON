import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { NidalumApprendrelaLangue } from '@/entities';
import { useLanguageStore } from '@/lib/language-store';

export default function ApprendreLangagePage() {
  const { language } = useLanguageStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<NidalumApprendrelaLangue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWord, setSelectedWord] = useState<NidalumApprendrelaLangue | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<NidalumApprendrelaLangue>('nidalumlexicon');
      setItems(items || []);
    } catch (error) {
      console.error('Error loading language items:', error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(items.map(item => item.category).filter(Boolean))
    );
    return ['all', ...uniqueCategories];
  }, [items]);

  const filteredItems = useMemo(() => {
    let filtered = items;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.nidalumWord?.toLowerCase().includes(lowerSearch) ||
        item.definition?.toLowerCase().includes(lowerSearch) ||
        item.traduction_fr?.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [items, searchTerm, selectedCategory]);

  const title = language === 'fr' ? 'Nidalum – Apprendre la Langue' :
    language === 'de' ? 'Nidalum – Die Sprache lernen' :
    'Nidalum – Learn the Language';

  return (
    <div className="min-h-screen bg-black text-white font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading text-6xl md:text-7xl tracking-widest mb-8 font-light">
            THE LANGUAGE
          </h1>
          <p className="text-base md:text-lg tracking-wide text-stone-400 mb-4">
            {language === 'fr' ? 'Découvrez les fondamentaux de la langue Nidalum' :
              language === 'de' ? 'Entdecken Sie die Grundlagen der Nidalum-Sprache' :
              'Discover the fundamentals of the Nidalum language'}
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-12"></div>
        </motion.div>
      </section>

      {/* Search and Filter Section */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 w-4 h-4" />
              <input
                type="text"
                placeholder={language === 'fr' ? 'Rechercher un mot...' : language === 'de' ? 'Ein Wort suchen...' : 'Search a word...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-transparent border-b border-white border-opacity-30 focus:border-opacity-100 text-white placeholder-stone-600 focus:outline-none transition-all duration-300 text-sm tracking-wide"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500 mb-4 block">
                {language === 'fr' ? 'Catégories' : language === 'de' ? 'Kategorien' : 'Categories'}
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300 ${
                      selectedCategory === cat
                        ? 'bg-white text-black border border-white'
                        : 'border border-white border-opacity-30 hover:border-opacity-100'
                    }`}
                  >
                    {cat === 'all' ? (language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All') : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <p className="text-xs text-stone-500 tracking-wide">
              {filteredItems.length} {language === 'fr' ? 'mot' : language === 'de' ? 'Wort' : 'word'}{filteredItems.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Words Grid */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-40 bg-stone-900 rounded-sm animate-pulse"></div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((word, index) => (
                <motion.div
                  key={word._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedWord(word)}
                  className="group cursor-pointer border border-white border-opacity-20 p-6 hover:border-opacity-100 transition-all duration-500"
                >
                  <h3 className="font-heading text-xl tracking-widest mb-2 font-light group-hover:text-stone-300 transition-colors">
                    {word.nidalumWord}
                  </h3>
                  <p className="text-xs tracking-widest uppercase text-stone-600 mb-3">
                    {word.category}
                  </p>
                  <p className="text-sm tracking-wide text-stone-400 line-clamp-2">
                    {word.definition}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-stone-500 tracking-wide">
                {language === 'fr' ? 'Aucun mot trouvé' : language === 'de' ? 'Keine Wörter gefunden' : 'No words found'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Word Detail Modal */}
      {selectedWord && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedWord(null)}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-stone-950 border border-white border-opacity-20 p-8 md:p-12 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h2 className="font-heading text-4xl tracking-widest font-light mb-2">
                  {selectedWord.nidalumWord}
                </h2>
                {selectedWord.category && (
                  <p className="text-xs tracking-widest uppercase text-stone-600">
                    {selectedWord.category}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedWord(null)}
                className="text-2xl hover:opacity-50 transition-opacity ml-4 flex-shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 border-t border-white border-opacity-10 pt-8">
              {selectedWord.definition && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                    {language === 'fr' ? 'Définition' : language === 'de' ? 'Definition' : 'Definition'}
                  </h3>
                  <p className="text-base tracking-wide text-stone-300">
                    {selectedWord.definition}
                  </p>
                </div>
              )}

              {selectedWord.traduction_fr && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                    Traduction FR
                  </h3>
                  <p className="text-base tracking-wide text-stone-300">
                    {selectedWord.traduction_fr}
                  </p>
                </div>
              )}

              {selectedWord.traductionEn && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                    Translation EN
                  </h3>
                  <p className="text-base tracking-wide text-stone-300">
                    {selectedWord.traductionEn}
                  </p>
                </div>
              )}

              {selectedWord.traductionDe && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                    Übersetzung DE
                  </h3>
                  <p className="text-base tracking-wide text-stone-300">
                    {selectedWord.traductionDe}
                  </p>
                </div>
              )}

              {selectedWord.pronunciationGuide && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                    {language === 'fr' ? 'Guide de prononciation' : language === 'de' ? 'Ausspracheführer' : 'Pronunciation Guide'}
                  </h3>
                  <p className="text-base tracking-wide text-stone-300">
                    {selectedWord.pronunciationGuide}
                  </p>
                </div>
              )}

              {selectedWord.exampleSentence && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                    {language === 'fr' ? 'Exemple' : language === 'de' ? 'Beispiel' : 'Example'}
                  </h3>
                  <p className="text-base tracking-wide text-stone-300 italic">
                    {selectedWord.exampleSentence}
                  </p>
                </div>
              )}

              {selectedWord.etymology && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                    {language === 'fr' ? 'Étymologie' : language === 'de' ? 'Etymologie' : 'Etymology'}
                  </h3>
                  <p className="text-base tracking-wide text-stone-300">
                    {selectedWord.etymology}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedWord(null)}
              className="mt-8 w-full text-xs tracking-widest uppercase border border-white border-opacity-50 px-6 py-3 hover:border-opacity-100 hover:bg-white hover:text-black transition-all duration-500"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
