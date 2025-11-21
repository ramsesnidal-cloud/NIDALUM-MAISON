import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, AlertCircle, Loader, RotateCcw, Zap } from 'lucide-react';

interface TextToSpeechPlayerProps {
  text: string;
  title?: string;
  language?: string;
  className?: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
  showSpeedControl?: boolean;
  showRepeatButton?: boolean;
}

/**
 * TextToSpeechPlayer - Lecteur de synthèse vocale haute qualité
 * 
 * Fonctionnalités:
 * - Synthèse vocale native (Web Speech API)
 * - Play/Pause/Répéter
 * - Contrôle de vitesse (0.5x à 2x)
 * - Contrôle du volume
 * - Support multilingue
 * - Gestion d'erreurs complète
 * - Design ultra-moderne
 * - Animations fluides
 * - Responsive design
 */
export default function TextToSpeechPlayer({
  text,
  title = 'Écouter',
  language = 'fr-FR',
  className = '',
  onPlayStateChange,
  showSpeedControl = true,
  showRepeatButton = true
}: TextToSpeechPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isSpeedControlOpen, setIsSpeedControlOpen] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Check browser support
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) {
      setIsSupported(false);
      setError('Synthèse vocale non supportée par votre navigateur');
    } else {
      synthRef.current = synth;
    }
  }, []);

  // Notify parent of play state changes
  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Handle play/pause
  const handlePlayPause = useCallback(async () => {
    try {
      setError(null);

      if (!isSupported || !synthRef.current) {
        setError('Synthèse vocale non disponible');
        return;
      }

      if (!text || text.trim().length === 0) {
        setError('Aucun texte à lire');
        return;
      }

      const synth = synthRef.current;

      if (isPlaying) {
        // Pause
        synth.pause();
        setIsPlaying(false);
        setIsSpeaking(false);
      } else {
        // Resume if paused, or start new
        if (synth.paused) {
          synth.resume();
          setIsPlaying(true);
        } else {
          // Cancel any existing utterance
          synth.cancel();

          // Create new utterance
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = language;
          utterance.rate = speed;
          utterance.volume = volume;
          utterance.pitch = 1;

          // Event handlers
          utterance.onstart = () => {
            setIsPlaying(true);
            setIsSpeaking(true);
          };

          utterance.onend = () => {
            setIsPlaying(false);
            setIsSpeaking(false);
          };

          utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
            console.error('Speech synthesis error:', event.error);
            setError(`Erreur: ${event.error}`);
            setIsPlaying(false);
            setIsSpeaking(false);
          };

          utterance.onpause = () => {
            setIsPlaying(false);
          };

          utterance.onresume = () => {
            setIsPlaying(true);
          };

          utteranceRef.current = utterance;
          synth.speak(utterance);
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Erreur lors de la synthèse vocale');
      setIsPlaying(false);
    }
  }, [text, isPlaying, language, speed, volume, isSupported]);

  // Handle stop/reset
  const handleStop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsSpeaking(false);
    }
  }, []);

  // Handle repeat
  const handleRepeat = useCallback(() => {
    handleStop();
    setTimeout(() => {
      handlePlayPause();
    }, 100);
  }, [handleStop, handlePlayPause]);

  // Handle volume change
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.currentTarget.value);
    setVolume(newVolume);
    if (utteranceRef.current) {
      utteranceRef.current.volume = newVolume;
    }
  }, []);

  // Handle speed change
  const handleSpeedChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(e.currentTarget.value);
    setSpeed(newSpeed);
    if (utteranceRef.current) {
      utteranceRef.current.rate = newSpeed;
    }
  }, []);

  // No text
  if (!text || text.trim().length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 px-4 py-3 bg-destructive/10 border border-destructive/30 rounded-lg ${className}`}
      >
        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
        <span className="text-sm text-destructive font-medium">Aucun texte à lire</span>
      </motion.div>
    );
  }

  // Not supported
  if (!isSupported) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 px-4 py-3 bg-destructive/10 border border-destructive/30 rounded-lg ${className}`}
      >
        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
        <span className="text-sm text-destructive font-medium">Synthèse vocale non supportée</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-3 ${className}`}
    >
      {/* Main Player Container */}
      <div className="bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/30 rounded-xl p-4 md:p-5 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
        
        {/* Title and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 min-w-0">
            <p className="font-heading text-sm md:text-base text-primary truncate flex items-center gap-2">
              <Zap className="w-4 h-4 flex-shrink-0" />
              {title}
            </p>
            <p className="font-paragraph text-xs text-foreground/60 mt-1">
              {isSpeaking ? '▶ En lecture...' : isPlaying ? '⏸ En pause...' : '▷ Prêt à écouter'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Play/Pause Button */}
          <motion.button
            onClick={handlePlayPause}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-full hover:shadow-lg hover:shadow-primary/50 active:scale-95 transition-all duration-200"
            title={isPlaying ? 'Pause' : 'Lecture'}
            aria-label={isPlaying ? 'Pause' : 'Lecture'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 md:w-7 md:h-7" />
            ) : (
              <Play className="w-6 h-6 md:w-7 md:h-7 ml-0.5" />
            )}
          </motion.button>

          {/* Stop Button */}
          <motion.button
            onClick={handleStop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-secondary/20 text-secondary hover:bg-secondary/30 rounded-lg transition-all duration-200"
            title="Arrêter"
            aria-label="Arrêter"
          >
            <div className="w-3 h-3 bg-secondary rounded-sm"></div>
          </motion.button>

          {/* Repeat Button */}
          {showRepeatButton && (
            <motion.button
              onClick={handleRepeat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-all duration-200"
              title="Répéter"
              aria-label="Répéter"
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          )}

          {/* Volume Control */}
          <div className="flex-1 flex items-center gap-2 min-w-[120px]">
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
                className="w-16 md:w-20 h-2 bg-primary/30 rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                title="Contrôle du volume"
                aria-label="Contrôle du volume"
              />
              <span className="text-xs text-foreground/70 font-semibold w-7 text-right">
                {Math.round(volume * 100)}%
              </span>
            </motion.div>
          </div>
        </div>

        {/* Speed Control */}
        {showSpeedControl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-4 border-t border-primary/20"
          >
            <div className="flex items-center justify-between gap-3">
              <label className="font-paragraph text-xs md:text-sm text-foreground/70 font-semibold">
                Vitesse
              </label>
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.25"
                  value={speed}
                  onChange={handleSpeedChange}
                  className="flex-1 h-2 bg-secondary/30 rounded-full appearance-none cursor-pointer accent-secondary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-secondary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                  title="Contrôle de vitesse"
                  aria-label="Contrôle de vitesse"
                />
                <span className="text-xs text-secondary font-semibold w-10 text-right">
                  {speed.toFixed(2)}x
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
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
      </AnimatePresence>
    </motion.div>
  );
}
