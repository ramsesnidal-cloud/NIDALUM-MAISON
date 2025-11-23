import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Wand2, ChevronDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { NidalumLexicon } from '@/entities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateCompleteWord } from '@/lib/nidalum-generator';
import { useTranslation } from '@/hooks/useTranslation';

export default function LexiconPage() {
  const { t } = useTranslation();
  const [lexiconItems, setLexiconItems] = useState<NidalumLexicon[]>([]);
  const [filteredItems, setFilteredItems] = useState<NidalumLexicon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState<'all' | 'word' | 'definition' | 'etymology'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    loadLexicon();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchTerm, searchField, selectedCategory, selectedTheme, lexiconItems]);

  const loadLexicon = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<NidalumLexicon>('nidalumlexicon');
    setLexiconItems(items);
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
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              {t('pages.lexicon.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
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
                <Input
                  type="text"
                  placeholder="Rechercher un mot, une définition, une étymologie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 bg-background border-primary/20 text-foreground font-paragraph h-12"
                />
              </div>
            </div>

            {/* Advanced Search Toggle */}
            <div className="mb-6 flex flex-wrap gap-3 items-center">
              <button
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors font-paragraph text-sm"
              >
                <Wand2 className="w-4 h-4" />
                Recherche avancée
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedSearch ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/30 text-secondary hover:bg-secondary/20 transition-colors font-paragraph text-sm"
              >
                <Filter className="w-4 h-4" />
                Filtres
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <Button
                onClick={generateNewWord}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph"
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
                className="mb-6 p-4 bg-dark-amber-shadow/20 border border-primary/20"
              >
                <label className="font-paragraph text-sm text-foreground/70 mb-3 block">
                  Rechercher dans:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['all', 'word', 'definition', 'etymology'] as const).map((field) => (
                    <button
                      key={field}
                      onClick={() => setSearchField(field)}
                      className={`px-3 py-2 text-sm font-paragraph transition-colors ${
                        searchField === field
                          ? 'bg-primary text-primary-foreground border border-primary'
                          : 'bg-background border border-primary/20 text-foreground/70 hover:border-primary/50'
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
                className="mb-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="font-paragraph text-sm text-foreground/70 mb-2 block">
                      Catégorie
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-background border border-primary/20 text-foreground font-paragraph p-3 focus:outline-none focus:border-primary"
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
                    <label className="font-paragraph text-sm text-foreground/70 mb-2 block">
                      Thème
                    </label>
                    <select
                      value={selectedTheme}
                      onChange={(e) => setSelectedTheme(e.target.value)}
                      className="w-full bg-background border border-primary/20 text-foreground font-paragraph p-3 focus:outline-none focus:border-primary"
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
                      className="w-full bg-transparent border-2 border-primary text-primary hover:bg-primary/10 font-paragraph"
                    >
                      Réinitialiser
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between pt-4 border-t border-primary/10">
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

      {/* Lexicon Grid */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="font-paragraph text-foreground/70 mt-4">Chargement du lexique...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground/70">Aucun mot trouvé</p>
              <p className="font-paragraph text-sm text-foreground/50 mt-2">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border border-primary/20 p-6 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm group"
                >
                  <div className="mb-4">
                    <h3 className="font-heading text-3xl text-primary mb-2 group-hover:text-secondary transition-colors">
                      {item.nidalumWord}
                    </h3>
                    {item.pronunciationGuide && (
                      <p className="font-paragraph text-sm text-secondary">
                        [{item.pronunciationGuide}]
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="font-paragraph text-foreground/80 leading-relaxed">
                        {item.definition}
                      </p>
                    </div>

                    {item.exampleSentence && (
                      <div className="bg-dark-amber-shadow/20 p-3 border-l-2 border-secondary">
                        <p className="font-paragraph text-xs text-foreground/50 mb-1">Exemple:</p>
                        <p className="font-paragraph text-sm text-foreground/70 italic">
                          {item.exampleSentence}
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

                    <div className="flex flex-wrap gap-2 pt-3">
                      {item.category && (
                        <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 font-paragraph text-xs text-primary">
                          {item.category}
                        </span>
                      )}
                      {item.theme && (
                        <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary">
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
