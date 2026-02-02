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
  { word: 'NIDAL', meaning: 'Guerrier courageux' },
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

      {/* Fragments Grid - Dynamic Layout */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Row 1: Left-aligned large item + right-aligned items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:col-span-1 border border-white border-opacity-20 p-8 md:p-12 text-left hover:border-opacity-50 transition-all duration-500 h-full"
              >
                <p className="font-heading text-4xl md:text-5xl tracking-widest mb-4 font-light">
                  {fragments[0].word}
                </p>
                <p className="text-xs tracking-widest text-stone-500 uppercase">
                  {fragments[0].meaning}
                </p>
              </motion.div>

              <div className="md:col-span-2 grid grid-cols-2 gap-8 md:gap-12">
                {fragments.slice(1, 3).map((fragment, index) => (
                  <motion.div
                    key={fragment.word}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
              </div>
            </div>

            {/* Row 2: Center-aligned items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {fragments.slice(3, 5).map((fragment, index) => (
                <motion.div
                  key={fragment.word}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
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
              
              {/* Last item - right-aligned and larger */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:col-span-1 border border-white border-opacity-20 p-8 md:p-12 text-right hover:border-opacity-50 transition-all duration-500 h-full"
              >
                <p className="font-heading text-4xl md:text-5xl tracking-widest mb-4 font-light">
                  {fragments[5].word}
                </p>
                <p className="text-xs tracking-widest text-stone-500 uppercase">
                  {fragments[5].meaning}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
