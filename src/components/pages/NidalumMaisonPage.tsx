import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Image } from '@/components/ui/image';

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
    <div className="bg-black text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-amber-900/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[120rem] mx-auto px-8 py-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-heading tracking-widest text-amber-400"
          >
            NIDALUM
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.2em] text-amber-400/60 uppercase"
          >
            Est. 2026
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-amber-950/10">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <h1 className="font-heading text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none text-white">
              ARCHITECT
              <br />
              OF
              <br />
              <span className="text-amber-400">REALITIES</span>
            </h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent max-w-md mx-auto"
            ></motion.div>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-paragraph text-lg md:text-xl tracking-widest text-amber-400/80 uppercase"
            >
              NIDALUM MAISON • EST. 2026
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="pt-12"
            >
              <div className="text-xs tracking-widest text-amber-400/50 uppercase">Scroll to explore</div>
              <div className="mt-4 flex justify-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-amber-400 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Roster Section */}
      <section id="roster" className="relative py-32 px-8">
        <div className="max-w-[120rem] mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-24"
          >
            <h2 className="font-heading text-6xl md:text-7xl tracking-tight text-white mb-4">
              THE INCARNATIONS
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
          </motion.div>

          {/* Artist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {artists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true, margin: '-100px' }}
                className="group"
              >
                <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
                  {/* Avatar Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${artist.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  {/* Overlay Pattern */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                  {/* Center Symbol */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl font-heading text-white/30 group-hover:text-white/50 transition-colors duration-300">
                      ◆
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Artist Name */}
                <h3 className="font-heading text-sm tracking-widest text-white group-hover:text-amber-400 transition-colors duration-300">
                  {artist.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className="relative py-32 px-8 bg-gradient-to-b from-black via-black to-amber-950/5">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-16"
          >
            {/* Central Logo Symbol */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex justify-center"
            >
              <div className="text-9xl text-amber-400/40">◆</div>
            </motion.div>

            {/* Concept Text */}
            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="font-paragraph text-2xl md:text-3xl leading-relaxed text-white/90">
                Every creation carries the glyphs.
              </p>
              <p className="font-paragraph text-xl md:text-2xl leading-relaxed text-amber-400/70">
                Learn to read the silence.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-8 pt-8">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400/50"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400/50"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Newsletter */}
      <footer className="relative py-24 px-8 border-t border-amber-900/20">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-12"
          >
            {/* Newsletter Title */}
            <div>
              <h3 className="font-heading text-4xl md:text-5xl tracking-tight text-white mb-4">
                JOIN THE INNER CIRCLE
              </h3>
              <p className="font-paragraph text-sm tracking-widest text-amber-400/60 uppercase">
                Exclusive access to unreleased works
              </p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your essence"
                  required
                  className="w-full bg-black border border-amber-400/30 rounded-lg px-6 py-4 text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-400/60 transition-colors duration-300 font-paragraph"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300 transition-colors duration-300"
                >
                  <Mail size={20} />
                </button>
              </div>
            </form>

            {/* Subscription Message */}
            {subscribed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-amber-400 text-sm font-paragraph"
              >
                Welcome to the inner circle.
              </motion.p>
            )}

            {/* Footer Info */}
            <div className="pt-12 border-t border-amber-900/20 space-y-4">
              <p className="font-paragraph text-xs tracking-widest text-amber-400/40 uppercase">
                NIDALUM MAISON
              </p>
              <p className="font-paragraph text-xs text-amber-400/30">
                © 2026 All Realities Reserved
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
