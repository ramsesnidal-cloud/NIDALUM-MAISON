import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BookOpen, Layers, Link2, Zap, ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';

export default function GrammarPage() {
  const { t } = useTranslation();
  const [expandedRule, setExpandedRule] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rules' | 'verbs' | 'cases' | 'sentences'>('all');

  const grammarRules = [
    {
      icon: Layers,
      titleKey: 'pages.grammar.sentenceStructure',
      descriptionKey: 'pages.grammar.sentenceStructureDesc',
      exampleKey: 'pages.grammar.sentenceExample',
      color: 'primary',
      category: 'rules'
    },
    {
      icon: Link2,
      titleKey: 'pages.grammar.caseSystem',
      descriptionKey: 'pages.grammar.caseSystemDesc',
      exampleKey: 'pages.grammar.caseExample',
      color: 'secondary',
      category: 'cases'
    },
    {
      icon: Zap,
      titleKey: 'pages.grammar.temporalConjugation',
      descriptionKey: 'pages.grammar.temporalConjugationDesc',
      exampleKey: 'pages.grammar.temporalExample',
      color: 'primary',
      category: 'verbs'
    },
    {
      icon: BookOpen,
      titleKey: 'pages.grammar.spiritualModifiers',
      descriptionKey: 'pages.grammar.spiritualModifiersDesc',
      exampleKey: 'pages.grammar.spiritualExample',
      color: 'secondary',
      category: 'rules'
    }
  ];

  const verbConjugation = [
    { tenseKey: 'pages.grammar.eternalPresent', suffix: '-∅', exampleKey: 'pages.grammar.eternalPresent' },
    { tenseKey: 'pages.grammar.ancestralPast', suffix: '-shi', exampleKey: 'pages.grammar.ancestralPast' },
    { tenseKey: 'pages.grammar.cosmicFuture', suffix: '-ren', exampleKey: 'pages.grammar.cosmicFuture' },
    { tenseKey: 'pages.grammar.sacredImperative', suffix: '-tē', exampleKey: 'pages.grammar.sacredImperative' },
  ];

  const cases = [
    { nameKey: 'pages.grammar.nominative', marker: '-∅', usageKey: 'pages.grammar.nominativeUsage', exampleKey: 'pages.grammar.nominativeExample' },
    { nameKey: 'pages.grammar.accusative', marker: '-an', usageKey: 'pages.grammar.accusativeUsage', exampleKey: 'pages.grammar.accusativeExample' },
    { nameKey: 'pages.grammar.genitive', marker: '-um', usageKey: 'pages.grammar.genitiveUsage', exampleKey: 'pages.grammar.genitiveExample' },
    { nameKey: 'pages.grammar.locative', marker: '-en', usageKey: 'pages.grammar.locativeUsage', exampleKey: 'pages.grammar.locativeExample' },
  ];

  const filteredRules = grammarRules.filter(rule => {
    const ruleTitle = t(rule.titleKey).toLowerCase();
    const ruleDesc = t(rule.descriptionKey).toLowerCase();
    const matchesSearch = ruleTitle.includes(searchTerm.toLowerCase()) ||
                         ruleDesc.includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || rule.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-6">
              {t('pages.grammar.title')}
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              {t('pages.grammar.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-background/50 border border-primary/20 p-8 backdrop-blur-sm"
          >
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={t('common.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 bg-background border-primary/20 text-foreground font-paragraph h-12"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {(['all', 'rules', 'verbs', 'cases', 'sentences'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm font-paragraph transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground border border-primary'
                      : 'bg-background border border-primary/20 text-foreground/70 hover:border-primary/50'
                  }`}
                >
                  {cat === 'all' && t('pages.grammar.allRules')}
                  {cat === 'rules' && t('pages.grammar.rules')}
                  {cat === 'verbs' && t('pages.grammar.verbs')}
                  {cat === 'cases' && t('pages.grammar.cases')}
                  {cat === 'sentences' && t('pages.grammar.sentences')}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grammar Rules Section */}
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
              Règles Fondamentales
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredRules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setExpandedRule(expandedRule === index ? null : index)}
                className="border border-primary/20 p-8 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <rule.icon className={`w-12 h-12 text-${rule.color} flex-shrink-0`} />
                  <ChevronDown className={`w-5 h-5 text-primary transition-transform ${expandedRule === index ? 'rotate-180' : ''}`} />
                </div>
                <h3 className="font-heading text-2xl text-primary mb-4 group-hover:text-secondary transition-colors">{t(rule.titleKey)}</h3>
                
                {expandedRule === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <p className="font-paragraph text-foreground/70 leading-relaxed">
                      {t(rule.descriptionKey)}
                    </p>
                    <div className="bg-dark-amber-shadow/20 border-l-4 border-secondary p-4">
                      <p className="font-paragraph text-sm text-foreground/60 mb-1">{t('common.search')}:</p>
                      <p className="font-paragraph text-secondary italic">{t(rule.exampleKey)}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredRules.length === 0 && (
            <div className="text-center py-12">
              <p className="font-paragraph text-xl text-foreground/70">Aucune règle trouvée</p>
              <p className="font-paragraph text-sm text-foreground/50 mt-2">
                Essayez de modifier votre recherche
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Verb Conjugation Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              Conjugaison des Verbes
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  Les verbes en Nidalum se conjuguent par l'ajout de suffixes temporels. Le radical du verbe reste inchangé, symbolisant l'essence éternelle de l'action.
                </p>
                <div className="bg-background/50 border border-primary/20 p-6 backdrop-blur-sm">
                  <h3 className="font-heading text-xl text-secondary mb-4">Verbe Modèle: Kēla (Voir)</h3>
                  <div className="space-y-3">
                    {verbConjugation.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-primary/10 pb-2">
                        <span className="font-paragraph text-foreground/70">{t(item.tenseKey)}</span>
                        <div className="text-right">
                          <span className="font-paragraph text-sm text-foreground/50 mr-2">{item.suffix}</span>
                          <span className="font-paragraph text-primary">{t(item.exampleKey)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-8">
                <h3 className="font-heading text-2xl text-primary mb-6">Temps Spirituels</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-heading text-lg text-secondary mb-2">{t('pages.grammar.ancestralPast')}</h4>
                    <p className="font-paragraph text-sm text-foreground/70">
                      Évoque les actions des ancêtres et les événements mythologiques
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-heading text-lg text-primary mb-2">{t('pages.grammar.eternalPresent')}</h4>
                    <p className="font-paragraph text-sm text-foreground/70">
                      Décrit les vérités cosmiques et les actions continues
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-heading text-lg text-secondary mb-2">{t('pages.grammar.cosmicFuture')}</h4>
                    <p className="font-paragraph text-sm text-foreground/70">
                      Projette vers les destinées futures et les prophéties
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case System Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              Système de Cas
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-primary/20">
                <thead className="bg-primary/10">
                  <tr>
                    <th className="font-heading text-lg text-primary p-4 text-left border-b border-primary/20">Cas</th>
                    <th className="font-heading text-lg text-primary p-4 text-left border-b border-primary/20">Marqueur</th>
                    <th className="font-heading text-lg text-primary p-4 text-left border-b border-primary/20">Usage</th>
                    <th className="font-heading text-lg text-primary p-4 text-left border-b border-primary/20">Exemple</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((caseItem, index) => (
                    <tr key={index} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                      <td className="font-paragraph text-foreground/80 p-4">{t(caseItem.nameKey)}</td>
                      <td className="font-paragraph text-secondary p-4">{caseItem.marker}</td>
                      <td className="font-paragraph text-foreground/70 p-4">{t(caseItem.usageKey)}</td>
                      <td className="font-paragraph text-primary italic p-4">{t(caseItem.exampleKey)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sentence Structure Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-background to-dark-amber-shadow/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              Construction des Phrases
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-6">Phrase Simple</h3>
                <div className="space-y-4">
                  <div className="bg-dark-amber-shadow/20 p-4 border-l-4 border-primary">
                    <p className="font-paragraph text-sm text-foreground/60 mb-2">Structure: S-O-V</p>
                    <p className="font-paragraph text-lg text-primary mb-2">Nidar souma-ra-an kēla</p>
                    <p className="font-paragraph text-sm text-foreground/70 italic">Nidar le-monde voit</p>
                    <p className="font-paragraph text-sm text-secondary mt-2">"Nidar voit le monde"</p>
                  </div>
                </div>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-6">Phrase Complexe</h3>
                <div className="space-y-4">
                  <div className="bg-dark-amber-shadow/20 p-4 border-l-4 border-secondary">
                    <p className="font-paragraph text-sm text-foreground/60 mb-2">Avec modificateurs</p>
                    <p className="font-paragraph text-lg text-primary mb-2">Nidar-tō souma-ra-sha-an kēla-ren</p>
                    <p className="font-paragraph text-sm text-foreground/70 italic">Nidar-sacré monde-mystique verra-futur</p>
                    <p className="font-paragraph text-sm text-secondary mt-2">"Le Nidar sacré verra le monde mystique"</p>
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
