import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, AlertCircle } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string | undefined;
  title: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export default function AudioPlayer({ audioUrl, title, onPlayStateChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Notify parent of play state changes
  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  if (!audioUrl) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-destructive/10 border border-destructive/30 rounded-lg">
        <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
        <span className="text-xs text-destructive font-medium">Aucun fichier audio</span>
      </div>
    );
  }

  const handlePlayPause = async () => {
    try {
      setError(null);

      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (!audioRef.current) {
          const audio = new Audio();
          audio.crossOrigin = 'anonymous';
          audio.preload = 'auto';
          audio.volume = volume;

          audio.onended = () => setIsPlaying(false);
          audio.onerror = () => {
            setError('Erreur de chargement audio');
            setIsPlaying(false);
          };
          audio.onloadstart = () => setIsLoading(true);
          audio.oncanplay = () => setIsLoading(false);

          audioRef.current = audio;
        }

        if (audioRef.current.src !== audioUrl) {
          audioRef.current.src = audioUrl;
        }

        setIsLoading(true);
        try {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
          setIsPlaying(true);
        } catch (err) {
          console.error('Erreur de lecture:', err);
          setError('Impossible de lire l\'audio');
          setIsPlaying(false);
        }
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors de la lecture');
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.currentTarget.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="space-y-2">
      {/* Play/Pause Button and Volume Control */}
      <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors">
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title={isPlaying ? 'Pause' : 'Lecture'}
          aria-label={isPlaying ? 'Pause' : 'Lecture'}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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
