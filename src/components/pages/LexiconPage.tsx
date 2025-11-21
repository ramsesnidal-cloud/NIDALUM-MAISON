import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Sparkles, Volume2, Globe, Lightbulb, Zap } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { NidalumLexicon } from '@/entities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TextToSpeechPlayer from '@/components/TextToSpeechPlayer';

export default function LexiconPage() {
  const [lexiconItems, setLexiconItems] = useState<NidalumLexicon[]>([]);
  const [filteredItems, setFilteredItems] = useState<NidalumLexicon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedWord, setSelectedWord] = useState<NidalumLexicon | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLexicon();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchTerm, selectedCategory, selectedTheme, lexiconItems]);

  const loadLexicon = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<NidalumLexicon>('nidalumlexicon');
    setLexiconItems(items);
    setIsLoading(false);
  };

  const filterItems = () => {
    let filtered = [...lexiconItems];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nidalumWord?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedTheme !== 'all') {
      filtered = filtered.filter(item => item.theme === selectedTheme);
    }

    setFilteredItems(filtered);
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
              Lexique Nidalum
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Explorez le vocabulaire sacré de Nidalum. Chaque mot porte une signification profonde, connectée à l'univers Souma-Ra et à la spiritualité cosmique.
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search */}
              <div className="lg:col-span-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Rechercher un mot ou une définition..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 bg-background border-primary/20 text-foreground font-paragraph h-12"
                  />
                </div>
              </div>

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
                    setSelectedCategory('all');
                    setSelectedTheme('all');
                  }}
                  className="w-full bg-transparent border-2 border-primary text-primary hover:bg-primary/10 font-paragraph"
                >
                  Réinitialiser
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="font-paragraph text-sm text-foreground/60">
                {filteredItems.length} mot{filteredItems.length !== 1 ? 's' : ''} trouvé{filteredItems.length !== 1 ? 's' : ''}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lexicon Display */}
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
                  onClick={() => setSelectedWord(item)}
                  className="border border-primary/20 p-6 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm group cursor-pointer hover:shadow-lg hover:shadow-primary/10"
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
                      <p className="font-paragraph text-foreground/80 leading-relaxed line-clamp-2">
                        {item.definition}
                      </p>
                    </div>

                    {item.exampleSentence && (
                      <div className="bg-dark-amber-shadow/20 p-3 border-l-2 border-secondary">
                        <p className="font-paragraph text-xs text-foreground/50 mb-1">Exemple:</p>
                        <p className="font-paragraph text-sm text-foreground/70 italic line-clamp-2">
                          {item.exampleSentence}
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

                  <div className="mt-4 pt-4 border-t border-primary/10 flex items-center text-primary/60 group-hover:text-primary transition-colors">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="font-paragraph text-xs">Cliquez pour plus de détails</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Word Detail Modal */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWord(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border-2 border-primary/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-b from-background to-background/80 border-b border-primary/20 p-8 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-5xl text-primary mb-2">
                      {selectedWord.nidalumWord}
                    </h2>
                    {selectedWord.pronunciationGuide && (
                      <p className="font-paragraph text-lg text-secondary">
                        [{selectedWord.pronunciationGuide}]
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedWord(null)}
                    className="text-foreground/60 hover:text-foreground transition-colors text-2xl leading-none"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Text-to-Speech Player for Word */}
                <div className="bg-gradient-to-br from-secondary/20 to-primary/20 border border-secondary/30 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-secondary" />
                    <h3 className="font-heading text-lg text-secondary">Écouter la Prononciation</h3>
                  </div>
                  <TextToSpeechPlayer
                    text={selectedWord.nidalumWord}
                    title={`Prononciation: ${selectedWord.nidalumWord}`}
                    language="fr-FR"
                    showSpeedControl={true}
                    showRepeatButton={true}
                  />
                </div>

                {/* Definition */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="font-heading text-2xl text-primary">Définition</h3>
                  </div>
                  <p className="font-paragraph text-lg text-foreground/80 leading-relaxed bg-dark-amber-shadow/20 p-6 border-l-4 border-primary">
                    {selectedWord.definition}
                  </p>
                  {/* Definition Audio */}
                  <TextToSpeechPlayer
                    text={selectedWord.definition}
                    title="Écouter la définition"
                    language="fr-FR"
                    showSpeedControl={false}
                    showRepeatButton={true}
                    className="mt-3"
                  />
                </div>

                {/* Pronunciation */}
                {selectedWord.pronunciationGuide && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <Volume2 className="w-5 h-5 text-secondary" />
                      <h3 className="font-heading text-2xl text-secondary">Prononciation</h3>
                    </div>
                    <div className="bg-background/50 border border-secondary/20 p-6 font-paragraph text-lg text-foreground/80">
                      {selectedWord.pronunciationGuide}
                    </div>
                  </div>
                )}

                {/* Example */}
                {selectedWord.exampleSentence && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      <h3 className="font-heading text-2xl text-primary">Exemple d'Utilisation</h3>
                    </div>
                    <div className="bg-dark-amber-shadow/20 border-l-4 border-secondary p-6 italic font-paragraph text-foreground/80">
                      "{selectedWord.exampleSentence}"
                    </div>
                    {/* Example Audio */}
                    <TextToSpeechPlayer
                      text={selectedWord.exampleSentence}
                      title="Écouter l'exemple"
                      language="fr-FR"
                      showSpeedControl={false}
                      showRepeatButton={true}
                      className="mt-3"
                    />
                  </div>
                )}

                {/* Etymology */}
                {selectedWord.etymology && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="w-5 h-5 text-secondary" />
                      <h3 className="font-heading text-2xl text-secondary">Étymologie</h3>
                    </div>
                    <p className="font-paragraph text-foreground/80 leading-relaxed bg-background/50 border border-secondary/20 p-6">
                      {selectedWord.etymology}
                    </p>
                  </div>
                )}

                {/* Category & Theme */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedWord.category && (
                    <div className="space-y-2">
                      <p className="font-paragraph text-sm text-foreground/60">Catégorie</p>
                      <div className="px-4 py-3 bg-primary/10 border border-primary/30 font-paragraph text-primary font-semibold">
                        {selectedWord.category}
                      </div>
                    </div>
                  )}
                  {selectedWord.theme && (
                    <div className="space-y-2">
                      <p className="font-paragraph text-sm text-foreground/60">Thème</p>
                      <div className="px-4 py-3 bg-secondary/10 border border-secondary/30 font-paragraph text-secondary font-semibold">
                        {selectedWord.theme}
                      </div>
                    </div>
                  )}
                </div>

                {/* French Translation */}
                {selectedWord.traduction_fr && (
                  <div className="space-y-3 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-6">
                    <p className="font-paragraph text-sm text-foreground/60">Traduction Française</p>
                    <p className="font-paragraph text-lg text-foreground/80">
                      {selectedWord.traduction_fr}
                    </p>
                  </div>
                )}

                {/* Expression */}
                {selectedWord.expression_nidalum && (
                  <div className="space-y-3 bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20 p-6">
                    <p className="font-paragraph text-sm text-foreground/60">Expression Nidalum</p>
                    <p className="font-paragraph text-lg text-foreground/80 italic">
                      {selectedWord.expression_nidalum}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-primary/20 p-6 bg-dark-amber-shadow/10 flex gap-3">
                <Button
                  onClick={() => setSelectedWord(null)}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph"
                >
                  Fermer
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
