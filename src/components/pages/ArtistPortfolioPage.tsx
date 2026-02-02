import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { RitualChants, ArtistPortfolio } from '@/entities';
import { Image as UIImage } from '@/components/ui/image';
import ModernAudioPlayer from '@/components/ModernAudioPlayer';
import { useTranslation } from '@/hooks/useTranslation';

export default function ChantsPage() {
  const { t } = useTranslation();
  const [chants, setChants] = useState<RitualChants[]>([]);
  const [artists, setArtists] = useState<ArtistPortfolio[]>([]);
  const [selectedChant, setSelectedChant] = useState<RitualChants | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<ArtistPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingArtists, setIsLoadingArtists] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadChants();
        await loadArtists();
      } catch (error) {
        console.error("Error loading data", error);
      }
    };
    fetchData();
  }, []);

  const loadChants = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<RitualChants>('ritualchants');
      setChants(items || []);
    } catch (e) {
      console.error(e);
      setChants([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadArtists = async () => {
    setIsLoadingArtists(true);
    try {
      const { items } = await BaseCrudService.getAll<ArtistPortfolio>('artistportfolio');
      setArtists(items || []);
    } catch (e) {
      console.error(e);
      setArtists([]);
    } finally {
      setIsLoadingArtists(false);
    }
  };

  // 🧠 FONCTION SUPER INTELLIGENTE (VERSION CORRIGÉE)
  // Cette fonction est capable d'extraire le lien même s'il est caché dans un objet complexe
  const getAudioSource = (item: any) => {
    if (!item) return null;

    // 1. On récupère ce qu'il y a dans les champs
    let source = item.audio || item.url || item.audioUrl;

    // 2. Si c'est vide, on arrête
    if (!source) return null;

    // 3. LA CORRECTION MAGIQUE : Si c'est un Objet, on cherche l'URL dedans
    if (typeof source === 'object') {
      // On essaie toutes les clés possibles où les CMS cachent les liens
      if (source.url) return source.url;
      if (source.link) return source.link;
      if (source.src) return source.src;
      if (source.href) return source.href;
      
      // Si c'est un tableau (liste), on prend le premier élément
      if (Array.isArray(source) && source.length > 0) {
        return source[0].url || source[0];
      }
      
      // Si on ne trouve rien, on tente de le convertir en texte (dernier espoir)
      return source.toString();
    }

    // 4. Si c'est déjà du texte (cas idéal), on le renvoie tel quel
    return source;
  };

  return (
    <div className="min-h-screen bg-black text-white font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-32 pb-16 sm:pb-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-widest mb-6 sm:mb-8 font-light flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-8">
            <span>NIDALUM</span>
            <span>MUSIC</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg tracking-wide text-stone-400 mb-4 px-2 leading-relaxed">
            The operational artistic arm of the House
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-8 sm:mt-12 max-w-xs mx-auto"></div>
        </motion.div>
      </section>

      {/* Chants Grid */}
      <section className="px-4 md:px-8 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 text-center"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest mb-4 font-light">
              SACRED CHANTS
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 w-32 mx-auto"></div>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-64 bg-stone-900 rounded-sm animate-pulse"></div>
                  <div className="h-4 bg-stone-900 rounded animate-pulse w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {chants.map((chant) => (
                <motion.div
                  key={chant._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedChant(chant)}
                >
                  <div className="relative overflow-hidden rounded-sm mb-4 h-64 bg-stone-900">
                    {chant.chantImage && (
                      <UIImage
                        src={chant.chantImage}
                        alt={chant.chantTitle || 'Chant'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl tracking-wide mb-2 group-hover:text-secondary transition-colors">
                    {chant.chantTitle}
                  </h3>
                  <p className="text-sm text-stone-400 line-clamp-2">{chant.spiritualContext}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
