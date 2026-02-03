import { useState, useRef } from 'react';
import { Play, Pause, Download } from 'lucide-react';

interface ArtistAudioPlayerProps {
  previewMp3Url: string;
  hiResWavUrl?: string;
  artistName: string;
}

export default function ArtistAudioPlayer({
  previewMp3Url,
  hiResWavUrl,
  artistName,
}: ArtistAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [useWav, setUseWav] = useState(false);

  const currentSource = useWav && hiResWavUrl ? hiResWavUrl : previewMp3Url;

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  const handleSourceChange = () => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setUseWav(!useWav);
      
      // Reload the audio element with new source
      audioRef.current.load();
      
      if (wasPlaying) {
        setTimeout(() => {
          audioRef.current?.play();
          setIsPlaying(true);
        }, 100);
      }
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mt-6 pt-6 border-t border-border">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="none"
      >
        <source src={currentSource} type={useWav ? 'audio/wav' : 'audio/mpeg'} />
      </audio>

      {/* Player Controls */}
      <div className="flex items-center gap-4 mb-4">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold text-gold hover:bg-gold hover:text-obsidian transition-all duration-200 rounded-sm"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause size={18} />
          ) : (
            <Play size={18} className="ml-0.5" />
          )}
        </button>

        {/* Progress Bar */}
        <div className="flex-1 flex flex-col gap-2">
          <div
            onClick={handleProgressClick}
            className="h-1 bg-border rounded-full cursor-pointer hover:bg-muted transition-colors"
            role="slider"
            aria-label="Audio progress"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
          >
            <div
              className="h-full bg-gold rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-body text-muted">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* WAV Toggle and Download */}
      {hiResWavUrl && (
        <div className="flex items-center gap-3 text-xs font-body">
          <button
            onClick={handleSourceChange}
            className={`px-3 py-1 border rounded-sm transition-all ${
              useWav
                ? 'border-gold text-gold bg-gold bg-opacity-10'
                : 'border-muted text-muted hover:border-gold hover:text-gold'
            }`}
          >
            HI-RES WAV
          </button>
          <a
            href={hiResWavUrl}
            download={`${artistName}-excerpt.wav`}
            className="flex items-center gap-1 text-muted hover:text-gold transition-colors"
            aria-label={`Download WAV for ${artistName}`}
          >
            <Download size={14} />
            <span>Download</span>
          </a>
        </div>
      )}
    </div>
  );
}
