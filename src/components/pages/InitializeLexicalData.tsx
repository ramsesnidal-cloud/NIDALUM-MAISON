import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { NidalumApprendrelaLangue } from '@/entities';

const NIDALUM_WORDS_DATA = [
  // SACRÉ (Sacred)
  {
    nidalumWord: 'Aum',
    definition: 'Son primordial de l\'univers',
    traduction_fr: 'Son primordial',
    category: 'Sacré',
    phonetic: 'aum',
    root: 'au',
    french: 'Son primordial',
    english: 'Primordial sound',
    german: 'Urklang',
  },
  {
    nidalumWord: 'Nidal',
    definition: 'Essence divine',
    traduction_fr: 'Essence divine',
    category: 'Sacré',
    phonetic: 'ni-dal',
    root: 'nid',
    french: 'Essence divine',
    english: 'Divine essence',
    german: 'Göttliche Essenz',
  },
  {
    nidalumWord: 'Lumina',
    definition: 'Lumière sacrée',
    traduction_fr: 'Lumière sacrée',
    category: 'Sacré',
    phonetic: 'lu-mi-na',
    root: 'lum',
    french: 'Lumière sacrée',
    english: 'Sacred light',
    german: 'Heiliges Licht',
  },
  {
    nidalumWord: 'Spiritus',
    definition: 'Esprit éternel',
    traduction_fr: 'Esprit éternel',
    category: 'Sacré',
    phonetic: 'spi-ri-tus',
    root: 'spir',
    french: 'Esprit éternel',
    english: 'Eternal spirit',
    german: 'Ewiger Geist',
  },
  {
    nidalumWord: 'Divina',
    definition: 'Divinité',
    traduction_fr: 'Divinité',
    category: 'Sacré',
    phonetic: 'di-vi-na',
    root: 'div',
    french: 'Divinité',
    english: 'Divinity',
    german: 'Göttlichkeit',
  },
  {
    nidalumWord: 'Sanctum',
    definition: 'Lieu sacré',
    traduction_fr: 'Lieu sacré',
    category: 'Sacré',
    phonetic: 'sanc-tum',
    root: 'sanc',
    french: 'Lieu sacré',
    english: 'Sacred place',
    german: 'Heiliger Ort',
  },
  {
    nidalumWord: 'Celestis',
    definition: 'Céleste',
    traduction_fr: 'Céleste',
    category: 'Sacré',
    phonetic: 'ce-les-tis',
    root: 'cel',
    french: 'Céleste',
    english: 'Celestial',
    german: 'Himmlisch',
  },
  {
    nidalumWord: 'Eternum',
    definition: 'Éternité',
    traduction_fr: 'Éternité',
    category: 'Sacré',
    phonetic: 'e-ter-num',
    root: 'eter',
    french: 'Éternité',
    english: 'Eternity',
    german: 'Ewigkeit',
  },
  {
    nidalumWord: 'Benedictus',
    definition: 'Béni',
    traduction_fr: 'Béni',
    category: 'Sacré',
    phonetic: 'be-ne-dic-tus',
    root: 'bene',
    french: 'Béni',
    english: 'Blessed',
    german: 'Gesegnet',
  },
  {
    nidalumWord: 'Sacra',
    definition: 'Sacré',
    traduction_fr: 'Sacré',
    category: 'Sacré',
    phonetic: 'sa-cra',
    root: 'sac',
    french: 'Sacré',
    english: 'Sacred',
    german: 'Heilig',
  },
  {
    nidalumWord: 'Mysteria',
    definition: 'Mystère',
    traduction_fr: 'Mystère',
    category: 'Sacré',
    phonetic: 'mys-te-ria',
    root: 'myst',
    french: 'Mystère',
    english: 'Mystery',
    german: 'Geheimnis',
  },
  {
    nidalumWord: 'Transcendus',
    definition: 'Transcendant',
    traduction_fr: 'Transcendant',
    category: 'Sacré',
    phonetic: 'tran-scen-dus',
    root: 'trans',
    french: 'Transcendant',
    english: 'Transcendent',
    german: 'Transzendent',
  },

  // ÉLÉMENTS (Elements)
  {
    nidalumWord: 'Ignis',
    definition: 'Feu',
    traduction_fr: 'Feu',
    category: 'Éléments',
    phonetic: 'ig-nis',
    root: 'ign',
    french: 'Feu',
    english: 'Fire',
    german: 'Feuer',
  },
  {
    nidalumWord: 'Aqua',
    definition: 'Eau',
    traduction_fr: 'Eau',
    category: 'Éléments',
    phonetic: 'a-qua',
    root: 'aq',
    french: 'Eau',
    english: 'Water',
    german: 'Wasser',
  },
  {
    nidalumWord: 'Terra',
    definition: 'Terre',
    traduction_fr: 'Terre',
    category: 'Éléments',
    phonetic: 'ter-ra',
    root: 'ter',
    french: 'Terre',
    english: 'Earth',
    german: 'Erde',
  },
  {
    nidalumWord: 'Aether',
    definition: 'Éther/Air',
    traduction_fr: 'Éther',
    category: 'Éléments',
    phonetic: 'ae-ther',
    root: 'aeth',
    french: 'Éther',
    english: 'Ether',
    german: 'Äther',
  },
  {
    nidalumWord: 'Ventus',
    definition: 'Vent',
    traduction_fr: 'Vent',
    category: 'Éléments',
    phonetic: 'ven-tus',
    root: 'vent',
    french: 'Vent',
    english: 'Wind',
    german: 'Wind',
  },
  {
    nidalumWord: 'Flamma',
    definition: 'Flamme',
    traduction_fr: 'Flamme',
    category: 'Éléments',
    phonetic: 'flam-ma',
    root: 'flam',
    french: 'Flamme',
    english: 'Flame',
    german: 'Flamme',
  },
  {
    nidalumWord: 'Unda',
    definition: 'Onde/Vague',
    traduction_fr: 'Onde',
    category: 'Éléments',
    phonetic: 'un-da',
    root: 'und',
    french: 'Onde',
    english: 'Wave',
    german: 'Welle',
  },
  {
    nidalumWord: 'Petra',
    definition: 'Pierre',
    traduction_fr: 'Pierre',
    category: 'Éléments',
    phonetic: 'pe-tra',
    root: 'pet',
    french: 'Pierre',
    english: 'Stone',
    german: 'Stein',
  },
  {
    nidalumWord: 'Fulgor',
    definition: 'Éclair',
    traduction_fr: 'Éclair',
    category: 'Éléments',
    phonetic: 'ful-gor',
    root: 'fulg',
    french: 'Éclair',
    english: 'Lightning',
    german: 'Blitz',
  },
  {
    nidalumWord: 'Tempestas',
    definition: 'Tempête',
    traduction_fr: 'Tempête',
    category: 'Éléments',
    phonetic: 'tem-pes-tas',
    root: 'temp',
    french: 'Tempête',
    english: 'Storm',
    german: 'Sturm',
  },
  {
    nidalumWord: 'Glacies',
    definition: 'Glace',
    traduction_fr: 'Glace',
    category: 'Éléments',
    phonetic: 'gla-cies',
    root: 'glac',
    french: 'Glace',
    english: 'Ice',
    german: 'Eis',
  },
  {
    nidalumWord: 'Nebula',
    definition: 'Brume',
    traduction_fr: 'Brume',
    category: 'Éléments',
    phonetic: 'ne-bu-la',
    root: 'neb',
    french: 'Brume',
    english: 'Mist',
    german: 'Nebel',
  },

  // HUMAIN (Human)
  {
    nidalumWord: 'Homo',
    definition: 'Humain',
    traduction_fr: 'Humain',
    category: 'Humain',
    phonetic: 'ho-mo',
    root: 'hom',
    french: 'Humain',
    english: 'Human',
    german: 'Mensch',
  },
  {
    nidalumWord: 'Anima',
    definition: 'Âme',
    traduction_fr: 'Âme',
    category: 'Humain',
    phonetic: 'a-ni-ma',
    root: 'anim',
    french: 'Âme',
    english: 'Soul',
    german: 'Seele',
  },
  {
    nidalumWord: 'Corpus',
    definition: 'Corps',
    traduction_fr: 'Corps',
    category: 'Humain',
    phonetic: 'cor-pus',
    root: 'corp',
    french: 'Corps',
    english: 'Body',
    german: 'Körper',
  },
  {
    nidalumWord: 'Mens',
    definition: 'Esprit',
    traduction_fr: 'Esprit',
    category: 'Humain',
    phonetic: 'mens',
    root: 'men',
    french: 'Esprit',
    english: 'Mind',
    german: 'Geist',
  },
  {
    nidalumWord: 'Cor',
    definition: 'Cœur',
    traduction_fr: 'Cœur',
    category: 'Humain',
    phonetic: 'cor',
    root: 'cor',
    french: 'Cœur',
    english: 'Heart',
    german: 'Herz',
  },
  {
    nidalumWord: 'Vita',
    definition: 'Vie',
    traduction_fr: 'Vie',
    category: 'Humain',
    phonetic: 'vi-ta',
    root: 'vit',
    french: 'Vie',
    english: 'Life',
    german: 'Leben',
  },
  {
    nidalumWord: 'Mors',
    definition: 'Mort',
    traduction_fr: 'Mort',
    category: 'Humain',
    phonetic: 'mors',
    root: 'mor',
    french: 'Mort',
    english: 'Death',
    german: 'Tod',
  },
  {
    nidalumWord: 'Amor',
    definition: 'Amour',
    traduction_fr: 'Amour',
    category: 'Humain',
    phonetic: 'a-mor',
    root: 'amor',
    french: 'Amour',
    english: 'Love',
    german: 'Liebe',
  },
  {
    nidalumWord: 'Sapientia',
    definition: 'Sagesse',
    traduction_fr: 'Sagesse',
    category: 'Humain',
    phonetic: 'sa-pi-en-tia',
    root: 'sap',
    french: 'Sagesse',
    english: 'Wisdom',
    german: 'Weisheit',
  },
  {
    nidalumWord: 'Virtus',
    definition: 'Vertu',
    traduction_fr: 'Vertu',
    category: 'Humain',
    phonetic: 'vir-tus',
    root: 'virt',
    french: 'Vertu',
    english: 'Virtue',
    german: 'Tugend',
  },
  {
    nidalumWord: 'Pax',
    definition: 'Paix',
    traduction_fr: 'Paix',
    category: 'Humain',
    phonetic: 'pax',
    root: 'pax',
    french: 'Paix',
    english: 'Peace',
    german: 'Frieden',
  },
  {
    nidalumWord: 'Libertas',
    definition: 'Liberté',
    traduction_fr: 'Liberté',
    category: 'Humain',
    phonetic: 'li-ber-tas',
    root: 'liber',
    french: 'Liberté',
    english: 'Freedom',
    german: 'Freiheit',
  },

  // PROTECTION (Protection)
  {
    nidalumWord: 'Tutela',
    definition: 'Protection',
    traduction_fr: 'Protection',
    category: 'Protection',
    phonetic: 'tu-te-la',
    root: 'tut',
    french: 'Protection',
    english: 'Protection',
    german: 'Schutz',
  },
  {
    nidalumWord: 'Scutum',
    definition: 'Bouclier',
    traduction_fr: 'Bouclier',
    category: 'Protection',
    phonetic: 'scu-tum',
    root: 'scut',
    french: 'Bouclier',
    english: 'Shield',
    german: 'Schild',
  },
  {
    nidalumWord: 'Defensio',
    definition: 'Défense',
    traduction_fr: 'Défense',
    category: 'Protection',
    phonetic: 'de-fen-sio',
    root: 'def',
    french: 'Défense',
    english: 'Defense',
    german: 'Verteidigung',
  },
  {
    nidalumWord: 'Arma',
    definition: 'Arme',
    traduction_fr: 'Arme',
    category: 'Protection',
    phonetic: 'ar-ma',
    root: 'arm',
    french: 'Arme',
    english: 'Weapon',
    german: 'Waffe',
  },
  {
    nidalumWord: 'Fortis',
    definition: 'Fort',
    traduction_fr: 'Fort',
    category: 'Protection',
    phonetic: 'for-tis',
    root: 'fort',
    french: 'Fort',
    english: 'Strong',
    german: 'Stark',
  },
  {
    nidalumWord: 'Vigil',
    definition: 'Vigilant',
    traduction_fr: 'Vigilant',
    category: 'Protection',
    phonetic: 'vi-gil',
    root: 'vig',
    french: 'Vigilant',
    english: 'Vigilant',
    german: 'Wachsam',
  },
  {
    nidalumWord: 'Custodia',
    definition: 'Garde',
    traduction_fr: 'Garde',
    category: 'Protection',
    phonetic: 'cus-to-dia',
    root: 'cust',
    french: 'Garde',
    english: 'Guard',
    german: 'Wache',
  },
  {
    nidalumWord: 'Refugium',
    definition: 'Refuge',
    traduction_fr: 'Refuge',
    category: 'Protection',
    phonetic: 're-fu-gium',
    root: 'ref',
    french: 'Refuge',
    english: 'Refuge',
    german: 'Zuflucht',
  },
  {
    nidalumWord: 'Munitio',
    definition: 'Fortification',
    traduction_fr: 'Fortification',
    category: 'Protection',
    phonetic: 'mu-ni-tio',
    root: 'mun',
    french: 'Fortification',
    english: 'Fortification',
    german: 'Befestigung',
  },
  {
    nidalumWord: 'Praesidium',
    definition: 'Garnison',
    traduction_fr: 'Garnison',
    category: 'Protection',
    phonetic: 'prae-si-dium',
    root: 'prae',
    french: 'Garnison',
    english: 'Garrison',
    german: 'Garnison',
  },
  {
    nidalumWord: 'Aegis',
    definition: 'Égide',
    traduction_fr: 'Égide',
    category: 'Protection',
    phonetic: 'ae-gis',
    root: 'aeg',
    french: 'Égide',
    english: 'Aegis',
    german: 'Ägide',
  },
  {
    nidalumWord: 'Salvatio',
    definition: 'Salut',
    traduction_fr: 'Salut',
    category: 'Protection',
    phonetic: 'sal-va-tio',
    root: 'salv',
    french: 'Salut',
    english: 'Salvation',
    german: 'Heil',
  },

  // NOMBRES (Numbers)
  {
    nidalumWord: 'Unus',
    definition: 'Un',
    traduction_fr: 'Un',
    category: 'Nombres',
    phonetic: 'u-nus',
    root: 'un',
    french: 'Un',
    english: 'One',
    german: 'Eins',
  },
  {
    nidalumWord: 'Duo',
    definition: 'Deux',
    traduction_fr: 'Deux',
    category: 'Nombres',
    phonetic: 'du-o',
    root: 'du',
    french: 'Deux',
    english: 'Two',
    german: 'Zwei',
  },
  {
    nidalumWord: 'Tres',
    definition: 'Trois',
    traduction_fr: 'Trois',
    category: 'Nombres',
    phonetic: 'tres',
    root: 'tre',
    french: 'Trois',
    english: 'Three',
    german: 'Drei',
  },
  {
    nidalumWord: 'Quattuor',
    definition: 'Quatre',
    traduction_fr: 'Quatre',
    category: 'Nombres',
    phonetic: 'quat-tu-or',
    root: 'quat',
    french: 'Quatre',
    english: 'Four',
    german: 'Vier',
  },
  {
    nidalumWord: 'Quinque',
    definition: 'Cinq',
    traduction_fr: 'Cinq',
    category: 'Nombres',
    phonetic: 'quin-que',
    root: 'quin',
    french: 'Cinq',
    english: 'Five',
    german: 'Fünf',
  },
  {
    nidalumWord: 'Sex',
    definition: 'Six',
    traduction_fr: 'Six',
    category: 'Nombres',
    phonetic: 'sex',
    root: 'sex',
    french: 'Six',
    english: 'Six',
    german: 'Sechs',
  },
  {
    nidalumWord: 'Septem',
    definition: 'Sept',
    traduction_fr: 'Sept',
    category: 'Nombres',
    phonetic: 'sep-tem',
    root: 'sept',
    french: 'Sept',
    english: 'Seven',
    german: 'Sieben',
  },
  {
    nidalumWord: 'Octo',
    definition: 'Huit',
    traduction_fr: 'Huit',
    category: 'Nombres',
    phonetic: 'oc-to',
    root: 'oct',
    french: 'Huit',
    english: 'Eight',
    german: 'Acht',
  },
  {
    nidalumWord: 'Novem',
    definition: 'Neuf',
    traduction_fr: 'Neuf',
    category: 'Nombres',
    phonetic: 'no-vem',
    root: 'nov',
    french: 'Neuf',
    english: 'Nine',
    german: 'Neun',
  },
  {
    nidalumWord: 'Decem',
    definition: 'Dix',
    traduction_fr: 'Dix',
    category: 'Nombres',
    phonetic: 'de-cem',
    root: 'dec',
    french: 'Dix',
    english: 'Ten',
    german: 'Zehn',
  },
  {
    nidalumWord: 'Centum',
    definition: 'Cent',
    traduction_fr: 'Cent',
    category: 'Nombres',
    phonetic: 'cen-tum',
    root: 'cent',
    french: 'Cent',
    english: 'Hundred',
    german: 'Hundert',
  },
  {
    nidalumWord: 'Mille',
    definition: 'Mille',
    traduction_fr: 'Mille',
    category: 'Nombres',
    phonetic: 'mil-le',
    root: 'mill',
    french: 'Mille',
    english: 'Thousand',
    german: 'Tausend',
  },
];

