import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Fragment {
  word: string;
  meaning: string;
}

const fragments: Fragment[] = [
  { word: 'ORA', meaning: 'Origin' },
  { word: 'VENTUS', meaning: 'Movement' },
  { word: 'MEK', meaning: 'Form' },
  { word: 'NIDAL', meaning: 'House' },
  { word: 'TÉ-LUMÉ', meaning: 'Light' },
  { word: 'SOUMA', meaning: 'Sound' },
];

export default function ApprendreLangagePage() {

  return (
    <div className="min-h-screen bg-black text-white font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-widest mb-8 uppercase">
            FRAGMENTS
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-12"></div>
        </motion.div>
      </section>

      {/* Fragments Grid - Museum-like */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
          >
            {fragments.map((fragment, index) => (
              <motion.div
                key={fragment.word}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-white border-opacity-20 p-6 md:p-8 text-center hover:border-opacity-50 transition-all duration-500"
              >
                <p className="font-heading text-3xl md:text-4xl tracking-widest mb-2 font-light">
                  {fragment.word}
                </p>
                <p className="text-xs tracking-widest text-stone-500 uppercase">
                  {fragment.meaning}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
