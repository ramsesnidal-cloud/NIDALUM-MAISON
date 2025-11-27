import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Copy, Check, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  generateNidalumWord, 
  generateDefinition, 
  generateExampleSentence, 
  generateEtymology,
  generatePronunciationGuide,
  CATEGORIES,
  THEMES 
} from '@/lib/nidalum-generator';

interface GeneratedWord {
  nidalumWord: string;
  definition: string;
  category: string;
  theme: string;
  exampleSentence: string;
  etymology: string;
  pronunciationGuide: string;
  timestamp: Date;
}

const OFFICIAL_PROMPT = `Générateur Linguistique Officiel du Nidalum Universe Institute

OBJECTIF:
Générer des mots Nidalum authentiques selon les règles phonétiques et sémantiques établies par l'Institut Nidalum Universe.

RÈGLES DE GÉNÉRATION:

1. STRUCTURE PHONÉTIQUE:
   - Consonnes autorisées: k, n, d, r, s, t, l, m, sh, th, ph
   - Voyelles autorisées: a, e, i, o, u, ā, ē, ī, ō, ū
   - Longueur: 2-4 syllabes (structure CV ou CVC)
   - Suffixes optionnels: -um, -an, -en, -tō, -sha, -ra, -shi, -ren, -tē

2. CATÉGORIES SÉMANTIQUES:
   - Cosmologie: Aspects de l'univers cosmique
   - Spiritualité: Connexions avec le divin
   - Nature: Éléments naturels sacrés
   - Émotion: États de l'âme
   - Action: Actes de transformation
   - Objet: Artefacts sacrés
   - Concept: Idées universelles
   - Rituel: Cérémonies sacrées

3. THÈMES UNIVERSELS:
   - Souma-Ra: Énergie primordiale
   - Divinité: Essence divine
   - Transformation: Changement et évolution
   - Sagesse: Connaissance ancestrale
   - Harmonie: Équilibre cosmique
   - Mystère: Secrets de l'univers
   - Énergie: Force vitale
   - Connexion: Liens sacrés

4. FORMAT DE SORTIE:
   {
     "nidalumWord": "mot généré",
     "definition": "définition contextuelle",
     "category": "catégorie sémantique",
     "theme": "thème universel",
     "exampleSentence": "exemple d'utilisation",
     "etymology": "origine et évolution",
     "pronunciationGuide": "guide de prononciation"
   }

5. RÈGLES DE COHÉRENCE:
   - Chaque mot doit avoir une définition unique et contextuelle
   - Les exemples doivent respecter la structure grammaticale Nidalum
   - L'étymologie doit être liée au thème choisi
   - La prononciation doit être phonétiquement cohérente

UTILISATION:
Sélectionnez une catégorie et un thème, puis cliquez sur "Générer" pour créer un nouveau mot Nidalum authentique.`;

const EXPORT_TEMPLATE = `RAPPORT DE GÉNÉRATION NIDALUM
Généré par: Nidalum Universe Institute Generator
Date: {date}

MOT GÉNÉRÉ:
Nidalum: {word}
Prononciation: {pronunciation}

INFORMATIONS SÉMANTIQUES:
Catégorie: {category}
Thème: {theme}
Définition: {definition}

CONTEXTE D'UTILISATION:
Exemple: {example}
Étymologie: {etymology}

---`;

