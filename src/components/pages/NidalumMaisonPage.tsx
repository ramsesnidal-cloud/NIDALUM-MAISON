import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/layout/Header';

export default function NidalumMaisonPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const artists = [
    { id: 1, name: 'ETHEREAL', color: 'from-amber-600 to-amber-900' },
    { id: 2, name: 'CIPHER', color: 'from-blue-600 to-blue-900' },
    { id: 3, name: 'LUMINESCENCE', color: 'from-cyan-600 to-cyan-900' },
    { id: 4, name: 'VOID', color: 'from-purple-600 to-purple-900' },
    { id: 5, name: 'RESONANCE', color: 'from-pink-600 to-pink-900' },
    { id: 6, name: 'NEXUS', color: 'from-emerald-600 to-emerald-900' },
    { id: 7, name: 'PHANTOM', color: 'from-slate-600 to-slate-900' },
    { id: 8, name: 'AURORA', color: 'from-orange-600 to-orange-900' },
    { id: 9, name: 'ECLIPSE', color: 'from-indigo-600 to-indigo-900' },
    { id: 10, name: 'ZENITH', color: 'from-rose-600 to-rose-900' },
  ];

  return (
    <div className="bg-black text-luxury-text overflow-hidden">
      {/* Header Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl"></div>
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
            {/* Main Headline */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter leading-tight text-luxury-text">
                THE ARCHITECT
              </h1>
              <p className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-luxury-gold">
                OF REALITIES
              </p>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent max-w-md mx-auto"
            ></motion.div>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-paragraph text-xs sm:text-sm md:text-lg lg:text-xl tracking-widest text-luxury-gold/80 uppercase"
            >
              NIDALUM MAISON • EST. 2026
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="pt-12"
            >
              <div className="text-xs tracking-widest text-luxury-gold/50 uppercase">Scroll to explore</div>
              <div className="mt-4 flex justify-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-luxury-gold to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Roster Section */}
      <section id="roster" className="relative py-16 md:py-32 px-4 md:px-8 bg-black">
        <div className="max-w-[120rem] mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12 md:mb-24"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight text-luxury-text mb-4">
              THE INCARNATIONS
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto"></div>
          </motion.div>

          {/* Artist Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
            {artists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true, margin: '-100px' }}
                className="group"
              >
                <div className="relative aspect-square mb-3 md:mb-6 overflow-hidden">
                  {/* Avatar Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${artist.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>

                  {/* Overlay Pattern */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>

                  {/* Center Symbol */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl md:text-5xl font-heading text-white/40 group-hover:text-white/60 transition-colors duration-300">
                      ◆
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Artist Name */}
                <h3 className="font-heading text-xs md:text-sm tracking-widest text-luxury-text group-hover:text-luxury-gold transition-colors duration-300">
                  {artist.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE VISION - Manifesto Section */}
      <section className="relative py-16 md:py-32 px-4 md:px-8 bg-black border-t border-b border-luxury-gold/20">
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

      {/* Footer - Newsletter */}
      <footer className="relative py-12 md:py-24 px-4 md:px-8 border-t border-luxury-gold/20 bg-black">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-8 md:space-y-12"
          >
            {/* Newsletter Title */}
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-luxury-text mb-4">
                JOIN THE INNER CIRCLE
              </h3>
              <p className="font-paragraph text-xs sm:text-sm tracking-widest text-luxury-gold/60 uppercase">
                Exclusive access to unreleased works
              </p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto px-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your essence"
                  required
                  className="w-full bg-black border border-luxury-gold/30 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-luxury-text placeholder-luxury-gold/30 focus:outline-none focus:border-luxury-gold/60 transition-colors duration-300 font-paragraph"
                />
                <button
                  type="submit"
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-luxury-gold hover:text-luxury-text transition-colors duration-300"
                >
                  <Mail size={18} className="md:w-5 md:h-5" />
                </button>
              </div>
            </form>

            {/* Subscription Message */}
            {subscribed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-luxury-gold text-xs md:text-sm font-paragraph"
              >
                Welcome to the inner circle.
              </motion.p>
            )}

            {/* Footer Info */}
            <div className="pt-8 md:pt-12 border-t border-luxury-gold/20 space-y-2 md:space-y-4">
              <p className="font-paragraph text-xs tracking-widest text-luxury-gold/40 uppercase">
                NIDALUM MAISON
              </p>
              <p className="font-paragraph text-xs text-luxury-gold/30">
                © 2026 All Realities Reserved
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
