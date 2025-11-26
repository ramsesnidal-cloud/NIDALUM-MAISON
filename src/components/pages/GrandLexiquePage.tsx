import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState, useMemo } from 'react';

// Define types for the lexicon data structure
type LexiconTerm = {
  nidalum: string;
  pronunciation: string;
  translation: string;
  egyptianLink: string;
};

type LexiconCategory = {
  title: string;
  description: string;
  color: string;
  terms: LexiconTerm[];
};

type LexiconData = {
  [key: string]: LexiconCategory;
};

export default function GrandLexiquePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('cosmique');

  // Comprehensive Nidalum Lexicon Data
  const lexiconData: LexiconData = {
    cosmique: {
      title: 'Sphère Cosmique',
      description: 'Les termes fondamentaux de la cosmologie Souma-Ra',
      color: 'primary',
      terms: [
        {
          nidalum: 'Souma-Ra',
          pronunciation: 'sou-mah-rah',
          translation: 'L\'univers cosmique primordial, la force créatrice universelle',
          egyptianLink: 'Connexion avec Ra (dieu solaire) et Atoum (créateur)'
        },
        {
          nidalum: 'Ra',
          pronunciation: 'rah',
          translation: 'L\'énergie solaire divine, illumination et conscience',
          egyptianLink: 'Directement issu de Ra, le dieu solaire égyptien'
        },
        {
          nidalum: 'Ka',
          pronunciation: 'kah',
          translation: 'L\'essence vitale, le double spirituel et l\'énergie de vie',
          egyptianLink: 'Concept kémite fondamental : le Ka (force vitale)'
        },
        {
          nidalum: 'Ma',
          pronunciation: 'mah',
          translation: 'L\'harmonie cosmique, l\'équilibre et la vérité universelle',
          egyptianLink: 'Maat : la déesse de la justice, l\'ordre et l\'équilibre'
        },
        {
          nidalum: 'Ne',
          pronunciation: 'neh',
          translation: 'L\'absence, le vide créatif et le potentiel infini',
          egyptianLink: 'Nun : l\'océan primordial, le chaos créatif'
        },
        {
          nidalum: 'Te',
          pronunciation: 'teh',
          translation: 'La terre, l\'ancrage matériel et la manifestation physique',
          egyptianLink: 'Geb : le dieu de la terre égyptienne'
        },
        {
          nidalum: 'Lumé',
          pronunciation: 'lou-meh',
          translation: 'La lumière transcendante et la sagesse éternelle',
          egyptianLink: 'Khepri : la lumière du renouvellement et de la transformation'
        },
        {
          nidalum: 'Nélu',
          pronunciation: 'neh-lou',
          translation: 'Le ciel, l\'expansion spirituelle et les royaumes célestes',
          egyptianLink: 'Nout : la déesse du ciel égyptienne'
        },
        {
          nidalum: 'Karysso',
          pronunciation: 'kah-ris-so',
          translation: 'L\'âme collective et la mémoire ancestrale',
          egyptianLink: 'Concept du Khat (corps) et du Ba (âme) collectifs'
        },
        {
          nidalum: 'Kintaya',
          pronunciation: 'kin-tah-yah',
          translation: 'La transformation et l\'évolution spirituelle continue',
          egyptianLink: 'Khepri : la transformation cyclique et le renouvellement'
        }
      ]
    },
    spirituelle: {
      title: 'Sphère Spirituelle et Initiatique',
      description: 'Les termes liés à la spiritualité, l\'initiation et la transformation',
      color: 'secondary',
      terms: [
        {
          nidalum: 'Amen',
          pronunciation: 'ah-men',
          translation: 'Le caché, l\'invisible et le mystère divin',
          egyptianLink: 'Amen : le dieu caché, force créatrice invisible'
        },
        {
          nidalum: 'Sekhem',
          pronunciation: 'seh-khem',
          translation: 'Le pouvoir, la puissance et l\'autorité spirituelle',
          egyptianLink: 'Sekhmet : la déesse du pouvoir et de la transformation'
        },
        {
          nidalum: 'Heka',
          pronunciation: 'heh-kah',
          translation: 'La magie, l\'énergie universelle et la force cosmique',
          egyptianLink: 'Heka : la magie égyptienne, force universelle'
        },
        {
          nidalum: 'Duat',
          pronunciation: 'dou-aht',
          translation: 'Le monde souterrain, l\'inconscient et les royaumes intérieurs',
          egyptianLink: 'Duat : le monde souterrain égyptien, royaume des morts'
        },
        {
          nidalum: 'Akh',
          pronunciation: 'akh',
          translation: 'L\'esprit illuminé, l\'être transfiguré et glorifié',
          egyptianLink: 'Akh : l\'esprit transfiguré dans la mythologie égyptienne'
        },
        {
          nidalum: 'Sahu',
          pronunciation: 'sah-hou',
          translation: 'Le corps spirituel, le corps de lumière et de sagesse',
          egyptianLink: 'Sahu : le corps spirituel dans la tradition kémite'
        },
        {
          nidalum: 'Renpu',
          pronunciation: 'ren-pou',
          translation: 'Le nom sacré, l\'identité spirituelle et la vibration essentielle',
          egyptianLink: 'Ren : le nom sacré, essence de l\'être en Égypte ancienne'
        },
        {
          nidalum: 'Ankh',
          pronunciation: 'ankh',
          translation: 'La vie éternelle, l\'immortalité et la continuité spirituelle',
          egyptianLink: 'Ankh : le symbole de la vie éternelle égyptienne'
        },
        {
          nidalum: 'Neter',
          pronunciation: 'neh-ter',
          translation: 'Le divin, les forces divines et les archétypes cosmiques',
          egyptianLink: 'Neter : le divin, les dieux et forces cosmiques'
        },
        {
          nidalum: 'Maat',
          pronunciation: 'mah-aht',
          translation: 'La justice cosmique, la vérité et l\'ordre universel',
          egyptianLink: 'Maat : la déesse de la justice et de l\'ordre'
        }
      ]
    },
    naturelle: {
      title: 'Sphère Naturelle et Élémentaire',
      description: 'Les termes relatifs aux éléments, à la nature et aux forces naturelles',
      color: 'primary',
      terms: [
        {
          nidalum: 'Shu',
          pronunciation: 'shou',
          translation: 'L\'air, le vent et l\'espace vital',
          egyptianLink: 'Shu : le dieu de l\'air et de l\'espace en Égypte'
        },
        {
          nidalum: 'Tefnut',
          pronunciation: 'tef-nout',
          translation: 'L\'humidité, l\'eau et la fertilité',
          egyptianLink: 'Tefnut : la déesse de l\'humidité et de la fertilité'
        },
        {
          nidalum: 'Hapi',
          pronunciation: 'hah-pee',
          translation: 'Le Nil, l\'abondance et la prospérité',
          egyptianLink: 'Hapi : le dieu du Nil et de l\'inondation'
        },
        {
          nidalum: 'Sekem',
          pronunciation: 'seh-kem',
          translation: 'La forme, la manifestation et la structure matérielle',
          egyptianLink: 'Concept de forme et de manifestation physique'
        },
        {
          nidalum: 'Ren-Hor',
          pronunciation: 'ren-hor',
          translation: 'Le feu, l\'énergie transformatrice et la passion',
          egyptianLink: 'Hor (Horus) : le feu divin et la transformation'
        },
        {
          nidalum: 'Nile-Khem',
          pronunciation: 'nile-khem',
          translation: 'L\'alchimie naturelle et la transmutation des éléments',
          egyptianLink: 'Khem : l\'alchimie et la transformation chimique'
        },
        {
          nidalum: 'Senet',
          pronunciation: 'seh-net',
          translation: 'Le chemin, la route et le voyage initiatique',
          egyptianLink: 'Senet : le jeu du chemin et du voyage spirituel'
        },
        {
          nidalum: 'Deshret',
          pronunciation: 'desh-ret',
          translation: 'Le désert rouge, l\'épreuve et la purification',
          egyptianLink: 'Deshret : le désert rouge, symbole de l\'épreuve'
        },
        {
          nidalum: 'Kemet',
          pronunciation: 'keh-met',
          translation: 'La terre noire fertile, l\'abondance et la création',
          egyptianLink: 'Kemet : l\'Égypte ancienne, la terre noire'
        },
        {
          nidalum: 'Hor-Aten',
          pronunciation: 'hor-ah-ten',
          translation: 'Le soleil levant, le renouvellement et la renaissance',
          egyptianLink: 'Aten : le disque solaire et l\'énergie créatrice'
        }
      ]
    },
    humaine: {
      title: 'Sphère Humaine et Sociale',
      description: 'Les termes concernant l\'humanité, les relations et la société',
      color: 'secondary',
      terms: [
        {
          nidalum: 'Ren-Amu',
          pronunciation: 'ren-ah-mou',
          translation: 'L\'humanité, le peuple et la communauté',
          egyptianLink: 'Amu : le peuple et la communauté humaine'
        },
        {
          nidalum: 'Ib',
          pronunciation: 'ib',
          translation: 'Le cœur, le siège de l\'intelligence et de l\'émotion',
          egyptianLink: 'Ib : le cœur, centre de l\'intelligence égyptienne'
        },
        {
          nidalum: 'Ren-Seb',
          pronunciation: 'ren-seb',
          translation: 'L\'amour, la compassion et l\'union spirituelle',
          egyptianLink: 'Seb : l\'amour et l\'union dans la tradition kémite'
        },
        {
          nidalum: 'Khenti',
          pronunciation: 'khen-tee',
          translation: 'Le chef, le guide et le leader spirituel',
          egyptianLink: 'Khenti : celui qui est à l\'avant, le guide'
        },
        {
          nidalum: 'Setem',
          pronunciation: 'seh-tem',
          translation: 'L\'écoute, la sagesse et la réceptivité',
          egyptianLink: 'Concept de l\'écoute sacrée et de la sagesse'
        },
        {
          nidalum: 'Ren-Khem',
          pronunciation: 'ren-khem',
          translation: 'L\'apprentissage, la connaissance et l\'initiation',
          egyptianLink: 'Khem : l\'alchimie du savoir et de la transformation'
        },
        {
          nidalum: 'Dja',
          pronunciation: 'djah',
          translation: 'L\'action, l\'accomplissement et la manifestation',
          egyptianLink: 'Concept de l\'action juste et de l\'accomplissement'
        },
        {
          nidalum: 'Ren-Hor-Ib',
          pronunciation: 'ren-hor-ib',
          translation: 'La volonté, le désir et l\'intention consciente',
          egyptianLink: 'Hor-Ib : la volonté divine et l\'intention'
        },
        {
          nidalum: 'Shen',
          pronunciation: 'shen',
          translation: 'L\'éternité, la protection et l\'encerclement sacré',
          egyptianLink: 'Shen : le symbole de l\'éternité et de la protection'
        },
        {
          nidalum: 'Ren-Amen',
          pronunciation: 'ren-ah-men',
          translation: 'Le secret, l\'intimité et le mystère personnel',
          egyptianLink: 'Amen : le caché et le mystère de l\'âme'
        }
      ]
    },
    temporelle: {
      title: 'Sphère Temporelle et Cyclique',
      description: 'Les termes relatifs au temps, aux cycles et à l\'éternité',
      color: 'primary',
      terms: [
        {
          nidalum: 'Ren',
          pronunciation: 'ren',
          translation: 'Le temps, le moment et l\'instant présent',
          egyptianLink: 'Ren : le nom et le temps dans la cosmologie égyptienne'
        },
        {
          nidalum: 'Heh',
          pronunciation: 'heh',
          translation: 'L\'éternité infinie et le temps sans fin',
          egyptianLink: 'Heh : l\'éternité et l\'infini dans la mythologie kémite'
        },
        {
          nidalum: 'Djet',
          pronunciation: 'djet',
          translation: 'L\'éternité statique, l\'intemporalité et la permanence',
          egyptianLink: 'Djet : l\'éternité statique et immuable'
        },
        {
          nidalum: 'Neheh',
          pronunciation: 'neh-heh',
          translation: 'L\'éternité dynamique, le cycle et la récurrence',
          egyptianLink: 'Neheh : l\'éternité cyclique et dynamique'
        },
        {
          nidalum: 'Ren-Khenti',
          pronunciation: 'ren-khen-tee',
          translation: 'Le passé, l\'héritage et la mémoire ancestrale',
          egyptianLink: 'Concept du passé comme fondation du présent'
        },
        {
          nidalum: 'Ren-Hor',
          pronunciation: 'ren-hor',
          translation: 'Le présent, l\'instant et l\'ici-maintenant',
          egyptianLink: 'Hor : le moment présent et l\'action immédiate'
        },
        {
          nidalum: 'Ren-Aten',
          pronunciation: 'ren-ah-ten',
          translation: 'Le futur, la potentialité et les possibilités',
          egyptianLink: 'Aten : l\'énergie créatrice du futur'
        },
        {
          nidalum: 'Ren-Sekem',
          pronunciation: 'ren-seh-kem',
          translation: 'Le cycle, la rotation et la transformation périodique',
          egyptianLink: 'Concept du cycle cosmique et de la régénération'
        },
        {
          nidalum: 'Ren-Khem-Hor',
          pronunciation: 'ren-khem-hor',
          translation: 'La transition, le passage et la métamorphose',
          egyptianLink: 'Concept de la transformation entre les états'
        },
        {
          nidalum: 'Ren-Ankh',
          pronunciation: 'ren-ankh',
          translation: 'La vie éternelle, l\'immortalité et la continuité',
          egyptianLink: 'Ankh : la vie éternelle et la continuité de l\'existence'
        }
      ]
    },
    artistique: {
      title: 'Sphère Artistique et Créative',
      description: 'Les termes liés à l\'art, la création et l\'expression',
      color: 'secondary',
      terms: [
        {
          nidalum: 'Ren-Shu',
          pronunciation: 'ren-shou',
          translation: 'La musique, l\'harmonie et la vibration cosmique',
          egyptianLink: 'Shu : l\'air et la vibration, base de la musique'
        },
        {
          nidalum: 'Ren-Ib-Hor',
          pronunciation: 'ren-ib-hor',
          translation: 'L\'art, l\'expression créative et la beauté',
          egyptianLink: 'Concept de la création artistique divine'
        },
        {
          nidalum: 'Ren-Setem',
          pronunciation: 'ren-seh-tem',
          translation: 'La poésie, la parole sacrée et le verbe créateur',
          egyptianLink: 'Concept du Ptah créant par la parole'
        },
        {
          nidalum: 'Ren-Khem-Sekem',
          pronunciation: 'ren-khem-seh-kem',
          translation: 'L\'alchimie créative et la transmutation artistique',
          egyptianLink: 'Khem : l\'alchimie et la transformation créative'
        },
        {
          nidalum: 'Ren-Hor-Ib-Shu',
          pronunciation: 'ren-hor-ib-shou',
          translation: 'La danse, le mouvement et l\'expression du corps',
          egyptianLink: 'Concept de la danse rituelle et sacrée'
        },
        {
          nidalum: 'Ren-Neter-Sekem',
          pronunciation: 'ren-neh-ter-seh-kem',
          translation: 'La sculpture, la forme divine et la manifestation',
          egyptianLink: 'Concept de la sculpture comme manifestation du divin'
        },
        {
          nidalum: 'Ren-Aten-Setem',
          pronunciation: 'ren-ah-ten-seh-tem',
          translation: 'L\'illumination créative et l\'inspiration divine',
          egyptianLink: 'Aten : l\'inspiration et l\'illumination créative'
        },
        {
          nidalum: 'Ren-Ankh-Sekem',
          pronunciation: 'ren-ankh-seh-kem',
          translation: 'L\'œuvre vivante, la création qui perdure',
          egyptianLink: 'Concept de l\'œuvre d\'art comme entité vivante'
        },
        {
          nidalum: 'Ren-Khenti-Setem',
          pronunciation: 'ren-khen-tee-seh-tem',
          translation: 'La transmission, l\'héritage artistique et culturel',
          egyptianLink: 'Concept de la transmission des savoirs artistiques'
        },
        {
          nidalum: 'Ren-Heka-Sekem',
          pronunciation: 'ren-heh-kah-seh-kem',
          translation: 'La magie créative, l\'enchantement et la fascination',
          egyptianLink: 'Heka : la magie créative et transformatrice'
        }
      ]
    }
  };

  // Filter terms based on search
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return lexiconData;
    }

    const filtered: LexiconData = {};
    Object.entries(lexiconData).forEach(([key, category]) => {
      const filteredTerms = category.terms.filter(term =>
        term.nidalum.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.pronunciation.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredTerms.length > 0) {
        filtered[key] = { ...category, terms: filteredTerms };
      }
    });
    return filtered;
  }, [searchTerm, lexiconData]);

  const categories = Object.entries(filteredData);
  const totalTerms = Object.values(filteredData).reduce((sum, cat) => sum + cat.terms.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] w-full overflow-hidden flex items-center justify-center pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-[120rem] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-4 sm:mb-6">
              Grand Lexique Nidalum
            </h1>
            <p className="font-heading text-lg sm:text-2xl md:text-3xl text-secondary mb-6 sm:mb-8 tracking-widest">
              Encyclopédie Complète
            </p>
            <p className="font-paragraph text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Explorez l'univers complet du Nidalum à travers {Object.values(lexiconData).reduce((sum, cat) => sum + cat.terms.length, 0)} termes organisés en {Object.keys(lexiconData).length} sphères d'influence, avec traductions, prononciations et connexions à la tradition kémite.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-12 max-w-[120rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
            <input
              type="text"
              placeholder="Rechercher un terme Nidalum..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-background border-2 border-primary/30 focus:border-primary text-foreground placeholder-foreground/50 font-paragraph text-base sm:text-lg transition-colors duration-300"
            />
          </div>
          <p className="mt-4 font-paragraph text-sm text-foreground/60 text-center">
            {totalTerms} terme{totalTerms > 1 ? 's' : ''} trouvé{totalTerms > 1 ? 's' : ''}
          </p>
        </motion.div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-12 max-w-[120rem] mx-auto">
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
          {Object.entries(lexiconData).map(([key, category]) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              onClick={() => setActiveCategory(key)}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-paragraph font-semibold transition-all duration-300 ${
                activeCategory === key
                  ? 'bg-primary text-primary-foreground border-2 border-primary'
                  : 'bg-transparent text-primary border-2 border-primary/30 hover:border-primary/60'
              }`}
            >
              {category.title.split(' ')[1]}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Lexicon Tables */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 max-w-[120rem] mx-auto">
        {categories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="font-paragraph text-lg text-foreground/60">
              Aucun terme trouvé correspondant à votre recherche.
            </p>
          </motion.div>
        ) : (
          categories.map(([key, category], categoryIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-16 sm:mb-20"
            >
              {/* Category Header */}
              <div className="mb-8 sm:mb-10">
                <h2 className={`font-heading text-3xl sm:text-4xl md:text-5xl text-${category.color} mb-3 sm:mb-4`}>
                  {category.title}
                </h2>
                <p className="font-paragraph text-base sm:text-lg text-foreground/70">
                  {category.description}
                </p>
                <div className={`h-1 w-24 bg-gradient-to-r from-${category.color} to-secondary mt-4`}></div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-primary/30">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary/10 border-b border-primary/30">
                      <th className="px-4 sm:px-6 py-4 text-left font-heading text-sm sm:text-base text-primary">
                        Mot Nidalum
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left font-heading text-sm sm:text-base text-primary">
                        Prononciation
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left font-heading text-sm sm:text-base text-primary">
                        Traduction
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left font-heading text-sm sm:text-base text-primary">
                        Lien Égyptien
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.terms.map((term, termIndex) => (
                      <motion.tr
                        key={termIndex}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: termIndex * 0.02 }}
                        viewport={{ once: true }}
                        className="border-b border-primary/20 hover:bg-primary/5 transition-colors duration-200"
                      >
                        <td className="px-4 sm:px-6 py-4 font-heading text-sm sm:text-base text-secondary">
                          {term.nidalum}
                        </td>
                        <td className="px-4 sm:px-6 py-4 font-paragraph text-sm sm:text-base text-foreground/80 italic">
                          {term.pronunciation}
                        </td>
                        <td className="px-4 sm:px-6 py-4 font-paragraph text-sm sm:text-base text-foreground/80">
                          {term.translation}
                        </td>
                        <td className="px-4 sm:px-6 py-4 font-paragraph text-sm sm:text-base text-foreground/70">
                          {term.egyptianLink}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Category Stats */}
              <div className="mt-6 sm:mt-8 flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-primary/5 border border-primary/20">
                <p className="font-paragraph text-sm sm:text-base text-foreground/70">
                  <span className="font-semibold text-primary">{category.terms.length}</span> terme{category.terms.length > 1 ? 's' : ''} dans cette sphère
                </p>
                <BookOpen className="w-5 h-5 text-primary/60" />
              </div>
            </motion.div>
          ))
        )}
      </section>

      {/* Lexicon Living Note */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 p-8 sm:p-10 md:p-12"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary mb-6 sm:mb-8">
              Le Nidalum : Un Lexique Vivant
            </h2>

            <div className="space-y-6 sm:space-y-8">
              <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
                Le Grand Lexique Nidalum n'est pas une simple collection statique de mots. C'est un système vivant, en constante évolution, qui reflète la nature dynamique de l'univers Souma-Ra lui-même. Chaque terme est une vibration, une fréquence énergétique qui résonne avec les forces cosmiques.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="border-l-4 border-secondary pl-6 sm:pl-8">
                  <h3 className="font-heading text-xl sm:text-2xl text-secondary mb-4">
                    Évolution Permanente
                  </h3>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    Le Nidalum se développe continuellement. De nouveaux termes émergent à mesure que la compréhension de l'univers Souma-Ra s'approfondit. Chaque utilisateur du langage contribue à son enrichissement, créant un lexique qui grandit avec la conscience collective.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-6 sm:pl-8">
                  <h3 className="font-heading text-xl sm:text-2xl text-primary mb-4">
                    Connexion Kémite
                  </h3>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    Chaque terme Nidalum entretient une connexion profonde avec la sagesse kémite ancienne. Ces liens ne sont pas arbitraires, mais reflètent une compréhension commune des forces cosmiques, transcendant les frontières temporelles et culturelles.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="border-l-4 border-primary pl-6 sm:pl-8">
                  <h3 className="font-heading text-xl sm:text-2xl text-primary mb-4">
                    Polysémie Intentionnelle
                  </h3>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    Un terme Nidalum opère rarement sur un seul niveau de réalité. La polysémie est intentionnelle, permettant à chaque mot de fonctionner simultanément sur les plans physique, émotionnel, mental et spirituel. C'est la richesse du langage sacré.
                  </p>
                </div>

                <div className="border-l-4 border-secondary pl-6 sm:pl-8">
                  <h3 className="font-heading text-xl sm:text-2xl text-secondary mb-4">
                    Pratique et Transformation
                  </h3>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    L'étude du Nidalum n'est pas purement académique. C'est une pratique transformatrice. En prononçant ces termes, en les intégrant dans votre conscience, vous activez les fréquences qu'ils représentent, catalysant votre propre évolution spirituelle.
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 sm:p-8 mt-8">
                <h3 className="font-heading text-xl sm:text-2xl text-primary mb-4">
                  Les Six Sphères d'Influence
                </h3>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-6">
                  Le lexique est organisé en six sphères d'influence, chacune représentant un domaine de la réalité cosmique :
                </p>
                <ul className="space-y-3 font-paragraph text-base text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">1.</span>
                    <span><strong>Sphère Cosmique :</strong> Les forces fondamentales de l'univers Souma-Ra</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">2.</span>
                    <span><strong>Sphère Spirituelle :</strong> L'initiation, la transformation et la sagesse</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">3.</span>
                    <span><strong>Sphère Naturelle :</strong> Les éléments et les forces de la nature</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">4.</span>
                    <span><strong>Sphère Humaine :</strong> L'humanité, les relations et la société</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">5.</span>
                    <span><strong>Sphère Temporelle :</strong> Le temps, les cycles et l'éternité</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">6.</span>
                    <span><strong>Sphère Artistique :</strong> La création, l'art et l'expression</span>
                  </li>
                </ul>
              </div>

              <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed italic border-l-4 border-secondary pl-6 sm:pl-8">
                "Le Nidalum n'est pas simplement une langue à apprendre, c'est un univers à explorer, une vibration à incarner, et un chemin de transformation à parcourir. Chaque terme est une porte vers une compréhension plus profonde de soi-même et du cosmos." — Ramses Nidal
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 sm:mb-6">
              Approfondissez Votre Connaissance
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-foreground/70 mb-8 sm:mb-12 leading-relaxed px-2">
              Explorez les autres ressources pour enrichir votre compréhension du Nidalum et de l'univers Souma-Ra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-2">
              <Link
                to="/alphabet"
                className="bg-primary text-primary-foreground font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-primary/90 transition-all duration-300 text-center"
              >
                Alphabet Nidalum
              </Link>
              <Link
                to="/academy"
                className="bg-transparent text-secondary border-2 border-secondary font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-secondary/10 transition-all duration-300 text-center"
              >
                Académie Nidalum
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
