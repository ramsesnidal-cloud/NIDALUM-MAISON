import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Wand2, ChevronDown, ArrowUpDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { NidalumApprendrelaLangue } from '@/entities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateCompleteWord } from '@/lib/nidalum-generator';
import { useTranslation } from '@/hooks/useTranslation';

type SortField = 'word' | 'category' | 'theme' | 'none';
type SortOrder = 'asc' | 'desc';

export default function LexiconPage() {
  const { t } = useTranslation();
  const [lexiconItems, setLexiconItems] = useState<NidalumApprendrelaLangue[]>([]);
  const [filteredItems, setFilteredItems] = useState<NidalumApprendrelaLangue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState<'all' | 'word' | 'definition' | 'etymology'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [sortField, setSortField] = useState<SortField>('word');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    loadLexicon();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchTerm, searchField, selectedCategory, selectedTheme, lexiconItems, sortField, sortOrder]);

  const loadLexicon = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<NidalumApprendrelaLangue>('nidalumlexicon');
    setLexiconItems(items || []);
    setIsLoading(false);
  };

  const filterItems = () => {
    let filtered = [...lexiconItems];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item => {
        if (searchField === 'all') {
          return (
            item.nidalumWord?.toLowerCase().includes(lowerSearch) ||
            item.definition?.toLowerCase().includes(lowerSearch) ||
            item.etymology?.toLowerCase().includes(lowerSearch) ||
            item.exampleSentence?.toLowerCase().includes(lowerSearch)
          );
        } else if (searchField === 'word') {
          return item.nidalumWord?.toLowerCase().includes(lowerSearch);
        } else if (searchField === 'definition') {
          return item.definition?.toLowerCase().includes(lowerSearch);
        } else if (searchField === 'etymology') {
          return item.etymology?.toLowerCase().includes(lowerSearch);
        }
        return true;
      });
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedTheme !== 'all') {
      filtered = filtered.filter(item => item.theme === selectedTheme);
    }

    // Apply sorting
    if (sortField !== 'none') {
      filtered.sort((a, b) => {
        let aVal: string = '';
        let bVal: string = '';

        if (sortField === 'word') {
          aVal = a.nidalumWord || '';
          bVal = b.nidalumWord || '';
        } else if (sortField === 'category') {
          aVal = a.category || '';
          bVal = b.category || '';
        } else if (sortField === 'theme') {
          aVal = a.theme || '';
          bVal = b.theme || '';
        }

        const comparison = aVal.localeCompare(bVal);
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    setFilteredItems(filtered);
  };

  const generateNewWord = async () => {
    setIsGenerating(true);
    try {
      const newWord = generateCompleteWord();
      const wordWithId = {
        ...newWord,
        _id: crypto.randomUUID(),
        _createdDate: new Date(),
        _updatedDate: new Date()
      };
      
      await BaseCrudService.create('nidalumlexicon', wordWithId);
      setLexiconItems([...lexiconItems, wordWithId]);
    } catch (error) {
      console.error('Erreur lors de la génération du mot:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(lexiconItems.map(item => item.category).filter(Boolean)))];
  const themes = ['all', ...Array.from(new Set(lexiconItems.map(item => item.theme).filter(Boolean)))];

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
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-6">
              {t('pages.lexicon.title')}
            </h1>
            <p className="font-paragraph text-xl text-foreground/90 max-w-4xl mx-auto leading-relaxed">
              {t('pages.lexicon.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-background/70 border-2 border-primary/50 p-10 backdrop-blur-sm"
          >
            {/* Search Bar */}
            <div className="mb-8">
              <label className="font-paragraph text-base font-semibold text-foreground mb-3 block">
                Rechercher
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Rechercher un mot, une définition, une étymologie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 bg-background border-2 border-primary/40 text-foreground font-paragraph h-14 text-base focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Advanced Search Toggle */}
            <div className="mb-8 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                className="flex items-center gap-2 px-5 py-3 bg-primary/20 border-2 border-primary/60 text-primary hover:bg-primary/30 transition-colors font-paragraph text-sm font-semibold"
              >
                <Wand2 className="w-4 h-4" />
                Recherche avancée
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedSearch ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-3 bg-secondary/20 border-2 border-secondary/60 text-secondary hover:bg-secondary/30 transition-colors font-paragraph text-sm font-semibold"
              >
                <Filter className="w-4 h-4" />
                Filtres
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <Button
                onClick={generateNewWord}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-semibold px-5 py-3 text-sm"
              >
                <Wand2 className="w-4 h-4" />
                {isGenerating ? 'Génération...' : 'Générer un mot'}
              </Button>
            </div>

            {/* Advanced Search Options */}
            {showAdvancedSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-5 bg-dark-amber-shadow/30 border-2 border-primary/30"
              >
                <label className="font-paragraph text-base font-semibold text-foreground mb-4 block">
                  Rechercher dans:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['all', 'word', 'definition', 'etymology'] as const).map((field) => (
                    <button
                      key={field}
                      onClick={() => setSearchField(field)}
                      className={`px-4 py-3 text-sm font-paragraph font-semibold transition-colors ${
                        searchField === field
                          ? 'bg-primary text-primary-foreground border-2 border-primary'
                          : 'bg-background border-2 border-primary/30 text-foreground hover:border-primary/60'
                      }`}
                    >
                      {field === 'all' && 'Tous les champs'}
                      {field === 'word' && 'Mots'}
                      {field === 'definition' && 'Définitions'}
                      {field === 'etymology' && 'Étymologies'}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="font-paragraph text-base font-semibold text-foreground mb-3 block">
                      Catégorie
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-background border-2 border-primary/40 text-foreground font-paragraph p-3 focus:outline-none focus:border-primary text-base"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat === 'all' ? 'Toutes les catégories' : cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Theme Filter */}
                  <div>
                    <label className="font-paragraph text-base font-semibold text-foreground mb-3 block">
                      Thème
                    </label>
                    <select
                      value={selectedTheme}
                      onChange={(e) => setSelectedTheme(e.target.value)}
                      className="w-full bg-background border-2 border-primary/40 text-foreground font-paragraph p-3 focus:outline-none focus:border-primary text-base"
                    >
                      {themes.map((theme) => (
                        <option key={theme} value={theme}>
                          {theme === 'all' ? 'Tous les thèmes' : theme}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Reset Button */}
                  <div className="flex items-end">
                    <Button
                      onClick={() => {
                        setSearchTerm('');
                        setSearchField('all');
                        setSelectedCategory('all');
                        setSelectedTheme('all');
                      }}
                      className="w-full bg-transparent border-2 border-primary text-primary hover:bg-primary/10 font-paragraph font-semibold py-3"
                    >
                      Réinitialiser
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Results Count and View Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t-2 border-primary/20 gap-4">
              <p className="font-paragraph text-base font-semibold text-foreground">
                {filteredItems.length} mot{filteredItems.length !== 1 ? 's' : ''} trouvé{filteredItems.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 text-sm font-paragraph font-semibold transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-primary text-primary-foreground border-2 border-primary'
                        : 'bg-background border-2 border-primary/30 text-foreground hover:border-primary/60'
                    }`}
                  >
                    Grille
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-4 py-2 text-sm font-paragraph font-semibold transition-colors ${
                      viewMode === 'table'
                        ? 'bg-primary text-primary-foreground border-2 border-primary'
                        : 'bg-background border-2 border-primary/30 text-foreground hover:border-primary/60'
                    }`}
                  >
                    Tableau
                  </button>
                </div>
              </div>
              <p className="font-paragraph text-sm font-semibold text-foreground/70">
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
            className="mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6 text-center">
              Mots du Lexique
            </h2>
            <p className="font-paragraph text-lg text-foreground/90 text-center max-w-3xl mx-auto leading-relaxed">
              Explorez les mots de la langue Nidalum avec leurs définitions, étymologies et exemples
            </p>
          </motion.div>

          {isLoading ? (
            <div className="text-center py-24">
              <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="font-paragraph text-lg text-foreground">Chargement du lexique...</p>
              <p className="font-paragraph text-base text-foreground/70 mt-2">{lexiconItems.length} mots en base</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-paragraph text-2xl text-foreground">Aucun mot trouvé</p>
              <p className="font-paragraph text-base text-foreground/70 mt-2">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          ) : viewMode === 'table' ? (
            // Table View
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-x-auto rounded-lg border-2 border-primary/30"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/40 bg-primary/10">
                    <th className="px-6 py-5 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'word') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('word');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-2 font-heading text-lg text-primary hover:text-secondary transition-colors"
                      >
                        Mot Nidalum
                        {sortField === 'word' && (
                          <ArrowUpDown className={`w-5 h-5 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-5 text-left font-heading text-lg text-primary hidden md:table-cell">Prononciation</th>
                    <th className="px-6 py-5 text-left font-heading text-lg text-primary hidden lg:table-cell">Définition</th>
                    <th className="px-6 py-5 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'category') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('category');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-2 font-heading text-lg text-primary hover:text-secondary transition-colors"
                      >
                        Catégorie
                        {sortField === 'category' && (
                          <ArrowUpDown className={`w-5 h-5 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-5 text-left">
                      <button
                        onClick={() => {
                          if (sortField === 'theme') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('theme');
                            setSortOrder('asc');
                          }
                        }}
                        className="flex items-center gap-2 font-heading text-lg text-primary hover:text-secondary transition-colors"
                      >
                        Thème
                        {sortField === 'theme' && (
                          <ArrowUpDown className={`w-5 h-5 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                      viewport={{ once: true }}
                      className="border-b border-primary/20 hover:bg-primary/8 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-heading text-xl text-primary font-semibold">{item.nidalumWord}</p>
                          {item.pronunciationGuide && (
                            <p className="font-paragraph text-sm text-secondary mt-1">[{item.pronunciationGuide}]</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 hidden md:table-cell">
                        <p className="font-paragraph text-base text-foreground/85">{item.pronunciationGuide || '—'}</p>
                      </td>
                      <td className="px-6 py-5 hidden lg:table-cell">
                        <p className="font-paragraph text-base text-foreground/85 line-clamp-2">{item.definition || '—'}</p>
                      </td>
                      <td className="px-6 py-5">
                        {item.category ? (
                          <span className="inline-block px-4 py-2 bg-primary/15 border-2 border-primary/40 font-paragraph text-sm font-semibold text-primary rounded">
                            {item.category}
                          </span>
                        ) : (
                          <span className="text-foreground/40">—</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        {item.theme ? (
                          <span className="inline-block px-4 py-2 bg-secondary/15 border-2 border-secondary/40 font-paragraph text-sm font-semibold text-secondary rounded">
                            {item.theme}
                          </span>
                        ) : (
                          <span className="text-foreground/40">—</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="border-2 border-primary/30 p-8 hover:border-primary/60 transition-all duration-300 bg-background/60 backdrop-blur-sm group hover:bg-background/80"
                >
                  <div className="mb-6">
                    <h3 className="font-heading text-4xl text-primary mb-3 group-hover:text-secondary transition-colors">
                      {item.nidalumWord}
                    </h3>
                    {item.pronunciationGuide && (
                      <p className="font-paragraph text-base text-secondary font-semibold">
                        [{item.pronunciationGuide}]
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="font-paragraph text-base text-foreground/90 leading-relaxed">
                        {item.definition || 'Définition non disponible'}
                      </p>
                    </div>

                    {item.exampleSentence && (
                      <div className="bg-dark-amber-shadow/30 p-4 border-l-4 border-secondary">
                        <p className="font-paragraph text-sm text-foreground/70 mb-2 font-semibold">Exemple:</p>
                        <p className="font-paragraph text-base text-foreground/85 italic">
                          {item.exampleSentence}
                        </p>
                      </div>
                    )}

                    {item.etymology && (
                      <div className="pt-4 border-t-2 border-primary/20">
                        <p className="font-paragraph text-sm text-foreground/70 mb-2 font-semibold">Étymologie:</p>
                        <p className="font-paragraph text-base text-foreground/85">
                          {item.etymology}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 pt-4">
                      {item.category && (
                        <span className="inline-block px-4 py-2 bg-primary/15 border-2 border-primary/40 font-paragraph text-sm font-semibold text-primary rounded">
                          {item.category}
                        </span>
                      )}
                      {item.theme && (
                        <span className="inline-block px-4 py-2 bg-secondary/15 border-2 border-secondary/40 font-paragraph text-sm font-semibold text-secondary rounded">
                          {item.theme}
                        </span>
                      )}
                    </div>
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
