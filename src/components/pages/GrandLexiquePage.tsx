import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { NidalumApprendrelaLangue } from '@/entities';
import { useTranslation } from '@/hooks/useTranslation';

export default function GrandLexiquePage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [lexiconItems, setLexiconItems] = useState<NidalumApprendrelaLangue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadLexicon();
  }, []);

  const loadLexicon = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<NidalumApprendrelaLangue>('nidalumlexicon');
      setLexiconItems(items || []);
      console.log(`Loaded ${items?.length || 0} lexicon items from CMS`);
    } catch (error) {
      console.error('Error loading lexicon:', error);
      setLexiconItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from lexicon items
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(lexiconItems.map(item => item.category).filter(Boolean))
    );
    return ['all', ...uniqueCategories];
  }, [lexiconItems]);

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    let filtered = lexiconItems;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.nidalumWord?.toLowerCase().includes(lowerSearch) ||
        item.definition?.toLowerCase().includes(lowerSearch) ||
        item.etymology?.toLowerCase().includes(lowerSearch) ||
        item.traduction_fr?.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [lexiconItems, searchTerm, selectedCategory]);

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
                Grand Lexique
              </h1>
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Explorez le compendium complet de la langue Nidalum. Un trésor de mots, de définitions et de sagesse ancestrale organisé pour votre apprentissage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/5 to-transparent">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 p-8"
          >
            <h2 className="font-heading text-3xl text-primary mb-6">À Propos du Grand Lexique</h2>
            <div className="space-y-4 font-paragraph text-foreground/80 leading-relaxed">
              <p>
                Le Grand Lexique Nidalum est une compilation exhaustive de la langue sacrée, rassemblant des termes issus de traditions cosmiques, spirituelles et quotidiennes. 
                Chaque mot est une fenêtre ouverte sur la compréhension du monde Nidalum.
              </p>
              <p>
                Organisé par catégories thématiques, ce lexique offre non seulement des définitions précises, mais aussi des étymologies, des prononciations guidées, 
                et des exemples d'utilisation pour enrichir votre maîtrise de la langue.
              </p>
            </div>
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
                  placeholder="Rechercher un mot, une définition, une traduction..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background border border-primary/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors font-paragraph"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="font-paragraph text-sm text-foreground/70 mb-3 block">
                Filtrer par catégorie:
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
                    {cat === 'all' ? 'Toutes les catégories' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between pt-6 border-t border-primary/10 mt-6">
              <p className="font-paragraph text-sm text-foreground/60">
                {filteredItems.length} mot{filteredItems.length !== 1 ? 's' : ''} trouvé{filteredItems.length !== 1 ? 's' : ''}
              </p>
              <p className="font-paragraph text-xs text-foreground/50">
                Total: {lexiconItems.length} mots
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lexicon Display */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-6 text-center">
              Mots du Grand Lexique
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 text-center max-w-3xl mx-auto leading-relaxed">
              Découvrez chaque mot avec sa définition, étymologie et contexte d'utilisation
            </p>
          </motion.div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="font-paragraph text-foreground/70">Chargement du lexique...</p>
              <p className="font-paragraph text-sm text-foreground/50 mt-2">{lexiconItems.length} mots en base</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground/70">Aucun mot trouvé</p>
              <p className="font-paragraph text-sm text-foreground/50 mt-2">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <p className="font-paragraph text-sm text-secondary text-center">
                  {filteredItems.length} mot{filteredItems.length > 1 ? 's' : ''} affiché{filteredItems.length > 1 ? 's' : ''} sur {lexiconItems.length}
                </p>
              </motion.div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border border-primary/20">
                  <thead className="bg-background/50">
                    <tr className="border-b border-primary/20">
                      <th className="px-6 py-4 text-left font-heading text-primary">Mot Nidalum</th>
                      <th className="px-6 py-4 text-left font-heading text-primary">Prononciation</th>
                      <th className="px-6 py-4 text-left font-heading text-primary">Définition</th>
                      <th className="px-6 py-4 text-left font-heading text-primary">Traduction FR</th>
                      <th className="px-6 py-4 text-left font-heading text-primary">Catégorie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item, index) => (
                      <motion.tr
                        key={item._id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                      >
                        <td className="px-6 py-4 font-heading text-secondary whitespace-nowrap">
                          {item.nidalumWord}
                        </td>
                        <td className="px-6 py-4 font-paragraph text-foreground/70">
                          {item.pronunciationGuide || '-'}
                        </td>
                        <td className="px-6 py-4 font-paragraph text-foreground/80 max-w-xs">
                          {item.definition || '-'}
                        </td>
                        <td className="px-6 py-4 font-paragraph text-foreground/70 max-w-xs">
                          {item.traduction_fr || item.traductionEn || '-'}
                        </td>
                        <td className="px-6 py-4">
                          {item.category && (
                            <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 font-paragraph text-xs text-primary">
                              {item.category}
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="border border-primary/20 p-6 bg-background/50 hover:border-primary/50 transition-all duration-300 hover:bg-background/70"
                  >
                    <div className="mb-4">
                      <h3 className="font-heading text-2xl text-secondary mb-2">
                        {item.nidalumWord}
                      </h3>
                      {item.pronunciationGuide && (
                        <p className="font-paragraph text-sm text-primary font-semibold">
                          [{item.pronunciationGuide}]
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      {item.definition && (
                        <div>
                          <p className="font-paragraph text-xs text-foreground/50 mb-1">Définition:</p>
                          <p className="font-paragraph text-foreground/80">
                            {item.definition}
                          </p>
                        </div>
                      )}

                      {(item.traduction_fr || item.traductionEn) && (
                        <div>
                          <p className="font-paragraph text-xs text-foreground/50 mb-1">Traduction:</p>
                          <p className="font-paragraph text-foreground/70">
                            {item.traduction_fr || item.traductionEn}
                          </p>
                        </div>
                      )}

                      {item.etymology && (
                        <div className="pt-3 border-t border-primary/10">
                          <p className="font-paragraph text-xs text-foreground/50 mb-1">Étymologie:</p>
                          <p className="font-paragraph text-sm text-foreground/60">
                            {item.etymology}
                          </p>
                        </div>
                      )}

                      {item.category && (
                        <div className="flex flex-wrap gap-2 pt-3">
                          <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 font-paragraph text-xs text-primary">
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <h2 className="font-heading text-3xl text-primary mb-12 text-center">
            Statistiques du Grand Lexique
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="border border-primary/20 p-8 text-center bg-background/50 hover:border-primary/50 transition-all"
            >
              <div className="font-heading text-5xl text-secondary mb-2">{lexiconItems.length}</div>
              <p className="font-paragraph text-foreground/70">Mots Nidalum</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="border border-primary/20 p-8 text-center bg-background/50 hover:border-primary/50 transition-all"
            >
              <div className="font-heading text-5xl text-primary mb-2">{categories.length - 1}</div>
              <p className="font-paragraph text-foreground/70">Catégories</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="border border-primary/20 p-8 text-center bg-background/50 hover:border-primary/50 transition-all"
            >
              <div className="font-heading text-5xl text-secondary mb-2">∞</div>
              <p className="font-paragraph text-foreground/70">Sagesse Infinie</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
