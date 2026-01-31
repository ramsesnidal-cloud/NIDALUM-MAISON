import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-paragraph">
      <Header />

      {/* SECTION 1 - HERO */}
      <section className="h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-center"
        >
          <h1 className="font-heading text-8xl md:text-9xl tracking-widest mb-8 font-light">
            NIDALUM
          </h1>
          <p className="text-lg md:text-xl tracking-wide mb-16 font-light text-stone-300 max-w-2xl mx-auto">
            A Sacred Luxury House of Music, Fashion & Perfume
          </p>
          <Link
            to="#manifesto"
            className="inline-block text-sm tracking-widest uppercase border border-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-500"
          >
            Enter the Universe
          </Link>
        </motion.div>
      </section>

      {/* SECTION 2 - MANIFESTO */}
      <section id="manifesto" className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl text-center"
        >
          <div className="mb-12 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
          <p className="font-heading text-3xl md:text-4xl leading-relaxed tracking-wide font-light mb-12">
            NIDALUM is a house where sound becomes fabric,
            <br />
            where perfume carries memory,
            <br />
            and where creation is ritual.
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </motion.div>
      </section>

      {/* SECTION 3 - THE HOUSE */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12"
          >
            {/* MUSIC */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 border border-white rounded-full flex items-center justify-center mb-8 opacity-50">
                <span className="text-2xl">♪</span>
              </div>
              <h3 className="font-heading text-2xl tracking-widest mb-4 font-light">
                NIDALUM MUSIC
              </h3>
              <p className="text-sm tracking-wide text-stone-400 leading-relaxed">
                Cinematic, sacred sound as the foundation of the house.
              </p>
            </div>

            {/* FASHION */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 border border-white rounded-full flex items-center justify-center mb-8 opacity-50">
                <span className="text-2xl">✦</span>
              </div>
              <h3 className="font-heading text-2xl tracking-widest mb-4 font-light">
                NIDALUM FASHION
              </h3>
              <p className="text-sm tracking-wide text-stone-400 leading-relaxed">
                Timeless silhouettes, ritual garments, identity.
              </p>
            </div>

            {/* PERFUME */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 border border-white rounded-full flex items-center justify-center mb-8 opacity-50">
                <span className="text-2xl">◆</span>
              </div>
              <h3 className="font-heading text-2xl tracking-widest mb-4 font-light">
                NIDALUM PERFUME
              </h3>
              <p className="text-sm tracking-wide text-stone-400 leading-relaxed">
                Fragrance as memory, presence, and signature.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - THE ORIGIN */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl tracking-widest mb-12 font-light">
            The Origin
          </h2>
          <p className="text-base md:text-lg leading-relaxed tracking-wide text-stone-300 mb-8">
            NIDALUM was born from language, myth, and memory. Not as a brand, but as a universe—a living system where art, sound, and ritual converge. Every element exists in service of a singular vision: to create spaces where the sacred and the sensual meet.
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-12"></div>
        </motion.div>
      </section>

      {/* SECTION 5 - THE LANGUAGE */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl tracking-widest mb-12 font-light">
            The Language
          </h2>
          <p className="text-base md:text-lg leading-relaxed tracking-wide text-stone-300 mb-8">
            Luxury houses have codes. NIDALUM has a language.
          </p>
          <p className="text-sm tracking-widest text-stone-400 mb-12">
            A living system of symbols, sounds, and meanings that define the house.
          </p>
          <Link
            to="/apprendre-langage"
            className="inline-block text-xs tracking-widest uppercase border border-white border-opacity-50 px-6 py-2 hover:border-opacity-100 hover:bg-white hover:text-black transition-all duration-500"
          >
            Discover
          </Link>
        </motion.div>
      </section>

      {/* SECTION 6 - THE LABEL */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl w-full"
        >
          <h2 className="font-heading text-4xl md:text-5xl tracking-widest mb-16 font-light text-center">
            The Artistic Arm
          </h2>
          <p className="text-center text-sm tracking-widest text-stone-400 mb-16 uppercase">
            NIDALUM MUSIC — The operational artistic foundation of the house
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border border-white border-opacity-20 p-8 hover:border-opacity-50 transition-all duration-500">
              <h3 className="font-heading text-xl tracking-widest mb-3 font-light">
                Sacred Compositions
              </h3>
              <p className="text-xs tracking-wide text-stone-400">
                Cinematic soundscapes that define the house aesthetic.
              </p>
            </div>
            <div className="border border-white border-opacity-20 p-8 hover:border-opacity-50 transition-all duration-500">
              <h3 className="font-heading text-xl tracking-widest mb-3 font-light">
                Ritual Performances
              </h3>
              <p className="text-xs tracking-wide text-stone-400">
                Curated artists and collaborators of the inner circle.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 7 - INVITATION */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-md w-full text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl tracking-widest mb-12 font-light">
            Join the Inner Circle
          </h2>
          <p className="text-sm tracking-widest text-stone-400 mb-12 uppercase">
            Receive invitations to exclusive experiences
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-b border-white border-opacity-30 focus:border-opacity-100 py-3 px-0 text-sm tracking-wide placeholder-stone-600 focus:outline-none transition-all duration-300"
              required
            />
            <button
              type="submit"
              className="text-xs tracking-widest uppercase border border-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-500 mt-4"
            >
              {subscribed ? 'Welcome' : 'Enter'}
            </button>
          </form>
          <p className="text-xs text-stone-500 mt-8">
            No marketing. No noise. Only invitations.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
