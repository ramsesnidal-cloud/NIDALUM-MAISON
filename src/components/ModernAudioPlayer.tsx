import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, AlertCircle, Loader } from 'lucide-react';

interface ModernAudioPlayerProps {
  audioUrl?: string;
  title?: string;
  audioRef?: React.MutableRefObject<HTMLAudioElement | null>;
  onPlayStateChange?: (isPlaying: boolean) => void;
  className?: string;
}

/**
 * ModernAudioPlayer - Lecteur audio robuste et synchronisé
 * 
 * Fonctionnalités:
 * - Synchronisation avec audioRef externe
 * - Design ultra-moderne avec gradients
 * - Barre de progression interactive
 * - Contrôle du volume avec slider
 * - Play/Pause avec animations
 * - Gestion d'erreurs complète
 * - Affichage du temps (current/total)
 * - Responsive design mobile-first
 * - Animations fluides avec Framer Motion
 * - Support CORS
 * - Cleanup automatique
 * - Logging détaillé pour debug
 */
export default function ModernAudioPlayer({
  audioUrl,
  title = 'Audio',
  audioRef: externalAudioRef,
  onPlayStateChange,
  className = ''
}: ModernAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const internalAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioRef = externalAudioRef || internalAudioRef;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current && !externalAudioRef) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [externalAudioRef]);

  // Notify parent of play state changes
  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  // Update current time
  useEffect(() => {
    if (!isPlaying || !audioRef.current) return;

    const updateTime = () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    };

    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Setup audio element event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => {
      console.log('[AUDIO PLAYER] onLoadStart event fired');
      setIsLoading(true);
      setError(null);
    };

    const handleCanPlay = () => {
      console.log('[AUDIO PLAYER] onCanPlay event fired - audio is ready to play');
      setIsLoading(false);
    };

    const handleEnded = () => {
      console.log('[AUDIO PLAYER] onEnded event fired - playback completed');
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e: Event) => {
      console.error('[AUDIO PLAYER] onError event fired:', e);
      console.error('[AUDIO PLAYER] Audio element error code:', audio.error?.code);
      console.error('[AUDIO PLAYER] Audio element error message:', audio.error?.message);
      setError('Erreur de chargement audio');
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handleDurationChange = () => {
      console.log('[AUDIO PLAYER] onDurationChange event fired, duration:', audio.duration);
      setDuration(audio.duration || 0);
    };

    const handlePlay = () => {
      console.log('[AUDIO PLAYER] onPlay event fired - playback started');
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log('[AUDIO PLAYER] onPause event fired - playback paused');
      setIsPlaying(false);
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Handle play/pause
  const handlePlayPause = useCallback(async () => {
    try {
      setError(null);

      if (!audioUrl || audioUrl.trim() === '') {
        setError('Aucun fichier audio disponible');
        return;
      }

      // Initialize if needed
      if (!audioRef.current) {
        const audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.preload = 'metadata';
        audio.volume = volume;
        audioRef.current = audio;
      }

      const audio = audioRef.current;

      if (isPlaying) {
        // Pause
        audio.pause();
        setIsPlaying(false);
      } else {
        // Play
        if (audio.src !== audioUrl) {
          audio.src = audioUrl;
          console.log('[AUDIO PLAYER] Audio source set to:', audioUrl);
          console.log('[AUDIO PLAYER] Audio element readyState:', audio.readyState);
          console.log('[AUDIO PLAYER] Audio element networkState:', audio.networkState);
        }

        setIsLoading(true);
        try {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
          setIsPlaying(true);
          console.log('[AUDIO PLAYER] Audio playback started successfully');
        } catch (err: any) {
          console.error('[AUDIO PLAYER] Play error:', err);
          console.error('[AUDIO PLAYER] Error name:', err.name);
          console.error('[AUDIO PLAYER] Error message:', err.message);

          // Handle specific errors
          if (err.name === 'NotAllowedError') {
            setError('Lecture non autorisée');
          } else if (err.name === 'NotSupportedError') {
            setError('Format audio non supporté - Vérifiez que le fichier est en MP3, WAV ou OGG');
          } else if (err.name === 'AbortError') {
            setError('Chargement interrompu');
          } else {
            setError('Impossible de lire l\'audio');
          }
          setIsPlaying(false);
        } finally {
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.error('[AUDIO PLAYER] Unexpected error:', err);
      setError('Erreur lors de la lecture');
    }
  }, [audioUrl, isPlaying, volume]);

  // Handle volume change
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.currentTarget.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // Handle progress bar click
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  // Format time
  const formatTime = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // No audio URL
  if (!audioUrl || audioUrl.trim() === '') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 px-4 py-3 bg-destructive/10 border border-destructive/30 rounded-lg ${className}`}
      >
        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
        <span className="text-sm text-destructive font-medium">Aucun fichier audio disponible</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-4 w-full ${className}`}
    >
      {/* Main Player Container */}
      <div className="w-full bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/30 rounded-lg md:rounded-xl p-3 md:p-6 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
        
        {/* Title and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 min-w-0">
            <p className="font-heading text-sm md:text-base text-primary truncate">
              {title}
            </p>
            <p className="font-paragraph text-xs text-foreground/60 mt-1">
              {isLoading ? '⏳ Chargement...' : isPlaying ? '▶ En lecture...' : '▷ Prêt à écouter'}
            </p>
          </div>
          
          {/* Duration Display */}
          {duration > 0 && (
            <div className="text-right ml-4">
              <p className="font-paragraph text-xs text-foreground/70 font-semibold">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <motion.div
          onClick={handleProgressClick}
          className="mb-4 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="h-2 bg-primary/20 rounded-full overflow-hidden border border-primary/30 group-hover:border-primary/60 transition-colors">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          {/* Play/Pause Button */}
          <motion.button
            onClick={handlePlayPause}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-full hover:shadow-lg hover:shadow-primary/50 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title={isPlaying ? 'Pause' : 'Lecture'}
            aria-label={isPlaying ? 'Pause' : 'Lecture'}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 md:w-7 md:h-7 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6 md:w-7 md:h-7" />
            ) : (
              <Play className="w-6 h-6 md:w-7 md:h-7 ml-0.5" />
            )}
          </motion.button>

          {/* Volume Control */}
          <div className="flex-1 flex items-center gap-2">
            <motion.button
              onClick={() => setShowVolumeControl(!showVolumeControl)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-primary hover:bg-primary/10 rounded-lg transition-colors"
              title="Contrôle du volume"
            >
              {volume === 0 ? (
                <VolumeX className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </motion.button>

            {/* Volume Slider */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: showVolumeControl ? 1 : 0, width: showVolumeControl ? 'auto' : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden flex items-center gap-2"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 md:w-24 h-2 bg-primary/30 rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                title="Contrôle du volume"
                aria-label="Contrôle du volume"
              />
              <span className="text-xs text-foreground/70 font-semibold w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-3 bg-destructive/20 border border-destructive/50 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive font-medium">{error}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
