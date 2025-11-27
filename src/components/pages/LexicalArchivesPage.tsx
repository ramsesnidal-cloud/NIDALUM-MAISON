import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { NidalumApprendrelaLangue } from '@/entities';
import { Image } from '@/components/ui/image';
import { BookOpen, Sparkles, Scroll, Archive, Search, Filter, ChevronDown, Volume2, Play, Pause } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface LexicalCategory {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  theme: string;
}

const categories: LexicalCategory[] = [
  {
    name: 'Sacré',
    description: 'Termes spirituels et rituels',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    theme: 'Sacré'
  },
  {
    name: 'Éléments',
    description: 'Forces naturelles et cosmiques',
    icon: <Scroll className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    theme: 'Éléments'
  },
  {
    name: 'Humain',
    description: 'Corps, âme et existence',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-500',
    theme: 'Humain'
  },
  {
    name: 'Protection',
    description: 'Défense et préservation',
    icon: <Archive className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    theme: 'Protection'
  },
  {
    name: 'Nombres',
    description: 'Numérologie et harmonie',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-indigo-500 to-violet-500',
    theme: 'Nombres'
  }
];

interface WordData extends NidalumApprendrelaLangue {
  categoryIndex?: number;
}

interface AudioState {
  playingId: string | null;
  currentAudio: HTMLAudioElement | null;
}

