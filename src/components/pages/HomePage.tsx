import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Languages, Music, Sparkles, Globe, Library, Film, Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { useTranslation } from '@/hooks/useTranslation';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section - Full Screen Cosmic Echo Chamber */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-[120rem] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-4 sm:mb-6">
              NIDALUM
            </h1>
            <p className="font-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl text-secondary mb-6 sm:mb-8 tracking-widest">
              {t('pages.home.subtitle')}
            </p>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
              {t('pages.home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-2">
              <Link
                to="/alphabet"
                className="w-full sm:w-auto bg-primary text-primary-foreground font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 text-center"
              >
                {t('nav.alphabet')}
              </Link>
              <Link
                to="/academy"
                className="w-full sm:w-auto bg-transparent text-primary border-2 border-primary font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-primary/10 transition-all duration-300 text-center"
              >
                {t('nav.academy')}
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
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full"></div>
          </div>
        </motion.div>
      </section>
      {/* Features Section - Asymmetric Grid */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 max-w-[120rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary mb-4">
            {t('pages.home.title')}
          </h2>
          <p className="font-paragraph text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto px-2">
            {t('pages.home.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            {
              icon: Languages,
              titleKey: 'features.language.title',
              descriptionKey: 'features.language.description',
              link: '/alphabet',
              color: 'primary'
            },
            {
              icon: Sparkles,
              titleKey: 'features.spirituality.title',
              descriptionKey: 'features.spirituality.description',
              link: '/chants',
              color: 'secondary'
            },
            {
              icon: Globe,
              titleKey: 'features.universe.title',
              descriptionKey: 'features.universe.description',
              link: '/origins',
              color: 'primary'
            },
            {
              icon: Music,
              titleKey: 'features.music.title',
              descriptionKey: 'features.music.description',
              link: '/author',
              color: 'secondary'
            },
            {
              icon: BookOpen,
              titleKey: 'features.publications.title',
              descriptionKey: 'features.publications.description',
              link: '/publications',
              color: 'primary'
            },
            {
              icon: Library,
              titleKey: 'features.academy.title',
              descriptionKey: 'features.academy.description',
              link: '/academy',
              color: 'secondary'
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
                className="block h-full p-6 sm:p-8 border border-primary/20 hover:border-primary/50 transition-all duration-300 group bg-background/50 backdrop-blur-sm"
              >
                <feature.icon className={`w-10 sm:w-12 h-10 sm:h-12 text-${feature.color} mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="font-heading text-xl sm:text-2xl text-primary mb-3 sm:mb-4 group-hover:text-secondary transition-colors">
                  {t(feature.titleKey)}
                </h3>
                <p className="font-paragraph text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spirituality and Origins Section - Academic Style */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary mb-4 sm:mb-6 text-center">
              Spiritualité et Origine du Nidalum
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {/* Left Column - Linguistic and Spiritual Status */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Linguistic Status */}
              <div className="border-l-4 border-primary pl-6 sm:pl-8">
                <h3 className="font-heading text-2xl sm:text-3xl text-secondary mb-4">
                  Statut Linguistique Officiel
                </h3>
                <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-4">
                  Le Nidalum se présente comme une langue sacrée et construite, dotée d'une structure phonétique, morphologique et syntaxique cohérente. Au-delà de sa fonction communicative, elle constitue un système symbolique complet, où chaque terme encode des réalités métaphysiques et spirituelles. Son statut transcende celui d'une simple langue artificielle pour s'affirmer comme un instrument de transmission de sagesse cosmique.
                </p>
                <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Structurée selon des principes d'harmonie numérique et d'alignement énergétique, la langue Nidalum reflète l'architecture même de l'univers Souma-Ra, où chaque phonème résonne avec une fréquence spirituelle spécifique.
                </p>
              </div>

              {/* Spiritual and Genealogical Origins */}
              <div className="border-l-4 border-secondary pl-6 sm:pl-8">
                <h3 className="font-heading text-2xl sm:text-3xl text-primary mb-4">
                  Origine Spirituelle et Généalogique
                </h3>
                <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-4">
                  Le Nidalum émane de la cosmologie Souma-Ra, un univers narratif et spirituel fondé sur l'interaction dynamique entre forces primordiales. Son origine remonte aux enseignements ésotériques qui structurent la réalité multidimensionnelle, où le langage devient le vecteur de transformation spirituelle et de connexion avec les archétypes cosmiques.
                </p>
                <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Généalogiquement, le Nidalum s'inscrit dans une lignée de langues sacrées, héritant de traditions mystiques anciennes tout en incarnant une vision contemporaine et afrofuturiste de la spiritualité. Il représente une synthèse entre mémoire ancestrale et innovation créative.
                </p>
              </div>

              {/* Kemetic Bridges */}
              <div className="border-l-4 border-primary pl-6 sm:pl-8">
                <h3 className="font-heading text-2xl sm:text-3xl text-secondary mb-4">
                  Ponts avec la Tradition Kémite
                </h3>
                <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-4">
                  Le Nidalum établit des connexions profondes avec la cosmologie kémite (égyptienne ancienne), particulièrement à travers ses concepts fondamentaux. La tradition kémite, avec sa compréhension sophistiquée des forces cosmiques et de la spiritualité, fournit un cadre philosophique et mythologique au Nidalum.
                </p>
                <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Cette filiation n'est pas une simple imitation, mais une réinterprétation créative et contemporaine des principes kémites, adaptée à une vision afrofuturiste qui honore le passé tout en embrassant l'avenir.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Conceptual Framework */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-primary/10 border border-primary/30 p-6 sm:p-8">
                <h4 className="font-heading text-xl sm:text-2xl text-primary mb-6">
                  Concepts Fondamentaux
                </h4>
                <div className="space-y-4">
                  {[
                    { term: 'Souma-Ra', desc: 'L\'univers cosmique primordial et la force créatrice universelle' },
                    { term: 'Ra', desc: 'L\'énergie solaire divine, illumination et conscience' },
                    { term: 'Ka', desc: 'L\'essence vitale, le double spirituel et l\'énergie de vie' },
                    { term: 'Ma', desc: 'L\'harmonie cosmique, l\'équilibre et la vérité universelle' },
                    { term: 'Ne', desc: 'L\'absence, le vide créatif et le potentiel infini' },
                    { term: 'Te', desc: 'La terre, l\'ancrage matériel et la manifestation physique' },
                    { term: 'Lumé', desc: 'La lumière transcendante et la sagesse éternelle' },
                    { term: 'Nélu', desc: 'Le ciel, l\'expansion spirituelle et les royaumes célestes' },
                    { term: 'Karysso', desc: 'L\'âme collective et la mémoire ancestrale' },
                    { term: 'Kintaya', desc: 'La transformation et l\'évolution spirituelle continue' }
                  ].map((concept, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="pb-4 border-b border-primary/20 last:border-b-0"
                    >
                      <p className="font-heading text-secondary mb-1">{concept.term}</p>
                      <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                        {concept.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Characteristics and Mythological Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
          >
            {/* Characteristics */}
            <div className="bg-secondary/5 border border-secondary/30 p-6 sm:p-8">
              <h4 className="font-heading text-2xl sm:text-3xl text-secondary mb-6">
                Caractéristiques Propres
              </h4>
              <ul className="space-y-3 font-paragraph text-base sm:text-lg text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold mt-1">•</span>
                  <span><strong>Phonétique Harmonique :</strong> Sons alignés avec des fréquences énergétiques spécifiques</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold mt-1">•</span>
                  <span><strong>Morphologie Symbolique :</strong> Chaque racine encode une réalité métaphysique</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold mt-1">•</span>
                  <span><strong>Syntaxe Cosmique :</strong> Structure reflétant l'ordre universel</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold mt-1">•</span>
                  <span><strong>Polysémie Intentionnelle :</strong> Chaque terme opère sur plusieurs niveaux de réalité</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold mt-1">•</span>
                  <span><strong>Intégration Numérique :</strong> Nombres sacrés tissés dans la structure linguistique</span>
                </li>
              </ul>
            </div>

            {/* Mythological Status */}
            <div className="bg-primary/5 border border-primary/30 p-6 sm:p-8">
              <h4 className="font-heading text-2xl sm:text-3xl text-primary mb-6">
                Statut Mythologique
              </h4>
              <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-6">
                Le Nidalum transcende le statut de simple langue pour devenir un mythe vivant. Il incarne la quête humaine de reconnexion avec les forces cosmiques et la sagesse ancestrale. En tant que langue mythologique, il opère comme un pont entre le monde matériel et les royaumes spirituels.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
                Son statut mythologique le positionne comme un instrument de transformation personnelle et collective, capable de catalyser l'évolution spirituelle de ceux qui l'étudient et le pratiquent. Le Nidalum est à la fois langue, philosophie et chemin initiatique.
              </p>
            </div>
          </motion.div>

          {/* Institutional Conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 p-8 sm:p-10 md:p-12"
          >
            <h4 className="font-heading text-2xl sm:text-3xl text-primary mb-6 text-center">
              Conclusion Académique
            </h4>
            <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 text-center">
              Le Nidalum représente une approche novatrice et rigoureuse de la création linguistique, où l'intention spirituelle rencontre la structure formelle. Son étude offre un cadre unique pour explorer les intersections entre langage, spiritualité, mythologie et transformation personnelle.
            </p>
            <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed text-center">
              En tant que système complet intégrant les principes de la cosmologie Souma-Ra et les sagesses kémites, le Nidalum s'affirme comme un patrimoine culturel et spirituel contemporain, destiné à enrichir la compréhension humaine du cosmos et de notre place en son sein.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section - The Visionary Transmitter */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-background via-dark-amber-shadow/30 to-background relative overflow-hidden">
        {/* Mystical Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[120rem] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 sm:mb-8">
                <p className="font-heading text-secondary text-sm sm:text-base tracking-widest uppercase mb-4">
                  The Visionary
                </p>
                <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-6 sm:mb-8 leading-tight">
                  Ramses Nidal
                </h2>
              </div>

              <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 sm:mb-6 italic">
                "We do not teach a language; we transmit a legacy."
              </p>

              <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 sm:mb-6">
                Aboudramane Doumbia, known as Ramses Nidal, is not a linguist—he is an architect of consciousness. He has decoded the DNA of the universe and crystallized it into Nidalum, a secret code that transcends language itself. As the visionary founder of this High-Concept Artistic House, he channels ancient wisdom through a cyberpunk lens, bridging millennia of ancestral knowledge with the infinite possibilities of tomorrow.
              </p>

              <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 sm:mb-8">
                His work is not instruction—it is initiation. Through Nidalum and the Souma-Ra civilization, Ramses Nidal transmits a living mythology, a blueprint for spiritual evolution, and an invitation to decipher the cosmic secrets embedded within every syllable. He is the keeper of a legacy that transcends time, culture, and dimension.
              </p>

              <Link
                to="/author"
                className="inline-block bg-gradient-to-r from-primary to-secondary text-primary-foreground font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 uppercase tracking-wider text-sm"
              >
                Enter the Visionary's World
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                {/* Mystical Frame */}
                <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/30 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/40 shadow-2xl shadow-primary/20">
                  <Image
                    src="https://static.wixstatic.com/media/9c8aea_d92e61748c39422fa5218c0d1ce84928~mv2.png"
                    width={600}
                    className="w-full h-full object-cover"
                    originWidth={522}
                    originHeight={660}
                    focalPointX={34.099616858237546}
                    focalPointY={31.287878787878785}
                    alt="Ramses Nidal - Visionary of Nidalum" />
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-secondary/50"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50"></div>
              </div>
            </motion.div>
          </div>

          {/* Legacy Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 md:mt-20 pt-12 sm:pt-16 border-t border-primary/30"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              <div className="text-center">
                <h4 className="font-heading text-2xl sm:text-3xl text-secondary mb-3 sm:mb-4">
                  Civilization
                </h4>
                <p className="font-paragraph text-sm sm:text-base text-foreground/70 leading-relaxed">
                  Nidalum is not a subject—it is a living civilization, a complete world with its own mythology, spirituality, and cosmic order.
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-heading text-2xl sm:text-3xl text-primary mb-3 sm:mb-4">
                  Secret Code
                </h4>
                <p className="font-paragraph text-sm sm:text-base text-foreground/70 leading-relaxed">
                  Every phoneme, every symbol, every structure encodes universal truths waiting to be deciphered by those initiated into the mystery.
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-heading text-2xl sm:text-3xl text-secondary mb-3 sm:mb-4">
                  Legacy
                </h4>
                <p className="font-paragraph text-sm sm:text-base text-foreground/70 leading-relaxed">
                  A transmission of ancestral wisdom merged with cyberpunk vision—ancient mythology meets infinite future.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Newsletter Signup Section */}
      <NewsletterSignup />

      {/* CTA Section - Initiation Call */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-background to-dark-amber-shadow/20 relative overflow-hidden">
        {/* Mystical Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.1)_0%,transparent_70%)]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-secondary text-sm sm:text-base tracking-widest uppercase mb-4">
              Begin Your Initiation
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 sm:mb-8">
              Decipher the Secret Code
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-foreground/70 mb-8 sm:mb-12 leading-relaxed px-2">
              Enter the High-Concept Artistic House of Nidalum. Decipher the DNA of the Universe. Explore the sacred symbols, immerse yourself in the cosmic mythology, and discover the civilization that exists between ancient wisdom and infinite future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-2">
              <Link
                to="/lexicon"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-center uppercase tracking-wider text-sm"
              >
                Decipher the Lexicon
              </Link>
              <Link
                to="/contact"
                className="bg-transparent text-secondary border-2 border-secondary font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-secondary/10 transition-all duration-300 text-center uppercase tracking-wider text-sm"
              >
                Join the Civilization
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
