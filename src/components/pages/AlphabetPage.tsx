import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';

export default function AlphabetPage() {
  const alphabetLetters = [
    { letter: 'A', nidalum: 'Ā', pronunciation: 'ah', meaning: 'Origine' },
    { letter: 'E', nidalum: 'Ē', pronunciation: 'eh', meaning: 'Essence' },
    { letter: 'I', nidalum: 'Ī', pronunciation: 'ee', meaning: 'Lumière' },
    { letter: 'O', nidalum: 'Ō', pronunciation: 'oh', meaning: 'Cosmos' },
    { letter: 'U', nidalum: 'Ū', pronunciation: 'oo', meaning: 'Unité' },
    { letter: 'N', nidalum: 'Ṇ', pronunciation: 'n', meaning: 'Naissance' },
    { letter: 'D', nidalum: 'Ḍ', pronunciation: 'd', meaning: 'Destinée' },
    { letter: 'L', nidalum: 'Ḷ', pronunciation: 'l', meaning: 'Lien' },
    { letter: 'M', nidalum: 'Ṃ', pronunciation: 'm', meaning: 'Mystère' },
    { letter: 'R', nidalum: 'Ṛ', pronunciation: 'r', meaning: 'Révélation' },
    { letter: 'S', nidalum: 'Ṣ', pronunciation: 's', meaning: 'Sacré' },
    { letter: 'T', nidalum: 'Ṭ', pronunciation: 't', meaning: 'Temps' },
    { letter: 'K', nidalum: 'Ḳ', pronunciation: 'k', meaning: 'Connaissance' },
    { letter: 'P', nidalum: 'Ṗ', pronunciation: 'p', meaning: 'Pouvoir' },
    { letter: 'B', nidalum: 'Ḅ', pronunciation: 'b', meaning: 'Bénédiction' },
    { letter: 'G', nidalum: 'Ġ', pronunciation: 'g', meaning: 'Gardien' },
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
              Alphabet Toraé-Shira
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              L'alphabet sacré de Nidalum, écrit verticalement dans la tradition Toraé-Shira. Chaque lettre porte une signification cosmique et spirituelle, formant la base de notre langue mystique.
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
              Structure de l'Alphabet
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  L'alphabet Toraé-Shira se compose de 16 lettres fondamentales, chacune représentant un concept cosmique ou spirituel. Ces lettres sont écrites verticalement, de haut en bas, symbolisant la connexion entre le ciel et la terre.
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="font-heading text-xl text-secondary mb-2">Voyelles Sacrées</h3>
                    <p className="font-paragraph text-foreground/70">
                      Les cinq voyelles (Ā, Ē, Ī, Ō, Ū) représentent les éléments fondamentaux de l'existence et de la création.
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary pl-6">
                    <h3 className="font-heading text-xl text-primary mb-2">Consonnes Mystiques</h3>
                    <p className="font-paragraph text-foreground/70">
                      Les onze consonnes forment les piliers de la langue, chacune portant une énergie spécifique et un pouvoir spirituel.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-background/50 border border-primary/20 p-8 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-primary mb-6 text-center">Écriture Verticale</h3>
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
                      Exemple d'écriture verticale
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
              Les 16 Lettres Sacrées
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 text-center max-w-3xl mx-auto">
              Chaque lettre de l'alphabet Toraé-Shira possède une signification profonde et une prononciation spécifique
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
                  <div className="inline-block w-20 h-20 border-2 border-secondary/30 flex items-center justify-center mb-3 group-hover:border-secondary transition-colors">
                    <span className="font-heading text-5xl text-primary group-hover:text-secondary transition-colors">
                      {item.nidalum}
                    </span>
                  </div>
                  <p className="font-paragraph text-sm text-foreground/50">
                    Latin: {item.letter}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph text-xs text-foreground/50">Prononciation:</span>
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
              Utilisation et Calligraphie
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Direction</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  L'écriture Toraé-Shira se lit de haut en bas, puis de droite à gauche, symbolisant la descente de la sagesse céleste vers la terre.
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Calligraphie</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Chaque lettre peut être ornée de motifs géométriques sacrés, reflétant l'importance spirituelle du texte écrit.
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Combinaisons</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Les lettres peuvent se combiner pour former des ligatures spéciales, créant des symboles complexes chargés de sens.
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
