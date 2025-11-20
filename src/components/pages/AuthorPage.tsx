import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { MusicShowcase } from '@/entities';
import { Image } from '@/components/ui/image';
import { Music, Play, Pause, Volume2 } from 'lucide-react';

export default function AuthorPage() {
  const [musicTracks, setMusicTracks] = useState<MusicShowcase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [trackVolumes, setTrackVolumes] = useState<Record<string, number>>({});
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRefsMap = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    loadMusic();
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      audioRefsMap.current.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      audioRefsMap.current.clear();
    };
  }, []);

  const loadMusic = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<MusicShowcase>('musicshowcase');
    setMusicTracks(items);
    // Initialize volume for each track
    const initialVolumes: Record<string, number> = {};
    items.forEach(track => {
      initialVolumes[track._id] = 1;
    });
    setTrackVolumes(initialVolumes);
    setIsLoading(false);
  };

  const handlePlayPause = async (e: React.MouseEvent, track: MusicShowcase) => {
    e.stopPropagation();

    if (!track.audioUrl) {
      setAudioError('Aucun lien audio disponible');
      console.warn('No audio URL available for this track');
      return;
    }

    try {
      setAudioError(null);
      const existingAudio = audioRefsMap.current.get(track._id);

      // If clicking the same track, toggle play/pause
      if (playingTrackId === track._id && existingAudio) {
        if (existingAudio.paused) {
          try {
            const playPromise = existingAudio.play();
            if (playPromise !== undefined) {
              await playPromise;
            }
          } catch (err) {
            console.error('Error resuming audio:', err);
            setAudioError('Impossible de reprendre la lecture');
          }
        } else {
          existingAudio.pause();
        }
      } else {
        // Stop all other audio tracks
        audioRefsMap.current.forEach((audio, trackId) => {
          if (trackId !== track._id) {
            audio.pause();
            audio.currentTime = 0;
          }
        });

        // Create or reuse audio element for this track
        let audio = audioRefsMap.current.get(track._id);
        if (!audio) {
          audio = new Audio();
          audio.crossOrigin = 'anonymous';
          audio.preload = 'auto';
          audioRefsMap.current.set(track._id, audio);

          // Set up event listeners
          audio.onended = () => {
            setPlayingTrackId(null);
            setAudioError(null);
          };

          audio.onerror = () => {
            console.error('Audio loading error for:', track.trackTitle);
            setAudioError('Erreur de chargement audio');
            setPlayingTrackId(null);
          };

          audio.src = track.audioUrl;
        }

        // Set volume for this track
        audio.volume = trackVolumes[track._id] || 1;
        setPlayingTrackId(track._id);

        // Play with retry logic
        const playAudio = async (retries = 3) => {
          try {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
              await playPromise;
              console.log('Audio playing successfully:', track.trackTitle);
            }
          } catch (playError) {
            console.error(`Failed to play audio (attempt ${4 - retries}):`, playError);

            if (retries > 0) {
              await new Promise(resolve => setTimeout(resolve, 100));
              await playAudio(retries - 1);
            } else {
              setAudioError('Impossible de lire l\\'audio');
              setPlayingTrackId(null);
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>, trackId: string) => {
    e.stopPropagation();
    const newVolume = parseFloat(e.target.value);
    
    // Update volume state
    setTrackVolumes(prev => ({
      ...prev,
      [trackId]: newVolume
    }));

    // Update audio element volume if it exists and is playing
    const audio = audioRefsMap.current.get(trackId);
    if (audio) {
      audio.volume = newVolume;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-6">
              RAMSES NIDAL
            </h1>
            <p className="font-heading text-2xl md:text-3xl text-secondary mb-8 tracking-widest">
              ABOUDRAMANE DOUMBIA
            </p>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Créateur de la langue Nidalum, compositeur de musique épique afro-cinématographique, et architecte de l'univers narratif Souma-Ra.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Biography Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                <Image
                  src="https://static.wixstatic.com/media/9c8aea_83af5dca6fc34c339b7ad142ca365f92~mv2.jpeg"
                  width={600}
                  className="w-full h-full object-cover"
                  originWidth={864}
                  originHeight={1184}
                  focalPointX={43.63425925925926}
                  focalPointY={31.08108108108108} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                L'Artiste Visionnaire
              </h2>
              <div className="space-y-4">
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  Ramses Nidal, né Aboudramane Doumbia, est un artiste multidisciplinaire dont l'œuvre transcende les frontières entre linguistique, musique, et mythologie. Son travail s'inscrit dans une vision afrofuturiste où l'ancien et le futur se rencontrent.
                </p>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  Créateur de la langue Nidalum, il a développé un système linguistique complet avec son propre alphabet (Toraé-Shira), sa grammaire, et son lexique. Cette langue n'est pas qu'un outil de communication, mais un pont spirituel vers l'univers narratif de Souma-Ra.
                </p>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  En tant que compositeur, Ramses Nidal crée une musique épique et cinématographique qui fusionne les traditions africaines avec des sonorités modernes et cosmiques. Ses compositions accompagnent les chants rituels en Nidalum et évoquent les paysages mystiques de Souma-Ra.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Artistic Vision Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12 text-center">
              Vision Artistique
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Afrofuturisme</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Une fusion entre héritage africain et vision futuriste, créant un espace où la tradition ancestrale rencontre l'innovation cosmique.
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Mysticisme</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Chaque création est imprégnée de spiritualité, transformant l'art en rituel et la langue en invocation sacrée.
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Cinématique</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Une approche épique et visuelle, où chaque mot, chaque note, évoque des paysages grandioses et des récits mythologiques.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Music Showcase Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <Music className="w-10 h-10 text-primary mr-4" />
              <h2 className="font-heading text-4xl md:text-5xl text-primary">
                Musique Épique
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/70 text-center max-w-3xl mx-auto">
              Découvrez les compositions afro-cinématographiques de Ramses Nidal, une fusion mystique de traditions et de modernité.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="font-paragraph text-foreground/70 mt-4">Chargement de la musique...</p>
            </div>
          ) : musicTracks.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground/70">Aucune musique disponible</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {musicTracks.map((track, index) => (
                <motion.div
                  key={track._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm group"
                >
                  {track.coverImage && (
                    <div className="aspect-square overflow-hidden relative group/image">
                      <Image
                        src={track.coverImage}
                        alt={track.trackTitle || 'Track cover'}
                        width={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Play/Pause Button - Center overlay */}
                      {track.audioUrl && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.15 }}
                          onClick={(e) => handlePlayPause(e, track)}
                          className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20"
                          title={playingTrackId === track._id ? 'Pause' : 'Lecture'}
                        >
                          <div className="flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-2xl hover:bg-primary/90 transition-colors">
                            {playingTrackId === track._id ? (
                              <Pause className="w-8 h-8" />
                            ) : (
                              <Play className="w-8 h-8 ml-1" />
                            )}
                          </div>
                          <p className="font-paragraph text-xs text-white mt-2 font-semibold">
                            {playingTrackId === track._id ? 'Pause' : 'Écouter'}
                          </p>
                        </motion.button>
                      )}
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-primary mb-2 group-hover:text-secondary transition-colors">
                      {track.trackTitle}
                    </h3>
                    {track.artistName && (
                      <p className="font-paragraph text-sm text-foreground/60 mb-3">
                        {track.artistName}
                      </p>
                    )}
                    {track.genre && (
                      <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary mb-3">
                        {track.genre}
                      </span>
                    )}
                    {track.description && (
                      <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                        {track.description}
                      </p>
                    )}
                    
                    {/* Audio Player */}
                    {track.audioUrl && (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/30 rounded-lg">
                          <button
                            onClick={(e) => handlePlayPause(e, track)}
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
                            title={playingTrackId === track._id ? 'Pause' : 'Lecture'}
                          >
                            {playingTrackId === track._id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4 ml-0.5" />
                            )}
                          </button>
                          <div className="flex-1">
                            <p className="font-paragraph text-xs text-foreground/60">
                              {playingTrackId === track._id ? 'En lecture...' : 'Cliquez pour écouter'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Volume Control */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg">
                          <Volume2 className="w-4 h-4 text-foreground/60 flex-shrink-0" />
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={trackVolumes[track._id] || 1}
                            onChange={(e) => handleVolumeChange(e, track._id)}
                            className="flex-1 h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
                            title="Contrôle du volume"
                          />
                          <span className="text-xs text-foreground/60 w-8 text-right">
                            {Math.round((trackVolumes[track._id] || 1) * 100)}%
                          </span>
                        </div>
                        
                        {audioError && (
                          <p className="text-xs text-destructive">Erreur audio: {audioError}</p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Creative Process Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-background to-dark-amber-shadow/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12 text-center">
              Processus Créatif
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Création Linguistique</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                  La langue Nidalum a été développée sur plusieurs années, avec une attention méticuleuse portée à la cohérence phonétique, grammaticale, et sémantique. Chaque mot est choisi pour sa résonance spirituelle autant que pour sa fonction linguistique.
                </p>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  L'alphabet Toraé-Shira, écrit verticalement, symbolise la connexion entre le ciel et la terre, reflétant la cosmologie de Souma-Ra.
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">Composition Musicale</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                  La musique de Ramses Nidal naît de l'intersection entre rythmes africains traditionnels et orchestrations cinématographiques modernes. Chaque composition est conçue pour évoquer les paysages mystiques de Souma-Ra.
                </p>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Les chants rituels en Nidalum sont accompagnés de mélodies qui amplifient leur pouvoir spirituel et leur beauté poétique.
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
