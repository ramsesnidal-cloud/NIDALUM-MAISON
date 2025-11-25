import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Languages, Music, Sparkles, Globe, Library } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { useTranslation } from '@/hooks/useTranslation';

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
      {/* About Section - Split Layout */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-background to-dark-amber-shadow/20">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary mb-4 sm:mb-6">
                Ramses Nidal
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-4 sm:mb-6">
                Aboudramane Doumbia, connu sous le nom artistique de Ramses Nidal, est le créateur de la langue Nidalum et de l'univers narratif Souma-Ra. Artiste afrofuturiste, compositeur de musique épique, et linguiste créatif, il fusionne tradition et innovation.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 sm:mb-8">
                Son œuvre explore les thèmes de l'identité, de la spiritualité, et de la mythologie à travers une lentille cinématographique et mystique, créant un pont entre le passé ancestral et le futur cosmique.
              </p>
              <Link
                to="/author"
                className="inline-block bg-primary text-primary-foreground font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-primary/90 transition-all duration-300"
              >
                Découvrir l'Artiste
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                <Image
                  src="https://static.wixstatic.com/media/9c8aea_d92e61748c39422fa5218c0d1ce84928~mv2.png"
                  width={600}
                  className="w-full h-full object-cover"
                  originWidth={522}
                  originHeight={660}
                  focalPointX={34.099616858237546}
                  focalPointY={31.287878787878785} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 sm:mb-6">
              Commencez Votre Voyage
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-foreground/70 mb-8 sm:mb-12 leading-relaxed px-2">
              Plongez dans l'univers mystique de Nidalum. Apprenez la langue sacrée, explorez les chants rituels, et découvrez un monde où l'ancien rencontre le futur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-2">
              <Link
                to="/lexicon"
                className="bg-primary text-primary-foreground font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-primary/90 transition-all duration-300 text-center"
              >
                Explorer le Lexique
              </Link>
              <Link
                to="/contact"
                className="bg-transparent text-secondary border-2 border-secondary font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-secondary/10 transition-all duration-300 text-center"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
