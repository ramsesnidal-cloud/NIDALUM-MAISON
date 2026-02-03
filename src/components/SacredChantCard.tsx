import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download } from 'lucide-react';
import { SacredChant } from '@/content/sacredChants';

interface SacredChantCardProps {
  chant: SacredChant;
}

export default function SacredChantCard({ chant }: SacredChantCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [useWav, setUseWav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentSource = useWav ? chant.hiResWavUrl : chant.previewMp3Url;
  const sourceType = useWav ? 'audio/wav' : 'audio/mpeg';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleWavToggle = () => {
    const audio = audioRef.current;
    if (audio && !useWav && chant.hiResWavUrl) {
      const wasPlaying = isPlaying;
      audio.pause();
      setUseWav(true);
      if (wasPlaying) {
        setTimeout(() => audio.play(), 100);
      }
    } else if (useWav) {
      const wasPlaying = isPlaying;
      audio?.pause();
      setUseWav(false);
      if (wasPlaying) {
        setTimeout(() => audio?.play(), 100);
      }
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getEnergyColor = (tag: string) => {
    const colors: Record<string, string> = {
      'Invocation': 'bg-gold/20 text-gold border border-gold/30',
      'Veil': 'bg-muted/20 text-muted border border-muted/30',
      'Fire': 'bg-oxblood/20 text-oxblood border border-oxblood/30',
      'Salt': 'bg-ivory/10 text-ivory border border-ivory/20',
      'Memory': 'bg-gold/20 text-gold border border-gold/30',
      'Silence': 'bg-muted/20 text-muted border border-muted/30',
    };
    return colors[tag] || 'bg-muted/20 text-muted border border-muted/30';
  };

  return (
    <div className="border border-border rounded-lg p-6 bg-night/50 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-heading text-xl text-ivory mb-2">{chant.title}</h3>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-2 py-1 rounded-sm ${getEnergyColor(chant.energyTag)}`}>
            {chant.energyTag}
          </span>
          <span className="text-sm text-muted">{chant.duration}</span>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        preload="none"
        crossOrigin="anonymous"
      >
        <source src={currentSource} type={sourceType} />
      </audio>

      {/* Player Controls */}
      <div className="space-y-3">
        {/* Play/Pause and Progress */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlayPause}
            disabled={isLoading}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-sm border border-gold/30 hover:border-gold hover:bg-gold/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause size={16} className="text-gold" />
            ) : (
              <Play size={16} className="text-gold ml-0.5" />
            )}
          </button>

          {/* Progress Bar */}
          <div className="flex-1 flex items-center gap-2">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 h-1 bg-border rounded-full appearance-none cursor-pointer accent-gold"
              aria-label="Seek"
            />
            <span className="text-xs text-muted whitespace-nowrap w-10 text-right">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-2">
          {/* HI-RES WAV Toggle */}
          {chant.hiResWavUrl && (
            <button
              onClick={handleWavToggle}
              className={`text-xs px-2 py-1 rounded-sm border transition-colors ${
                useWav
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-border text-muted hover:border-gold/50 hover:text-ivory'
              }`}
              aria-pressed={useWav}
            >
              HI-RES WAV
            </button>
          )}

          {/* Download Link */}
          {chant.hiResWavUrl && (
            <a
              href={chant.hiResWavUrl}
              download
              className="text-xs text-muted hover:text-gold transition-colors flex items-center gap-1 ml-auto"
              aria-label="Download WAV"
            >
              <Download size={12} />
              <span>Download</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
