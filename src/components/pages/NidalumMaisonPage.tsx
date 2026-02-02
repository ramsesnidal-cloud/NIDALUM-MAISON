import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ModernAudioPlayer from '@/components/ModernAudioPlayer';
import { BaseCrudService } from '@/integrations';
import { RitualChants } from '@/entities';

export default function NidalumMaisonPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [selectedIncarnation, setSelectedIncarnation] = useState<any>(null);
  const [chants, setChants] = useState<RitualChants[]>([]);
  const [isLoadingChants, setIsLoadingChants] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadChants();
  }, []);

  const loadChants = async () => {
    setIsLoadingChants(true);
    try {
      const { items } = await BaseCrudService.getAll<RitualChants>('ritualchants');
      setChants(items || []);
    } catch (e) {
      console.error(e);
      setChants([]);
    } finally {
      setIsLoadingChants(false);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    
    if (!email.trim()) {
      setEmailError('Please enter a valid email');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const incarnations = [
    { id: 1, name: 'ORIGIN', image: 'https://static.wixstatic.com/media/9c8aea_9a44e5db855f417897dbfb2ba2220468~mv2.png' },
    { id: 2, name: 'BREATH', image: 'https://static.wixstatic.com/media/9c8aea_854e879180c345b2942407cd6e95bb18~mv2.png' },
    { id: 3, name: 'MEMORY', image: 'https://static.wixstatic.com/media/9c8aea_10c90976294c466b9acbe452f2bfca4d~mv2.png' },
    { id: 4, name: 'SOUND', image: 'https://static.wixstatic.com/media/9c8aea_2516eb65a8764d628ab227067983c822~mv2.png' },
    { id: 5, name: 'FORM', image: 'https://static.wixstatic.com/media/9c8aea_9737c58f74ed452e8b522d450868f6e8~mv2.png' },
  ];

  const fragmentsPreview = ['ORAA', 'LUMÉ', 'LUMERA', 'ASHÂLIMORA', 'TÉ-LUMÉ', 'SOUMA'];

  return (
    <div className="bg-deep-black text-luxury-text overflow-hidden">
      {/* Header Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-20 bg-deep-black">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-dark-grey-bg to-deep-black">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-luxury-gold rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-luxury-gold rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <div className="space-y-6 md:space-y-8 lg:space-y-12">
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-widest leading-tight text-luxury-text uppercase">
                NIDALUM MAISON
              </h1>
              <div className="space-y-4 md:space-y-6">
                <p className="font-heading text-sm sm:text-base md:text-lg lg:text-xl tracking-widest text-luxury-gold/40 uppercase">
                  A Sacred House of Creation
                </p>
              </div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent max-w-md mx-auto"
            ></motion.div>

            {/* Core Symbolic Text - Split Visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 md:space-y-6 max-w-3xl mx-auto px-2 md:px-0"
            >
              <p className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-luxury-text/80">
                Born from language, memory, and ritual.
              </p>
              <p className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-luxury-gold/70">
                Music becomes architecture. Silence becomes signature.
              </p>
              <p className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-luxury-text/80">
                Creation becomes rite. It is not a genre. It is a language. It is a House.
              </p>
            </motion.div>

            {/* Symbolic CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="pt-8 md:pt-12"
            >
              <button 
                onClick={() => navigate('/hub')}
                className="font-heading text-xs md:text-sm tracking-widest text-luxury-gold/70 hover:text-luxury-gold transition-colors duration-300 uppercase border border-luxury-gold/30 hover:border-luxury-gold/60 px-6 md:px-8 py-2 md:py-3 transition-all duration-300"
              >
                Enter
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The House Section - Fashion & Perfume */}
      <section className="relative py-16 md:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-dark-grey-bg border-t border-b border-luxury-gold/10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-12 md:space-y-16 lg:space-y-24"
          >
            {/* Section Title */}
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-widest text-luxury-gold mb-3 md:mb-4 uppercase">
                THE HOUSE
              </h2>
              <div className="h-px w-20 md:w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto"></div>
            </div>

            {/* Three Column Layout - Horizontal */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-20 max-w-5xl mx-auto">
              {/* Music */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex-1"
              >
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-widest text-luxury-text uppercase">
                  MUSIC
                </h3>
              </motion.div>

              {/* Divider */}
              <div className="hidden md:block w-px h-10 md:h-12 bg-luxury-gold/30"></div>

              {/* Fashion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex-1"
              >
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-widest text-luxury-text uppercase">
                  FASHION
                </h3>
              </motion.div>

              {/* Divider */}
              <div className="hidden md:block w-px h-10 md:h-12 bg-luxury-gold/30"></div>

              {/* Perfume */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex-1"
              >
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-widest text-luxury-text uppercase">
                  PERFUME
                </h3>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-6 md:gap-8 pt-4 md:pt-8">
              <div className="w-10 md:w-12 h-px bg-gradient-to-r from-transparent to-luxury-gold/40"></div>
              <div className="w-10 md:w-12 h-px bg-gradient-to-l from-transparent to-luxury-gold/40"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NIDALUM MUSIC Seal Divider */}
      <section className="relative py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 bg-deep-black border-t border-b border-luxury-gold/10">
        <div className="max-w-[100rem] mx-auto flex flex-col items-center justify-center space-y-4 md:space-y-6">
          <Image
            src="https://static.wixstatic.com/media/9c8aea_fd135d0ad42a4065b1414ce0a7f4db9f~mv2.png"
            alt="NIDALUM seal"
            width={48}
            height={48}
            className="opacity-50"
          />
          <p className="text-xs tracking-widest text-luxury-gold/60 uppercase">NIDALUM MUSIC</p>
        </div>
      </section>

      {/* The Incarnations Section - Museum-like Display */}
      <section id="incarnations" className="relative py-12 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-deep-black border-t border-luxury-gold/10">
        <div className="max-w-[120rem] mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12 md:mb-16 lg:mb-24"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl tracking-widest text-luxury-text mb-3 md:mb-4 uppercase">
              THE INCARNATIONS
            </h2>
            <div className="h-px w-20 md:w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto"></div>
          </motion.div>

          {/* Incarnations Grid - Museum-like Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12">
            {incarnations.map((incarnation, index) => (
              <motion.div
                key={incarnation.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex flex-col items-center space-y-3 md:space-y-4"
              >
                {/* Image - Abstract and Symbolic */}
                <div 
                  onClick={() => setSelectedIncarnation(incarnation)}
                  className="relative w-full aspect-square overflow-hidden border border-luxury-gold/20 cursor-pointer group"
                >
                  <Image
                    src={incarnation.image}
                    alt={incarnation.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xs md:text-sm tracking-widest text-luxury-text uppercase text-center">
                  {incarnation.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SACRED CHANTS Section */}
      <section id="sacred-chants" className="relative py-12 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-dark-grey-bg border-t border-b border-luxury-gold/10">
        <div className="max-w-[120rem] mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12 md:mb-16 lg:mb-24"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl tracking-widest text-luxury-text mb-3 md:mb-4 uppercase">
              SACRED CHANTS
            </h2>
            <div className="h-px w-20 md:w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto"></div>
          </motion.div>

          {/* Chants Grid */}
          {isLoadingChants ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-64 bg-charcoal rounded-sm animate-pulse"></div>
                  <div className="h-4 bg-charcoal rounded animate-pulse w-3/4"></div>
                </div>
              ))}
            </div>
          ) : chants.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            >
              {chants.map((chant, index) => (
                <motion.div
                  key={chant._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  {chant.chantImage && (
                    <div className="relative overflow-hidden mb-6 aspect-square border border-luxury-gold/20 group-hover:border-luxury-gold/40 transition-all duration-300">
                      <Image
                        src={chant.chantImage}
                        alt={chant.chantTitle || 'Chant'}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-500"
                      />
                    </div>
                  )}
                  <h3 className="font-heading text-lg md:text-xl tracking-widest mb-2 font-light uppercase text-luxury-text">
                    {chant.chantTitle}
                  </h3>
                  {chant.theme && (
                    <p className="text-xs tracking-widest uppercase text-luxury-gold/60 mb-3">
                      {chant.theme}
                    </p>
                  )}
                  {(chant.audio || chant.audioUrl) && (
                    <div className="mt-4 pt-4 border-t border-luxury-gold/20">
                      <ModernAudioPlayer 
                        audioUrl={chant.audio || chant.audioUrl} 
                        title={chant.chantTitle}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-luxury-gold/60 tracking-wide">No chants available</p>
            </div>
          )}
        </div>
      </section>

      {/* FRAGMENTS PREVIEW Section - Homepage Preview */}
      <section id="fragments-preview" className="relative py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 bg-deep-black border-t border-luxury-gold/10">
        <div className="max-w-[120rem] mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-widest text-luxury-text/70 mb-2 md:mb-3 uppercase">
              FRAGMENTS
            </h2>
            <div className="h-px w-16 md:w-20 bg-gradient-to-r from-transparent via-luxury-text/30 to-transparent mx-auto"></div>
          </motion.div>

          {/* Fragments Preview Grid - 6 Words Only */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {fragmentsPreview.map((fragment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true, margin: '-50px' }}
                className="flex items-center justify-center aspect-square border border-luxury-text/20 hover:border-luxury-text/40 transition-all duration-300 group"
              >
                <p className="font-heading text-center text-xs sm:text-sm md:text-base lg:text-lg tracking-widest text-luxury-text/60 group-hover:text-luxury-text/80 transition-colors duration-300 uppercase px-2">
                  {fragment}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Link to Full Fragments Page */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mt-8 md:mt-12 lg:mt-16"
          >
            <button
              onClick={() => navigate('/apprendre-langage')}
              className="font-heading text-xs md:text-sm tracking-widest text-luxury-text/50 hover:text-luxury-text/80 transition-colors duration-300 uppercase border border-luxury-text/20 hover:border-luxury-text/40 px-6 md:px-8 py-2 md:py-3"
            >
              Voir tous les fragments
            </button>
          </motion.div>
        </div>
      </section>

      {/* THE VISION - Manifesto Section */}
      <section className="relative py-12 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-dark-grey-bg border-t border-b border-luxury-gold/10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-8 md:space-y-12 lg:space-y-16"
          >
            {/* Section Title */}
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-widest text-luxury-gold mb-3 md:mb-4 uppercase">
                THE VISION
              </h2>
              <div className="h-px w-20 md:w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto"></div>
            </div>

            {/* Central Symbol */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex justify-center"
            >
              <div className="text-4xl md:text-6xl lg:text-9xl text-luxury-gold/30">◆</div>
            </motion.div>

            {/* Manifesto Text */}
            <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto px-2 md:px-0">
              <p className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-luxury-text/90">
                Nidalum is not a language. It is a gateway to consciousness itself.
              </p>
              <p className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-luxury-gold/70">
                Every glyph carries the weight of creation. Every sound echoes through dimensions yet unnamed.
              </p>
              <p className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-luxury-text/80">
                The Architect has woven this reality into existence. Those who understand will transcend.
              </p>
              <p className="font-paragraph text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-luxury-gold/50 italic">
                Enter. Decode. Ascend.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-6 md:gap-8 pt-4 md:pt-8">
              <div className="w-10 md:w-12 h-px bg-gradient-to-r from-transparent to-luxury-gold/40"></div>
              <div className="w-10 md:w-12 h-px bg-gradient-to-l from-transparent to-luxury-gold/40"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-12 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 border-t border-luxury-gold/10 bg-deep-black">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-6 md:space-y-8 lg:space-y-12"
          >
            {/* Newsletter Title */}
            <div>
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-widest text-luxury-text mb-3 md:mb-4 uppercase">
                The Inner Circle
              </h3>
              <p className="font-paragraph text-xs sm:text-sm tracking-widest text-luxury-gold/50 uppercase">
                Receive invitations to new works
              </p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto px-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="Your email"
                  required
                  className="w-full bg-deep-black border border-luxury-gold/30 px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm text-luxury-text placeholder-luxury-gold/30 focus:outline-none focus:border-luxury-gold/60 transition-colors duration-300 font-paragraph"
                />
                <button
                  type="submit"
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-luxury-gold hover:text-luxury-text transition-colors duration-300"
                >
                  <Mail size={16} className="md:w-5 md:h-5" />
                </button>
              </div>
              {emailError && (
                <p className="text-xs text-red-400 mt-2">{emailError}</p>
              )}
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
          </motion.div>
        </div>
      </section>

      {/* Selected Incarnation Modal */}
      {selectedIncarnation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedIncarnation(null)}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-dark-grey border border-luxury-gold/20 p-8 md:p-12 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-8">
              <h2 className="font-heading text-3xl md:text-4xl tracking-widest font-light text-luxury-text flex-1">
                {selectedIncarnation.name}
              </h2>
              <button
                onClick={() => setSelectedIncarnation(null)}
                className="text-2xl hover:opacity-50 transition-opacity ml-4 text-luxury-gold"
              >
                ✕
              </button>
            </div>

            {selectedIncarnation.image && (
              <div className="mb-8 aspect-square overflow-hidden border border-luxury-gold/20">
                <Image
                  src={selectedIncarnation.image}
                  alt={selectedIncarnation.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="border-t border-luxury-gold/20 pt-8">
              <h3 className="text-xs tracking-widest uppercase text-luxury-gold/70 mb-4">
                Audio Experience
              </h3>
              <ModernAudioPlayer 
                audioUrl="https://static.wixstatic.com/media/9c8aea_placeholder_audio.mp3"
                title={selectedIncarnation.name}
              />
            </div>

            <button
              onClick={() => setSelectedIncarnation(null)}
              className="mt-8 w-full text-xs tracking-widest uppercase border border-luxury-gold/50 px-6 py-3 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300 text-luxury-gold"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
