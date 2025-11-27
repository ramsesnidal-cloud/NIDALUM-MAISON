import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { useTranslation } from '@/hooks/useTranslation';
import { BaseCrudService } from '@/integrations';
import { NidalumAlphabet } from '@/entities';

export default function AlphabetPage() {
  const { t } = useTranslation();
  const [alphabetLetters, setAlphabetLetters] = useState<NidalumAlphabet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAlphabet();
  }, []);

  const loadAlphabet = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<NidalumAlphabet>('alphabetnidalum');
    // Sort by alphabetical order if available
    const sorted = items.sort((a, b) => (a.alphabeticalOrder || 0) - (b.alphabeticalOrder || 0));
    setAlphabetLetters(sorted);
    setIsLoading(false);
  };

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
              {t('pages.alphabet.title')}
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              {t('pages.alphabet.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alphabet Structure Section */}
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-background to-dark-amber-shadow/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-6 text-center">
              {t('pages.alphabet.structure')}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  {t('pages.alphabet.structureDesc')}
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="font-heading text-xl text-secondary mb-2">{t('pages.alphabet.sacredVowels')}</h3>
                    <p className="font-paragraph text-foreground/70">
                      {t('pages.alphabet.sacredVowelsDesc')}
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary pl-6">
                    <h3 className="font-heading text-xl text-primary mb-2">{t('pages.alphabet.mysticConsonants')}</h3>
                    <p className="font-paragraph text-foreground/70">
                      {t('pages.alphabet.mysticConsonantsDesc')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-background/50 border border-primary/20 p-8 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-primary mb-6 text-center">{t('pages.alphabet.verticalWriting')}</h3>
                <div className="flex justify-center space-x-8">
                  <div className="flex flex-col items-center space-y-4">
                    {['Ṇ', 'Ī', 'Ḍ', 'Ā', 'Ḷ', 'Ū', 'Ṃ'].map((letter, index) => (
                      <div key={index} className="w-16 h-16 border border-secondary/30 flex items-center justify-center">
                        <span className="font-heading text-3xl text-secondary">{letter}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <p className="font-paragraph text-foreground/70 writing-mode-vertical-rl transform rotate-180">
                      {t('pages.alphabet.verticalWritingExample')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alphabet Grid */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-4 text-center">
              {t('pages.alphabet.sixteenLetters')}
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 text-center max-w-3xl mx-auto">
              {t('pages.alphabet.sixteenLettersDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {alphabetLetters.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-background/50 border border-primary/20 p-6 hover:border-primary/50 transition-all duration-300 group backdrop-blur-sm"
              >
                <div className="text-center mb-4">
                  {item.glyphImage ? (
                    <div className="inline-block w-20 h-20 border-2 border-secondary/30 flex items-center justify-center mb-3 group-hover:border-secondary transition-colors overflow-hidden">
                      <Image
                        src={item.glyphImage}
                        alt={item.letter || 'Letter'}
                        width={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="inline-block w-20 h-20 border-2 border-secondary/30 flex items-center justify-center mb-3 group-hover:border-secondary transition-colors">
                      <span className="font-heading text-5xl text-primary group-hover:text-secondary transition-colors">
                        {item.letter}
                      </span>
                    </div>
                  )}
                  <p className="font-paragraph text-sm text-foreground/50">
                    {t('pages.alphabet.latin')}: {item.letter}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph text-xs text-foreground/50">{t('pages.alphabet.pronunciation')}:</span>
                    <span className="font-paragraph text-sm text-secondary">[{item.pronunciation}]</span>
                  </div>
                  <div className="pt-2 border-t border-primary/10">
                    <p className="font-paragraph text-sm text-foreground/70 text-center italic">
                      "{item.meaning}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              {t('pages.alphabet.usage')}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">{t('pages.alphabet.direction')}</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  {t('pages.alphabet.directionDesc')}
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">{t('pages.alphabet.calligraphy')}</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  {t('pages.alphabet.calligraphyDesc')}
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">{t('pages.alphabet.combinations')}</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  {t('pages.alphabet.combinationsDesc')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
