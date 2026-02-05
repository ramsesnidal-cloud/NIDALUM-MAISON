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

      {/* Hero Section - Luxury Cinematic */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-32 md:pt-20 lg:pt-24 bg-deep-black">
        {/* Sophisticated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-charcoal to-deep-black">
          <div className="absolute inset-0 opacity-3">
            <div className="absolute top-20 left-1/3 w-80 md:w-[600px] h-80 md:h-[600px] bg-luxury-gold rounded-full blur-[120px]"></div>
            <div className="absolute bottom-20 right-1/3 w-80 md:w-[600px] h-80 md:h-[600px] bg-luxury-gold rounded-full blur-[120px]"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[120rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-12 md:space-y-16 lg:space-y-20"
          >
            {/* Luxury Preheader */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-luxury-gold/60"></div>
              <p className="font-heading text-xs md:text-sm tracking-[0.2em] text-luxury-gold/70 uppercase">
                Maison de Création
              </p>
              <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-luxury-gold/60"></div>
            </motion.div>

            {/* Main Headline - Single Line */}
            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              <h1 
                className="font-heading tracking-[0.15em] leading-[0.9] text-luxury-text uppercase font-light whitespace-nowrap overflow-hidden text-overflow-clip"
                style={{
                  fontSize: 'clamp(2.1rem, 7.2vw, 5.6rem)',
                  letterSpacing: 'clamp(0.1em, 0.15vw, 0.15em)',
                }}
              >
                NIDALUM MAISON
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="h-px bg-gradient-to-r from-transparent via-luxury-gold/80 to-transparent max-w-2xl mx-auto"
              ></motion.div>
            </div>

            {/* Sophisticated Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-4 md:space-y-6 lg:space-y-8 max-w-4xl mx-auto px-2 md:px-0"
            >
              <p className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed tracking-wide text-luxury-text/85">
                Where language transcends into art. Where silence becomes signature.
              </p>
              <p className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed tracking-widest text-luxury-gold/90 uppercase font-light">
                A Sacred House of Creation
              </p>
            </motion.div>

            {/* Elegant CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="pt-6 md:pt-8 lg:pt-12"
            >
              <button 
                onClick={() => navigate('/hub')}
                className="font-heading text-xs md:text-sm tracking-[0.15em] text-luxury-text hover:text-luxury-gold transition-all duration-500 uppercase border border-luxury-text/40 hover:border-luxury-gold/80 px-8 md:px-12 py-3 md:py-4 hover:bg-luxury-gold/5"
              >
                Discover
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs tracking-widest text-luxury-gold/50 uppercase">Scroll</p>
            <div className="w-px h-6 bg-gradient-to-b from-luxury-gold/60 to-transparent"></div>
          </div>
        </motion.div>
      </section>

      {/* The House Section - Luxury Pillars */}
      <section className="relative py-12 md:py-24 lg:py-40 px-4 sm:px-6 md:px-8 bg-deep-black border-t border-b border-luxury-gold/20">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12 md:space-y-20 lg:space-y-28"
          >
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center"
            >
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-[0.15em] text-luxury-text mb-6 md:mb-8 uppercase font-light">
                The House
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-px bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent max-w-xl mx-auto"
              ></motion.div>
            </motion.div>

            {/* Three Pillars - Asymmetrical Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12 lg:gap-20">
              {/* Music - Left Aligned */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex flex-col items-start md:items-center space-y-6 md:space-y-8 pb-12 md:pb-0 md:border-r border-luxury-gold/20"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 border border-luxury-gold/40 flex items-center justify-center">
                  <div className="text-2xl md:text-3xl text-luxury-gold/60">♪</div>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.1em] text-luxury-text uppercase font-light">
                    Music
                  </h3>
                  <p className="font-paragraph text-xs sm:text-sm md:text-base text-luxury-text/60 leading-relaxed max-w-xs">
                    Sacred compositions that transcend the boundaries of sound and silence.
                  </p>
                </div>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => navigate('/hub')}
                  className="text-xs tracking-widest text-luxury-gold/70 hover:text-luxury-gold transition-colors uppercase mt-4 md:mt-6"
                >
                  Explore →
                </motion.button>
              </motion.div>

              {/* Fashion - Center */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex flex-col items-start md:items-center space-y-6 md:space-y-8 pb-12 md:pb-0 md:border-r border-luxury-gold/20"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 border border-luxury-gold/40 flex items-center justify-center">
                  <div className="text-2xl md:text-3xl text-luxury-gold/60">✦</div>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.1em] text-luxury-text uppercase font-light">
                    Fashion
                  </h3>
                  <p className="font-paragraph text-xs sm:text-sm md:text-base text-luxury-text/60 leading-relaxed max-w-xs">
                    Wearable poetry that embodies the essence of Nidalum's philosophy.
                  </p>
                </div>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => navigate('/fashion')}
                  className="text-xs tracking-widest text-luxury-gold/70 hover:text-luxury-gold transition-colors uppercase mt-4 md:mt-6"
                >
                  Explore →
                </motion.button>
              </motion.div>

              {/* Perfume - Right Aligned */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex flex-col items-start md:items-center space-y-6 md:space-y-8"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 border border-luxury-gold/40 flex items-center justify-center">
                  <div className="text-2xl md:text-3xl text-luxury-gold/60">◆</div>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.1em] text-luxury-text uppercase font-light">
                    Perfume
                  </h3>
                  <p className="font-paragraph text-xs sm:text-sm md:text-base text-luxury-text/60 leading-relaxed max-w-xs">
                    Olfactory signatures that capture the invisible dimensions of creation.
                  </p>
                </div>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => navigate('/perfume')}
                  className="text-xs tracking-widest text-luxury-gold/70 hover:text-luxury-gold transition-colors uppercase mt-4 md:mt-6"
                >
                  Explore →
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NIDALUM SEAL Section */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-dark-grey-bg border-t border-b border-luxury-gold/20">
        <div className="max-w-[100rem] mx-auto flex flex-col items-center justify-center space-y-6 md:space-y-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <Image
              src="https://static.wixstatic.com/media/9c8aea_fd135d0ad42a4065b1414ce0a7f4db9f~mv2.png"
              alt="NIDALUM seal"
              width={64}
              height={64}
              className="opacity-40"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <p className="text-xs tracking-[0.2em] text-luxury-gold/50 uppercase">Est. 2024</p>
            <p className="text-xs tracking-[0.2em] text-luxury-text/40 uppercase">Nidalum Maison</p>
          </motion.div>
        </div>
      </section>

      {/* The Incarnations Section - Luxury Gallery */}
      <section id="incarnations" className="relative py-12 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 bg-deep-black border-t border-luxury-gold/20">
        <div className="max-w-[120rem] mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16 md:mb-24 lg:mb-32 space-y-6"
          >
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-[0.15em] text-luxury-text uppercase font-light">
              The Incarnations
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent max-w-xl mx-auto"
            ></motion.div>
            <p className="font-paragraph text-xs sm:text-sm md:text-base text-luxury-text/60 tracking-wide uppercase">
              Five Dimensions of Creation
            </p>
          </motion.div>

          {/* Incarnations Grid - Luxury Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
            {incarnations.map((incarnation, index) => (
              <motion.div
                key={incarnation.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="group flex flex-col items-center space-y-4 md:space-y-6"
              >
                {/* Image - Luxury Frame */}
                <div 
                  onClick={() => setSelectedIncarnation(incarnation)}
                  className="relative w-full aspect-square overflow-hidden border-2 border-luxury-gold/30 hover:border-luxury-gold/70 cursor-pointer group transition-all duration-500"
                >
                  <Image
                    src={incarnation.image}
                    alt={incarnation.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Luxury Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Title */}
                <div className="text-center space-y-2 w-full">
                  <h3 className="font-heading text-sm md:text-base tracking-[0.15em] text-luxury-text uppercase font-light">
                    {incarnation.name}
                  </h3>
                  <div className="h-px w-8 bg-luxury-gold/30 mx-auto group-hover:w-12 group-hover:bg-luxury-gold/60 transition-all duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SACRED CHANTS Section - Luxury Showcase */}
      <section id="sacred-chants" className="relative py-16 md:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-dark-grey-bg border-t border-b border-luxury-gold/20">
        <div className="max-w-[120rem] mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16 md:mb-24 lg:mb-32 space-y-6"
          >
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-[0.15em] text-luxury-text uppercase font-light">
              Sacred Chants
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent max-w-xl mx-auto"
            ></motion.div>
            <p className="font-paragraph text-xs sm:text-sm md:text-base text-luxury-text/60 tracking-wide uppercase">
              Ritual Compositions
            </p>
          </motion.div>

          {/* Chants Grid */}
          {isLoadingChants ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-80 bg-charcoal rounded-sm animate-pulse"></div>
                  <div className="h-4 bg-charcoal rounded animate-pulse w-3/4"></div>
                </div>
              ))}
            </div>
          ) : chants.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
            >
              {chants.map((chant, index) => (
                <motion.div
                  key={chant._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex flex-col"
                >
                  {chant.chantImage && (
                    <div className="relative overflow-hidden mb-6 aspect-square border-2 border-luxury-gold/30 hover:border-luxury-gold/70 transition-all duration-500 group">
                      <Image
                        src={chant.chantImage}
                        alt={chant.chantTitle || 'Chant'}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  )}
                  <div className="space-y-3 flex-1 flex flex-col">
                    <h3 className="font-heading text-lg md:text-xl tracking-[0.1em] font-light uppercase text-luxury-text">
                      {chant.chantTitle}
                    </h3>
                    {chant.theme && (
                      <p className="text-xs tracking-[0.15em] uppercase text-luxury-gold/50">
                        {chant.theme}
                      </p>
                    )}
                    {chant.spiritualContext && (
                      <p className="text-xs md:text-sm text-luxury-text/50 leading-relaxed flex-1">
                        {chant.spiritualContext}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-24">
              <p className="text-luxury-gold/60 tracking-wide">No chants available</p>
            </div>
          )}
        </div>
      </section>

      {/* FRAGMENTS PREVIEW Section - Elegant Showcase */}
      <section id="fragments-preview" className="relative py-16 md:py-28 lg:py-40 px-4 sm:px-6 md:px-8 bg-deep-black border-t border-luxury-gold/20">
        <div className="max-w-[120rem] mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16 md:mb-20 lg:mb-28 space-y-4"
          >
            <p className="font-paragraph text-xs md:text-sm tracking-[0.2em] text-luxury-gold/60 uppercase">
              Linguistic Fragments
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[0.15em] text-luxury-text/80 uppercase font-light">
              Fragments
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-luxury-text/40 to-transparent max-w-md mx-auto"
            ></motion.div>
          </motion.div>

          {/* Fragments Preview Grid - Elegant Display */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6 max-w-6xl mx-auto mb-12 md:mb-16 lg:mb-20">
            {fragmentsPreview.map((fragment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                viewport={{ once: true, margin: '-50px' }}
                className="flex items-center justify-center aspect-square border border-luxury-text/20 hover:border-luxury-gold/60 transition-all duration-300 group bg-dark-grey-bg/30 hover:bg-luxury-gold/5"
              >
                <p className="font-heading text-center text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.1em] text-luxury-text/60 group-hover:text-luxury-gold transition-colors duration-300 uppercase px-2 font-light">
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
            className="text-center"
          >
            <button
              onClick={() => navigate('/apprendre-langage')}
              className="font-heading text-xs md:text-sm tracking-[0.15em] text-luxury-text/60 hover:text-luxury-gold transition-all duration-300 uppercase border border-luxury-text/30 hover:border-luxury-gold/60 px-8 md:px-12 py-3 md:py-4 hover:bg-luxury-gold/5"
            >
              Explore All Fragments
            </button>
          </motion.div>
        </div>
      </section>

      {/* THE VISION - Luxury Manifesto */}
      <section className="relative py-16 md:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-dark-grey-bg border-t border-b border-luxury-gold/20">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-12 md:space-y-16 lg:space-y-24"
          >
            {/* Section Title */}
            <div className="space-y-6">
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-[0.15em] text-luxury-gold uppercase font-light">
                The Vision
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-px bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent max-w-xl mx-auto"
              ></motion.div>
            </div>

            {/* Central Symbol */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="flex justify-center"
            >
              <div className="text-5xl md:text-7xl lg:text-9xl text-luxury-gold/25">◆</div>
            </motion.div>

            {/* Manifesto Text */}
            <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto px-2 md:px-0">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-luxury-text/90"
              >
                Nidalum is not a language. It is a gateway to consciousness itself.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-luxury-gold/70"
              >
                Every glyph carries the weight of creation. Every sound echoes through dimensions yet unnamed.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-luxury-text/80"
              >
                The Architect has woven this reality into existence. Those who understand will transcend.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="font-paragraph text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-luxury-gold/50 italic"
              >
                Enter. Decode. Ascend.
              </motion.p>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-8 md:gap-12 pt-8 md:pt-12">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-luxury-gold/40"
              ></motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-luxury-gold/40"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section - Luxury Invitation */}
      <section className="relative py-16 md:py-28 lg:py-40 px-4 sm:px-6 md:px-8 border-t border-luxury-gold/20 bg-deep-black">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-8 md:space-y-12 lg:space-y-16"
          >
            {/* Newsletter Title */}
            <div className="space-y-4">
              <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[0.15em] text-luxury-text uppercase font-light">
                The Inner Circle
              </h3>
              <p className="font-paragraph text-xs sm:text-sm tracking-[0.2em] text-luxury-gold/60 uppercase">
                Receive Exclusive Invitations
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
                  placeholder="Your email address"
                  required
                  className="w-full bg-deep-black border border-luxury-gold/30 hover:border-luxury-gold/60 focus:border-luxury-gold/80 px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm text-luxury-text placeholder-luxury-gold/30 focus:outline-none transition-colors duration-300 font-paragraph"
                />
                <button
                  type="submit"
                  className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-luxury-gold hover:text-luxury-text transition-colors duration-300"
                >
                  <Mail size={18} className="md:w-5 md:h-5" />
                </button>
              </div>
              {emailError && (
                <p className="text-xs text-red-400 mt-3">{emailError}</p>
              )}
            </form>

            {/* Subscription Message */}
            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <p className="text-luxury-gold text-sm md:text-base font-paragraph tracking-wide">
                  Welcome to the inner circle.
                </p>
                <p className="text-luxury-text/50 text-xs md:text-sm font-paragraph">
                  Check your email for exclusive access.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Selected Incarnation Modal - Luxury Presentation */}
      {selectedIncarnation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedIncarnation(null)}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-dark-grey border-2 border-luxury-gold/40 p-8 md:p-12 max-h-[90vh] overflow-y-auto space-y-8"
          >
            <div className="flex justify-between items-start">
              <h2 className="font-heading text-4xl md:text-5xl tracking-[0.15em] font-light text-luxury-text flex-1 uppercase">
                {selectedIncarnation.name}
              </h2>
              <button
                onClick={() => setSelectedIncarnation(null)}
                className="text-3xl hover:text-luxury-gold transition-colors ml-4 text-luxury-text/60 hover:text-luxury-gold"
              >
                ✕
              </button>
            </div>

            {selectedIncarnation.image && (
              <div className="aspect-square overflow-hidden border-2 border-luxury-gold/40">
                <Image
                  src={selectedIncarnation.image}
                  alt={selectedIncarnation.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="border-t border-luxury-gold/30 pt-8 space-y-6">
              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase text-luxury-gold/70 mb-4">
                  Audio Experience
                </h3>
                <ModernAudioPlayer 
                  audioUrl="https://static.wixstatic.com/media/9c8aea_placeholder_audio.mp3"
                  title={selectedIncarnation.name}
                />
              </div>
            </div>

            <button
              onClick={() => setSelectedIncarnation(null)}
              className="w-full text-xs tracking-[0.15em] uppercase border border-luxury-gold/50 hover:border-luxury-gold px-6 py-4 hover:bg-luxury-gold/10 transition-all duration-300 text-luxury-gold font-heading"
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
