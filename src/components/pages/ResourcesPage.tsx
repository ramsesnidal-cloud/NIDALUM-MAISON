import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { OfficialResources, NidalumLexicon } from '@/entities';
import { Image } from '@/components/ui/image';
import { Download, FileText, Calendar, BookOpen, Zap, CheckCircle, AlertCircle, Lightbulb, Target, X } from 'lucide-react';

const MAX_RETRIES = 3;
const DOWNLOAD_TIMEOUT = 30000; // 30 seconds

export default function ResourcesPage() {
  const [resources, setResources] = useState<OfficialResources[]>([]);
  const [lexicon, setLexicon] = useState<NidalumLexicon[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});
  const downloadAbortControllers = useRef<{ [key: string]: AbortController }>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [resourcesData, lexiconData] = await Promise.all([
      BaseCrudService.getAll<OfficialResources>('officialresources'),
      BaseCrudService.getAll<NidalumLexicon>('nidalumlexicon')
    ]);
    setResources(resourcesData.items);
    setLexicon(lexiconData.items);
    setIsLoading(false);
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const downloadWithRetry = async (
    fileUrl: string,
    fileName: string,
    resourceId: string,
    retryCount = 0
  ): Promise<void> => {
    const controller = new AbortController();
    downloadAbortControllers.current[resourceId] = controller;

    const timeoutId = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT);

    try {
      if (!fileUrl) {
        throw new Error('URL du fichier non disponible');
      }

      const response = await fetch(fileUrl, { signal: controller.signal });
      
      if (!response.ok) {
        if (response.status === 429 && retryCount < MAX_RETRIES) {
          // Rate limited, retry after delay
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
          return downloadWithRetry(fileUrl, fileName, resourceId, retryCount + 1);
        }
        throw new Error(`Erreur ${response.status}: Impossible de télécharger le fichier`);
      }

      const contentLength = response.headers.get('content-length');
      const total = parseInt(contentLength || '0', 10);
      let loaded = 0;

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Impossible de lire le fichier');

      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        loaded += value.length;

        if (total > 0) {
          const progress = Math.round((loaded / total) * 100);
          setDownloadProgress(prev => ({ ...prev, [resourceId]: progress }));
        }
      }

      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'ressource';
      link.setAttribute('aria-label', `Télécharger ${fileName}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(`${fileName} téléchargé avec succès!`);
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        const errorMessage = 'Téléchargement annulé ou délai dépassé';
        setDownloadError(errorMessage);
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Erreur lors du téléchargement';
        setDownloadError(errorMessage);
      }
      setTimeout(() => setDownloadError(null), 5000);
    } finally {
      clearTimeout(timeoutId);
      setDownloadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[resourceId];
        return newProgress;
      });
      delete downloadAbortControllers.current[resourceId];
      setDownloadingId(null);
    }
  };

  const handleDownload = async (fileUrl: string, fileName: string, resourceId: string) => {
    setDownloadingId(resourceId);
    setDownloadError(null);
    setDownloadSuccess(null);
    setDownloadProgress({});
    await downloadWithRetry(fileUrl, fileName, resourceId);
  };

  const cancelDownload = (resourceId: string) => {
    const controller = downloadAbortControllers.current[resourceId];
    if (controller) {
      controller.abort();
      delete downloadAbortControllers.current[resourceId];
    }
    setDownloadingId(null);
    setDownloadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[resourceId];
      return newProgress;
    });
  };

  const downloadPersonalDictionary = async () => {
    setDownloadingId('personal-dict');
    setDownloadError(null);
    setDownloadSuccess(null);

    try {
      if (lexicon.length === 0) {
        throw new Error('Aucun mot disponible dans le lexique');
      }

      const csvContent = [
        ['Mot Nidalum', 'Définition', 'Catégorie', 'Thème', 'Guide de Prononciation', 'Exemple', 'Étymologie', 'Expression', 'Traduction FR'].join(','),
        ...lexicon.map(word => [
          `"${word.nidalumWord || ''}"`,
          `"${word.definition || ''}"`,
          `"${word.category || ''}"`,
          `"${word.theme || ''}"`,
          `"${word.pronunciationGuide || ''}"`,
          `"${word.exampleSentence || ''}"`,
          `"${word.etymology || ''}"`,
          `"${word.expression_nidalum || ''}"`,
          `"${word.traduction_fr || ''}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Mon_Dictionnaire_Nidalum_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(`Dictionnaire téléchargé avec ${lexicon.length} mots!`);
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du téléchargement du dictionnaire';
      setDownloadError(errorMessage);
      setTimeout(() => setDownloadError(null), 5000);
    } finally {
      setDownloadingId(null);
    }
  };

  const resourceTypes = ['all', ...Array.from(new Set(resources.map(item => item.resourceType).filter(Boolean)))];

  const filteredResources = selectedType === 'all' 
    ? resources 
    : resources.filter(r => r.resourceType === selectedType);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-6">
              Ressources Officielles
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Téléchargez des documents officiels, guides d'apprentissage, et ressources pour approfondir votre maîtrise de Nidalum.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notification Messages */}
      <AnimatePresence>
        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 bg-green-500/20 border border-green-500/50 text-green-100 px-6 py-3 rounded flex items-center gap-3"
            role="alert"
            aria-live="polite"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-paragraph text-sm">{downloadSuccess}</span>
          </motion.div>
        )}

        {downloadError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 bg-red-500/20 border border-red-500/50 text-red-100 px-6 py-3 rounded flex items-center gap-3"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-paragraph text-sm">{downloadError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Start Guide - Enhanced */}
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/5 to-transparent">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 p-8 rounded-lg"
          >
            <div className="flex items-start gap-4 mb-8">
              <Target className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-heading text-2xl text-primary mb-2">Guide Complet d'Utilisation</h2>
                <p className="font-paragraph text-foreground/80">Découvrez comment exploiter au maximum nos ressources pour votre apprentissage du Nidalum :</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold">1</div>
                <div>
                  <h3 className="font-heading text-lg text-secondary mb-1">Choisir votre ressource</h3>
                  <p className="font-paragraph text-sm text-foreground/70">Filtrez par type : guides PDF, fiches pratiques, documents audio ou matériel visuel. Chaque ressource est conçue pour un objectif d'apprentissage spécifique.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold">2</div>
                <div>
                  <h3 className="font-heading text-lg text-secondary mb-1">Télécharger</h3>
                  <p className="font-paragraph text-sm text-foreground/70">Cliquez sur le bouton « Télécharger » pour obtenir le fichier directement sur votre appareil. Vous verrez la progression du téléchargement en temps réel.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold">3</div>
                <div>
                  <h3 className="font-heading text-lg text-secondary mb-1">Apprendre & Pratiquer</h3>
                  <p className="font-paragraph text-sm text-foreground/70">Utilisez les ressources pour approfondir vos connaissances. Combinez plusieurs types de ressources pour une meilleure compréhension.</p>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-background/30 border border-primary/20 p-6 rounded">
              <div className="flex items-start gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <h3 className="font-heading text-lg text-secondary">Conseils pour une meilleure expérience</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2 text-foreground/80">
                  <span className="text-secondary">•</span>
                  <span className="font-paragraph">Commencez par les guides PDF pour une compréhension globale</span>
                </li>
                <li className="flex gap-2 text-foreground/80">
                  <span className="text-secondary">•</span>
                  <span className="font-paragraph">Utilisez les fiches pratiques comme aide-mémoire pendant vos études</span>
                </li>
                <li className="flex gap-2 text-foreground/80">
                  <span className="text-secondary">•</span>
                  <span className="font-paragraph">Écoutez les documents audio pour améliorer votre prononciation</span>
                </li>
                <li className="flex gap-2 text-foreground/80">
                  <span className="text-secondary">•</span>
                  <span className="font-paragraph">Téléchargez votre dictionnaire personnel pour une référence rapide</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-background/50 border border-primary/20 p-6 backdrop-blur-sm"
          >
            <div className="flex flex-wrap gap-4 items-center justify-center mb-4">
              <span className="font-paragraph text-foreground/70">Type de ressource:</span>
              {resourceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  aria-pressed={selectedType === type}
                  className={`px-4 py-2 font-paragraph text-sm transition-all duration-300 ${
                    selectedType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-transparent border border-primary/30 text-foreground hover:border-primary'
                  }`}
                >
                  {type === 'all' ? 'Toutes' : type}
                </button>
              ))}
            </div>
            <div className="text-center">
              <p className="font-paragraph text-sm text-foreground/60">
                {filteredResources.length} ressource{filteredResources.length !== 1 ? 's' : ''} disponible{filteredResources.length !== 1 ? 's' : ''}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="font-paragraph text-foreground/70 mt-4">Chargement des ressources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground/70">Aucune ressource trouvée</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm group flex flex-col"
                >
                  {resource.thumbnailImage && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={resource.thumbnailImage}
                        alt={resource.resourceName || 'Ressource'}
                        width={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      {resource.resourceType && (
                        <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary mb-3">
                          {resource.resourceType}
                        </span>
                      )}
                      <h3 className="font-heading text-2xl text-primary mb-2 group-hover:text-secondary transition-colors">
                        {resource.resourceName}
                      </h3>
                    </div>

                    {resource.description && (
                      <p className="font-paragraph text-foreground/70 leading-relaxed mb-4 flex-1">
                        {resource.description}
                      </p>
                    )}

                    {resource.publicationDate && (
                      <div className="flex items-center text-foreground/60 mb-4">
                        <Calendar className="w-4 h-4 mr-2 text-secondary" />
                        <span className="font-paragraph text-sm">{formatDate(resource.publicationDate)}</span>
                      </div>
                    )}

                    {resource.fileUrl && (
                      <div className="space-y-2">
                        <button
                          onClick={() => handleDownload(resource.fileUrl!, resource.resourceName || 'ressource', resource._id)}
                          disabled={downloadingId === resource._id}
                          className={`inline-flex items-center justify-center font-paragraph font-semibold px-6 py-3 transition-all duration-300 w-full ${
                            downloadingId === resource._id
                              ? 'bg-primary/50 text-primary-foreground cursor-not-allowed'
                              : 'bg-primary text-primary-foreground hover:bg-primary/90'
                          }`}
                          aria-busy={downloadingId === resource._id}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {downloadingId === resource._id ? 'Téléchargement...' : 'Télécharger'}
                        </button>
                        
                        {/* Progress Bar */}
                        {downloadProgress[resource._id] !== undefined && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full bg-background/50 border border-primary/20 rounded overflow-hidden"
                          >
                            <motion.div
                              className="h-2 bg-gradient-to-r from-primary to-secondary"
                              initial={{ width: 0 }}
                              animate={{ width: `${downloadProgress[resource._id]}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                        )}

                        {/* Cancel Button */}
                        {downloadingId === resource._id && (
                          <button
                            onClick={() => cancelDownload(resource._id)}
                            className="w-full text-xs text-foreground/60 hover:text-foreground transition-colors flex items-center justify-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            Annuler
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Personal Dictionary Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <div>
              <div className="flex items-start gap-4 mb-6">
                <BookOpen className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">Mon Dictionnaire Personnel</h2>
                  <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-6">
                    Téléchargez un dictionnaire complet contenant tous les mots du Nidalum avec leurs définitions, catégories, thèmes, guides de prononciation, exemples et étymologies.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-foreground/80">{lexicon.length} mots du Nidalum</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-foreground/80">Format CSV compatible avec Excel et Google Sheets</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-foreground/80">Informations complètes : définitions, étymologies, exemples</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-foreground/80">Traductions en français incluses</span>
                    </li>
                  </ul>
                  <button
                    onClick={downloadPersonalDictionary}
                    disabled={downloadingId === 'personal-dict' || lexicon.length === 0}
                    className={`inline-flex items-center font-paragraph font-semibold px-8 py-4 transition-all duration-300 ${
                      downloadingId === 'personal-dict' || lexicon.length === 0
                        ? 'bg-primary/50 text-primary-foreground cursor-not-allowed'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                    aria-busy={downloadingId === 'personal-dict'}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {downloadingId === 'personal-dict' ? 'Téléchargement en cours...' : 'Télécharger Mon Dictionnaire'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 p-12 rounded-lg"
            >
              <div className="space-y-4">
                <div className="bg-background/50 border border-primary/20 p-4 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-paragraph text-sm text-foreground/70">Mot Nidalum</span>
                  </div>
                  <p className="font-heading text-lg text-primary">Exemple de mot</p>
                </div>
                <div className="bg-background/50 border border-primary/20 p-4 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span className="font-paragraph text-sm text-foreground/70">Définition</span>
                  </div>
                  <p className="font-paragraph text-sm text-foreground/80">Description complète du mot</p>
                </div>
                <div className="bg-background/50 border border-primary/20 p-4 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-paragraph text-sm text-foreground/70">Prononciation</span>
                  </div>
                  <p className="font-paragraph text-sm text-foreground/80">Guide de prononciation</p>
                </div>
                <div className="bg-background/50 border border-primary/20 p-4 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span className="font-paragraph text-sm text-foreground/70">Exemple</span>
                  </div>
                  <p className="font-paragraph text-sm text-foreground/80">Exemple d'utilisation</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              Types de Ressources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border border-primary/20 p-6 text-center bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                <FileText className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-xl text-secondary mb-2">Guides PDF</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Guides d'apprentissage complets et structurés
                </p>
              </div>
              <div className="border border-primary/20 p-6 text-center bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                <FileText className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-xl text-secondary mb-2">Fiches Pratiques</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Résumés et aide-mémoires pour la pratique
                </p>
              </div>
              <div className="border border-primary/20 p-6 text-center bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                <FileText className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-xl text-secondary mb-2">Documents Audio</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Prononciation et chants rituels enregistrés
                </p>
              </div>
              <div className="border border-primary/20 p-6 text-center bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                <FileText className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-xl text-secondary mb-2">Matériel Visuel</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Posters, infographies, et supports visuels
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
