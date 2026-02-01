import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ModernAudioPlayer from '@/components/ModernAudioPlayer';
import type { ArtistPortfolio } from '@/entities';

interface Artist extends ArtistPortfolio {}

export default function ArtistPortfolioPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Artist>('artistportfolio', {}, { limit: 50 });
      setArtists(result.items || []);
    } catch (error) {
      setArtists([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] w-full overflow-hidden flex items-center justify-center pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-6">
              THE 10 INCARNATIONS
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Discover the artists and incarnations that compose the creative universe of NIDALUM MAISON
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-[120rem] mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-96">
            <LoadingSpinner />
          </div>
        ) : artists.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-foreground/70">
              Les incarnations seront bientôt révélées...
            </p>
          </div>
        ) : (
          <>
            {/* Grid of Artists */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {artists.map((artist, index) => (
                <motion.div
                  key={artist._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedArtist(artist)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden border border-primary/30 hover:border-primary/70 transition-all duration-300 bg-background/50 backdrop-blur-sm">
                    {/* Artist Image */}
                    {artist.artistImage && (
                      <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                        <Image
                          src={artist.artistImage}
                          width={400}
                          height={400}
                          alt={artist.artistName || 'Artist'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="font-heading text-2xl text-primary mb-2">
                        {artist.artistName}
                      </h3>
                      {artist.nidalumName && (
                        <p className="font-paragraph text-sm text-secondary mb-3">
                          {artist.nidalumName}
                        </p>
                      )}
                      {artist.artistSpecialty && (
                        <p className="font-paragraph text-sm text-foreground/80">
                          {artist.artistSpecialty}
                        </p>
                      )}
                    </div>

                    {/* Static Info */}
                    <div className="p-6 group-hover:hidden">
                      <h3 className="font-heading text-xl text-primary mb-2">
                        {artist.artistName}
                      </h3>
                      {artist.artistSpecialty && (
                        <p className="font-paragraph text-sm text-foreground/70">
                          {artist.artistSpecialty}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Selected Artist Detail Modal */}
            {selectedArtist && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArtist(null)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background border border-primary/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    {/* Image */}
                    {selectedArtist.artistImage && (
                      <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                        <Image
                          src={selectedArtist.artistImage}
                          width={400}
                          height={400}
                          alt={selectedArtist.artistName || 'Artist'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex flex-col justify-center">
                      <h2 className="font-heading text-4xl text-primary mb-2">
                        {selectedArtist.artistName}
                      </h2>
                      {selectedArtist.nidalumName && (
                        <p className="font-paragraph text-lg text-secondary mb-6">
                          {selectedArtist.nidalumName}
                        </p>
                      )}
                      {selectedArtist.artistSpecialty && (
                        <p className="font-paragraph text-sm text-foreground/70 mb-6 uppercase tracking-widest">
                          {selectedArtist.artistSpecialty}
                        </p>
                      )}
                      {selectedArtist.artistBio && (
                        <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-8">
                          {selectedArtist.artistBio}
                        </p>
                      )}
                      
                      {/* Audio Player */}
                      {(selectedArtist.audioFile?.trim() || selectedArtist.audioUrl?.trim()) && (
                        <div className="mb-8 pt-6 border-t border-primary/20">
                          <h3 className="font-heading text-lg text-secondary mb-4">Écouter</h3>
                          <ModernAudioPlayer
                            audioUrl={selectedArtist.audioFile || selectedArtist.audioUrl || ''}
                            title={selectedArtist.artistName || 'Artiste'}
                          />
                        </div>
                      )}
                      
                      <button
                        onClick={() => setSelectedArtist(null)}
                        className="bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-3 hover:bg-primary/90 transition-all duration-300 w-fit"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
