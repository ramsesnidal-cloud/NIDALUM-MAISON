import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { NidalumApprendrelaLangue } from '@/entities';

export default function ApprendreLangagePage() {
  const [items, setItems] = useState<NidalumApprendrelaLangue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<NidalumApprendrelaLangue>('nidalumlexicon');
      setItems(items || []);
    } catch (error) {
      console.error('Error loading language items:', error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
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
            FRAGMENTS
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-12"></div>
        </motion.div>
      </section>

      {/* Fragments Grid - Pure Display */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-40 bg-stone-900 rounded-sm animate-pulse"></div>
              ))}
            </div>
          ) : items.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {items.map((word, index) => (
                <motion.div
                  key={word._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="border border-white border-opacity-20 p-6 hover:border-opacity-100 transition-all duration-500 flex items-center justify-center min-h-32"
                >
                  <h3 className="font-heading text-xl tracking-widest font-light hover:text-stone-300 transition-colors text-center">
                    {word.nidalumWord}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-stone-500 tracking-wide">
                No fragments available
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
