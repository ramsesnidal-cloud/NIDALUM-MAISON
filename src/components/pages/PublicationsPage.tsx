import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { Publications } from '@/entities';
import { Image } from '@/components/ui/image';
import { ExternalLink, Calendar, User, Download, BookOpen, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<Publications>('publications');
    setPublications(items);
    setIsLoading(false);
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleDownloadPDF = async (pdfUrl: string | undefined, title: string, publicationId: string) => {
    if (!pdfUrl) {
      setDownloadError('Fichier PDF non disponible');
      setTimeout(() => setDownloadError(null), 3000);
      return;
    }

    setDownloadingId(publicationId);
    setDownloadError(null);
    setDownloadSuccess(null);

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error('Erreur lors du téléchargement');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(`${title} téléchargé avec succès!`);
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du téléchargement';
      setDownloadError(errorMessage);
      setTimeout(() => setDownloadError(null), 3000);
    } finally {
      setDownloadingId(null);
    }
  };

  // Get unique genres for filtering
  const genres = ['all', ...Array.from(new Set(publications.map(p => p.bookGenre).filter(Boolean)))];
  const filteredPublications = selectedGenre === 'all' 
    ? publications 
    : publications.filter(p => p.bookGenre === selectedGenre);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-secondary" />
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Univers Littéraire Nidalum
              </h1>
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Explorez les ouvrages fictifs de l'univers Nidalum. Dictionnaires, épopées mythologiques, guides spirituels et bien plus. Téléchargez les extraits et découvrez les mondes cachés de Souma-Ra.
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

      {/* Genre Filter Section */}
      <section className="py-12 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/5 to-transparent">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl text-primary mb-6">Filtrer par Genre</h2>
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-6 py-2 font-paragraph font-semibold transition-all duration-300 ${
                    selectedGenre === genre
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background/50 border border-primary/30 text-foreground hover:border-primary'
                  }`}
                >
                  {genre === 'all' ? 'Tous les genres' : genre}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="font-paragraph text-foreground/70 mt-4">Chargement des publications...</p>
            </div>
          ) : filteredPublications.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground/70">Aucune publication trouvée</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPublications.map((publication, index) => (
                <motion.div
                  key={publication._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Book Cover */}
                    {publication.coverImage && (
                      <div className="lg:col-span-2">
                        <div className="aspect-[3/4] overflow-hidden h-full">
                          <Image
                            src={publication.coverImage}
                            alt={publication.title || 'Publication'}
                            width={400}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Book Details */}
                    <div className={`p-8 flex flex-col justify-between ${publication.coverImage ? 'lg:col-span-3' : 'lg:col-span-5'}`}>
                      <div>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {publication.publicationType && (
                            <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary">
                              {publication.publicationType}
                            </span>
                          )}
                          {publication.bookGenre && (
                            <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 font-paragraph text-xs text-primary">
                              {publication.bookGenre}
                            </span>
                          )}
                        </div>

                        <h3 className="font-heading text-3xl text-primary mb-4 hover:text-secondary transition-colors">
                          {publication.title}
                        </h3>

                        <div className="space-y-2 mb-6">
                          {publication.author && (
                            <div className="flex items-center text-foreground/70">
                              <User className="w-4 h-4 mr-2 text-secondary flex-shrink-0" />
                              <span className="font-paragraph text-sm">{publication.author}</span>
                            </div>
                          )}
                          {publication.publicationDate && (
                            <div className="flex items-center text-foreground/70">
                              <Calendar className="w-4 h-4 mr-2 text-secondary flex-shrink-0" />
                              <span className="font-paragraph text-sm">{formatDate(publication.publicationDate)}</span>
                            </div>
                          )}
                          {publication.isbn && (
                            <div className="text-foreground/70">
                              <span className="font-paragraph text-xs">ISBN: {publication.isbn}</span>
                            </div>
                          )}
                        </div>

                        {publication.description && (
                          <p className="font-paragraph text-foreground/80 leading-relaxed mb-6">
                            {publication.description}
                          </p>
                        )}

                        {/* Expandable Excerpt */}
                        {publication.excerpt && (
                          <div className="mb-6">
                            <button
                              onClick={() => setExpandedBook(expandedBook === publication._id ? null : publication._id)}
                              className="text-secondary hover:text-primary transition-colors font-paragraph font-semibold text-sm mb-2 flex items-center gap-2"
                            >
                              <span>{expandedBook === publication._id ? '▼' : '▶'}</span>
                              Lire un extrait
                            </button>
                            <AnimatePresence>
                              {expandedBook === publication._id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="bg-background/30 border border-primary/20 p-4 rounded italic text-foreground/70 text-sm leading-relaxed"
                                >
                                  {publication.excerpt}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-6 border-t border-primary/20">
                        {publication.pdfUrl && (
                          <button
                            onClick={() => handleDownloadPDF(publication.pdfUrl, publication.title || 'Livre', publication._id)}
                            disabled={downloadingId === publication._id}
                            className={`inline-flex items-center font-paragraph font-semibold px-6 py-3 transition-all duration-300 ${
                              downloadingId === publication._id
                                ? 'bg-primary/50 text-primary-foreground cursor-not-allowed'
                                : 'bg-primary text-primary-foreground hover:bg-primary/90'
                            }`}
                            aria-busy={downloadingId === publication._id}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            {downloadingId === publication._id ? 'Téléchargement...' : 'Télécharger PDF'}
                          </button>
                        )}
                        {publication.purchaseLink && (
                          <a
                            href={publication.purchaseLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-secondary/10 border border-secondary/30 text-secondary font-paragraph font-semibold px-6 py-3 hover:bg-secondary/20 transition-all duration-300"
                          >
                            Acheter
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              Collections Essentielles de Nidalum
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
              >
                <BookOpen className="w-8 h-8 text-secondary mb-4" />
                <h3 className="font-heading text-2xl text-secondary mb-4">Dictionnaire Nidalum</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                  Le dictionnaire complet de la langue Nidalum, avec plus de 1000 entrées, étymologies, et exemples d'utilisation.
                </p>
                <p className="font-paragraph text-sm text-foreground/50">
                  Indispensable pour tout apprenant sérieux
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
              >
                <Sparkles className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading text-2xl text-secondary mb-4">Mythologie Souma-Ra</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                  L'histoire complète de l'univers Souma-Ra, de ses origines cosmiques aux légendes de Nidar et des Sept Piliers.
                </p>
                <p className="font-paragraph text-sm text-foreground/50">
                  Un voyage épique à travers le mythe
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
              >
                <BookOpen className="w-8 h-8 text-secondary mb-4" />
                <h3 className="font-heading text-2xl text-secondary mb-4">Guide Spirituel</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                  Pratiques spirituelles, chants rituels, et méditations guidées pour approfondir votre connexion cosmique.
                </p>
                <p className="font-paragraph text-sm text-foreground/50">
                  Pour les chercheurs spirituels
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
