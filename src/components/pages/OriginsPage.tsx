import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { useTranslation } from '@/hooks/useTranslation';
import { BaseCrudService } from '@/integrations';
import { OriginsandChronology } from '@/entities';

export default function OriginsPage() {
  const { t } = useTranslation();
  const [originsData, setOriginsData] = useState<OriginsandChronology[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrigins();
  }, []);

  const loadOrigins = async () => {
    try {
      setIsLoading(true);
      const { items } = await BaseCrudService.getAll<OriginsandChronology>('origineschronologie');

      if (!items || items.length === 0) {
        console.warn('No origins items found in CMS');
        setOriginsData([]);
      } else {
        setOriginsData(items);
        console.log(`Loaded ${items.length} origins items from CMS`);
      }
    } catch (error) {
      console.error('Error loading origins data:', error);
      setOriginsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const cosmicElements = originsData.filter(item => item.category === 'Cosmic Element');
  const timeline = originsData.filter(item => item.category === 'Chronological Era');

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
            THE ORIGIN
          </h1>
          <p className="text-base md:text-lg tracking-wide text-stone-400">
            The foundation of all creation.
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-12"></div>
        </motion.div>
      </section>

      {/* Main Content */}
      {isLoading ? (
        <section className="px-4 md:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="h-96 bg-stone-900 rounded-sm animate-pulse"></div>
          </div>
        </section>
      ) : (
        <>
          {/* Cosmic Elements */}
          {cosmicElements.length > 0 && (
            <section className="px-4 md:px-8 py-20">
              <div className="max-w-6xl mx-auto">
                <h2 className="font-heading text-4xl tracking-widest mb-16 font-light text-center">
                  Cosmic Elements
                </h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                  {cosmicElements.map((element, index) => (
                    <motion.div
                      key={element._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      {element.image && (
                        <div className="mb-6 aspect-square overflow-hidden">
                          <Image
                            src={element.image}
                            alt={element.name || 'Element'}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-500"
                          />
                        </div>
                      )}
                      <h3 className="font-heading text-2xl tracking-widest mb-3 font-light">
                        {element.name}
                      </h3>
                      <p className="text-sm tracking-wide text-stone-400 mb-4">
                        {element.description}
                      </p>
                      {element.timeframe && (
                        <p className="text-xs tracking-widest uppercase text-stone-600">
                          {element.timeframe}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          )}

          {/* Timeline */}
          {timeline.length > 0 && (
            <section className="px-4 md:px-8 py-20 border-t border-white border-opacity-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-4xl tracking-widest mb-16 font-light text-center">
                  Chronological Era
                </h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-12"
                >
                  {timeline.map((era, index) => (
                    <motion.div
                      key={era._id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="border-l-2 border-white border-opacity-20 pl-8 py-4 hover:border-opacity-50 transition-all duration-500"
                    >
                      <h3 className="font-heading text-xl tracking-widest mb-2 font-light">
                        {era.name}
                      </h3>
                      {era.timeframe && (
                        <p className="text-xs tracking-widest uppercase text-stone-600 mb-3">
                          {era.timeframe}
                        </p>
                      )}
                      <p className="text-sm tracking-wide text-stone-400">
                        {era.description}
                      </p>
                      {era.significance && (
                        <p className="text-xs tracking-wide text-stone-500 mt-3 italic">
                          {era.significance}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          )}

          {/* Empty State */}
          {cosmicElements.length === 0 && timeline.length === 0 && (
            <section className="px-4 md:px-8 py-20">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-stone-500 tracking-wide">
                  The origins are being written. Return soon.
                </p>
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}
