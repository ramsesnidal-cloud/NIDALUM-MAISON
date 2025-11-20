import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { RitualChants } from '@/entities';
import { Image } from '@/components/ui/image';
import { Sparkles, Edit2, LogOut, Play, Pause } from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';
import AdminLoginModal from '@/components/AdminLoginModal';
import EditChantImageModal from '@/components/EditChantImageModal';
import ModernAudioPlayer from '@/components/ModernAudioPlayer';

export default function ChantsPage() {
  const [chants, setChants] = useState<RitualChants[]>([]);
  const [selectedChant, setSelectedChant] = useState<RitualChants | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [editingChant, setEditingChant] = useState<RitualChants | null>(null);
  const [playingChantId, setPlayingChantId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const { isAdmin, setAdmin } = useAdminStore();

  useEffect(() => {
    loadChants();
  }, []);

  const loadChants = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<RitualChants>('ritualchants');
    setChants(items);
    setIsLoading(false);
  };

  const handleEditImage = (chant: RitualChants) => {
    if (!isAdmin) {
      setShowAdminLogin(true);
      return;
    }
    setEditingChant(chant);
  };

  const handleSaveImage = (updatedChant: RitualChants) => {
    setChants(chants.map(c => c._id === updatedChant._id ? updatedChant : c));
    setEditingChant(null);
  };

  const handleLogout = () => {
    setAdmin(false);
  };

  const handlePlayStateChange = (chantId: string, isPlaying: boolean) => {
    if (isPlaying) {
      // Stop all other audio players
      Object.keys(audioRefs.current).forEach(id => {
        if (id !== chantId && audioRefs.current[id]) {
          audioRefs.current[id]?.pause();
        }
      });
      setPlayingChantId(chantId);
    } else if (playingChantId === chantId) {
      setPlayingChantId(null);
    }
  };

  const handleImagePlayClick = (chantId: string) => {
    const audio = audioRefs.current[chantId];
    if (!audio) return;

    if (playingChantId === chantId) {
      // Pause
      audio.pause();
      setPlayingChantId(null);
    } else {
      // Play - stop other audio players first
      Object.keys(audioRefs.current).forEach(id => {
        if (id !== chantId && audioRefs.current[id]) {
          audioRefs.current[id]?.pause();
        }
      });
      audio.play().catch(err => console.error('Play error:', err));
      setPlayingChantId(chantId);
    }
  };

  const registerAudioRef = (chantId: string, audio: HTMLAudioElement | null) => {
    if (audio) {
      audioRefs.current[chantId] = audio;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Admin Badge */}
      {isAdmin && (
        <div className="fixed top-24 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 rounded-lg">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="font-paragraph text-sm text-primary">Mode Admin</span>
          <button
            onClick={handleLogout}
            className="ml-2 text-primary hover:text-primary/80 transition-colors"
            title="Déconnexion admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-primary mr-4" />
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Chants Rituels
              </h1>
              <Sparkles className="w-12 h-12 text-secondary ml-4" />
            </div>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Les chants sacrés de Nidalum, porteurs de sagesse ancestrale et de connexion spirituelle avec l'univers Souma-Ra. Chaque chant est une invocation, une prière, un pont entre le monde terrestre et le cosmos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chants Grid */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="font-paragraph text-foreground/70 mt-4">Chargement des chants...</p>
            </div>
          ) : chants.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground/70">Aucun chant disponible</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {chants.map((chant, index) => (
                <motion.div
                  key={chant._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm group cursor-pointer relative"
                  onClick={() => setSelectedChant(selectedChant?._id === chant._id ? null : chant)}
                >
                  {chant.chantImage && (
                    <div className="aspect-video overflow-hidden relative group/image">
                      {chant.chantImage.startsWith('data:') || chant.chantImage.startsWith('http') ? (
                        <img
                          src={chant.chantImage}
                          alt={chant.chantTitle || 'Chant rituel'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <Image
                          src={chant.chantImage}
                          alt={chant.chantTitle || 'Chant rituel'}
                          width={800}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          focalPointX={47.59036144578313}
                          focalPointY={56.024096385542165}
                        />
                      )}
                      
                      {/* Play/Pause Button - Center overlay */}
                      {chant.audio && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.15 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImagePlayClick(chant._id);
                          }}
                          className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20"
                          title={playingChantId === chant._id ? 'Pause' : 'Lecture'}
                        >
                          <div className="flex items-center justify-center w-20 h-20 bg-primary text-primary-foreground rounded-full shadow-2xl hover:bg-primary/90 transition-colors">
                            {playingChantId === chant._id ? (
                              <Pause className="w-10 h-10" />
                            ) : (
                              <Play className="w-10 h-10 ml-1" />
                            )}
                          </div>
                          <p className="font-paragraph text-sm text-white mt-3 font-semibold">
                            {playingChantId === chant._id ? 'Pause' : 'Écouter'}
                          </p>
                        </motion.button>
                      )}
                      
                      {/* Replace Button - Always visible to admin */}
                      {isAdmin && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditImage(chant);
                          }}
                          className="absolute top-3 right-3 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors shadow-lg z-10"
                          title="Cliquez pour remplacer l'image"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Replace</span>
                        </motion.button>
                      )}
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="font-heading text-3xl text-primary mb-2 group-hover:text-secondary transition-colors">
                        {chant.chantTitle}
                      </h3>
                      {chant.theme && (
                        <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary">
                          {chant.theme}
                        </span>
                      )}
                    </div>

                    {chant.spiritualContext && (
                      <div className="mb-6">
                        <p className="font-paragraph text-sm text-foreground/50 mb-2">Contexte Spirituel:</p>
                        <p className="font-paragraph text-foreground/80 leading-relaxed">
                          {chant.spiritualContext}
                        </p>
                      </div>
                    )}

                    {/* Audio Player Component with hidden audio element for direct play */}
                    {chant.audio && (
                      <div className="mt-6 border-t border-primary/20 pt-6">
                        {/* Hidden audio element for direct playback from image button */}
                        <audio
                          ref={(el) => registerAudioRef(chant._id, el)}
                          src={chant.audio}
                          onPlay={() => handlePlayStateChange(chant._id, true)}
                          onPause={() => handlePlayStateChange(chant._id, false)}
                          onEnded={() => setPlayingChantId(null)}
                        />
                        
                        <ModernAudioPlayer
                          audioUrl={chant.audio}
                          title={chant.chantTitle || 'Chant'}
                          onPlayStateChange={(isPlaying) => handlePlayStateChange(chant._id, isPlaying)}
                        />
                      </div>
                    )}

                    {selectedChant?._id === chant._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6 pt-6 border-t border-primary/20"
                      >
                        {chant.originalText && (
                          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 border-l-4 border-primary">
                            <p className="font-paragraph text-sm text-foreground/50 mb-3">Texte Original (Nidalum):</p>
                            <p className="font-heading text-lg text-primary leading-relaxed whitespace-pre-line">
                              {chant.originalText}
                            </p>
                          </div>
                        )}

                        {chant.translation && (
                          <div className="bg-dark-amber-shadow/20 p-6 border-l-4 border-secondary">
                            <p className="font-paragraph text-sm text-foreground/50 mb-3">Traduction:</p>
                            <p className="font-paragraph text-foreground/80 leading-relaxed whitespace-pre-line">
                              {chant.translation}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    <button
                      className="mt-4 font-paragraph text-sm text-secondary hover:text-primary transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedChant(selectedChant?._id === chant._id ? null : chant);
                      }}
                    >
                      {selectedChant?._id === chant._id ? 'Masquer le texte' : 'Afficher le texte complet'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Spiritual Practice Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              La Pratique des Chants Rituels
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Préparation</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Avant de réciter un chant, trouvez un espace calme et sacré. Allumez une bougie ou de l'encens pour purifier l'atmosphère et créer une connexion avec le divin.
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Récitation</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Récitez le chant lentement, en prononçant chaque syllabe avec intention. Laissez les vibrations des mots résonner en vous et autour de vous.
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Méditation</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Après le chant, restez en silence pendant quelques minutes pour intégrer l'énergie spirituelle et recevoir les messages du cosmos.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <AnimatePresence>
        {showAdminLogin && (
          <AdminLoginModal onClose={() => setShowAdminLogin(false)} />
        )}
        {editingChant && (
          <EditChantImageModal
            chant={editingChant}
            onClose={() => setEditingChant(null)}
            onSave={handleSaveImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
