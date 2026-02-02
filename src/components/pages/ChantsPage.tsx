import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { RitualChants, ArtistPortfolio } from '@/entities';
import { Image as UIImage } from '@/components/ui/image';
import ModernAudioPlayer from '@/components/ModernAudioPlayer';
import { useTranslation } from '@/hooks/useTranslation';

export default function ChantsPage() {
  const { t } = useTranslation();
  const [chants, setChants] = useState<RitualChants[]>([]);
  const [artists, setArtists] = useState<ArtistPortfolio[]>([]);
  const [selectedChant, setSelectedChant] = useState<RitualChants | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<ArtistPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingArtists, setIsLoadingArtists] = useState(true);

  useEffect(() => {
    loadChants();
    loadArtists();
  }, []);

  const loadChants = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<RitualChants>('ritualchants');
    setChants(items);
    setIsLoading(false);
  };

  const loadArtists = async () => {
    setIsLoadingArtists(true);
    const { items } = await BaseCrudService.getAll<ArtistPortfolio>('artistportfolio');
    console.log('Artists loaded:', items);
    items.forEach((artist, idx) => {
      console.log(`Artist ${idx}:`, {
        name: artist.artistName,
        audioUrl: artist.audioUrl,
        url: artist.url
      });
    });
    setArtists(items);
    setIsLoadingArtists(false);
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
            <span>NIDALUM</span>
            <span>MUSIC</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg tracking-wide text-stone-400 mb-4 px-2">
            The operational artistic arm of the House
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-8 sm:mt-12"></div>
        </motion.div>
      </section>

      {/* Chants Grid */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl tracking-widest mb-4 font-light">
              SACRED CHANTS
            </h2>
            <div className="h-px bg-gradient-to-r from-white via-white to-transparent opacity-20 w-32"></div>
          </motion.div>

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
          ) : chants.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {chants.map((chant, index) => (
                <motion.div
                  key={chant._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedChant(chant)}
                  className="group cursor-pointer"
                >
                  {chant.chantImage && (
                    <div className="relative overflow-hidden mb-6 aspect-square">
                      <UIImage
                        src={chant.chantImage}
                        alt={chant.chantTitle || 'Chant'}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-500"
                      />
                    </div>
                  )}
                  <h3 className="font-heading text-lg sm:text-xl md:text-2xl tracking-wide mb-2 font-light">
                    {chant.chantTitle}
                  </h3>
                  {chant.theme && (
                    <p className="text-xs tracking-widest uppercase text-stone-500 mb-3">
                      {chant.theme}
                    </p>
                  )}
                  {chant.spiritualContext && (
                    <p className="text-sm tracking-wide text-stone-400 line-clamp-3">
                      {chant.spiritualContext}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-stone-500 tracking-wide">No chants available</p>
            </div>
          )}
        </div>
      </section>

      {/* Artists Portfolio Section */}
      <section className="px-4 md:px-8 py-20 border-t border-white border-opacity-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl tracking-widest mb-4 font-light">
              ARTISTS
            </h2>
            <div className="h-px bg-gradient-to-r from-white via-white to-transparent opacity-20 w-32"></div>
          </motion.div>

          {isLoadingArtists ? (
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
                  className="group"
                >
                  <div
                    onClick={() => setSelectedArtist(artist)}
                    className="cursor-pointer"
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
                    <h3 className="font-heading text-lg sm:text-xl md:text-2xl tracking-wide mb-2 font-light">
                      {artist.artistName}
                    </h3>
                    {artist.artistSpecialty && (
                      <p className="text-xs tracking-widest uppercase text-stone-500 mb-3">
                        {artist.artistSpecialty}
                      </p>
                    )}
                    {artist.artistBio && (
                      <p className="text-sm tracking-wide text-stone-400 line-clamp-3">
                        {artist.artistBio}
                      </p>
                    )}
                  </div>
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

      {/* Selected Chant Modal */}
      {selectedChant && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedChant(null)}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-stone-950 border border-white border-opacity-20 max-h-[90vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Image */}
              {selectedChant.chantImage && (
                <div className="aspect-square overflow-hidden">
                  <UIImage
                    src={selectedChant.chantImage}
                    alt={selectedChant.chantTitle || 'Chant'}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Info */}
              <div className="flex flex-col justify-center">
                <h2 className="font-heading text-xl md:text-2xl tracking-widest font-light mb-6">
                  {selectedChant.chantTitle}
                </h2>

                <div className="space-y-6 mb-8">
                  {selectedChant.theme && (
                    <div>
                      <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                        Theme
                      </h3>
                      <p className="text-base tracking-wide text-stone-300">
                        {selectedChant.theme}
                      </p>
                    </div>
                  )}

                  {selectedChant.spiritualContext && (
                    <div>
                      <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                        Spiritual Context
                      </h3>
                      <p className="text-base tracking-wide text-stone-300">
                        {selectedChant.spiritualContext}
                      </p>
                    </div>
                  )}

                  {selectedChant.originalText && (
                    <div>
                      <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                        Original Text
                      </h3>
                      <p className="text-base tracking-wide text-stone-300 italic">
                        {selectedChant.originalText}
                      </p>
                    </div>
                  )}

                  {selectedChant.translation && (
                    <div>
                      <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                        Translation
                      </h3>
                      <p className="text-base tracking-wide text-stone-300">
                        {selectedChant.translation}
                      </p>
                    </div>
                  )}
                </div>

                {selectedChant.audio && (
                  <div className="border-t border-white border-opacity-10 pt-8 mb-8">
                    <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-4">
                      Listen
                    </h3>
                    <ModernAudioPlayer
                      audioUrl={selectedChant.audio}
                      title={selectedChant.chantTitle || 'Sacred Chant'}
                    />
                  </div>
                )}

                <button
                  onClick={() => setSelectedChant(null)}
                  className="text-xs tracking-widest uppercase border border-white border-opacity-50 px-6 py-3 hover:border-opacity-100 hover:bg-white hover:text-black transition-all duration-500 w-fit"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Selected Artist Modal */}
      {selectedArtist && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedArtist(null)}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-stone-950 border border-white border-opacity-20 p-8 md:p-12 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-8">
              <h2 className="font-heading text-3xl md:text-4xl tracking-widest font-light flex-1">
                {selectedArtist.artistName}
              </h2>
              <button
                onClick={() => setSelectedArtist(null)}
                className="text-2xl hover:opacity-50 transition-opacity ml-4"
              >
                ✕
              </button>
            </div>

            {selectedArtist.artistImage && (
              <div className="mb-8 aspect-video overflow-hidden">
                <UIImage
                  src={selectedArtist.artistImage}
                  alt={selectedArtist.artistName || 'Artist'}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-6 mb-8">
              {selectedArtist.artistSpecialty && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                    Specialty
                  </h3>
                  <p className="text-base tracking-wide text-stone-300">
                    {selectedArtist.artistSpecialty}
                  </p>
                </div>
              )}

              {selectedArtist.artistBio && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                    Biography
                  </h3>
                  <p className="text-base tracking-wide text-stone-300 leading-relaxed">
                    {selectedArtist.artistBio}
                  </p>
                </div>
              )}

              {selectedArtist.nidalumName && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">
                    Nidalum Name
                  </h3>
                  <p className="text-base tracking-wide text-stone-300">
                    {selectedArtist.nidalumName}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-white border-opacity-10 pt-8 mb-8">
              <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-4">
                Listen
              </h3>
              {selectedArtist.audioUrl ? (
                <ModernAudioPlayer audioUrl={selectedArtist.audioUrl} />
              ) : (
                <div className="p-4 bg-stone-900/50 border border-stone-700 rounded text-center">
                  <p className="text-sm text-stone-400">No audio available for this artist</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedArtist(null)}
              className="mt-8 w-full text-xs tracking-widest uppercase border border-white border-opacity-50 px-6 py-3 hover:border-opacity-100 hover:bg-white hover:text-black transition-all duration-500"
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