export default function LexicalArchivesPage() {
  const { t } = useTranslation();
  const [lexicon, setLexicon] = useState<WordData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Sacré']));
  const [searchTerm, setSearchTerm] = useState('');
  const [audioState, setAudioState] = useState<AudioState>({ playingId: null, currentAudio: null });

  useEffect(() => {
    loadLexicon();
  }, []);

  useEffect(() => {
    // When search term changes, expand all categories that have matching results
    if (searchTerm.trim()) {
      const categoriesWithMatches = new Set<string>();
      categories.forEach(category => {
        const words = getWordsByTheme(category.theme);
        const filteredWords = getFilteredWords(words);
        if (filteredWords.length > 0) {
          categoriesWithMatches.add(category.name);
        }
      });
      setExpandedCategories(categoriesWithMatches);
    } else {
      // Reset to default when search is cleared
      setExpandedCategories(new Set(['Sacré']));
    }
  }, [searchTerm, lexicon]);

  const loadLexicon = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<NidalumApprendrelaLangue>('nidalumlexicon');
      setLexicon(items || []);
      console.log(`Loaded ${items?.length || 0} lexicon items from CMS`);
    } catch (error) {
      console.error('Erreur lors du chargement du lexique:', error);
      setLexicon([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getWordsByTheme = (theme: string) => {
    return lexicon.filter(word => word.theme === theme);
  };

  const getFilteredWords = (words: WordData[]) => {
    if (!searchTerm) return words;
    return words.filter(word =>
      word.nidalumWord?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.definition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.traduction_fr?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.color || 'from-gray-500 to-gray-600';
  };

  const playAudio = (audioUrl: string | undefined, wordId: string) => {
    if (!audioUrl) return;

    // Stop current audio if playing
    if (audioState.currentAudio) {
      audioState.currentAudio.pause();
      audioState.currentAudio.currentTime = 0;
    }

    // If clicking the same word, toggle play/pause
    if (audioState.playingId === wordId) {
      setAudioState({ playingId: null, currentAudio: null });
      return;
    }

    // Play new audio
    const audio = new Audio(audioUrl);
    audio.play().catch(err => console.error('Error playing audio:', err));
    
    audio.onended = () => {
      setAudioState({ playingId: null, currentAudio: null });
    };

    setAudioState({ playingId: wordId, currentAudio: audio });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Archive className="w-10 h-10 text-secondary" />
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                Archives Lexicales
              </h1>
              <Archive className="w-10 h-10 text-primary" />
            </div>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Explorez le trésor des mots Nidalum organisés par thèmes sacrés et cosmiques. Chaque terme révèle une couche de sagesse ancestrale.
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
            className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 p-8 rounded-lg"
          >
            <h2 className="font-heading text-3xl text-primary mb-6">Introduction aux Archives Lexicales</h2>
            <div className="space-y-4 font-paragraph text-foreground/80 leading-relaxed">
              <p>
                Les Archives Lexicales du Nidalum constituent un compendium sacré des termes qui structurent la compréhension du cosmos et de l'existence. 
                Chaque mot n'est pas simplement une étiquette linguistique, mais une clé ouvrant des portes vers des réalités spirituelles et métaphysiques.
              </p>
              <p>
                Cette collection organisée en cinq thèmes fondamentaux reflète l'architecture même de l'univers Nidalum : le Sacré qui transcende, 
                les Éléments qui constituent, l'Humain qui expérimente, la Protection qui préserve, et les Nombres qui harmonisent.
              </p>
              <p>
                Chaque entrée lexicale contient non seulement la définition, mais aussi l'étymologie, la prononciation guidée, et des exemples d'utilisation 
                dans le contexte rituel et quotidien. Les Archives invitent le chercheur à une exploration progressive de la langue sacrée.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-6 lg:px-12 border-b border-primary/20">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary" />
              <input
                type="text"
                placeholder="Rechercher un mot, une définition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background/50 border border-primary/30 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-3 bg-secondary/20 border border-secondary/50 text-secondary hover:bg-secondary/30 transition-colors font-paragraph font-semibold"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <h2 className="font-heading text-3xl text-primary mb-12 text-center">Thèmes Lexicaux</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => {
              const wordCount = getWordsByTheme(category.theme).length;
              const isExpanded = expandedCategories.has(category.name);
              return (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => toggleCategory(category.name)}
                  className={`p-6 border transition-all duration-300 text-center group cursor-pointer ${
                    isExpanded
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-primary/20 bg-background/50 hover:border-primary/40'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${category.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h3 className="font-heading text-lg text-primary mb-2">{category.name}</h3>
                  <p className="font-paragraph text-xs text-foreground/70 mb-3">{category.description}</p>
                  <span className="inline-block px-3 py-1 bg-secondary/20 border border-secondary/50 text-secondary text-xs font-semibold">
                    {wordCount} mots
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lexical Tables by Theme */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="font-paragraph text-foreground/70 mt-4">Chargement des archives...</p>
            </div>
          ) : (
            <div className="space-y-12">
              {categories.map((category) => {
                const words = getFilteredWords(getWordsByTheme(category.theme));
                const isExpanded = expandedCategories.has(category.name);

                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="w-full text-left group mb-6"
                    >
                      <div className={`flex items-center gap-4 p-6 border-l-4 transition-all duration-300 ${
                        isExpanded
                          ? `border-l-primary bg-gradient-to-r ${category.color} bg-opacity-10`
                          : 'border-l-primary/30 bg-background/50 hover:bg-background/70'
                      }`}>
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading text-2xl text-primary mb-1">{category.name}</h3>
                          <p className="font-paragraph text-sm text-foreground/70">{category.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-4 py-2 bg-secondary/20 border border-secondary/50 text-secondary font-semibold text-sm">
                            {words.length} entrées
                          </span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-6 h-6 text-primary" />
                          </motion.div>
                        </div>
                      </div>
                    </button>

                    {/* Category Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          {words.length === 0 ? (
                            <div className="p-8 text-center border border-primary/20 border-t-0 bg-background/30">
                              <p className="font-paragraph text-foreground/60">Aucun mot trouvé pour cette catégorie.</p>
                            </div>
                          ) : (
                            <div className="border border-primary/20 border-t-0 bg-background/30">
                              {/* Desktop Table View */}
                              <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                  <thead>
                                    <tr className="border-b border-primary/20 bg-background/50">
                                      <th className="px-6 py-4 text-left font-heading text-primary">Mot Nidalum</th>
                                      <th className="px-6 py-4 text-left font-heading text-primary">Définition</th>
                                      <th className="px-6 py-4 text-left font-heading text-primary">Traduction FR</th>
                                      <th className="px-6 py-4 text-left font-heading text-primary">Prononciation</th>
                                      <th className="px-6 py-4 text-left font-heading text-primary">Exemple</th>
                                      <th className="px-6 py-4 text-center font-heading text-primary">Audio</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {words.map((word, index) => (
                                      <motion.tr
                                        key={word._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                                      >
                                        <td className="px-6 py-4 font-heading text-secondary whitespace-nowrap">
                                          {word.nidalumWord}
                                        </td>
                                        <td className="px-6 py-4 font-paragraph text-foreground/80 max-w-xs">
                                          {word.definition}
                                        </td>
                                        <td className="px-6 py-4 font-paragraph text-foreground/70 max-w-xs">
                                          {word.traduction_fr || word.traductionEn || '-'}
                                        </td>
                                        <td className="px-6 py-4 font-paragraph text-foreground/70 max-w-xs">
                                          {word.pronunciationGuide || '-'}
                                        </td>
                                        <td className="px-6 py-4 font-paragraph text-foreground/70 max-w-xs italic">
                                          {word.exampleSentence || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                          <button
                                            onClick={() => playAudio(word.audio_url, word._id)}
                                            className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                                              audioState.playingId === word._id
                                                ? 'bg-secondary text-background'
                                                : 'bg-secondary/20 text-secondary hover:bg-secondary/40'
                                            }`}
                                            title={word.audio_url ? 'Écouter la prononciation' : 'Pas d\'audio disponible'}
                                            disabled={!word.audio_url}
                                          >
                                            {audioState.playingId === word._id ? (
                                              <Pause className="w-5 h-5" />
                                            ) : (
                                              <Play className="w-5 h-5" />
                                            )}
                                          </button>
                                        </td>
                                      </motion.tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {/* Mobile Card View */}
                              <div className="md:hidden space-y-4 p-4">
                                {words.map((word, index) => (
                                  <motion.div
                                    key={word._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="border border-primary/20 p-4 bg-background/50 hover:bg-primary/5 transition-colors"
                                  >
                                    <div className="flex items-start justify-between mb-3">
                                      <h4 className="font-heading text-lg text-secondary">{word.nidalumWord}</h4>
                                      <button
                                        onClick={() => playAudio(word.audio_url, word._id)}
                                        className={`flex-shrink-0 w-10 h-10 rounded-full transition-all ${
                                          audioState.playingId === word._id
                                            ? 'bg-secondary text-background'
                                            : 'bg-secondary/20 text-secondary hover:bg-secondary/40'
                                        }`}
                                        disabled={!word.audio_url}
                                      >
                                        {audioState.playingId === word._id ? (
                                          <Pause className="w-5 h-5 mx-auto" />
                                        ) : (
                                          <Play className="w-5 h-5 mx-auto" />
                                        )}
                                      </button>
                                    </div>
                                    
                                    <div className="space-y-2 font-paragraph text-sm">
                                      <div>
                                        <span className="text-foreground/60">Définition:</span>
                                        <p className="text-foreground/80">{word.definition}</p>
                                      </div>
                                      {(word.traduction_fr || word.traductionEn) && (
                                        <div>
                                          <span className="text-foreground/60">Traduction:</span>
                                          <p className="text-foreground/70">{word.traduction_fr || word.traductionEn}</p>
                                        </div>
                                      )}
                                      {word.pronunciationGuide && (
                                        <div>
                                          <span className="text-foreground/60">Prononciation:</span>
                                          <p className="text-foreground/70">{word.pronunciationGuide}</p>
                                        </div>
                                      )}
                                      {word.exampleSentence && (
                                        <div>
                                          <span className="text-foreground/60">Exemple:</span>
                                          <p className="text-foreground/70 italic">{word.exampleSentence}</p>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/5 to-transparent">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/30 p-8 rounded-lg"
          >
            <h2 className="font-heading text-3xl text-secondary mb-6">Conclusion : L'Harmonie Lexicale</h2>
            <div className="space-y-4 font-paragraph text-foreground/80 leading-relaxed">
              <p>
                Les Archives Lexicales ne sont pas simplement un dictionnaire, mais un miroir de l'âme Nidalum. À travers ces cinq thèmes fondamentaux, 
                nous découvrons comment la langue elle-même encode la sagesse cosmique et spirituelle.
              </p>
              <p>
                Le Sacré nous élève vers le divin, les Éléments nous ancrent dans la matière vivante, l'Humain nous rappelle notre place dans l'univers, 
                la Protection nous guide vers la préservation, et les Nombres nous montrent l'harmonie mathématique sous-jacente à toute existence.
              </p>
              <p>
                En maîtrisant ces mots, vous ne mémorisez pas simplement du vocabulaire : vous intégrez une vision du monde, une philosophie, une manière 
                d'être. Chaque terme est une porte vers une compréhension plus profonde de la réalité et de votre place en elle.
              </p>
              <p className="text-lg text-secondary font-semibold pt-4">
                Que ces Archives vous guident dans votre quête de sagesse Nidalum.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <h2 className="font-heading text-3xl text-primary mb-12 text-center">Statistiques des Archives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="border border-primary/20 p-8 text-center bg-background/50 hover:border-primary/50 transition-all"
            >
              <div className="font-heading text-5xl text-secondary mb-2">{lexicon.length}</div>
              <p className="font-paragraph text-foreground/70">Mots Nidalum Catalogués</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="border border-primary/20 p-8 text-center bg-background/50 hover:border-primary/50 transition-all"
            >
              <div className="font-heading text-5xl text-primary mb-2">5</div>
              <p className="font-paragraph text-foreground/70">Thèmes Fondamentaux</p>
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
