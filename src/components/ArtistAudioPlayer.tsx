import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Loader } from 'lucide-react';
import { useAudioPlayback } from '@/lib/audio-playback-store';

interface ArtistAudioPlayerProps {
  previewMp3Url: string;
  hiResWavUrl?: string;
  artistName: string;
  playerId: string;
}

export default function ArtistAudioPlayer({
  previewMp3Url,
  hiResWavUrl,
  artistName,
  playerId,
}: ArtistAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [useWav, setUseWav] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  
  const { activePlayerId, setActivePlayer, isPlayerActive } = useAudioPlayback();
  const isThisPlayerActive = isPlayerActive(playerId);

  const currentSource = useWav && hiResWavUrl ? hiResWavUrl : previewMp3Url;

  // Stop other players when this one plays
  useEffect(() => {
    if (isPlaying && !isThisPlayerActive) {
      setActivePlayer(playerId);
    }
  }, [isPlaying, isThisPlayerActive, playerId, setActivePlayer]);

  // Pause this player if another player starts
  useEffect(() => {
    if (activePlayerId && activePlayerId !== playerId && isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [activePlayerId, playerId, isPlaying]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setActivePlayer(null);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
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
      setIsBuffering(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setActivePlayer(null);
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

  const handleWaitingForData = () => {
    setIsBuffering(true);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="pt-3 border-t border-border">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onWaiting={handleWaitingForData}
        onCanPlay={() => setIsBuffering(false)}
        preload="none"
      >
        <source src={currentSource} type={useWav ? 'audio/wav' : 'audio/mpeg'} />
      </audio>

      {/* Player Controls - Compact single line */}
      <div className="flex items-center gap-3 mb-2">
        {/* Play/Pause Button with Loading State */}
        <button
          onClick={handlePlayPause}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-border text-muted hover:border-gold hover:text-gold transition-all duration-200 rounded-sm"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          disabled={isBuffering}
        >
          {isBuffering ? (
            <Loader size={16} className="animate-spin" />
          ) : isPlaying ? (
            <Pause size={16} />
          ) : (
            <Play size={16} className="ml-0.5" />
          )}
        </button>

        {/* Progress Bar - 1px thickness */}
        <div className="flex-1 flex flex-col gap-1">
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
              className="h-full bg-muted rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-body text-muted">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* WAV Toggle and Download - Only show download when WAV is active */}
      {hiResWavUrl && (
        <div className="flex items-center gap-2 text-xs font-body">
          <button
            onClick={handleSourceChange}
            className={`px-2 py-0.5 border rounded-sm transition-all text-xs ${
              useWav
                ? 'border-gold text-gold bg-gold bg-opacity-10'
                : 'border-muted text-muted hover:border-gold hover:text-gold'
            }`}
          >
            HI-RES
          </button>
          {useWav && (
            <a
              href={hiResWavUrl}
              download={`${artistName}-excerpt.wav`}
              className="flex items-center gap-1 text-muted hover:text-gold transition-colors"
              aria-label={`Download WAV for ${artistName}`}
            >
              <Download size={12} />
              <span>Download</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
