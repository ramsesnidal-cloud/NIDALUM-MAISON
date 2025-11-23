import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BookOpen, Users, Award, Calendar, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function AcademyPage() {
  const { t } = useTranslation();
  const programs = [
    {
      title: 'Initiation à Nidalum',
      level: 'Débutant',
      duration: '8 semaines',
      description: 'Découvrez les bases de la langue Nidalum : alphabet Toraé-Shira, prononciation, et vocabulaire essentiel.',
      modules: ['Alphabet et écriture', 'Phonétique de base', 'Vocabulaire fondamental', 'Phrases simples']
    },
    {
      title: 'Grammaire Avancée',
      level: 'Intermédiaire',
      duration: '12 semaines',
      description: 'Approfondissez votre compréhension de la structure grammaticale et des nuances linguistiques.',
      modules: ['Système de cas', 'Conjugaisons complexes', 'Syntaxe avancée', 'Modificateurs spirituels']
    },
    {
      title: 'Spiritualité et Chants',
      level: 'Avancé',
      duration: '10 semaines',
      description: 'Explorez la dimension spirituelle de Nidalum à travers les chants rituels et la méditation.',
      modules: ['Chants rituels', 'Contextes spirituels', 'Pratiques méditatives', 'Connexion cosmique']
    },
    {
      title: 'Maîtrise Complète',
      level: 'Expert',
      duration: '16 semaines',
      description: 'Devenez un maître de Nidalum, capable d\'enseigner et de créer dans la langue sacrée.',
      modules: ['Création littéraire', 'Enseignement', 'Recherche linguistique', 'Certification']
    }
  ];

  const benefits = [
    {
      icon: BookOpen,
      title: 'Ressources Complètes',
      description: 'Accès à tous les documents, dictionnaires, et guides d\'apprentissage'
    },
    {
      icon: Users,
      title: 'Communauté Active',
      description: 'Rejoignez une communauté passionnée d\'apprenants et de pratiquants'
    },
    {
      icon: Award,
      title: 'Certification Officielle',
      description: 'Obtenez une certification reconnue par l\'Institut Nidalum'
    },
    {
      icon: Calendar,
      title: 'Apprentissage Flexible',
      description: 'Étudiez à votre rythme avec un accès permanent aux cours'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
              Nidalum Academy
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              L'Institut officiel d'apprentissage de la langue Nidalum. Rejoignez une communauté mondiale dédiée à la maîtrise de cette langue sacrée et à l'exploration de l'univers Souma-Ra.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-4 text-center">
              Programmes de Formation
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 text-center max-w-3xl mx-auto">
              Des parcours structurés pour tous les niveaux, du débutant au maître
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-primary/20 p-8 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-2xl text-primary mb-2">{program.title}</h3>
                    <div className="flex gap-3">
                      <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary">
                        {program.level}
                      </span>
                      <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 font-paragraph text-xs text-primary">
                        {program.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="font-paragraph text-foreground/70 leading-relaxed mb-6">
                  {program.description}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="font-paragraph text-sm text-foreground/50 mb-3">Modules inclus:</p>
                  {program.modules.map((module, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                      <span className="font-paragraph text-sm text-foreground/70">{module}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-3 hover:bg-primary/90 transition-all duration-300">
                  S'inscrire
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              Avantages de l'Academy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <benefit.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-heading text-xl text-primary mb-3">{benefit.title}</h3>
                  <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              Votre Parcours d'Apprentissage
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <div className="w-12 h-12 bg-primary/20 border border-primary flex items-center justify-center mb-4">
                  <span className="font-heading text-2xl text-primary">1</span>
                </div>
                <h3 className="font-heading text-2xl text-secondary mb-4">Inscription</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Choisissez votre programme et créez votre compte. Accédez immédiatement à vos premiers cours et ressources.
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <div className="w-12 h-12 bg-secondary/20 border border-secondary flex items-center justify-center mb-4">
                  <span className="font-heading text-2xl text-secondary">2</span>
                </div>
                <h3 className="font-heading text-2xl text-secondary mb-4">Apprentissage</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Progressez à travers les modules, pratiquez avec la communauté, et approfondissez votre maîtrise de Nidalum.
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <div className="w-12 h-12 bg-primary/20 border border-primary flex items-center justify-center mb-4">
                  <span className="font-heading text-2xl text-primary">3</span>
                </div>
                <h3 className="font-heading text-2xl text-secondary mb-4">Certification</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Complétez votre formation et recevez votre certification officielle de l'Institut Nidalum.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-background to-dark-amber-shadow/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
              Prêt à Commencer?
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-12 leading-relaxed">
              Rejoignez l'Academy Nidalum aujourd'hui et commencez votre voyage dans la langue sacrée.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 hover:bg-primary/90 transition-all duration-300">
                S'inscrire Maintenant
              </button>
              <Link
                to="/contact"
                className="bg-transparent text-secondary border-2 border-secondary font-paragraph font-semibold px-8 py-4 hover:bg-secondary/10 transition-all duration-300 inline-block"
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
