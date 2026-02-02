import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image as UIImage } from '@/components/ui/image';
import ModernAudioPlayer from '@/components/ModernAudioPlayer';
import { getPlayableAudioUrl } from '@/lib/media-service';
import { resolveAudioCandidate, logAudioResolution } from '@/lib/audio-resolver';
import type { ArtistPortfolio } from '@/entities';

interface ArtistWithResolvedAudio extends ArtistPortfolio {
  resolvedAudioUrl?: string;
}

export default function ArtistPortfolioPage() {
  const [artists, setArtists] = useState<ArtistPortfolio[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<ArtistWithResolvedAudio | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<ArtistPortfolio>('artistportfolio');
      console.log('[ARTIST PORTFOLIO] Artists loaded:', items);
      setArtists(items);
    } catch (err) {
      console.error('[ARTIST PORTFOLIO] Error loading artists:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resolveAudioForArtist = async (artist: ArtistPortfolio): Promise<string | undefined> => {
    const candidate = resolveAudioCandidate({
      audio: (artist as any).audioUpload || artist.audio,
      audioFile: artist.audioFile,
      audioUrl: artist.audioUrl
    });

    if (!candidate) return undefined;

    console.log(`[ARTIST PORTFOLIO] ${artist.artistName} - Audio candidate found`);
    logAudioResolution(artist.artistName || 'Unknown', candidate.raw);

    if (typeof candidate.raw === 'string' && candidate.raw.startsWith('https://')) {
      console.log(`[ARTIST PORTFOLIO] ${artist.artistName} - Using direct HTTPS URL`);
      return candidate.raw;
    } else if (candidate.isWixRef || candidate.mediaRef) {
      try {
        const resolvedUrl = await getPlayableAudioUrl(candidate.raw);
        console.log(`[ARTIST PORTFOLIO] ${artist.artistName} - Resolved Wix reference to:`, resolvedUrl);
        logAudioResolution(artist.artistName || 'Unknown', candidate.raw, resolvedUrl);
        return resolvedUrl;
      } catch (err) {
        console.error(`[ARTIST PORTFOLIO] ${artist.artistName} - Failed to resolve audio:`, err);
      }
    }

    return undefined;
  };

  const handleArtistClick = async (artist: ArtistPortfolio) => {
    const resolvedAudioUrl = await resolveAudioForArtist(artist);
    setSelectedArtist({
      ...artist,
      resolvedAudioUrl
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-32 pb-16 sm:pb-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-widest mb-6 sm:mb-8 font-light flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-8">
            <span>THE 10</span>
            <span>INCARNATIONS</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg tracking-wide text-stone-400 mb-4 px-2">
            Discover the artists and incarnations that compose the creative universe of NIDALUM MAISON
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-8 sm:mt-12"></div>
        </motion.div>
      </section>

      {/* Artists Grid */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-64 bg-stone-900 rounded-sm animate-pulse"></div>
                  <div className="h-4 bg-stone-900 rounded animate-pulse w-3/4"></div>
                  <div className="h-3 bg-stone-900 rounded animate-pulse w-1/2"></div>
                </div>
              ))}
            </div>
          ) : artists.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {artists.map((artist, index) => (
                <motion.div
                  key={artist._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => handleArtistClick(artist)}
                >
                  {artist.artistImage && (
                    <div className="relative overflow-hidden mb-6 aspect-square">
                      <UIImage
                        src={artist.artistImage}
                        alt={artist.artistName || 'Artist'}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-500"
                      />
                    </div>
                  )}
                  <h3 className="font-heading text-xl tracking-widest mb-2 font-light uppercase">
                    {artist.artistName}
                  </h3>
                  {artist.artistSpecialty && (
                    <p className="text-xs tracking-widest uppercase text-stone-500">
                      {artist.artistSpecialty}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-stone-500 tracking-wide">No entries available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Selected Artist Modal */}
      {selectedArtist && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedArtist(null)}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-stone-950 border border-white border-opacity-20 p-4 sm:p-6 md:p-8 lg:p-12 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-sm"
          >
            <div className="flex justify-between items-start mb-6 sm:mb-8 gap-4">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-widest font-light flex-1 break-words">
                {selectedArtist.artistName}
              </h2>
              <button
                onClick={() => setSelectedArtist(null)}
                className="flex-shrink-0 text-xl sm:text-2xl hover:opacity-50 transition-opacity"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {selectedArtist.artistImage && (
              <div className="mb-6 sm:mb-8 aspect-video overflow-hidden rounded-sm">
                <UIImage
                  src={selectedArtist.artistImage}
                  alt={selectedArtist.artistName || 'Artist'}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {selectedArtist.artistSpecialty && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-1 sm:mb-2">
                    Specialty
                  </h3>
                  <p className="text-sm sm:text-base tracking-wide text-stone-300 break-words">
                    {selectedArtist.artistSpecialty}
                  </p>
                </div>
              )}

              {selectedArtist.artistBio && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-1 sm:mb-2">
                    Biography
                  </h3>
                  <p className="text-sm sm:text-base tracking-wide text-stone-300 leading-relaxed break-words">
                    {selectedArtist.artistBio}
                  </p>
                </div>
              )}

              {selectedArtist.nidalumName && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-1 sm:mb-2">
                    Nidalum Name
                  </h3>
                  <p className="text-sm sm:text-base tracking-wide text-stone-300 break-words">
                    {selectedArtist.nidalumName}
                  </p>
                </div>
              )}
            </div>

            {(() => {
              const audioUrl = selectedArtist.resolvedAudioUrl;
              if (audioUrl) {
                console.log(`[ARTIST PORTFOLIO MODAL] ${selectedArtist.artistName}: Opening with audio URL:`, audioUrl);
                return (
                  <div className="border-t border-white border-opacity-10 pt-6 sm:pt-8 mb-6 sm:mb-8">
                    <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-3 sm:mb-4">
                      Listen
                    </h3>
                    <div className="overflow-x-hidden">
                      <ModernAudioPlayer audioUrl={audioUrl} />
                    </div>
                  </div>
                );
              }
              return (
                <div className="p-3 sm:p-4 bg-stone-900/50 border border-stone-700 rounded-sm text-center mb-6 sm:mb-8">
                  <p className="text-xs sm:text-sm text-stone-400">No audio available for this artist</p>
                </div>
              );
            })()}

            <button
              onClick={() => setSelectedArtist(null)}
              className="mt-6 sm:mt-8 w-full text-xs tracking-widest uppercase border border-white border-opacity-50 px-4 sm:px-6 py-2 sm:py-3 hover:border-opacity-100 hover:bg-white hover:text-black transition-all duration-500 rounded-sm active:scale-95"
              aria-label="Close modal"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
