/**
 * AudioDiagnostics - Outil de diagnostic complet pour les problèmes audio
 * 
 * Ce composant teste:
 * - Disponibilité des fichiers audio
 * - Support du navigateur
 * - Permissions CORS
 * - Connectivité réseau
 * - Formats audio supportés
 */

import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { MusicShowcase, RitualChants } from '@/entities';
import { AlertCircle, CheckCircle, XCircle, Loader } from 'lucide-react';

interface DiagnosticResult {
  name: string;
  status: 'success' | 'error' | 'warning' | 'loading';
  message: string;
  details?: string;
}

export default function AudioDiagnostics() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setIsRunning(true);
    const newResults: DiagnosticResult[] = [];

    // Test 1: Browser Audio Support
    newResults.push(testBrowserSupport());

    // Test 2: Audio API Support
    newResults.push(testAudioAPI());

    // Test 3: Load Music Showcase Data
    const musicResult = await testMusicShowcaseData();
    newResults.push(musicResult);

    // Test 4: Load Ritual Chants Data
    const chantsResult = await testRitualChantsData();
    newResults.push(chantsResult);

    // Test 5: Test CORS and Audio URLs
    if (musicResult.status === 'success') {
      const corsResults = await testAudioURLs();
      newResults.push(...corsResults);
    }

    setResults(newResults);
    setIsRunning(false);
  };

  const testBrowserSupport = (): DiagnosticResult => {
    const audio = new Audio();
    const canPlayMp3 = audio.canPlayType('audio/mpeg') !== '';
    const canPlayWav = audio.canPlayType('audio/wav') !== '';
    const canPlayOgg = audio.canPlayType('audio/ogg') !== '';

    const supportedFormats = [
      canPlayMp3 && 'MP3',
      canPlayWav && 'WAV',
      canPlayOgg && 'OGG',
    ].filter(Boolean).join(', ');

    return {
      name: '🌐 Support du Navigateur',
      status: supportedFormats ? 'success' : 'error',
      message: supportedFormats ? `Formats supportés: ${supportedFormats}` : 'Aucun format audio supporté',
    };
  };

  const testAudioAPI = (): DiagnosticResult => {
    const hasAudioContext = !!(window.AudioContext || (window as any).webkitAudioContext);
    const hasAudio = typeof Audio !== 'undefined';

    return {
      name: '🎵 API Audio',
      status: hasAudio && hasAudioContext ? 'success' : 'warning',
      message: hasAudio ? 'API Audio disponible' : 'API Audio non disponible',
      details: `AudioContext: ${hasAudioContext ? '✓' : '✗'}`,
    };
  };

  const testMusicShowcaseData = async (): Promise<DiagnosticResult> => {
    try {
      const { items } = await BaseCrudService.getAll<MusicShowcase>('musicshowcase');
      const withAudio = items.filter(item => item.audioUrl || item.audio).length;

      return {
        name: '🎼 Données Music Showcase',
        status: items.length > 0 ? 'success' : 'warning',
        message: `${items.length} pistes trouvées`,
        details: `${withAudio} avec audio`,
      };
    } catch (error) {
      return {
        name: '🎼 Données Music Showcase',
        status: 'error',
        message: 'Erreur lors du chargement',
        details: String(error),
      };
    }
  };

  const testRitualChantsData = async (): Promise<DiagnosticResult> => {
    try {
      const { items } = await BaseCrudService.getAll<RitualChants>('ritualchants');
      const withAudio = items.filter(item => item.audio).length;

      return {
        name: '🎶 Données Ritual Chants',
        status: items.length > 0 ? 'success' : 'warning',
        message: `${items.length} chants trouvés`,
        details: `${withAudio} avec audio`,
      };
    } catch (error) {
      return {
        name: '🎶 Données Ritual Chants',
        status: 'error',
        message: 'Erreur lors du chargement',
        details: String(error),
      };
    }
  };

  const testAudioURLs = async (): Promise<DiagnosticResult[]> => {
    const results: DiagnosticResult[] = [];

    try {
      const { items: musicItems } = await BaseCrudService.getAll<MusicShowcase>('musicshowcase');
      
      for (const item of musicItems.slice(0, 3)) {
        const url = item.audioUrl || item.audio;
        if (url) {
          const result = await testAudioURL(url, item.trackTitle || 'Sans titre');
          results.push(result);
        }
      }
    } catch (error) {
      results.push({
        name: '🔗 Test URLs Audio',
        status: 'error',
        message: 'Erreur lors du test des URLs',
        details: String(error),
      });
    }

    return results;
  };

  const testAudioURL = async (url: string, title: string): Promise<DiagnosticResult> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';

      const timeout = setTimeout(() => {
        audio.pause();
        resolve({
          name: `🔗 ${title}`,
          status: 'error',
          message: 'Timeout - Fichier inaccessible',
          details: url,
        });
      }, 5000);

      audio.oncanplay = () => {
        clearTimeout(timeout);
        audio.pause();
        resolve({
          name: `🔗 ${title}`,
          status: 'success',
          message: 'Fichier accessible et jouable',
          details: `Durée: ${audio.duration.toFixed(2)}s`,
        });
      };

      audio.onerror = () => {
        clearTimeout(timeout);
        resolve({
          name: `🔗 ${title}`,
          status: 'error',
          message: 'Erreur CORS ou fichier invalide',
          details: url,
        });
      };

      audio.src = url;
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'loading':
        return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 bg-background border border-primary/30 rounded-lg shadow-2xl overflow-hidden z-50">
      <div className="bg-primary/20 p-4 border-b border-primary/30">
        <h3 className="font-heading text-lg text-primary flex items-center gap-2">
          🔧 Diagnostic Audio
          {isRunning && <Loader className="w-4 h-4 animate-spin" />}
        </h3>
      </div>

      <div className="overflow-y-auto max-h-80 p-4 space-y-3">
        {results.length === 0 ? (
          <p className="text-foreground/50 text-sm">Chargement du diagnostic...</p>
        ) : (
          results.map((result, idx) => (
            <div key={idx} className="border border-primary/20 rounded p-3 bg-background/50">
              <div className="flex items-start gap-3">
                {getStatusIcon(result.status)}
                <div className="flex-1">
                  <p className="font-paragraph font-semibold text-sm text-foreground">
                    {result.name}
                  </p>
                  <p className="font-paragraph text-xs text-foreground/70 mt-1">
                    {result.message}
                  </p>
                  {result.details && (
                    <p className="font-paragraph text-xs text-foreground/50 mt-1 break-all">
                      {result.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-primary/30 p-4 bg-background/50">
        <button
          onClick={runDiagnostics}
          disabled={isRunning}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded font-paragraph text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isRunning ? 'Diagnostic en cours...' : 'Relancer le diagnostic'}
        </button>
      </div>
    </div>
  );
}
