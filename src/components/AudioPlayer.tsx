import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, AlertCircle, Loader } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl?: string;
  title?: string;
  compact?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
  className?: string;
}

/**
 * AudioPlayer - Composant audio universel et robuste
 * 
 * Fonctionnalités:
 * - Play/Pause avec gestion d'état
 * - Contrôle de volume
 * - Gestion d'erreurs complète
 * - Support CORS
 * - Cleanup automatique
 * - Mode compact optionnel
 * 
 * Usage:
 * <AudioPlayer audioUrl={url} title="Mon audio" />
 * <AudioPlayer audioUrl={url} compact={true} />
 */
export default function AudioPlayer({ 
  audioUrl, 
  title = 'Audio', 
  compact = false,
  onPlayStateChange,
  className = ''
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, []);

  // Notify parent of play state changes
  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  // Initialize audio element
  const initializeAudio = useCallback(() => {
    if (audioRef.current) return;

    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'metadata';
    audio.volume = volume;

    // Event handlers
    audio.onloadstart = () => {
      setIsLoading(true);
      setError(null);
    };

    audio.oncanplay = () => {
      setIsLoading(false);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.onerror = (e) => {
      console.error('Audio error:', e);
      setError('Erreur de chargement audio');
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.ondurationchange = () => {
      setDuration(audio.duration || 0);
    };

    audioRef.current = audio;
  }, [volume]);

  // Handle play/pause
  const handlePlayPause = useCallback(async () => {
    try {
      setError(null);

      if (!audioUrl) {
        setError('Aucun fichier audio disponible');
        return;
      }

      // Initialize if needed
      if (!audioRef.current) {
        initializeAudio();
      }

      const audio = audioRef.current!;

      if (isPlaying) {
        // Pause
        audio.pause();
        setIsPlaying(false);
      } else {
        // Play
        if (audio.src !== audioUrl) {
          audio.src = audioUrl;
        }

        setIsLoading(true);
        try {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
          setIsPlaying(true);
        } catch (err: any) {
          console.error('Play error:', err);
          
          // Handle specific errors
          if (err.name === 'NotAllowedError') {
            setError('Lecture non autorisée');
          } else if (err.name === 'NotSupportedError') {
            setError('Format audio non supporté');
          } else {
            setError('Impossible de lire l\'audio');
          }
          setIsPlaying(false);
        } finally {
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Erreur lors de la lecture');
    }
  }, [audioUrl, isPlaying, initializeAudio]);

  // Handle volume change
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.currentTarget.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // Format time
  const formatTime = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // No audio URL
  if (!audioUrl) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 bg-destructive/10 border border-destructive/30 rounded-lg ${className}`}>
        <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
        <span className="text-xs text-destructive font-medium">Aucun fichier audio</span>
      </div>
    );
  }

  // Compact mode
  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title={isPlaying ? 'Pause' : 'Lecture'}
          aria-label={isPlaying ? 'Pause' : 'Lecture'}
        >
          {isLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>
        <span className="text-xs text-foreground/70 font-medium">
          {isLoading ? 'Chargement...' : isPlaying ? 'En lecture' : 'Écouter'}
        </span>
      </div>
    );
  }

  // Full mode
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Play/Pause and Status */}
      <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors">
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title={isPlaying ? 'Pause' : 'Lecture'}
          aria-label={isPlaying ? 'Pause' : 'Lecture'}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>

        <div className="flex-1">
          <p className="font-paragraph text-xs text-foreground/70 font-medium">
            {isLoading ? '⏳ Chargement...' : isPlaying ? '▶ En lecture...' : '▷ Cliquez pour écouter'}
          </p>
          {duration > 0 && (
            <p className="font-paragraph text-xs text-foreground/50 mt-0.5">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          )}
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3 px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors">
        <Volume2 className="w-5 h-5 text-primary flex-shrink-0" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-primary/30 rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
          title="Contrôle du volume"
          aria-label="Contrôle du volume"
        />
        <span className="text-xs text-foreground/70 font-semibold w-10 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-2 bg-destructive/20 border border-destructive/50 rounded-lg">
          <p className="text-xs text-destructive font-medium">⚠ {error}</p>
        </div>
      )}
    </div>
  );
}