export default function OfficialNidalumGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [generatedWords, setGeneratedWords] = useState<GeneratedWord[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showPrompt, setShowPrompt] = useState(true);
  const [customWord, setCustomWord] = useState('');

  const CATEGORIES_LIST = ['Cosmologie', 'Spiritualité', 'Nature', 'Émotion', 'Action', 'Objet', 'Concept', 'Rituel'];
  const THEMES_LIST = ['Souma-Ra', 'Divinité', 'Transformation', 'Sagesse', 'Harmonie', 'Mystère', 'Énergie', 'Connexion'];

  const generateWord = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const word = generateNidalumWord();
      const category = selectedCategory || CATEGORIES_LIST[Math.floor(Math.random() * CATEGORIES_LIST.length)];
      const theme = selectedTheme || THEMES_LIST[Math.floor(Math.random() * THEMES_LIST.length)];

      const newWord: GeneratedWord = {
        nidalumWord: word,
        definition: generateDefinition(word, category),
        category,
        theme,
        exampleSentence: generateExampleSentence(word),
        etymology: generateEtymology(word, theme),
        pronunciationGuide: generatePronunciationGuide(word),
        timestamp: new Date()
      };

      setGeneratedWords([newWord, ...generatedWords]);
      setIsGenerating(false);
    }, 600);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const exportWord = (word: GeneratedWord) => {
    const exported = EXPORT_TEMPLATE
      .replace('{date}', new Date().toLocaleString('fr-FR'))
      .replace('{word}', word.nidalumWord)
      .replace('{pronunciation}', word.pronunciationGuide)
      .replace('{category}', word.category)
      .replace('{theme}', word.theme)
      .replace('{definition}', word.definition)
      .replace('{example}', word.exampleSentence)
      .replace('{etymology}', word.etymology);

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(exported));
    element.setAttribute('download', `nidalum-${word.nidalumWord}-${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearHistory = () => {
    setGeneratedWords([]);
  };

  return (
    <div className="space-y-12">
      {/* Official Prompt Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-2 border-primary/40 p-10 bg-gradient-to-br from-dark-amber-shadow/20 to-background"
      >
        <button
          onClick={() => setShowPrompt(!showPrompt)}
          className="w-full flex items-center justify-between mb-6 group"
        >
          <h3 className="font-heading text-3xl text-primary group-hover:text-secondary transition-colors">
            📋 Prompt Officiel du Générateur
          </h3>
          <div className={`transform transition-transform ${showPrompt ? 'rotate-180' : ''}`}>
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </button>

        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            <div className="bg-background/70 p-8 border-l-4 border-primary rounded">
              <pre className="font-paragraph text-sm text-foreground/90 whitespace-pre-wrap break-words leading-relaxed max-h-96 overflow-y-auto">
                {OFFICIAL_PROMPT}
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background/70 p-6 border-2 border-primary/30 rounded">
                <h4 className="font-heading text-xl text-primary mb-4">Catégories Disponibles</h4>
                <div className="space-y-2">
                  {CATEGORIES_LIST.map((cat) => (
                    <div key={cat} className="font-paragraph text-sm text-foreground/85 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background/70 p-6 border-2 border-secondary/30 rounded">
                <h4 className="font-heading text-xl text-secondary mb-4">Thèmes Universels</h4>
                <div className="space-y-2">
                  {THEMES_LIST.map((theme) => (
                    <div key={theme} className="font-paragraph text-sm text-foreground/85 flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      {theme}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Generator Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="border-2 border-secondary/40 p-10 bg-gradient-to-br from-dark-amber-shadow/10 to-background"
      >
        <h3 className="font-heading text-3xl text-secondary mb-8">⚡ Générateur Interactif</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Category Selection */}
          <div>
            <label className="font-paragraph text-base font-semibold text-foreground mb-3 block">
              Catégorie Sémantique
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-background border-2 border-secondary/40 text-foreground font-paragraph p-4 focus:outline-none focus:border-secondary text-base rounded"
            >
              <option value="">Aléatoire</option>
              {CATEGORIES_LIST.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Selection */}
          <div>
            <label className="font-paragraph text-base font-semibold text-foreground mb-3 block">
              Thème Universel
            </label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-full bg-background border-2 border-secondary/40 text-foreground font-paragraph p-4 focus:outline-none focus:border-secondary text-base rounded"
            >
              <option value="">Aléatoire</option>
              {THEMES_LIST.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={generateWord}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-paragraph font-semibold px-6 py-4 text-base"
          >
            <Wand2 className="w-5 h-5" />
            {isGenerating ? 'Génération en cours...' : 'Générer un Mot'}
          </Button>

          {generatedWords.length > 0 && (
            <Button
              onClick={clearHistory}
              className="flex items-center justify-center gap-2 bg-primary/20 border-2 border-primary text-primary hover:bg-primary/30 font-paragraph font-semibold px-6 py-4 text-base"
            >
              <RefreshCw className="w-5 h-5" />
              Réinitialiser
            </Button>
          )}
        </div>
      </motion.div>

      {/* Generated Words Display */}
      {generatedWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-3xl text-primary">
              📚 Mots Générés ({generatedWords.length})
            </h3>
            <p className="font-paragraph text-sm text-foreground/70">
              Dernière génération: {generatedWords[0].timestamp.toLocaleTimeString('fr-FR')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {generatedWords.map((word, index) => (
              <motion.div
                key={`${word.nidalumWord}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border-2 border-primary/40 p-8 bg-gradient-to-br from-dark-amber-shadow/15 to-background hover:border-primary/70 transition-all duration-300 group"
              >
                {/* Word Header */}
                <div className="mb-6 pb-6 border-b-2 border-primary/20">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-heading text-5xl text-primary group-hover:text-secondary transition-colors">
                      {word.nidalumWord}
                    </h4>
                    <button
                      onClick={() => copyToClipboard(word.nidalumWord, index)}
                      className="p-2 hover:bg-primary/20 rounded transition-colors"
                      title="Copier le mot"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-5 h-5 text-secondary" />
                      ) : (
                        <Copy className="w-5 h-5 text-primary" />
                      )}
                    </button>
                  </div>
                  <p className="font-paragraph text-base text-foreground/70">
                    Prononciation: <span className="text-secondary font-semibold">{word.pronunciationGuide}</span>
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-5">
                  {/* Definition */}
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-2 font-semibold uppercase tracking-wide">
                      Définition
                    </p>
                    <p className="font-paragraph text-base text-foreground/90">
                      {word.definition}
                    </p>
                  </div>

                  {/* Category & Theme */}
                  <div className="grid grid-cols-2 gap-4 py-4 bg-background/50 px-4 rounded border-l-4 border-primary/40">
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-1 font-semibold">CATÉGORIE</p>
                      <p className="font-paragraph text-sm text-primary font-semibold">{word.category}</p>
                    </div>
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-1 font-semibold">THÈME</p>
                      <p className="font-paragraph text-sm text-secondary font-semibold">{word.theme}</p>
                    </div>
                  </div>

                  {/* Example */}
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-2 font-semibold uppercase tracking-wide">
                      Exemple d'Utilisation
                    </p>
                    <p className="font-paragraph text-base text-foreground/85 italic bg-dark-amber-shadow/30 p-3 border-l-4 border-secondary rounded">
                      {word.exampleSentence}
                    </p>
                  </div>

                  {/* Etymology */}
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-2 font-semibold uppercase tracking-wide">
                      Étymologie
                    </p>
                    <p className="font-paragraph text-base text-foreground/85">
                      {word.etymology}
                    </p>
                  </div>

                  {/* Export Button */}
                  <div className="pt-4 border-t border-primary/20">
                    <Button
                      onClick={() => exportWord(word)}
                      className="w-full flex items-center justify-center gap-2 bg-primary/20 border-2 border-primary text-primary hover:bg-primary/30 font-paragraph font-semibold px-4 py-3 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Exporter en TXT
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {generatedWords.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center py-16 border-2 border-dashed border-primary/30 rounded-lg bg-background/50"
        >
          <Wand2 className="w-16 h-16 text-primary/40 mx-auto mb-4" />
          <p className="font-paragraph text-xl text-foreground/70 mb-2">
            Aucun mot généré pour le moment
          </p>
          <p className="font-paragraph text-base text-foreground/50">
            Sélectionnez une catégorie et un thème, puis cliquez sur "Générer un Mot"
          </p>
        </motion.div>
      )}
    </div>
  );
}
