import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { NidalumApprendrelaLangue, LanguageCategories } from '@/entities';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, RefreshCw, Download, Eye, Trash2, Edit3 } from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';

interface OrphanedWordFix {
  wordId: string;
  wordName: string;
  oldCategory: string;
  newCategory: string;
  status: 'fixed' | 'deleted' | 'error';
  reason: string;
}

interface DiagnosticReport {
  timestamp: string;
  totalWords: number;
  totalCategories: number;
  wordsByCategory: Record<string, number>;
  orphanedWords: NidalumApprendrelaLangue[];
  missingCategories: string[];
  duplicateWords: string[];
  invalidWords: NidalumApprendrelaLangue[];
  slugMismatches: Array<{ word: NidalumApprendrelaLangue; issue: string }>;
  synchronizationStatus: 'success' | 'partial' | 'failed';
  corrections: {
    categoriesCreated: number;
    wordsFixed: number;
    orphansResolved: number;
    wordsDeleted: number;
    slugsCorrected: number;
  };
  orphanedWordsFixes: OrphanedWordFix[];
  errors: string[];
  warnings: string[];
}

export default function CompleteLexicalDiagnostic() {
  const navigate = useNavigate();
  const { isAdmin } = useAdminStore();
  const [status, setStatus] = useState<'analyzing' | 'correcting' | 'complete' | 'error'>('analyzing');
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  // Redirect non-admin users
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setLogs(prev => [...prev, logMessage]);
    console.log(logMessage);
  };

  const inferCategoryFromWord = (word: NidalumApprendrelaLangue): string => {
    // Try to infer category from various fields
    if (word.category && word.category !== 'UNCATEGORIZED') return word.category;
    if (word.theme) return word.theme;
    if (word.categorie) return word.categorie;
    
    // Infer from definition or context
    const definition = (word.definition || word.definition1 || '').toLowerCase();
    const context = (word.context || '').toLowerCase();
    const fullText = `${definition} ${context}`;
    
    if (fullText.includes('sacr') || fullText.includes('spirit') || fullText.includes('divin')) return 'Sacré';
    if (fullText.includes('élém') || fullText.includes('eau') || fullText.includes('feu') || fullText.includes('terre') || fullText.includes('air')) return 'Éléments';
    if (fullText.includes('humain') || fullText.includes('person') || fullText.includes('homme') || fullText.includes('femme')) return 'Humain';
    if (fullText.includes('protect') || fullText.includes('défens') || fullText.includes('garde')) return 'Protection';
    if (fullText.includes('nombr') || fullText.includes('chiffr') || fullText.includes('quantit')) return 'Nombres';
    
    return 'Humain'; // Default category
  };

  useEffect(() => {
    const runDiagnostic = async () => {
      try {
        addLog('🔍 Démarrage du diagnostic technique complet et correction des orphelins...');
        
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
        setProgress(15);

        // Step 2: Analyze data
        addLog('🔬 Analyse détaillée des données...');
        const report: DiagnosticReport = {
          timestamp: new Date().toISOString(),
          totalWords: words.length,
          totalCategories: categories.length,
          wordsByCategory: {},
          orphanedWords: [],
          missingCategories: [],
          duplicateWords: [],
          invalidWords: [],
          slugMismatches: [],
          synchronizationStatus: 'success',
          corrections: {
            categoriesCreated: 0,
            wordsFixed: 0,
            orphansResolved: 0,
            wordsDeleted: 0,
            slugsCorrected: 0,
          },
          orphanedWordsFixes: [],
          errors: [],
          warnings: [],
        };

        // Build category map
        const categoryNames = new Set(categories.map(c => c.categoryName).filter(Boolean));
        const categoryMap = new Map(categories.map(c => [c.categoryName, c]));
        
        // Analyze each word
        words.forEach(word => {
          const category = word.category || 'UNCATEGORIZED';
          report.wordsByCategory[category] = (report.wordsByCategory[category] || 0) + 1;

          // Check for invalid words (missing essential fields)
          if (!word.nidalumWord || word.nidalumWord.trim() === '') {
            report.invalidWords.push(word);
            addLog(`⚠ Mot invalide détecté: ID ${word._id} (pas de nom Nidalum)`);
          }

          // Check for orphaned words
          if (!categoryNames.has(category) && category !== 'UNCATEGORIZED') {
            report.orphanedWords.push(word);
            addLog(`⚠ Mot orphelin: "${word.nidalumWord}" → catégorie inexistante "${category}"`);
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
          if (name) {
            wordNames.set(name, (wordNames.get(name) || 0) + 1);
          }
        });
        wordNames.forEach((count, name) => {
          if (count > 1) {
            report.duplicateWords.push(name);
          }
        });

        addLog(`✓ ${Object.keys(report.wordsByCategory).length} catégories trouvées`);
        addLog(`⚠ ${report.orphanedWords.length} mots orphelins détectés`);
        addLog(`⚠ ${report.invalidWords.length} mots invalides détectés`);
        addLog(`⚠ ${report.missingCategories.length} catégories manquantes`);
        addLog(`⚠ ${report.duplicateWords.length} doublons détectés`);

        if (report.orphanedWords.length > 0 || report.missingCategories.length > 0 || report.invalidWords.length > 0) {
          report.synchronizationStatus = 'partial';
        }

        setProgress(30);

        // Step 3: Create missing categories
        addLog('🔧 Création des catégories manquantes...');
        setStatus('correcting');

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

        setProgress(45);

        // Step 4: Delete invalid words
        addLog('🗑️ Suppression des mots invalides...');
        for (const invalidWord of report.invalidWords) {
          try {
            await BaseCrudService.delete('nidalumlexicon', invalidWord._id);
            report.corrections.wordsDeleted++;
            addLog(`✓ Mot invalide supprimé: ID ${invalidWord._id}`);
          } catch (error) {
            report.errors.push(`Erreur lors de la suppression du mot invalide ${invalidWord._id}`);
            addLog(`✗ Erreur suppression: ${invalidWord._id}`);
          }
        }

        setProgress(55);

        // Step 5: Fix orphaned words by reassigning to correct category
        addLog('🔗 Rattachement des mots orphelins aux catégories...');
        for (const orphanWord of report.orphanedWords) {
          try {
            const newCategory = inferCategoryFromWord(orphanWord);
            await BaseCrudService.update('nidalumlexicon', {
              _id: orphanWord._id,
              category: newCategory,
            });
            report.corrections.orphansResolved++;
            report.orphanedWordsFixes.push({
              wordId: orphanWord._id,
              wordName: orphanWord.nidalumWord || 'Unknown',
              oldCategory: orphanWord.category || 'UNCATEGORIZED',
              newCategory: newCategory,
              status: 'fixed',
              reason: 'Catégorie réassignée automatiquement',
            });
            addLog(`✓ Mot orphelin corrigé: "${orphanWord.nidalumWord}" → ${newCategory}`);
          } catch (error) {
            report.errors.push(`Erreur lors de la correction de ${orphanWord.nidalumWord}`);
            report.orphanedWordsFixes.push({
              wordId: orphanWord._id,
              wordName: orphanWord.nidalumWord || 'Unknown',
              oldCategory: orphanWord.category || 'UNCATEGORIZED',
              newCategory: 'ERROR',
              status: 'error',
              reason: error instanceof Error ? error.message : 'Erreur inconnue',
            });
            addLog(`✗ Erreur: ${orphanWord.nidalumWord}`);
          }
        }

        setProgress(65);

        // Step 6: Remove duplicates (keep first, delete others)
        addLog('🔄 Suppression des doublons...');
        const seenWords = new Map<string, string>(); // word name -> first ID
        for (const word of words) {
          const name = word.nidalumWord || '';
          if (name) {
            if (seenWords.has(name)) {
              // This is a duplicate, delete it
              try {
                await BaseCrudService.delete('nidalumlexicon', word._id);
                report.corrections.wordsDeleted++;
                addLog(`✓ Doublon supprimé: "${name}" (ID: ${word._id})`);
              } catch (error) {
                report.warnings.push(`Impossible de supprimer le doublon: ${name}`);
              }
            } else {
              seenWords.set(name, word._id);
            }
          }
        }

        setProgress(75);

        // Step 7: Verify slug/category correspondence
        addLog('✓ Vérification des correspondances slug/catégories...');
        const updatedCategoriesResult = await BaseCrudService.getAll<LanguageCategories>('languagecategories');
        const updatedCategories = updatedCategoriesResult.items || [];
        const updatedCategoryNames = new Set(updatedCategories.map(c => c.categoryName).filter(Boolean));

        for (const word of words) {
          if (word.category && !updatedCategoryNames.has(word.category)) {
            const inferredCategory = inferCategoryFromWord(word);
            try {
              await BaseCrudService.update('nidalumlexicon', {
                _id: word._id,
                category: inferredCategory,
              });
              report.corrections.slugsCorrected++;
              report.slugMismatches.push({
                word: word,
                issue: `Catégorie "${word.category}" corrigée en "${inferredCategory}"`,
              });
              addLog(`✓ Slug corrigé: "${word.nidalumWord}" (${word.category} → ${inferredCategory})`);
            } catch (error) {
              report.warnings.push(`Impossible de corriger le slug pour ${word.nidalumWord}`);
            }
          }
        }

        setProgress(85);

        // Step 8: Final verification and synchronization
        addLog('✓ Synchronisation complète et vérification finale...');
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

        // Check final status
        const finalOrphans = finalWords.filter(w => !updatedCategoryNames.has(w.category || 'UNCATEGORIZED'));
        if (finalOrphans.length === 0 && report.missingCategories.length === 0) {
          report.synchronizationStatus = 'success';
        }

        addLog(`✅ Diagnostic et correction terminés!`);
        addLog(`📊 Résumé final:`);
        addLog(`   - ${report.totalWords} mots (${report.corrections.wordsDeleted} supprimés)`);
        addLog(`   - ${report.totalCategories} catégories (${report.corrections.categoriesCreated} créées)`);
        addLog(`   - ${report.corrections.orphansResolved} mots orphelins corrigés`);
        addLog(`   - ${report.corrections.slugsCorrected} slugs corrigés`);
        addLog(`   - Statut: ${report.synchronizationStatus}`);

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

  const downloadReport = () => {
    if (!report) return;
    
    const reportText = `
╔════════════════════════════════════════════════════════════════════════════╗
║         RAPPORT COMPLET DE DIAGNOSTIC LEXICAL NIDALUM                      ║
║              Correction Technique des Mots Orphelins                       ║
╚════════════════════════════════════════════════════════════════════════════╝

Généré: ${new Date(report.timestamp).toLocaleString()}
Statut Final: ${report.synchronizationStatus.toUpperCase()}

═══════════════════════════════════════════════════════════════════════════════
STATISTIQUES GLOBALES
═══════════════════════════════════════════════════════════════════════════════
Total de mots (final): ${report.totalWords}
Total de catégories: ${report.totalCategories}
Synchronisation: ${report.synchronizationStatus === 'success' ? '✓ SUCCÈS' : report.synchronizationStatus === 'partial' ? '⚠ PARTIELLE' : '✗ ÉCHOUÉE'}

═══════════════════════════════════════════════════════════════════════════════
DISTRIBUTION PAR CATÉGORIE (FINAL)
═══════════════════════════════════════════════════════════════════════════════
${Object.entries(report.wordsByCategory)
  .sort(([, a], [, b]) => b - a)
  .map(([cat, count]) => `${cat.padEnd(20)} : ${count.toString().padStart(4)} mots`)
  .join('\n')}

═══════════════════════════════════════════════════════════════════════════════
CORRECTIONS APPLIQUÉES
═══════════════════════════════════════════════════════════════════════════════
✓ Catégories créées        : ${report.corrections.categoriesCreated}
✓ Mots orphelins corrigés  : ${report.corrections.orphansResolved}
✓ Mots invalides supprimés : ${report.corrections.wordsDeleted}
✓ Slugs/Catégories corrigés: ${report.corrections.slugsCorrected}
─────────────────────────────────────────────────────────────────────────────
  TOTAL CORRECTIONS        : ${report.corrections.categoriesCreated + report.corrections.orphansResolved + report.corrections.wordsDeleted + report.corrections.slugsCorrected}

═══════════════════════════════════════════════════════════════════════════════
DÉTAIL DES MOTS ORPHELINS CORRIGÉS (${report.orphanedWordsFixes.length})
═══════════════════════════════════════════════════════════════════════════════
${report.orphanedWordsFixes.map((fix, i) => `
${i + 1}. "${fix.wordName}"
   ID: ${fix.wordId}
   Ancienne catégorie: ${fix.oldCategory}
   Nouvelle catégorie: ${fix.newCategory}
   Statut: ${fix.status === 'fixed' ? '✓ CORRIGÉ' : fix.status === 'deleted' ? '✗ SUPPRIMÉ' : '✗ ERREUR'}
   Raison: ${fix.reason}
`).join('\n')}

═══════════════════════════════════════════════════════════════════════════════
PROBLÈMES DÉTECTÉS ET RÉSOLUS
═══════════════════════════════════════════════════════════════════════════════
Mots invalides détectés: ${report.invalidWords.length} (supprimés)
Catégories manquantes: ${report.missingCategories.length} (créées)
Doublons détectés: ${report.duplicateWords.length} (supprimés)
Slug/Catégorie mismatches: ${report.slugMismatches.length} (corrigés)

${report.missingCategories.length > 0 ? `
Catégories créées:
${report.missingCategories.map(cat => `  • ${cat}`).join('\n')}
` : ''}

${report.duplicateWords.length > 0 ? `
Doublons supprimés:
${report.duplicateWords.slice(0, 10).map(word => `  • "${word}"`).join('\n')}
${report.duplicateWords.length > 10 ? `  ... et ${report.duplicateWords.length - 10} autres\n` : ''}
` : ''}

═══════════════════════════════════════════════════════════════════════════════
ERREURS RENCONTRÉES (${report.errors.length})
═══════════════════════════════════════════════════════════════════════════════
${report.errors.length > 0 ? report.errors.map((err, i) => `${i + 1}. ${err}`).join('\n') : 'Aucune erreur'}

═══════════════════════════════════════════════════════════════════════════════
AVERTISSEMENTS (${report.warnings.length})
═══════════════════════════════════════════════════════════════════════════════
${report.warnings.length > 0 ? report.warnings.map((warn, i) => `${i + 1}. ${warn}`).join('\n') : 'Aucun avertissement'}

═══════════════════════════════════════════════════════════════════════════════
LOGS DÉTAILLÉS DE L'EXÉCUTION
═══════════════════════════════════════════════════════════════════════════════
${logs.join('\n')}

═══════════════════════════════════════════════════════════════════════════════
FIN DU RAPPORT
═══════════════════════════════════════════════════════════════════════════════
    `;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagnostic-lexical-complet-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Show access denied message for non-admin users
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background p-6 lg:p-12 flex items-center justify-center">
        <div className="max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="font-heading text-3xl text-primary mb-4">Accès Refusé</h1>
          <p className="font-paragraph text-foreground/80 mb-6">
            Cette page est réservée aux administrateurs uniquement.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-heading"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

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

            {/* Issues Before Correction */}
            {(report.orphanedWords.length > 0 || report.missingCategories.length > 0 || report.duplicateWords.length > 0 || report.invalidWords.length > 0) && (
              <div className="border border-yellow-500/30 p-6 bg-yellow-500/10">
                <h2 className="font-heading text-2xl text-yellow-500 mb-4">Problèmes Détectés et Corrigés</h2>
                <div className="space-y-4">
                  {report.invalidWords.length > 0 && (
                    <div>
                      <p className="font-paragraph font-semibold text-foreground mb-2">
                        Mots invalides supprimés ({report.invalidWords.length}):
                      </p>
                      <div className="space-y-1">
                        {report.invalidWords.slice(0, 5).map((w, i) => (
                          <p key={i} className="font-paragraph text-foreground/80 text-sm flex items-center gap-2">
                            <Trash2 className="w-4 h-4 text-red-500" />
                            ID: {w._id}
                          </p>
                        ))}
                        {report.invalidWords.length > 5 && (
                          <p className="font-paragraph text-foreground/80 text-sm">
                            ... et {report.invalidWords.length - 5} autres
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {report.missingCategories.length > 0 && (
                    <div>
                      <p className="font-paragraph font-semibold text-foreground mb-2">
                        Catégories manquantes créées ({report.missingCategories.length}):
                      </p>
                      <p className="font-paragraph text-foreground/80">
                        {report.missingCategories.join(', ')}
                      </p>
                    </div>
                  )}
                  {report.orphanedWords.length > 0 && (
                    <div>
                      <p className="font-paragraph font-semibold text-foreground mb-2">
                        Mots orphelins rattachés ({report.orphanedWords.length}):
                      </p>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {report.orphanedWordsFixes.slice(0, 10).map((fix, i) => (
                          <p key={i} className="font-paragraph text-foreground/80 text-sm flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            "{fix.wordName}" → {fix.newCategory}
                          </p>
                        ))}
                        {report.orphanedWordsFixes.length > 10 && (
                          <p className="font-paragraph text-foreground/80 text-sm">
                            ... et {report.orphanedWordsFixes.length - 10} autres
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {report.duplicateWords.length > 0 && (
                    <div>
                      <p className="font-paragraph font-semibold text-foreground mb-2">
                        Doublons supprimés ({report.duplicateWords.length}):
                      </p>
                      <p className="font-paragraph text-foreground/80 text-sm">
                        {report.duplicateWords.slice(0, 5).join(', ')}
                        {report.duplicateWords.length > 5 && ` ... et ${report.duplicateWords.length - 5} autres`}
                      </p>
                    </div>
                  )}
                  {report.slugMismatches.length > 0 && (
                    <div>
                      <p className="font-paragraph font-semibold text-foreground mb-2">
                        Slugs/Catégories corrigés ({report.slugMismatches.length}):
                      </p>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {report.slugMismatches.slice(0, 5).map((mismatch, i) => (
                          <p key={i} className="font-paragraph text-foreground/80 text-sm flex items-center gap-2">
                            <Edit3 className="w-4 h-4 text-blue-500" />
                            {mismatch.issue}
                          </p>
                        ))}
                        {report.slugMismatches.length > 5 && (
                          <p className="font-paragraph text-foreground/80 text-sm">
                            ... et {report.slugMismatches.length - 5} autres
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Corrections Applied */}
            {(report.corrections.categoriesCreated > 0 || report.corrections.orphansResolved > 0 || report.corrections.wordsDeleted > 0 || report.corrections.slugsCorrected > 0) && (
              <div className="border border-green-500/30 p-6 bg-green-500/10">
                <h2 className="font-heading text-2xl text-green-500 mb-4">Corrections Appliquées avec Succès</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Catégories créées</p>
                    <p className="font-heading text-2xl text-green-500">{report.corrections.categoriesCreated}</p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Orphelins corrigés</p>
                    <p className="font-heading text-2xl text-green-500">{report.corrections.orphansResolved}</p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Mots supprimés</p>
                    <p className="font-heading text-2xl text-green-500">{report.corrections.wordsDeleted}</p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Slugs corrigés</p>
                    <p className="font-heading text-2xl text-green-500">{report.corrections.slugsCorrected}</p>
                  </div>
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
