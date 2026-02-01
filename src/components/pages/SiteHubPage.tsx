import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function SiteHubPage() {
  const mainSections = [
    {
      id: 1,
      title: 'Grand Lexique',
      description: 'Explore the complete Nidalum vocabulary and linguistic foundations',
      icon: '📚',
      path: '/grand-lexique',
      color: 'from-luxury-gold/20 to-luxury-gold/5',
      image: 'https://static.wixstatic.com/media/9c8aea_443839844da1426fa13cfd2a6e9fb8c8~mv2.png?originWidth=384&originHeight=384'
    },
    {
      id: 2,
      title: 'Ritual Chants',
      description: 'Discover sacred chants and spiritual expressions in Nidalum',
      icon: '🎵',
      path: '/chants',
      color: 'from-luxury-gold/20 to-luxury-gold/5',
      image: 'https://static.wixstatic.com/media/9c8aea_b3901939552c4e838cd8984a5c7a6e1e~mv2.png?originWidth=384&originHeight=384'
    },
    {
      id: 3,
      title: 'Origins & Chronology',
      description: 'Understand the history and timeline of Nidalum creation',
      icon: '⏳',
      path: '/origins',
      color: 'from-luxury-gold/20 to-luxury-gold/5',
      image: 'https://static.wixstatic.com/media/9c8aea_12a86addf0f34244b7bb0f417e2e41a5~mv2.png?originWidth=384&originHeight=384'
    },
    {
      id: 4,
      title: 'Publications',
      description: 'Read books, articles, and official publications',
      icon: '📖',
      path: '/publications',
      color: 'from-luxury-gold/20 to-luxury-gold/5',
      image: 'https://static.wixstatic.com/media/9c8aea_a0acbe5881c54a4589160720bab430f7~mv2.png?originWidth=384&originHeight=384'
    },
    {
      id: 5,
      title: 'Resources',
      description: 'Access official resources and learning materials',
      icon: '🔗',
      path: '/resources',
      color: 'from-luxury-gold/20 to-luxury-gold/5',
      image: 'https://static.wixstatic.com/media/9c8aea_d73ef4275d0648c6b36bed3b4a6278bc~mv2.png?originWidth=384&originHeight=384'
    },
    {
      id: 6,
      title: 'Academy',
      description: 'Enroll in structured learning programs and courses',
      icon: '🎓',
      path: '/apprendre-langage',
      color: 'from-luxury-gold/20 to-luxury-gold/5',
      image: 'https://static.wixstatic.com/media/9c8aea_33d19c06747b462b9e3d7adf8fb22ea9~mv2.png?originWidth=384&originHeight=384'
    },
    {
      id: 7,
      title: 'Lexical Archives',
      description: 'Browse comprehensive linguistic archives and references',
      icon: '🗂️',
      path: '/lexical-archives',
      color: 'from-luxury-gold/20 to-luxury-gold/5',
      image: 'https://static.wixstatic.com/media/9c8aea_006dab71031446e2b9a859c03c285a26~mv2.png?originWidth=384&originHeight=384'
    },
    {
      id: 8,
      title: 'The House',
      description: 'Explore Fashion, Music, and Perfume creations',
      icon: '🏛️',
      path: '/fashion',
      color: 'from-luxury-gold/20 to-luxury-gold/5',
      image: 'https://static.wixstatic.com/media/9c8aea_7dcc1fcccfc5401eb27c85b3b27ecd52~mv2.png?originWidth=384&originHeight=384'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="bg-deep-black text-luxury-text overflow-hidden">
      {/* Header Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 md:pt-20 bg-deep-black">
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
            className="space-y-6 md:space-y-8"
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-widest leading-tight text-luxury-text uppercase">
              Welcome to Nidalum
            </h1>
            <p className="font-heading text-lg sm:text-xl md:text-2xl tracking-widest text-luxury-gold uppercase">
              Explore the Heart of Creation
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent max-w-md mx-auto"
            ></motion.div>
            <p className="font-paragraph text-sm md:text-base text-luxury-text/70 max-w-2xl mx-auto">
              Discover language, music, fashion, and the sacred traditions that form the foundation of Nidalum
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="relative py-16 md:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-deep-black border-t border-luxury-gold/10">
        <div className="max-w-[120rem] mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12 md:mb-20 lg:mb-32"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest text-luxury-gold mb-4 uppercase">
              Explore All Sections
            </h2>
            <div className="h-px w-20 md:w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto"></div>
          </motion.div>

          {/* Grid Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10"
          >
            {mainSections.map((section) => (
              <motion.div key={section.id} variants={itemVariants}>
                <Link to={section.path}>
                  <div className="group relative h-full overflow-hidden border border-luxury-gold/20 hover:border-luxury-gold/60 transition-all duration-300 bg-gradient-to-br from-dark-grey/50 to-deep-black hover:from-dark-grey to-dark-grey/50">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                      {/* Icon */}
                      <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {section.icon}
                      </div>

                      {/* Title and Description */}
                      <div className="space-y-3">
                        <h3 className="font-heading text-lg md:text-xl tracking-widest text-luxury-text group-hover:text-luxury-gold transition-colors duration-300 uppercase">
                          {section.title}
                        </h3>
                        <p className="font-paragraph text-xs md:text-sm text-luxury-text/60 group-hover:text-luxury-text/80 transition-colors duration-300 leading-relaxed">
                          {section.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="mt-6 flex items-center gap-2 text-luxury-gold/50 group-hover:text-luxury-gold group-hover:translate-x-1 transition-all duration-300">
                        <span className="text-xs tracking-widest uppercase">Explore</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>

                    {/* Hover Border Animation */}
                    <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/30 transition-all duration-300"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Highlights Section */}
      <section className="relative py-16 md:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-dark-grey-bg border-t border-b border-luxury-gold/10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-12 md:space-y-16"
          >
            {/* Section Title */}
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest text-luxury-gold mb-4 uppercase">
                Featured Collections
              </h2>
              <div className="h-px w-20 md:w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto"></div>
            </div>

            {/* Three Column Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Lexicon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: '-100px' }}
                className="text-center space-y-4"
              >
                <div className="text-5xl md:text-6xl mb-4">📚</div>
                <h3 className="font-heading text-2xl md:text-3xl tracking-widest text-luxury-text uppercase">
                  Lexicon
                </h3>
                <p className="font-paragraph text-sm md:text-base text-luxury-text/70">
                  Master the vocabulary and linguistic structures of Nidalum
                </p>
                <Link to="/grand-lexique" className="inline-block text-luxury-gold hover:text-luxury-text transition-colors duration-300 text-xs tracking-widest uppercase">
                  Learn More →
                </Link>
              </motion.div>

              {/* Music */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="text-center space-y-4"
              >
                <div className="text-5xl md:text-6xl mb-4">🎵</div>
                <h3 className="font-heading text-2xl md:text-3xl tracking-widest text-luxury-text uppercase">
                  Music
                </h3>
                <p className="font-paragraph text-sm md:text-base text-luxury-text/70">
                  Experience the sonic dimensions of Nidalum creation
                </p>
                <Link to="/chants" className="inline-block text-luxury-gold hover:text-luxury-text transition-colors duration-300 text-xs tracking-widest uppercase">
                  Listen Now →
                </Link>
              </motion.div>

              {/* Fashion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
                className="text-center space-y-4"
              >
                <div className="text-5xl md:text-6xl mb-4">👗</div>
                <h3 className="font-heading text-2xl md:text-3xl tracking-widest text-luxury-text uppercase">
                  Fashion
                </h3>
                <p className="font-paragraph text-sm md:text-base text-luxury-text/70">
                  Discover the visual expressions of Nidalum aesthetics
                </p>
                <Link to="/fashion" className="inline-block text-luxury-gold hover:text-luxury-text transition-colors duration-300 text-xs tracking-widest uppercase">
                  Explore →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-deep-black border-t border-luxury-gold/10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center space-y-8"
          >
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-widest text-luxury-text mb-4 uppercase">
                Ready to Dive Deeper?
              </h2>
              <p className="font-paragraph text-sm md:text-base text-luxury-text/70 max-w-2xl mx-auto">
                Join our community and unlock exclusive access to Nidalum's most profound teachings
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apprendre-langage"
                className="px-8 py-3 bg-luxury-gold text-deep-black font-heading text-xs tracking-widest uppercase hover:bg-luxury-gold/90 transition-all duration-300"
              >
                Start Learning
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border border-luxury-gold text-luxury-gold font-heading text-xs tracking-widest uppercase hover:bg-luxury-gold/10 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
