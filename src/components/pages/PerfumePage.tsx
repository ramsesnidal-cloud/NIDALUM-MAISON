import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PerfumePage() {
  return (
    <div className="bg-deep-black text-luxury-text overflow-hidden">
      {/* Header Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-deep-black">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-dark-grey-bg to-deep-black">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            {/* Main Title */}
            <div className="space-y-6 md:space-y-8">
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-widest leading-tight text-luxury-text uppercase">
                NIDALUM PERFUME
              </h1>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent max-w-md mx-auto"
            ></motion.div>

            {/* Sub-text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 max-w-2xl mx-auto"
            >
              <p className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-luxury-text/80">
                Fragrance as memory.
              </p>
              <p className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-luxury-gold/70">
                Presence as signature.
              </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="pt-12"
            >
              <div className="text-xs tracking-widest text-luxury-gold/40 uppercase">Scroll to discover</div>
              <div className="mt-4 flex justify-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-luxury-gold/50 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Central Manifesto Section */}
      <section className="relative py-16 md:py-32 px-4 md:px-8 bg-dark-grey-bg border-t border-b border-luxury-gold/10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-8 md:space-y-16"
          >
            {/* Central Symbol */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex justify-center"
            >
              <div className="text-6xl md:text-9xl text-luxury-gold/30">◆</div>
            </motion.div>

            {/* Manifesto Text */}
            <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
              <p className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-luxury-text/90">
                Scent is not decoration.
              </p>
              <p className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-luxury-text/90">
                It is identity.
              </p>
              <p className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-luxury-gold/70">
                NIDALUM PERFUME is conceived as a ritual, where fragrance carries silence, time, and trace.
              </p>
              <p className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-luxury-text/80">
                The bottle will come later.
              </p>
              <p className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-luxury-gold/70">
                The presence already exists.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-8 pt-4 md:pt-8">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-luxury-gold/40"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-luxury-gold/40"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The House - Perfume Section */}
      <section className="relative py-16 md:py-32 px-4 md:px-8 bg-deep-black border-t border-luxury-gold/10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-8 md:space-y-12"
          >
            {/* Section Title */}
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-widest text-luxury-gold mb-4 uppercase">
                THE HOUSE
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto"></div>
            </div>

            {/* Perfume Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-6 max-w-2xl mx-auto"
            >
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-widest text-luxury-text uppercase">
                Perfume
              </h3>
              <div className="space-y-4">
                <p className="font-paragraph text-base sm:text-lg md:text-xl leading-relaxed text-luxury-text/80">
                  Fragrance as memory.
                </p>
                <p className="font-paragraph text-base sm:text-lg md:text-xl leading-relaxed text-luxury-gold/70">
                  Presence as trace.
                </p>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-8 pt-4 md:pt-8">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-luxury-gold/40"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-luxury-gold/40"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
