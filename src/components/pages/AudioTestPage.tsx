import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { RitualChants, ArtistPortfolio, MusicShowcase, AuthorVideoManagement } from '@/entities';
import UniversalAudioPlayer from '@/components/UniversalAudioPlayer';
import { AlertCircle, CheckCircle, XCircle, Loader } from 'lucide-react';

interface AudioItem {
  id: string;
  title: string;
  source: string;
  url: string;
  type: 'chant' | 'artist' | 'music' | 'video';
  status: 'pending' | 'loading' | 'success' | 'error';
  error?: string;
}

export default function AudioTestPage() {
  const [audioItems, setAudioItems] = useState<AudioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    error: 0,
    pending: 0
  });

  useEffect(() => {
    loadAllAudio();
  }, []);

  const loadAllAudio = async () => {
    setIsLoading(true);
    const items: AudioItem[] = [];

    try {
      // Load Ritual Chants
      const { items: chants } = await BaseCrudService.getAll<RitualChants>('ritualchants');
      chants.forEach((chant) => {
        if (chant.audio) {
          items.push({
            id: chant._id,
            title: chant.chantTitle || 'Untitled Chant',
            source: 'Ritual Chants',
            url: chant.audio,
            type: 'chant',
            status: 'pending'
          });
        }
      });

      // Load Artist Portfolio
      const { items: artists } = await BaseCrudService.getAll<ArtistPortfolio>('artistportfolio');
      artists.forEach((artist) => {
        if (artist.audioUrl) {
          items.push({
            id: artist._id,
            title: artist.artistName || 'Untitled Artist',
            source: 'Artist Portfolio',
            url: artist.audioUrl,
            type: 'artist',
            status: 'pending'
          });
        }
        if (artist.audio) {
          items.push({
            id: `${artist._id}-audio`,
            title: `${artist.artistName || 'Artist'} (Audio Field)`,
            source: 'Artist Portfolio',
            url: artist.audio,
            type: 'artist',
            status: 'pending'
          });
        }
      });

      // Load Music Showcase
      const { items: music } = await BaseCrudService.getAll<MusicShowcase>('musicshowcase');
      music.forEach((track) => {
        if (track.audioUrl) {
          items.push({
            id: track._id,
            title: track.trackTitle || 'Untitled Track',
            source: 'Music Showcase',
            url: track.audioUrl,
            type: 'music',
            status: 'pending'
          });
        }
        if (track.audio) {
          items.push({
            id: `${track._id}-audio`,
            title: `${track.trackTitle || 'Track'} (Audio Field)`,
            source: 'Music Showcase',
            url: track.audio,
            type: 'music',
            status: 'pending'
          });
        }
        if (track.audio1) {
          items.push({
            id: `${track._id}-audio1`,
            title: `${track.trackTitle || 'Track'} (Audio 1 Field)`,
            source: 'Music Showcase',
            url: track.audio1,
            type: 'music',
            status: 'pending'
          });
        }
      });

      // Load Author Video Management
      const { items: videos } = await BaseCrudService.getAll<AuthorVideoManagement>('gestionvideoauteur');
      videos.forEach((video) => {
        if (video.video) {
          items.push({
            id: video._id,
            title: video.videoTitle || 'Untitled Video',
            source: 'Author Video Management',
            url: video.video,
            type: 'video',
            status: 'pending'
          });
        }
      });

      setAudioItems(items);
      updateStats(items);
    } catch (error) {
      console.error('Error loading audio items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStats = (items: AudioItem[]) => {
    setStats({
      total: items.length,
      success: items.filter(i => i.status === 'success').length,
      error: items.filter(i => i.status === 'error').length,
      pending: items.filter(i => i.status === 'pending').length
    });
  };

  const handlePlayStateChange = (itemId: string, isPlaying: boolean) => {
    setAudioItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, status: isPlaying ? 'loading' : 'success' }
        : item
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'loading':
        return <Loader className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'chant':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'artist':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'music':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'video':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-32 pb-16 sm:pb-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest mb-6 sm:mb-8 font-light">
            AUDIO TEST
          </h1>
          <p className="text-sm sm:text-base md:text-lg tracking-wide text-stone-400 mb-4 px-2">
            Comprehensive audio playback testing for all collections
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-8 sm:mt-12"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-lg p-4 text-center"
            >
              <p className="text-2xl font-bold text-primary mb-1">{stats.total}</p>
              <p className="text-xs text-stone-400 uppercase tracking-wide">Total Audio Files</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-4 text-center"
            >
              <p className="text-2xl font-bold text-green-400 mb-1">{stats.success}</p>
              <p className="text-xs text-stone-400 uppercase tracking-wide">Loaded</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 text-center"
            >
              <p className="text-2xl font-bold text-yellow-400 mb-1">{stats.pending}</p>
              <p className="text-xs text-stone-400 uppercase tracking-wide">Pending</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg p-4 text-center"
            >
              <p className="text-2xl font-bold text-red-400 mb-1">{stats.error}</p>
              <p className="text-xs text-stone-400 uppercase tracking-wide">Errors</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Audio Items Section */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-4 text-stone-400">Loading audio files...</span>
            </div>
          ) : audioItems.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle className="w-12 h-12 text-stone-500 mx-auto mb-4" />
              <p className="text-stone-400 tracking-wide">No audio files found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {audioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-r from-stone-950 to-stone-900 border border-stone-800 rounded-lg p-6 hover:border-stone-700 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0">
                          {getStatusIcon(item.status)}
                        </div>
                        <h3 className="font-heading text-lg tracking-wide text-white">
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(item.type)} uppercase tracking-wide font-semibold`}>
                          {item.type}
                        </span>
                        <span className="text-xs text-stone-500 tracking-wide">
                          {item.source}
                        </span>
                        <span className="text-xs text-stone-600 font-mono truncate max-w-xs">
                          {item.url}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Audio Player */}
                  <div className="mt-4">
                    <UniversalAudioPlayer
                      audioUrl={item.url}
                      title={item.title}
                      subtitle={item.source}
                      compact={false}
                      showDownload={true}
                      onPlayStateChange={(isPlaying) => handlePlayStateChange(item.id, isPlaying)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Legend Section */}
      <section className="px-4 md:px-8 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl tracking-widest mb-8 font-light">LEGEND</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded border bg-purple-500/20 text-purple-300 border-purple-500/30 uppercase tracking-wide font-semibold">
                  Chant
                </span>
              </div>
              <p className="text-xs text-stone-500">Ritual Chants collection</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded border bg-blue-500/20 text-blue-300 border-blue-500/30 uppercase tracking-wide font-semibold">
                  Artist
                </span>
              </div>
              <p className="text-xs text-stone-500">Artist Portfolio collection</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded border bg-green-500/20 text-green-300 border-green-500/30 uppercase tracking-wide font-semibold">
                  Music
                </span>
              </div>
              <p className="text-xs text-stone-500">Music Showcase collection</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded border bg-orange-500/20 text-orange-300 border-orange-500/30 uppercase tracking-wide font-semibold">
                  Video
                </span>
              </div>
              <p className="text-xs text-stone-500">Author Video Management</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
