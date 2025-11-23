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
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-6">
              NIDALUM
            </h1>
            <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-secondary mb-8 tracking-widest">
              {t('pages.home.subtitle')}
            </p>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t('pages.home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/alphabet"
                className="bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
              >
                {t('nav.alphabet')}
              </Link>
              <Link
                to="/academy"
                className="bg-transparent text-primary border-2 border-primary font-paragraph font-semibold px-8 py-4 hover:bg-primary/10 transition-all duration-300"
              >
                {t('nav.academy')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full"></div>
          </div>
        </motion.div>
      </section>
      {/* Features Section - Asymmetric Grid */}
      <section className="py-24 px-6 lg:px-12 max-w-[120rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            {t('pages.home.title')}
          </h2>
          <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
            {t('pages.home.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Languages,
              title: 'Langue Sacrée',
              description: 'Alphabet Toraé-Shira, grammaire structurée, phonétique unique, et lexique complet',
              link: '/alphabet',
              color: 'primary'
            },
            {
              icon: Sparkles,
              title: 'Spiritualité',
              description: 'Chants rituels, contextes spirituels, et connexion avec l\'univers Souma-Ra',
              link: '/chants',
              color: 'secondary'
            },
            {
              icon: Globe,
              title: 'Univers Narratif',
              description: 'Découvrez les origines de Souma-Ra et Nidar, un monde mythologique épique',
              link: '/origins',
              color: 'primary'
            },
            {
              icon: Music,
              title: 'Musique Épique',
              description: 'Compositions afro-cinématographiques par Ramses Nidal, fusion mystique et moderne',
              link: '/author',
              color: 'secondary'
            },
            {
              icon: BookOpen,
              title: 'Publications',
              description: 'Dictionnaire Nidalum, livres, et ressources officielles pour approfondir',
              link: '/publications',
              color: 'primary'
            },
            {
              icon: Library,
              title: 'Academy',
              description: 'Institut d\'apprentissage de la langue Nidalum et de sa culture',
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
                className="block h-full p-8 border border-primary/20 hover:border-primary/50 transition-all duration-300 group bg-background/50 backdrop-blur-sm"
              >
                <feature.icon className={`w-12 h-12 text-${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="font-heading text-2xl text-primary mb-4 group-hover:text-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      {/* About Section - Split Layout */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-background to-dark-amber-shadow/20">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                Ramses Nidal
              </h2>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-6">
                Aboudramane Doumbia, connu sous le nom artistique de Ramses Nidal, est le créateur de la langue Nidalum et de l'univers narratif Souma-Ra. Artiste afrofuturiste, compositeur de musique épique, et linguiste créatif, il fusionne tradition et innovation.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-8">
                Son œuvre explore les thèmes de l'identité, de la spiritualité, et de la mythologie à travers une lentille cinématographique et mystique, créant un pont entre le passé ancestral et le futur cosmique.
              </p>
              <Link
                to="/author"
                className="inline-block bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 hover:bg-primary/90 transition-all duration-300"
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
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
              Commencez Votre Voyage
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-12 leading-relaxed">
              Plongez dans l'univers mystique de Nidalum. Apprenez la langue sacrée, explorez les chants rituels, et découvrez un monde où l'ancien rencontre le futur.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/lexicon"
                className="bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 hover:bg-primary/90 transition-all duration-300"
              >
                Explorer le Lexique
              </Link>
              <Link
                to="/contact"
                className="bg-transparent text-secondary border-2 border-secondary font-paragraph font-semibold px-8 py-4 hover:bg-secondary/10 transition-all duration-300"
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
