import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { Globe, Star, Zap, Moon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { BaseCrudService } from '@/integrations';
import { OriginsandChronology } from '@/entities';

export default function OriginsPage() {
  const { t } = useTranslation();
  const [originsData, setOriginsData] = useState<OriginsandChronology[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrigins();
  }, []);

  const loadOrigins = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<OriginsandChronology>('origineschronologie');
    setOriginsData(items);
    setIsLoading(false);
  };

  const cosmicElements = originsData.filter(item => item.category === 'Cosmic Element');
  const timeline = originsData.filter(item => item.category === 'Chronological Era');

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
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-6">
              SOUMA-RA
            </h1>
            <p className="font-heading text-2xl md:text-3xl text-secondary mb-8 tracking-widest">
              {t('pages.origins.title')}
            </p>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {t('pages.origins.description')}
            </p>
          </motion.div>
        </div>
      </section>
      {/* Cosmic Elements Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
              La Genèse Cosmique
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              L'histoire de la création de Souma-Ra et de l'émergence de la conscience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cosmicElements.map((element, index) => {
              const icons = [Star, Globe, Zap, Moon];
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-primary/20 p-8 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm"
                >
                  <Icon className="w-12 h-12 text-primary mb-6" />
                  <h3 className="font-heading text-2xl text-primary mb-4">{element.name}</h3>
                  <p className="font-paragraph text-foreground/70 leading-relaxed">
                    {element.description}
                  </p>
                  {element.significance && (
                    <div className="mt-4 pt-4 border-t border-primary/10">
                      <p className="font-paragraph text-sm text-secondary italic">
                        {element.significance}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Timeline Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12 text-center">
              Chronologie Cosmique
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary hidden lg:block"></div>

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="border border-primary/20 p-6 bg-background/50 backdrop-blur-sm inline-block">
                        <h3 className="font-heading text-2xl text-secondary mb-2">{item.name}</h3>
                        <p className="font-paragraph text-foreground/70">{item.description}</p>
                      </div>
                    </div>
                    <div className="hidden lg:block w-4 h-4 bg-primary border-4 border-background rounded-full relative z-10"></div>
                    <div className="flex-1"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Mythology Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                Nidar, le Premier Gardien
              </h2>
              <div className="space-y-4">
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  Nidar n'est pas simplement un être, mais une force cosmique incarnée. Il représente la conscience éveillée, le pont entre le néant et l'existence, entre le silence et la parole.
                </p>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  Lorsque Nidar ouvrit les yeux pour la première fois, il vit Souma-Ra dans toute sa splendeur chaotique. Pour donner un sens à ce qu'il voyait, il créa la langue Nidalum, nommant chaque étoile, chaque vent, chaque vibration de l'univers.
                </p>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  Les Sept Piliers qu'il érigea ne sont pas de simples structures physiques, mais des concepts fondamentaux : Origine, Destinée, Harmonie, Connaissance, Pouvoir, Temps, et Éternité. Chacun ancre une dimension de la réalité.
                </p>
              </div>
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
                  src="https://static.wixstatic.com/media/9c8aea_bc2fee18935f4c26807024d062ba00a6~mv2.png"
                  width={600}
                  className="w-full h-full object-cover"
                  originWidth={1024}
                  originHeight={1024}
                  focalPointX={50.68359375}
                  focalPointY={22.36328125} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Seven Pillars Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-background to-dark-amber-shadow/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12 text-center">
              Les Sept Piliers Cosmiques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Origine', symbol: 'Ā', meaning: 'Le commencement de toute chose' },
                { name: 'Destinée', symbol: 'Ḍ', meaning: 'Le chemin tracé par les étoiles' },
                { name: 'Harmonie', symbol: 'Ṃ', meaning: 'L\'équilibre entre les forces' },
                { name: 'Connaissance', symbol: 'Ḳ', meaning: 'La sagesse des ancêtres' },
                { name: 'Pouvoir', symbol: 'Ṗ', meaning: 'La force créatrice' },
                { name: 'Temps', symbol: 'Ṭ', meaning: 'Le flux éternel' },
                { name: 'Éternité', symbol: 'Ē', meaning: 'Ce qui transcende le temps' },
              ].map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-primary/20 p-6 text-center hover:border-secondary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm"
                >
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-secondary/30 flex items-center justify-center">
                    <span className="font-heading text-4xl text-primary">{pillar.symbol}</span>
                  </div>
                  <h3 className="font-heading text-xl text-secondary mb-2">{pillar.name}</h3>
                  <p className="font-paragraph text-sm text-foreground/70">{pillar.meaning}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
