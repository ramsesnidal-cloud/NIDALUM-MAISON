import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, AlertTriangle, Play, Pause } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ModernAudioPlayer from '@/components/ModernAudioPlayer';
import UniversalAudioPlayer from '@/components/UniversalAudioPlayer';
import { BaseCrudService } from '@/integrations';
import { RitualChants, ArtistPortfolio, MusicShowcase } from '@/entities';

interface AudioTestResult {
  id: string;
  name: string;
  type: 'chant' | 'artist' | 'music' | 'test';
  audioUrl?: string;
  status: 'pending' | 'loading' | 'success' | 'error';
  error?: string;
  duration?: number;
  canPlay?: boolean;
}

export default function AudioPlayerTestPage() {
  const [testResults, setTestResults] = useState<AudioTestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'idle' | 'running' | 'completed'>('idle');

  useEffect(() => {
    loadAllAudioData();
  }, []);

  const loadAllAudioData = async () => {
    try {
      const results: AudioTestResult[] = [];

      // Load Chants
      const { items: chants } = await BaseCrudService.getAll<RitualChants>('ritualchants');
      chants.forEach((chant, idx) => {
        if (chant.audio || chant.audio1 || chant.url) {
          results.push({
            id: `chant-${chant._id}`,
            name: `Chant: ${chant.chantTitle || `Chant ${idx + 1}`}`,
            type: 'chant',
            audioUrl: chant.audio || chant.audio1 || chant.url,
            status: 'pending'
          });
        }
      });

      // Load Artists
      const { items: artists } = await BaseCrudService.getAll<ArtistPortfolio>('artistportfolio');
      artists.forEach((artist, idx) => {
        if (artist.audio || artist.audioUrl || artist.audioFile) {
          results.push({
            id: `artist-${artist._id}`,
            name: `Artist: ${artist.artistName || `Artist ${idx + 1}`}`,
            type: 'artist',
            audioUrl: artist.audio || artist.audioUrl || artist.audioFile,
            status: 'pending'
          });
        }
      });

      // Load Music Showcase
      const { items: music } = await BaseCrudService.getAll<MusicShowcase>('musicshowcase');
      music.forEach((track, idx) => {
        if (track.audio || track.audio1 || track.audioUrl) {
          results.push({
            id: `music-${track._id}`,
            name: `Music: ${track.trackTitle || `Track ${idx + 1}`}`,
            type: 'music',
            audioUrl: track.audio || track.audio1 || track.audioUrl,
            status: 'pending'
          });
        }
      });

      // Add test audio URLs
      results.push({
        id: 'test-1',
        name: 'Test: Sample MP3',
        type: 'test',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        status: 'pending'
      });

      results.push({
        id: 'test-2',
        name: 'Test: Sample WAV',
        type: 'test',
        audioUrl: 'https://www.soundhelix.com/examples/wav/SoundHelix-Song-2.wav',
        status: 'pending'
      });

      setTestResults(results);
    } catch (err) {
      console.error('Error loading audio data:', err);
    }
  };

  const testAudioUrl = async (url: string): Promise<{ canPlay: boolean; duration?: number; error?: string }> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      
      let resolved = false;
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          audio.pause();
          resolve({ canPlay: false, error: 'Timeout' });
        }
      }, 10000);

      audio.oncanplay = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          audio.pause();
          resolve({ canPlay: true, duration: audio.duration });
        }
      };

      audio.onerror = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          resolve({ canPlay: false, error: audio.error?.message || 'Unknown error' });
        }
      };

      audio.onloadedmetadata = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          audio.pause();
          resolve({ canPlay: true, duration: audio.duration });
        }
      };

      audio.src = url;
      audio.load();
    });
  };

  const runTests = async () => {
    setIsRunning(true);
    setOverallStatus('running');

    for (let i = 0; i < testResults.length; i++) {
      const result = testResults[i];
      
      setTestResults(prev => 
        prev.map(r => r.id === result.id ? { ...r, status: 'loading' } : r)
      );

      if (!result.audioUrl) {
        setTestResults(prev => 
          prev.map(r => r.id === result.id ? { ...r, status: 'error', error: 'No audio URL' } : r)
        );
        continue;
      }

      try {
        const testResult = await testAudioUrl(result.audioUrl);
        
        setTestResults(prev => 
          prev.map(r => r.id === result.id ? {
            ...r,
            status: testResult.canPlay ? 'success' : 'error',
            error: testResult.error,
            duration: testResult.duration,
            canPlay: testResult.canPlay
          } : r)
        );
      } catch (err: any) {
        setTestResults(prev => 
          prev.map(r => r.id === result.id ? {
            ...r,
            status: 'error',
            error: err.message || 'Unknown error'
          } : r)
        );
      }

      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsRunning(false);
    setOverallStatus('completed');
  };

  const successCount = testResults.filter(r => r.status === 'success').length;
  const errorCount = testResults.filter(r => r.status === 'error').length;
  const pendingCount = testResults.filter(r => r.status === 'pending').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'loading':
        return <Play className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/10 border-green-500/30';
      case 'error':
        return 'bg-red-500/10 border-red-500/30';
      case 'loading':
        return 'bg-yellow-500/10 border-yellow-500/30';
      default:
        return 'bg-gray-500/10 border-gray-500/30';
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
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-widest mb-6 sm:mb-8 font-light">
            AUDIO TEST
          </h1>
          <p className="text-sm sm:text-base md:text-lg tracking-wide text-stone-400 mb-4 px-2">
            Comprehensive audio player testing across all collections
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-8 sm:mt-12"></div>
        </motion.div>
      </section>

      {/* Test Summary */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/30 rounded-lg p-6"
            >
              <p className="text-sm text-foreground/60 mb-2">Total Tests</p>
              <p className="font-heading text-3xl text-primary">{testResults.length}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-500/15 to-green-500/5 border border-green-500/30 rounded-lg p-6"
            >
              <p className="text-sm text-foreground/60 mb-2">Success</p>
              <p className="font-heading text-3xl text-green-500">{successCount}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-red-500/15 to-red-500/5 border border-red-500/30 rounded-lg p-6"
            >
              <p className="text-sm text-foreground/60 mb-2">Errors</p>
              <p className="font-heading text-3xl text-red-500">{errorCount}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-yellow-500/15 to-yellow-500/5 border border-yellow-500/30 rounded-lg p-6"
            >
              <p className="text-sm text-foreground/60 mb-2">Pending</p>
              <p className="font-heading text-3xl text-yellow-500">{pendingCount}</p>
            </motion.div>
          </div>

          {/* Run Tests Button */}
          <motion.button
            onClick={runTests}
            disabled={isRunning}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-lg font-heading tracking-wider hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isRunning ? '⏳ Running Tests...' : '▶ Run All Tests'}
          </motion.button>
        </div>
      </section>

      {/* Test Results */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl tracking-widest mb-8 font-light">
            TEST RESULTS
          </h2>

          <div className="space-y-4">
            {testResults.map((result, idx) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`border rounded-lg p-4 md:p-6 transition-all duration-300 ${getStatusColor(result.status)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(result.status)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-sm md:text-base text-primary truncate">
                          {result.name}
                        </h3>
                        <p className="text-xs text-foreground/60 mt-1">
                          Type: {result.type} | ID: {result.id}
                        </p>
                      </div>
                    </div>

                    {result.status === 'success' && result.duration && (
                      <p className="text-xs text-green-400 mt-2">
                        ✓ Duration: {Math.round(result.duration)}s
                      </p>
                    )}

                    {result.status === 'error' && result.error && (
                      <p className="text-xs text-red-400 mt-2">
                        ✗ Error: {result.error}
                      </p>
                    )}

                    {result.audioUrl && (
                      <p className="text-xs text-foreground/50 mt-2 truncate">
                        URL: {result.audioUrl.substring(0, 60)}...
                      </p>
                    )}
                  </div>

                  {result.status === 'success' && result.audioUrl && (
                    <div className="flex-shrink-0 w-full md:w-64 mt-4 md:mt-0">
                      <ModernAudioPlayer
                        audioUrl={result.audioUrl}
                        title={result.name}
                        className="text-xs"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {testResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <AlertCircle className="w-12 h-12 text-foreground/40 mx-auto mb-4" />
              <p className="text-foreground/60">No audio files found in collections</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Player Showcase */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl tracking-widest mb-8 font-light">
            PLAYER SHOWCASE
          </h2>

          <div className="space-y-8">
            {/* ModernAudioPlayer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/30 rounded-lg p-6"
            >
              <h3 className="font-heading text-lg md:text-xl text-primary mb-4">
                ModernAudioPlayer
              </h3>
              <ModernAudioPlayer
                audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                title="Modern Player Test"
              />
            </motion.div>

            {/* UniversalAudioPlayer - Full Mode */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/30 rounded-lg p-6"
            >
              <h3 className="font-heading text-lg md:text-xl text-primary mb-4">
                UniversalAudioPlayer - Full Mode
              </h3>
              <UniversalAudioPlayer
                audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
                title="Universal Player Test"
                subtitle="Full mode with all features"
              />
            </motion.div>

            {/* UniversalAudioPlayer - Compact Mode */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/30 rounded-lg p-6"
            >
              <h3 className="font-heading text-lg md:text-xl text-primary mb-4">
                UniversalAudioPlayer - Compact Mode
              </h3>
              <UniversalAudioPlayer
                audioUrl="https://www.soundhelix.com/examples/wav/SoundHelix-Song-3.wav"
                title="Compact Player"
                compact={true}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
