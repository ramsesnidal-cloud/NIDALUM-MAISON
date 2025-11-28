import { useEffect, useState } from 'react';
import { useDictionaryStore } from '@/lib/dictionary-store';
import { DictionaryApiService } from '@/lib/api-service';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Heart, Volume2, X } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function DictionaryPage() {
  const {
    words,
    filteredWords,
    favorites,
    filters,
    isLoading,
    setWords,
    setFilters,
    applyFilters,
    addFavorite,
    removeFavorite,
    isFavorite,
    addSearchHistory,
    setLoading,
  } = useDictionaryStore();

  const [categories, setCategories] = useState<string[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<any>(null);

  // Load all words on mount
  useEffect(() => {
    const loadWords = async () => {
      setLoading(true);
      const allWords = await DictionaryApiService.getAllWords();
      setWords(allWords);
      setCategories(DictionaryApiService.getCategories(allWords));
      setThemes(DictionaryApiService.getThemes(allWords));
      setLevels(DictionaryApiService.getLevels(allWords));
      setLoading(false);
    };
    loadWords();
  }, [setWords, setLoading]);

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  const handleSearch = (query: string) => {
    setFilters({ searchQuery: query });
    if (query.trim()) {
      addSearchHistory(query);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      category: undefined,
      theme: undefined,
      level: undefined,
    });
  };

  const playAudio = (audioUrl?: string) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold font-heading text-primary mb-4">
            Dictionnaire Nidalum
          </h1>
          <p className="text-xl text-secondary">
            Explorez tous les mots et expressions de la langue Nidalum
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher un mot (Nidalum, français, anglais, allemand)..."
              value={filters.searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-6 py-3 text-lg bg-white/10 border-secondary/30 text-white placeholder-white/50"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Catégorie
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) =>
                setFilters({
                  category: e.target.value || undefined,
                })
              }
              className="w-full px-4 py-2 bg-white/10 border border-secondary/30 text-white rounded-lg"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Thème
            </label>
            <select
              value={filters.theme || ''}
              onChange={(e) =>
                setFilters({
                  theme: e.target.value || undefined,
                })
              }
              className="w-full px-4 py-2 bg-white/10 border border-secondary/30 text-white rounded-lg"
            >
              <option value="">Tous les thèmes</option>
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Niveau
            </label>
            <select
              value={filters.level || ''}
              onChange={(e) =>
                setFilters({
                  level: e.target.value || undefined,
                })
              }
              className="w-full px-4 py-2 bg-white/10 border border-secondary/30 text-white rounded-lg"
            >
              <option value="">Tous les niveaux</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="w-full"
            >
              Réinitialiser
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-secondary">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <p>
              {filteredWords.length} mot{filteredWords.length !== 1 ? 's' : ''}{' '}
              trouvé{filteredWords.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Words Grid */}
        {!isLoading && filteredWords.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredWords.map((word) => (
              <Card
                key={word._id}
                className="bg-white/5 border-secondary/20 hover:border-secondary/50 transition-all cursor-pointer p-6"
                onClick={() => setSelectedWord(word)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary font-heading">
                      {word.nidalumWord}
                    </h3>
                    {word.pronunciationGuide && (
                      <p className="text-sm text-secondary/70 mt-1">
                        /{word.pronunciationGuide}/
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isFavorite(word._id)) {
                        removeFavorite(word._id);
                      } else {
                        addFavorite(word._id);
                      }
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Heart
                      size={20}
                      className={
                        isFavorite(word._id)
                          ? 'fill-primary text-primary'
                          : 'text-secondary/50'
                      }
                    />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  {word.definition && (
                    <p className="text-white/80">
                      <span className="text-secondary font-semibold">FR:</span>{' '}
                      {word.definition}
                    </p>
                  )}
                  {word.english && (
                    <p className="text-white/80">
                      <span className="text-secondary font-semibold">EN:</span>{' '}
                      {word.english}
                    </p>
                  )}
                  {word.german && (
                    <p className="text-white/80">
                      <span className="text-secondary font-semibold">DE:</span>{' '}
                      {word.german}
                    </p>
                  )}
                </div>

                {word.category && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      {word.category}
                    </span>
                    {word.theme && (
                      <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full">
                        {word.theme}
                      </span>
                    )}
                  </div>
                )}

                {word.audio_url && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(word.audio_url);
                    }}
                    className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                  >
                    <Volume2 size={16} />
                    <span className="text-sm">Écouter</span>
                  </button>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredWords.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-secondary/70 mb-4">
              Aucun mot ne correspond à votre recherche
            </p>
            <Button onClick={handleClearFilters} variant="outline">
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* Word Detail Modal */}
        {selectedWord && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedWord(null)}
          >
            <Card
              className="bg-background border-secondary/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-primary font-heading">
                    {selectedWord.nidalumWord}
                  </h2>
                  {selectedWord.pronunciationGuide && (
                    <p className="text-secondary mt-2">
                      /{selectedWord.pronunciationGuide}/
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedWord(null)}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <X size={24} className="text-secondary" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Definitions */}
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">
                    Définitions
                  </h3>
                  <div className="space-y-2">
                    {selectedWord.definition && (
                      <p className="text-white/80">
                        <span className="text-primary font-semibold">
                          Français:
                        </span>{' '}
                        {selectedWord.definition}
                      </p>
                    )}
                    {selectedWord.english && (
                      <p className="text-white/80">
                        <span className="text-primary font-semibold">
                          English:
                        </span>{' '}
                        {selectedWord.english}
                      </p>
                    )}
                    {selectedWord.german && (
                      <p className="text-white/80">
                        <span className="text-primary font-semibold">
                          Deutsch:
                        </span>{' '}
                        {selectedWord.german}
                      </p>
                    )}
                  </div>
                </div>

                {/* Etymology */}
                {selectedWord.etymology && (
                  <div>
                    <h3 className="text-xl font-semibold text-secondary mb-3">
                      Étymologie
                    </h3>
                    <p className="text-white/80">{selectedWord.etymology}</p>
                  </div>
                )}

                {/* Example Sentence */}
                {selectedWord.exampleSentence && (
                  <div>
                    <h3 className="text-xl font-semibold text-secondary mb-3">
                      Exemple
                    </h3>
                    <p className="text-white/80 italic">
                      {selectedWord.exampleSentence}
                    </p>
                  </div>
                )}

                {/* Audio */}
                {selectedWord.audio_url && (
                  <div>
                    <h3 className="text-xl font-semibold text-secondary mb-3">
                      Prononciation
                    </h3>
                    <Button
                      onClick={() => playAudio(selectedWord.audio_url)}
                      className="flex items-center gap-2"
                    >
                      <Volume2 size={18} />
                      Écouter la prononciation
                    </Button>
                  </div>
                )}

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-secondary/20">
                  {selectedWord.category && (
                    <div>
                      <p className="text-secondary text-sm">Catégorie</p>
                      <p className="text-white font-semibold">
                        {selectedWord.category}
                      </p>
                    </div>
                  )}
                  {selectedWord.theme && (
                    <div>
                      <p className="text-secondary text-sm">Thème</p>
                      <p className="text-white font-semibold">
                        {selectedWord.theme}
                      </p>
                    </div>
                  )}
                  {selectedWord.level && (
                    <div>
                      <p className="text-secondary text-sm">Niveau</p>
                      <p className="text-white font-semibold">
                        {selectedWord.level}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
