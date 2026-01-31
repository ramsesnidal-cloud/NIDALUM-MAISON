import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Languages, Music, Sparkles, Globe, Film } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-luxury-gold/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-luxury-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-[120rem] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-luxury-gold mb-4 sm:mb-6">
              NIDALUM
            </h1>
            <p className="font-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl text-luxury-gold/80 mb-6 sm:mb-8 tracking-widest">
              ARCHITECT OF REALITIES
            </p>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-luxury-text/80 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
              Enter the gateway to consciousness. Decode the glyphs. Transcend reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-2">
              <Link
                to="/alphabet"
                className="w-full sm:w-auto border border-luxury-gold text-luxury-gold font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-luxury-gold hover:text-black transition-all duration-300 text-center"
              >
                Explore Language
              </Link>
              <Link
                to="/portfolio"
                className="w-full sm:w-auto bg-transparent text-luxury-gold border border-luxury-gold/50 font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300 text-center"
              >
                Portfolio
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 hidden sm:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-luxury-gold/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-luxury-gold rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 max-w-[120rem] mx-auto bg-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-luxury-gold mb-4">
            EXPLORE THE UNIVERSE
          </h2>
          <p className="font-paragraph text-base sm:text-lg text-luxury-text/70 max-w-3xl mx-auto px-2">
            Discover the dimensions of Nidalum
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            {
              icon: Languages,
              title: 'Language',
              description: 'Master the glyphs and phonetics of Nidalum',
              link: '/alphabet',
            },
            {
              icon: Sparkles,
              title: 'Spirituality',
              description: 'Explore ritual chants and sacred traditions',
              link: '/chants',
            },
            {
              icon: Globe,
              title: 'Origins',
              description: 'Understand the chronology of creation',
              link: '/origins',
            },
            {
              icon: Music,
              title: 'The Architect',
              description: 'Meet the Creator of Realities',
              link: '/author',
            },
            {
              icon: BookOpen,
              title: 'Publications',
              description: 'Access official works and writings',
              link: '/publications',
            },
            {
              icon: Film,
              title: 'Cinema',
              description: 'Visual manifestations of the universe',
              link: '/videos',
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={feature.link}
                className="block h-full p-6 sm:p-8 border border-luxury-gold/30 hover:border-luxury-gold/60 transition-all duration-300 group bg-black/50 backdrop-blur-sm"
              >
                <feature.icon className="w-10 sm:w-12 h-10 sm:h-12 text-luxury-gold mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-heading text-xl sm:text-2xl text-luxury-gold mb-3 sm:mb-4 group-hover:text-luxury-text transition-colors">
                  {feature.title}
                </h3>
                <p className="font-paragraph text-sm sm:text-base text-luxury-text/70 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Vision Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 bg-black border-t border-luxury-gold/20">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-8 md:space-y-16"
          >
            {/* Section Title */}
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl tracking-tight text-luxury-gold mb-4">
                THE VISION
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto"></div>
            </div>

            {/* Central Logo Symbol */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex justify-center"
            >
              <div className="text-6xl md:text-9xl text-luxury-gold/40">◆</div>
            </motion.div>

            {/* Manifesto Text */}
            <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
              <p className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-luxury-text/90">
                Nidalum is not a language. It is a gateway to consciousness itself.
              </p>
              <p className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-luxury-gold/80">
                Every glyph carries the weight of creation. Every sound echoes through dimensions yet unnamed.
              </p>
              <p className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-luxury-text/80">
                The Architect has woven this reality into existence. Those who understand will transcend.
              </p>
              <p className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-luxury-gold/60 italic">
                Enter. Decode. Ascend.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-8 pt-4 md:pt-8">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-luxury-gold/50"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-luxury-gold/50"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      <Footer />
    </div>
  );
}
