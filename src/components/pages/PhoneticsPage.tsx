import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Volume2, Mic, Waves } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { BaseCrudService } from '@/integrations';
import { NidalumPhonetics } from '@/entities';

export default function PhoneticsPage() {
  const { t } = useTranslation();
  const [phoneticItems, setPhoneticItems] = useState<NidalumPhonetics[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPhonetics();
  }, []);

  const loadPhonetics = async () => {
    try {
      setIsLoading(true);
      const { items } = await BaseCrudService.getAll<NidalumPhonetics>('phonetiquenidalum');
      
      if (!items || items.length === 0) {
        setPhoneticItems([]);
      } else {
        setPhoneticItems(items);
      }
    } catch (error) {
      setPhoneticItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const vowels = phoneticItems.filter(item => item.type === 'Vowel');
  const consonants = phoneticItems.filter(item => item.type === 'Consonant');

  const phonotactics = [
    {
      title: 'Structure Syllabique',
      description: 'Les syllabes en Nidalum suivent principalement le modèle CV (Consonne-Voyelle) ou CVC, créant un rythme fluide et harmonieux.',
      examples: ['Ni-dar', 'Sou-ma-ra', 'Kē-la']
    },
    {
      title: 'Harmonie Vocalique',
      description: 'Les voyelles d\'un mot tendent à s\'harmoniser, créant une cohésion sonore qui reflète l\'unité cosmique.',
      examples: ['Toraé', 'Shīra', 'Souma']
    },
    {
      title: 'Accent Tonique',
      description: 'L\'accent tombe généralement sur la première syllabe, symbolisant l\'importance de l\'origine et du commencement.',
      examples: ['NÍ-dar', 'SÓU-ma', 'KÉ-la']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
              {t('pages.phonetics.title')}
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              {t('pages.phonetics.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vowels Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Volume2 className="w-10 h-10 text-primary mr-4" />
              <h2 className="font-heading text-3xl md:text-4xl text-primary">
                Voyelles Sacrées
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/70 text-center max-w-3xl mx-auto mb-6 leading-relaxed">
              Les cinq voyelles longues forment le cœur sonore de Nidalum, chacune portant une résonance spirituelle unique.
            </p>
            {vowels.length > 0 && (
              <p className="font-paragraph text-sm text-secondary text-center">
                {vowels.length} voyelle{vowels.length > 1 ? 's' : ''} chargée{vowels.length > 1 ? 's' : ''}
              </p>
            )}
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="font-paragraph text-foreground/70">Chargement des voyelles...</p>
              </div>
            </div>
          ) : vowels && vowels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {vowels.map((vowel, index) => (
                <motion.div
                  key={vowel._id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-primary/20 p-6 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm text-center group hover:bg-background/70"
                >
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-secondary/30 flex items-center justify-center group-hover:border-secondary transition-colors">
                    <span className="font-heading text-4xl text-primary group-hover:text-secondary transition-colors">{vowel.character}</span>
                  </div>
                  <p className="font-paragraph text-secondary mb-2 font-semibold">{vowel.pronunciationGuide}</p>
                  <p className="font-paragraph text-sm text-foreground/70 mb-3 leading-relaxed">
                    {vowel.notes}
                  </p>
                  <div className="bg-dark-amber-shadow/20 p-3 border-l-2 border-primary">
                    <p className="font-paragraph text-xs text-foreground/50 mb-1">Exemple:</p>
                    <p className="font-paragraph text-sm text-secondary italic">{vowel.exampleWord}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="font-paragraph text-lg text-foreground/70">
                Aucune voyelle disponible pour le moment
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Consonants Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Mic className="w-10 h-10 text-secondary mr-4" />
              <h2 className="font-heading text-3xl md:text-4xl text-primary">
                Consonnes Mystiques
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/70 text-center max-w-3xl mx-auto mb-6 leading-relaxed">
              Les consonnes structurent le langage, créant les piliers sonores sur lesquels repose la parole sacrée.
            </p>
            {consonants.length > 0 && (
              <p className="font-paragraph text-sm text-secondary text-center">
                {consonants.length} consonne{consonants.length > 1 ? 's' : ''} chargée{consonants.length > 1 ? 's' : ''}
              </p>
            )}
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="font-paragraph text-foreground/70">Chargement des consonnes...</p>
              </div>
            </div>
          ) : consonants && consonants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consonants.map((consonant, index) => (
                <motion.div
                  key={consonant._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="border border-primary/20 p-6 hover:border-secondary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm group hover:bg-background/70"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 border border-secondary/30 flex items-center justify-center mr-4 group-hover:border-secondary transition-colors">
                      <span className="font-heading text-3xl text-secondary group-hover:text-primary transition-colors">{consonant.character}</span>
                    </div>
                    <span className="font-paragraph text-lg text-primary font-semibold">{consonant.pronunciationGuide}</span>
                  </div>
                  <p className="font-paragraph text-sm text-foreground/70 mb-3 leading-relaxed">
                    {consonant.notes}
                  </p>
                  <div className="bg-dark-amber-shadow/20 p-3 border-l-2 border-secondary">
                    <p className="font-paragraph text-xs text-foreground/50 mb-1">Exemple:</p>
                    <p className="font-paragraph text-sm text-primary italic">{consonant.exampleWord}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="font-paragraph text-lg text-foreground/70">
                Aucune consonne disponible pour le moment
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Phonotactics Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-6">
              <Waves className="w-10 h-10 text-primary mr-4" />
              <h2 className="font-heading text-3xl md:text-4xl text-primary">
                Règles Phonotactiques
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/70 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Les règles qui gouvernent la combinaison des sons en Nidalum reflètent l'harmonie universelle.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {phonotactics.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-primary/20 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                >
                  <h3 className="font-heading text-2xl text-secondary mb-4">{rule.title}</h3>
                  <p className="font-paragraph text-foreground/70 leading-relaxed mb-6">
                    {rule.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-paragraph text-sm text-foreground/50 mb-3">Exemples:</p>
                    {rule.examples.map((example, idx) => (
                      <div key={idx} className="bg-dark-amber-shadow/20 p-3 border-l-2 border-primary">
                        <p className="font-paragraph text-primary italic">{example}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pronunciation Guide */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-background to-dark-amber-shadow/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              Guide de Prononciation
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-6">Conseils Généraux</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-3 flex-shrink-0 mt-1">•</span>
                    <p className="font-paragraph text-foreground/70">
                      Prononcez toutes les voyelles de manière claire et prolongée
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 flex-shrink-0 mt-1">•</span>
                    <p className="font-paragraph text-foreground/70">
                      Les consonnes doivent être articulées distinctement
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 flex-shrink-0 mt-1">•</span>
                    <p className="font-paragraph text-foreground/70">
                      Maintenez un rythme régulier et fluide
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 flex-shrink-0 mt-1">•</span>
                    <p className="font-paragraph text-foreground/70">
                      L'accent tonique sur la première syllabe doit être marqué mais subtil
                    </p>
                  </li>
                </ul>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-6">Mots Communs</h3>
                <div className="space-y-4">
                  <div className="bg-dark-amber-shadow/20 p-4 border-l-4 border-primary">
                    <p className="font-paragraph text-sm text-foreground/50 mb-1">Nidalum</p>
                    <p className="font-paragraph text-lg text-primary font-semibold">/niː.da.luːm/</p>
                  </div>
                  <div className="bg-dark-amber-shadow/20 p-4 border-l-4 border-secondary">
                    <p className="font-paragraph text-sm text-foreground/50 mb-1">Souma-Ra</p>
                    <p className="font-paragraph text-lg text-secondary font-semibold">/suː.ma.raː/</p>
                  </div>
                  <div className="bg-dark-amber-shadow/20 p-4 border-l-4 border-primary">
                    <p className="font-paragraph text-sm text-foreground/50 mb-1">Toraé-Shīra</p>
                    <p className="font-paragraph text-lg text-primary font-semibold">/to.ra.eː.ʃiː.ra/</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
