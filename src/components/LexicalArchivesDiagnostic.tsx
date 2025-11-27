import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { NidalumApprendrelaLangue, LanguageCategories } from '@/entities';

export default function LexicalArchivesDiagnostic() {
  const [lexicon, setLexicon] = useState<NidalumApprendrelaLangue[]>([]);
  const [categories, setCategories] = useState<LanguageCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [lexiconResult, categoriesResult] = await Promise.all([
          BaseCrudService.getAll<NidalumApprendrelaLangue>('nidalumlexicon'),
          BaseCrudService.getAll<LanguageCategories>('languagecategories')
        ]);

        setLexicon(lexiconResult.items || []);
        setCategories(categoriesResult.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center">Chargement des données...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Erreur: {error}</div>;
  }

  // Group words by category
  const wordsByCategory = categories.map(cat => ({
    category: cat,
    words: lexicon.filter(w => w.category === cat.categoryName)
  }));

  return (
    <div className="p-8 bg-background/50 border border-primary/30 rounded-lg">
      <h2 className="font-heading text-2xl text-primary mb-6">Diagnostic Archives Lexicales</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-primary/10 border border-primary/30 rounded">
          <div className="font-heading text-3xl text-primary">{lexicon.length}</div>
          <p className="font-paragraph text-sm text-foreground/70">Mots Nidalum</p>
        </div>
        <div className="p-4 bg-secondary/10 border border-secondary/30 rounded">
          <div className="font-heading text-3xl text-secondary">{categories.length}</div>
          <p className="font-paragraph text-sm text-foreground/70">Catégories</p>
        </div>
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
          <div className="font-heading text-3xl text-green-500">{wordsByCategory.filter(wc => wc.words.length > 0).length}</div>
          <p className="font-paragraph text-sm text-foreground/70">Catégories avec mots</p>
        </div>
      </div>

      {/* Categories with words */}
      <div className="space-y-6">
        <h3 className="font-heading text-xl text-primary">Répartition par catégorie:</h3>
        {wordsByCategory.map(({ category, words }) => (
          <div key={category._id} className="border border-primary/20 p-4 rounded">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-heading text-lg text-secondary">{category.categoryName}</h4>
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded">
                {words.length} mots
              </span>
            </div>
            <p className="font-paragraph text-sm text-foreground/70 mb-3">{category.description}</p>
            
            {words.length === 0 ? (
              <p className="text-foreground/50 italic">Aucun mot associé à cette catégorie</p>
            ) : (
              <div className="space-y-2">
                {words.slice(0, 5).map(word => (
                  <div key={word._id} className="text-sm text-foreground/80">
                    <span className="font-heading text-secondary">{word.nidalumWord}</span>
                    <span className="text-foreground/60"> - {word.definition}</span>
                  </div>
                ))}
                {words.length > 5 && (
                  <p className="text-foreground/50 text-sm">... et {words.length - 5} autres mots</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Raw data inspection */}
      <div className="mt-8 pt-8 border-t border-primary/20">
        <h3 className="font-heading text-lg text-primary mb-4">Inspection des données brutes:</h3>
        <details className="border border-primary/20 p-4 rounded">
          <summary className="cursor-pointer font-paragraph font-semibold text-foreground">
            Voir les catégories (JSON)
          </summary>
          <pre className="mt-4 p-4 bg-background/50 border border-primary/10 rounded text-xs text-foreground/70 overflow-auto max-h-96">
            {JSON.stringify(categories, null, 2)}
          </pre>
        </details>
        
        <details className="border border-primary/20 p-4 rounded mt-4">
          <summary className="cursor-pointer font-paragraph font-semibold text-foreground">
            Voir les mots (premiers 10)
          </summary>
          <pre className="mt-4 p-4 bg-background/50 border border-primary/10 rounded text-xs text-foreground/70 overflow-auto max-h-96">
            {JSON.stringify(lexicon.slice(0, 10), null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
