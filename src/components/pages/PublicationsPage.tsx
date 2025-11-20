import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { Publications } from '@/entities';
import { Image } from '@/components/ui/image';
import { ExternalLink, Calendar, User } from 'lucide-react';

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publications[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
              Publications
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Découvrez les ouvrages officiels sur la langue Nidalum, l'univers Souma-Ra, et la spiritualité cosmique. Dictionnaires, livres, et guides pour approfondir votre connaissance.
            </p>
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
          ) : publications.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground/70">Aucune publication disponible</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {publications.map((publication, index) => (
                <motion.div
                  key={publication._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {publication.coverImage && (
                      <div className="md:col-span-2">
                        <div className="aspect-[3/4] overflow-hidden">
                          <Image
                            src={publication.coverImage}
                            alt={publication.title || 'Publication'}
                            width={400}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className={`p-8 ${publication.coverImage ? 'md:col-span-3' : 'md:col-span-5'}`}>
                      <div className="mb-4">
                        {publication.publicationType && (
                          <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary mb-3">
                            {publication.publicationType}
                          </span>
                        )}
                        <h3 className="font-heading text-3xl text-primary mb-3">
                          {publication.title}
                        </h3>
                      </div>

                      <div className="space-y-3 mb-6">
                        {publication.author && (
                          <div className="flex items-center text-foreground/70">
                            <User className="w-4 h-4 mr-2 text-secondary" />
                            <span className="font-paragraph text-sm">{publication.author}</span>
                          </div>
                        )}
                        {publication.publicationDate && (
                          <div className="flex items-center text-foreground/70">
                            <Calendar className="w-4 h-4 mr-2 text-secondary" />
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

                      {publication.purchaseLink && (
                        <a
                          href={publication.purchaseLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-3 hover:bg-primary/90 transition-all duration-300"
                        >
                          Acheter
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Publications Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              Collections Essentielles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Dictionnaire Nidalum</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                  Le dictionnaire complet de la langue Nidalum, avec plus de 1000 entrées, étymologies, et exemples d'utilisation.
                </p>
                <p className="font-paragraph text-sm text-foreground/50">
                  Indispensable pour tout apprenant sérieux
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Mythologie Souma-Ra</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                  L'histoire complète de l'univers Souma-Ra, de ses origines cosmiques aux légendes de Nidar et des Sept Piliers.
                </p>
                <p className="font-paragraph text-sm text-foreground/50">
                  Un voyage épique à travers le mythe
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Guide Spirituel</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                  Pratiques spirituelles, chants rituels, et méditations guidées pour approfondir votre connexion cosmique.
                </p>
                <p className="font-paragraph text-sm text-foreground/50">
                  Pour les chercheurs spirituels
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