export default function InitializeLexicalData() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Initialisation des données...');
  const [progress, setProgress] = useState(0);
  const [redirectCountdown, setRedirectCountdown] = useState(0);

  useEffect(() => {
    const initializeData = async () => {
      try {
        let successCount = 0;
        let failureCount = 0;

        for (let i = 0; i < NIDALUM_WORDS_DATA.length; i++) {
          const wordData = NIDALUM_WORDS_DATA[i];
          try {
            await BaseCrudService.create('nidalumlexicon', {
              _id: crypto.randomUUID(),
              ...wordData,
            } as NidalumApprendrelaLangue);
            successCount++;
          } catch (error) {
            failureCount++;
          }
          setProgress(Math.round(((i + 1) / NIDALUM_WORDS_DATA.length) * 100));
        }

        setStatus('success');
        setMessage(`✅ Synchronisation complète! ${successCount} mots ajoutés. ${failureCount > 0 ? `${failureCount} erreurs.` : ''}`);
        
        // Auto-redirect after 3 seconds
        setRedirectCountdown(3);
        const timer = setInterval(() => {
          setRedirectCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/lexical-archives');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch (error) {
        setStatus('error');
        setMessage(`❌ Erreur lors de l'initialisation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      }
    };

    initializeData();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className={`p-8 rounded-lg border-2 ${
          status === 'loading' ? 'border-primary/50 bg-primary/10' :
          status === 'success' ? 'border-green-500/50 bg-green-500/10' :
          'border-red-500/50 bg-red-500/10'
        }`}>
          <h1 className="font-heading text-3xl mb-4 text-primary">
            {status === 'loading' ? '⏳' : status === 'success' ? '✅' : '❌'}
          </h1>
          <p className="font-paragraph text-lg text-foreground mb-6">{message}</p>
          
          {status === 'loading' && (
            <div className="space-y-4">
              <div className="w-full bg-foreground/20 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="font-paragraph text-sm text-foreground/70 text-center">{progress}% complété</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="space-y-4">
              <p className="font-paragraph text-foreground/80">
                ✨ Les 5 catégories et 60 mots Nidalum ont été synchronisés avec succès!
              </p>
              <div className="grid grid-cols-5 gap-2">
                {['Sacré', 'Éléments', 'Humain', 'Protection', 'Nombres'].map(cat => (
                  <div key={cat} className="p-3 bg-primary/20 rounded text-center">
                    <p className="font-heading text-sm text-primary">{cat}</p>
                    <p className="font-paragraph text-xs text-foreground/70">12 mots</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-foreground/10 rounded border border-foreground/20">
                <p className="font-paragraph text-sm text-foreground/80 mb-2">
                  📊 Redirection automatique dans {redirectCountdown}s...
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate('/lexical-archives')}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded font-heading hover:bg-primary/90 transition"
                  >
                    Voir Archives Lexicales
                  </button>
                  <button
                    onClick={() => navigate('/diagnostic-lexical')}
                    className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded font-heading hover:bg-secondary/90 transition"
                  >
                    Voir Diagnostic
                  </button>
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <p className="font-paragraph text-foreground/80">
                Une erreur s'est produite lors de la synchronisation.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded font-heading hover:bg-primary/90 transition"
              >
                Réessayer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
