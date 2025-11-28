import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { NidalumApprendrelaLangue, LanguageCategories } from '@/entities';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, RefreshCw, Download, Eye } from 'lucide-react';

interface DiagnosticReport {
  timestamp: string;
  totalWords: number;
  totalCategories: number;
  wordsByCategory: Record<string, number>;
  orphanedWords: NidalumApprendrelaLangue[];
  missingCategories: string[];
  duplicateWords: string[];
  synchronizationStatus: 'success' | 'partial' | 'failed';
  corrections: {
    categoriesCreated: number;
    wordsFixed: number;
    orphansResolved: number;
  };
  errors: string[];
  warnings: string[];
}

export default function CompleteLexicalDiagnostic() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'analyzing' | 'correcting' | 'complete' | 'error'>('analyzing');
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setLogs(prev => [...prev, logMessage]);
    console.log(logMessage);
  };

  useEffect(() => {
    const runDiagnostic = async () => {
      try {
        addLog('🔍 Démarrage du diagnostic technique complet...');
        
        // Step 1: Load all data
        addLog('📥 Chargement des données...');
        const [wordsResult, categoriesResult] = await Promise.all([
          BaseCrudService.getAll<NidalumApprendrelaLangue>('nidalumlexicon'),
          BaseCrudService.getAll<LanguageCategories>('languagecategories')
        ]);

        const words = wordsResult.items || [];
        const categories = categoriesResult.items || [];

        addLog(`✓ ${words.length} mots chargés`);
        addLog(`✓ ${categories.length} catégories chargées`);
        setProgress(20);

        // Step 2: Analyze data
        addLog('🔬 Analyse des données...');
        const report: DiagnosticReport = {
          timestamp: new Date().toISOString(),
          totalWords: words.length,
          totalCategories: categories.length,
          wordsByCategory: {},
          orphanedWords: [],
          missingCategories: [],
          duplicateWords: [],
          synchronizationStatus: 'success',
          corrections: {
            categoriesCreated: 0,
            wordsFixed: 0,
            orphansResolved: 0,
          },
          errors: [],
          warnings: [],
        };

        // Count words by category
        const categoryNames = new Set(categories.map(c => c.categoryName).filter(Boolean));
        
        words.forEach(word => {
          const category = word.category || 'UNCATEGORIZED';
          report.wordsByCategory[category] = (report.wordsByCategory[category] || 0) + 1;

          if (!categoryNames.has(category)) {
            report.orphanedWords.push(word);
          }
        });

        // Find missing categories
        const expectedCategories = ['Sacré', 'Éléments', 'Humain', 'Protection', 'Nombres'];
        expectedCategories.forEach(cat => {
          if (!categoryNames.has(cat)) {
            report.missingCategories.push(cat);
          }
        });

        // Check for duplicates
        const wordNames = new Map<string, number>();
        words.forEach(word => {
          const name = word.nidalumWord || '';
          wordNames.set(name, (wordNames.get(name) || 0) + 1);
        });
        wordNames.forEach((count, name) => {
          if (count > 1) {
            report.duplicateWords.push(name);
          }
        });

        addLog(`✓ ${Object.keys(report.wordsByCategory).length} catégories trouvées`);
        addLog(`⚠ ${report.orphanedWords.length} mots orphelins détectés`);
        addLog(`⚠ ${report.missingCategories.length} catégories manquantes`);
        addLog(`⚠ ${report.duplicateWords.length} doublons détectés`);

        if (report.orphanedWords.length > 0 || report.missingCategories.length > 0) {
          report.synchronizationStatus = 'partial';
        }

        setProgress(40);

        // Step 3: Auto-correct
        addLog('🔧 Correction automatique en cours...');
        setStatus('correcting');

        // Create missing categories
        const CATEGORIES_DATA: LanguageCategories[] = [
          {
            _id: crypto.randomUUID(),
            categoryName: 'Sacré',
            description: 'Termes sacrés et spirituels',
            gradientColorFrom: '#FF6B6B',
            gradientColorTo: '#FFE66D',
            theme: 'sacred',
          },
          {
            _id: crypto.randomUUID(),
            categoryName: 'Éléments',
            description: 'Les quatre éléments et forces naturelles',
            gradientColorFrom: '#4ECDC4',
            gradientColorTo: '#44A08D',
            theme: 'elements',
          },
          {
            _id: crypto.randomUUID(),
            categoryName: 'Humain',
            description: 'Termes relatifs à l\'être humain',
            gradientColorFrom: '#95E1D3',
            gradientColorTo: '#F38181',
            theme: 'human',
          },
          {
            _id: crypto.randomUUID(),
            categoryName: 'Protection',
            description: 'Concepts de protection et défense',
            gradientColorFrom: '#AA96DA',
            gradientColorTo: '#FCBAD3',
            theme: 'protection',
          },
          {
            _id: crypto.randomUUID(),
            categoryName: 'Nombres',
            description: 'Nombres et quantités',
            gradientColorFrom: '#A8E6CF',
            gradientColorTo: '#FFD3B6',
            theme: 'numbers',
          },
        ];

        for (const category of CATEGORIES_DATA) {
          if (!categoryNames.has(category.categoryName)) {
            try {
              await BaseCrudService.create('languagecategories', category);
              report.corrections.categoriesCreated++;
              addLog(`✓ Catégorie créée: ${category.categoryName}`);
            } catch (error) {
              addLog(`⚠ Catégorie déjà existante: ${category.categoryName}`);
            }
          }
        }

        setProgress(60);

        // Fix orphaned words
        for (const orphanWord of report.orphanedWords) {
          try {
            // Try to infer category from word data or assign to default
            const inferredCategory = inferCategory(orphanWord);
            await BaseCrudService.update('nidalumlexicon', {
              _id: orphanWord._id,
              category: inferredCategory,
            });
            report.corrections.orphansResolved++;
            addLog(`✓ Mot corrigé: ${orphanWord.nidalumWord} → ${inferredCategory}`);
          } catch (error) {
            report.errors.push(`Erreur lors de la correction de ${orphanWord.nidalumWord}`);
            addLog(`✗ Erreur: ${orphanWord.nidalumWord}`);
          }
        }

        setProgress(80);

        // Remove duplicates
        const seenWords = new Set<string>();
        for (const word of words) {
          const name = word.nidalumWord || '';
          if (seenWords.has(name)) {
            try {
              await BaseCrudService.delete('nidalumlexicon', word._id);
              addLog(`✓ Doublon supprimé: ${name}`);
            } catch (error) {
              report.warnings.push(`Impossible de supprimer le doublon: ${name}`);
            }
          }
          seenWords.add(name);
        }

        setProgress(90);

        // Final verification
        addLog('✓ Vérification finale...');
        const [finalWordsResult, finalCategoriesResult] = await Promise.all([
          BaseCrudService.getAll<NidalumApprendrelaLangue>('nidalumlexicon'),
          BaseCrudService.getAll<LanguageCategories>('languagecategories')
        ]);

        const finalWords = finalWordsResult.items || [];
        const finalCategories = finalCategoriesResult.items || [];

        // Recalculate word counts
        const finalWordsByCategory: Record<string, number> = {};
        finalWords.forEach(word => {
          const category = word.category || 'UNCATEGORIZED';
          finalWordsByCategory[category] = (finalWordsByCategory[category] || 0) + 1;
        });

        report.wordsByCategory = finalWordsByCategory;
        report.totalWords = finalWords.length;
        report.totalCategories = finalCategories.length;

        if (report.orphanedWords.length === 0 && report.missingCategories.length === 0) {
          report.synchronizationStatus = 'success';
        }

        addLog(`✅ Diagnostic terminé avec succès!`);
        addLog(`📊 Résumé final:`);
        addLog(`   - ${report.totalWords} mots`);
        addLog(`   - ${report.totalCategories} catégories`);
        addLog(`   - ${report.corrections.categoriesCreated} catégories créées`);
        addLog(`   - ${report.corrections.orphansResolved} mots corrigés`);

        setReport(report);
        setStatus('complete');
        setProgress(100);
      } catch (error) {
        addLog(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        setStatus('error');
      }
    };

    runDiagnostic();
  }, []);

  const inferCategory = (word: NidalumApprendrelaLangue): string => {
    // Simple inference based on word properties
    if (word.category) return word.category;
    if (word.theme) return word.theme;
    return 'Humain'; // Default category
  };

  const downloadReport = () => {
    if (!report) return;
    
    const reportText = `
RAPPORT DE DIAGNOSTIC LEXICAL NIDALUM
=====================================
Généré: ${new Date(report.timestamp).toLocaleString()}

STATISTIQUES GLOBALES
---------------------
Total de mots: ${report.totalWords}
Total de catégories: ${report.totalCategories}
Statut de synchronisation: ${report.synchronizationStatus}

DISTRIBUTION PAR CATÉGORIE
--------------------------
${Object.entries(report.wordsByCategory)
  .map(([cat, count]) => `${cat}: ${count} mots`)
  .join('\n')}

CORRECTIONS APPLIQUÉES
---------------------
Catégories créées: ${report.corrections.categoriesCreated}
Mots corrigés: ${report.corrections.orphansResolved}
Orphelins résolus: ${report.corrections.orphansResolved}

PROBLÈMES DÉTECTÉS
------------------
Mots orphelins: ${report.orphanedWords.length}
Catégories manquantes: ${report.missingCategories.length}
Doublons: ${report.duplicateWords.length}

ERREURS
-------
${report.errors.length > 0 ? report.errors.join('\n') : 'Aucune erreur'}

AVERTISSEMENTS
--------------
${report.warnings.length > 0 ? report.warnings.join('\n') : 'Aucun avertissement'}

LOGS DÉTAILLÉS
--------------
${logs.join('\n')}
    `;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagnostic-lexical-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-heading text-5xl text-primary mb-4">
            Diagnostic Lexical Complet
          </h1>
          <p className="font-paragraph text-foreground/80">
            Analyse technique et correction automatique du lexique Nidalum
          </p>
        </motion.div>

        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mb-8 p-6 border-2 rounded-lg ${
            status === 'analyzing' ? 'border-primary/50 bg-primary/10' :
            status === 'correcting' ? 'border-secondary/50 bg-secondary/10' :
            status === 'complete' ? 'border-green-500/50 bg-green-500/10' :
            'border-red-500/50 bg-red-500/10'
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            {status === 'analyzing' && (
              <>
                <RefreshCw className="w-6 h-6 text-primary animate-spin" />
                <span className="font-heading text-lg text-primary">Analyse en cours...</span>
              </>
            )}
            {status === 'correcting' && (
              <>
                <RefreshCw className="w-6 h-6 text-secondary animate-spin" />
                <span className="font-heading text-lg text-secondary">Correction en cours...</span>
              </>
            )}
            {status === 'complete' && (
              <>
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-heading text-lg text-green-500">Diagnostic terminé</span>
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="w-6 h-6 text-red-500" />
                <span className="font-heading text-lg text-red-500">Erreur détectée</span>
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-foreground/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-primary h-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="font-paragraph text-sm text-foreground/70 mt-2">{progress}% complété</p>
        </motion.div>

        {/* Report */}
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border border-primary/30 p-4 bg-background/50">
                <p className="font-paragraph text-sm text-foreground/70 mb-2">Total Mots</p>
                <p className="font-heading text-3xl text-primary">{report.totalWords}</p>
              </div>
              <div className="border border-primary/30 p-4 bg-background/50">
                <p className="font-paragraph text-sm text-foreground/70 mb-2">Catégories</p>
                <p className="font-heading text-3xl text-secondary">{report.totalCategories}</p>
              </div>
              <div className="border border-primary/30 p-4 bg-background/50">
                <p className="font-paragraph text-sm text-foreground/70 mb-2">Corrections</p>
                <p className="font-heading text-3xl text-green-500">
                  {report.corrections.categoriesCreated + report.corrections.orphansResolved}
                </p>
              </div>
              <div className="border border-primary/30 p-4 bg-background/50">
                <p className="font-paragraph text-sm text-foreground/70 mb-2">Statut</p>
                <p className={`font-heading text-lg ${
                  report.synchronizationStatus === 'success' ? 'text-green-500' :
                  report.synchronizationStatus === 'partial' ? 'text-yellow-500' :
                  'text-red-500'
                }`}>
                  {report.synchronizationStatus === 'success' ? '✓ OK' :
                   report.synchronizationStatus === 'partial' ? '⚠ Partiel' :
                   '✗ Erreur'}
                </p>
              </div>
            </div>

            {/* Words by Category */}
            <div className="border border-primary/30 p-6 bg-background/50">
              <h2 className="font-heading text-2xl text-primary mb-4">Distribution par Catégorie</h2>
              <div className="space-y-3">
                {Object.entries(report.wordsByCategory)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="font-paragraph text-foreground">{category}</span>
                      <div className="flex items-center gap-4">
                        <div className="w-48 bg-foreground/10 rounded-full h-2">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{
                              width: `${(count / report.totalWords) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="font-heading text-secondary w-12 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Issues */}
            {(report.orphanedWords.length > 0 || report.missingCategories.length > 0 || report.duplicateWords.length > 0) && (
              <div className="border border-yellow-500/30 p-6 bg-yellow-500/10">
                <h2 className="font-heading text-2xl text-yellow-500 mb-4">Problèmes Détectés</h2>
                <div className="space-y-4">
                  {report.missingCategories.length > 0 && (
                    <div>
                      <p className="font-paragraph font-semibold text-foreground mb-2">
                        Catégories manquantes ({report.missingCategories.length}):
                      </p>
                      <p className="font-paragraph text-foreground/80">
                        {report.missingCategories.join(', ')}
                      </p>
                    </div>
                  )}
                  {report.orphanedWords.length > 0 && (
                    <div>
                      <p className="font-paragraph font-semibold text-foreground mb-2">
                        Mots orphelins ({report.orphanedWords.length}):
                      </p>
                      <p className="font-paragraph text-foreground/80 text-sm">
                        {report.orphanedWords.slice(0, 5).map(w => w.nidalumWord).join(', ')}
                        {report.orphanedWords.length > 5 && ` ... et ${report.orphanedWords.length - 5} autres`}
                      </p>
                    </div>
                  )}
                  {report.duplicateWords.length > 0 && (
                    <div>
                      <p className="font-paragraph font-semibold text-foreground mb-2">
                        Doublons ({report.duplicateWords.length}):
                      </p>
                      <p className="font-paragraph text-foreground/80 text-sm">
                        {report.duplicateWords.slice(0, 5).join(', ')}
                        {report.duplicateWords.length > 5 && ` ... et ${report.duplicateWords.length - 5} autres`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Corrections Applied */}
            {(report.corrections.categoriesCreated > 0 || report.corrections.orphansResolved > 0) && (
              <div className="border border-green-500/30 p-6 bg-green-500/10">
                <h2 className="font-heading text-2xl text-green-500 mb-4">Corrections Appliquées</h2>
                <div className="space-y-2 font-paragraph text-foreground">
                  <p>✓ {report.corrections.categoriesCreated} catégories créées</p>
                  <p>✓ {report.corrections.orphansResolved} mots corrigés</p>
                </div>
              </div>
            )}

            {/* Errors */}
            {report.errors.length > 0 && (
              <div className="border border-red-500/30 p-6 bg-red-500/10">
                <h2 className="font-heading text-2xl text-red-500 mb-4">Erreurs</h2>
                <div className="space-y-2">
                  {report.errors.map((error, i) => (
                    <p key={i} className="font-paragraph text-foreground/80 text-sm">
                      • {error}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Logs Toggle */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-4 border border-primary/30 bg-background/50 hover:bg-background/70 transition-colors"
            >
              <span className="font-heading text-primary">Logs Détaillés</span>
              <Eye className={`w-5 h-5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </button>

            {/* Detailed Logs */}
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border border-primary/30 p-4 bg-background/50 max-h-96 overflow-y-auto"
              >
                <div className="space-y-1 font-mono text-xs text-foreground/70">
                  {logs.map((log, i) => (
                    <p key={i}>{log}</p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={downloadReport}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-heading"
              >
                <Download className="w-5 h-5" />
                Télécharger le rapport
              </button>
              <button
                onClick={() => navigate('/lexical-archives')}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-heading"
              >
                <CheckCircle className="w-5 h-5" />
                Voir les Archives
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
