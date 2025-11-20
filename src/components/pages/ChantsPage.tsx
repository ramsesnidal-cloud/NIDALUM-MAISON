import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { RitualChants } from '@/entities';
import { Image } from '@/components/ui/image';
import { Sparkles, Edit2, LogOut, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';
import AdminLoginModal from '@/components/AdminLoginModal';
import EditChantImageModal from '@/components/EditChantImageModal';

export default function ChantsPage() {
  const [chants, setChants] = useState<RitualChants[]>([]);
  const [selectedChant, setSelectedChant] = useState<RitualChants | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [editingChant, setEditingChant] = useState<RitualChants | null>(null);
  const [playingChantId, setPlayingChantId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isAdmin, setAdmin } = useAdminStore();

  useEffect(() => {
    loadChants();
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
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

  const handlePlayPause = async (e: React.MouseEvent, chant: RitualChants) => {
    e.stopPropagation();

    if (!chant.audioUrl) {
      setAudioError('Aucun lien audio disponible');
      console.warn('No audio URL available for this chant');
      return;
    }

    try {
      setAudioError(null);

      // If clicking the same chant, toggle play/pause
      if (playingChantId === chant._id) {
        if (audioRef.current) {
          if (audioRef.current.paused) {
            try {
              const playPromise = audioRef.current.play();
              if (playPromise !== undefined) {
                await playPromise;
              }
            } catch (err) {
              console.error('Error resuming audio:', err);
              setAudioError('Impossible de reprendre la lecture');
            }
          } else {
            audioRef.current.pause();
          }
        }
      } else {
        // Stop current audio and play new one
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        // Create new audio element with proper configuration
        const audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.preload = 'auto';
        audio.volume = isMuted ? 0 : 1;
        
        // Set up event listeners BEFORE setting src
        audio.onended = () => {
          setPlayingChantId(null);
          setAudioError(null);
        };

        audio.onerror = (error) => {
          console.error('Audio loading error:', error);
          setAudioError('Erreur de chargement audio');
          setPlayingChantId(null);
        };

        audio.onloadstart = () => {
          console.log('Audio loading started for:', chant.chantTitle);
        };

        audio.oncanplay = () => {
          console.log('Audio ready to play:', chant.chantTitle);
        };

        // Set the source and attempt to play
        audio.src = chant.audioUrl;
        audioRef.current = audio;

        // Force play with retry logic
        const playAudio = async (retries = 3) => {
          try {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
              await playPromise;
              setPlayingChantId(chant._id);
              console.log('Audio playing successfully:', chant.chantTitle);
            } else {
              setPlayingChantId(chant._id);
            }
          } catch (playError) {
            console.error(`Failed to play audio (attempt ${4 - retries}):`, playError);
            
            if (retries > 0) {
              // Retry after a short delay
              await new Promise(resolve => setTimeout(resolve, 100));
              await playAudio(retries - 1);
            } else {
              setAudioError('Impossible de lire l\'audio');
              setPlayingChantId(null);
            }
          }
        };

        await playAudio();
      }
    } catch (error) {
      console.error('Error in handlePlayPause:', error);
      setAudioError('Erreur lors de la lecture');
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef.current) {
      audioRef.current.volume = newMutedState ? 0 : 1;
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
                    <div className="aspect-video overflow-hidden relative">
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

                    {/* Audio Player */}
                    {chant.audioUrl && (
                      <div className="mb-6">
                        <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                          <button
                            onClick={(e) => handlePlayPause(e, chant)}
                            className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
                            title={playingChantId === chant._id ? 'Pause' : 'Lecture'}
                          >
                            {playingChantId === chant._id ? (
                              <Pause className="w-5 h-5" />
                            ) : (
                              <Play className="w-5 h-5 ml-0.5" />
                            )}
                          </button>
                          <div className="flex-1">
                            <p className="font-paragraph text-xs text-foreground/60">
                              {playingChantId === chant._id ? 'En lecture...' : 'Cliquez pour écouter'}
                            </p>
                          </div>
                          <button
                            onClick={handleToggleMute}
                            className="flex-shrink-0 text-foreground/60 hover:text-foreground transition-colors"
                            title={isMuted ? 'Activer le son' : 'Couper le son'}
                          >
                            {isMuted ? (
                              <VolumeX className="w-5 h-5" />
                            ) : (
                              <Volume2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {audioError && (
                          <p className="text-xs text-destructive mt-2">Erreur audio: {audioError}</p>
                        )}
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
