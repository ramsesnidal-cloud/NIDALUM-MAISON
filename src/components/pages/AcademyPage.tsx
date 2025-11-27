import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BookOpen, Users, Award, Calendar, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { BaseCrudService } from '@/integrations';
import { ProgrammesdelAcadmie } from '@/entities';
import { Image } from '@/components/ui/image';

export default function AcademyPage() {
  const { t } = useTranslation();
  const [programs, setPrograms] = useState<ProgrammesdelAcadmie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<ProgrammesdelAcadmie>('academieprogrammes');
    setPrograms(items);
    setIsLoading(false);
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="font-paragraph text-foreground/70">{t('common.loading')}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
              {t('pages.academy.title')}
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              {t('pages.academy.description')}
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
                className="border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm group flex flex-col h-full"
              >
                {program.programImage && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={program.programImage}
                      alt={program.programName || 'Programme'}
                      width={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary mb-3">
                      {program.programLevel}
                    </span>
                    <h3 className="font-heading text-2xl text-primary mb-2 group-hover:text-secondary transition-colors">
                      {program.programName}
                    </h3>
                  </div>

                  {program.programDuration && (
                    <div className="flex items-center text-foreground/60 mb-4">
                      <Calendar className="w-4 h-4 mr-2 text-secondary flex-shrink-0" />
                      <span className="font-paragraph text-sm">{program.programDuration}</span>
                    </div>
                  )}

                  <p className="font-paragraph text-foreground/70 leading-relaxed mb-6 flex-1">
                    {program.programDescription}
                  </p>

                  {program.enrollmentLink && (
                    <a
                      href={program.enrollmentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-3 hover:bg-primary/90 transition-all duration-300 text-center"
                    >
                      S'inscrire
                    </a>
                  )}
                </div>
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
