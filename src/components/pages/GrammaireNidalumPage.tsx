import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { RglesdeGrammaireNidalum } from '@/entities';
import { useLanguageStore } from '@/lib/language-store';
import { getTranslation } from '@/lib/i18n';

export default function GrammaireNidalumPage() {
  const { language } = useLanguageStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<RglesdeGrammaireNidalum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<RglesdeGrammaireNidalum>('grammairenidalum');
      setItems(items || []);
    } catch (error) {
      console.error('Error loading grammar rules:', error);
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
        item.ruleTitle?.toLowerCase().includes(lowerSearch) ||
        item.explanation?.toLowerCase().includes(lowerSearch) ||
        item.nidalumExample?.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [items, searchTerm, selectedCategory]);

  const title = language === 'fr' ? 'Règles de Grammaire Nidalum' : 
                language === 'de' ? 'Nidalum-Grammatikregeln' : 
                'Nidalum Grammar Rules';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-10 h-10 text-secondary" />
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                {title}
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              {language === 'fr' ? 'Maîtrisez la structure et les règles de la langue Nidalum' : 
               language === 'de' ? 'Beherrschen Sie die Struktur und Regeln der Nidalum-Sprache' : 
               'Master the structure and rules of the Nidalum language'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-background/50 border border-primary/20 p-8 backdrop-blur-sm"
          >
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder={language === 'fr' ? 'Rechercher une règle...' : language === 'de' ? 'Eine Regel suchen...' : 'Search a rule...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background border border-primary/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors font-paragraph"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="font-paragraph text-sm text-foreground/70 mb-3 block">
                {language === 'fr' ? 'Filtrer par catégorie:' : language === 'de' ? 'Nach Kategorie filtern:' : 'Filter by category:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-sm font-paragraph transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground border border-primary'
                        : 'bg-background border border-primary/20 text-foreground/70 hover:border-primary/50'
                    }`}
                  >
                    {cat === 'all' ? (language === 'fr' ? 'Toutes les catégories' : language === 'de' ? 'Alle Kategorien' : 'All categories') : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between pt-6 border-t border-primary/10 mt-6">
              <p className="font-paragraph text-sm text-foreground/60">
                {filteredItems.length} {language === 'fr' ? 'règle' : language === 'de' ? 'Regel' : 'rule'}{filteredItems.length !== 1 ? 's' : ''} {language === 'fr' ? 'trouvée' : language === 'de' ? 'gefunden' : 'found'}{filteredItems.length !== 1 ? 's' : ''}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Items Display */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="font-paragraph text-foreground/70">{language === 'fr' ? 'Chargement...' : language === 'de' ? 'Wird geladen...' : 'Loading...'}</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground/70">
                {language === 'fr' ? 'Aucune règle trouvée' : language === 'de' ? 'Keine Regel gefunden' : 'No rules found'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="border border-primary/20 p-8 bg-background/50 hover:border-primary/50 transition-all duration-300 hover:bg-background/70"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-heading text-2xl text-secondary">
                      {item.ruleTitle}
                    </h3>
                    {item.category && (
                      <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 font-paragraph text-xs text-primary whitespace-nowrap">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {item.explanation && (
                      <div>
                        <p className="font-paragraph text-sm text-foreground/50 mb-2">
                          {language === 'fr' ? 'Explication:' : language === 'de' ? 'Erklärung:' : 'Explanation:'}
                        </p>
                        <p className="font-paragraph text-foreground/80 leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>
                    )}

                    {item.nidalumExample && (
                      <div className="bg-primary/5 border-l-4 border-primary p-4">
                        <p className="font-paragraph text-xs text-foreground/50 mb-2">
                          {language === 'fr' ? 'Exemple en Nidalum:' : language === 'de' ? 'Beispiel auf Nidalum:' : 'Example in Nidalum:'}
                        </p>
                        <p className="font-heading text-lg text-secondary">
                          {item.nidalumExample}
                        </p>
                      </div>
                    )}

                    {item.exampleTranslation && (
                      <div>
                        <p className="font-paragraph text-xs text-foreground/50 mb-2">
                          {language === 'fr' ? 'Traduction:' : language === 'de' ? 'Übersetzung:' : 'Translation:'}
                        </p>
                        <p className="font-paragraph text-foreground/70">
                          {item.exampleTranslation}
                        </p>
                      </div>
                    )}

                    {item.additionalNotes && (
                      <div className="pt-4 border-t border-primary/10">
                        <p className="font-paragraph text-xs text-foreground/50 mb-2">
                          {language === 'fr' ? 'Notes supplémentaires:' : language === 'de' ? 'Zusätzliche Hinweise:' : 'Additional notes:'}
                        </p>
                        <p className="font-paragraph text-sm text-foreground/60">
                          {item.additionalNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
