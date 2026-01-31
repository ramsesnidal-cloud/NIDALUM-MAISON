import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { RitualChants } from '@/entities';
import { Image as UIImage } from '@/components/ui/image';
import ModernAudioPlayer from '@/components/ModernAudioPlayer';
import { useTranslation } from '@/hooks/useTranslation';

export default function ChantsPage() {
  const { t } = useTranslation();
  const [chants, setChants] = useState<RitualChants[]>([]);
  const [selectedChant, setSelectedChant] = useState<RitualChants | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadChants();
  }, []);

  const loadChants = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<RitualChants>('ritualchants');
    setChants(items);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading text-6xl md:text-7xl tracking-widest mb-8 font-light">
            NIDALUM MUSIC
          </h1>
          <p className="text-base md:text-lg tracking-wide text-stone-400 mb-4">
            The operational artistic arm of the House
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-12"></div>
        </motion.div>
      </section>

      {/* Chants Grid */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 bg-stone-900 rounded-sm animate-pulse"></div>
              ))}
            </div>
          ) : chants.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
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
                  <div className="relative overflow-hidden mb-6 aspect-square">
                    {chant.chantImage && (
                      <UIImage
                        src={chant.chantImage}
                        alt={chant.chantTitle || 'Chant'}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
                  </div>
                  <h3 className="font-heading text-2xl tracking-widest mb-3 font-light group-hover:text-stone-400 transition-colors duration-300">
                    {chant.chantTitle}
                  </h3>
                  <p className="text-sm tracking-wide text-stone-500 mb-4 line-clamp-2">
                    {chant.spiritualContext}
                  </p>
                  <p className="text-xs tracking-widest uppercase text-stone-600">
                    {chant.theme}
                  </p>
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
            className="max-w-2xl w-full bg-stone-950 border border-white border-opacity-20 p-8 md:p-12"
          >
            <div className="flex justify-between items-start mb-8">
              <h2 className="font-heading text-3xl md:text-4xl tracking-widest font-light flex-1">
                {selectedChant.chantTitle}
              </h2>
              <button
                onClick={() => setSelectedChant(null)}
                className="text-2xl hover:opacity-50 transition-opacity ml-4"
              >
                ✕
              </button>
            </div>

            {selectedChant.chantImage && (
              <div className="mb-8 aspect-video overflow-hidden">
                <UIImage
                  src={selectedChant.chantImage}
                  alt={selectedChant.chantTitle || 'Chant'}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-6 mb-8">
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
            </div>

            {selectedChant.audio && (
              <div className="border-t border-white border-opacity-10 pt-8">
                <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-4">
                  Listen
                </h3>
                <ModernAudioPlayer audioUrl={selectedChant.audio} />
              </div>
            )}

            <button
              onClick={() => setSelectedChant(null)}
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
