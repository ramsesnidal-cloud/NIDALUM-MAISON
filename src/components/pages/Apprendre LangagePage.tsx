import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const allFragments = [
  'ORAA', 'LUMÉ', 'LUMERA', 'ASHÂLIM', 'KINTATÉ', 'SOUMA-RA',
  'AMUNÉ', 'KEMETRA', 'MERUN', 'HÉKALUM', 'RA-LUM', 'KA-LUM',
  'BA-NIDAL', 'SEKHEM', 'ANKHUM', 'ZETHRA', 'TERA-FERUM', 'ASHEM-URA',
  'NOUNA', 'AKHET-LUM', 'KARAÉ', 'SHIM', 'YENDAR', 'ORA-KA',
  'SHEMU', 'NETERU', 'SAHU', 'REN-LUM', 'DJE-LUM', 'VENTUS-LUM',
  'MA\'ATUM', 'HETEP-LUM', 'SENU-RA', 'TEF-LUM', 'MERA-KA', 'DJEH-RA',
  'HOREM-LUM', 'KHEPER-RA', 'SATU-LUM', 'NEM-URA', 'IRU-KA', 'SEBA-RA',
  'MEN-LUM', 'ANU-KA', 'SUT-RA', 'KHEOS', 'TATU-LUM', 'HENU-RA',
  'PER-ANKH', 'NIDALUM'
];

export default function ApprendreLangagePage() {
  return (
    <div className="min-h-screen bg-deep-black text-luxury-text font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-widest mb-8 uppercase text-luxury-text">
            FRAGMENTS
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-40 mt-12"></div>
        </motion.div>
      </section>

      {/* Fragments Grid - Museum-Grade Minimal Display */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 lg:gap-12">
            {allFragments.map((fragment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                viewport={{ once: true, margin: '-50px' }}
                className="flex items-center justify-center aspect-square border border-luxury-gold/30 hover:border-luxury-gold/70 transition-all duration-300 group"
              >
                <p className="font-heading text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl tracking-widest text-luxury-gold/80 group-hover:text-luxury-gold transition-colors duration-300 uppercase px-2">
                  {fragment}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
