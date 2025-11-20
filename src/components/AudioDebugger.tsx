/**
 * AudioDebugger - Console de débogage pour l'audio
 * Affiche les URLs audio réelles et les erreurs en temps réel
 */

import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { MusicShowcase, RitualChants } from '@/entities';
import { ChevronDown, ChevronUp, Copy, ExternalLink } from 'lucide-react';

interface AudioItem {
  id: string;
  title: string;
  audioUrl?: string;
  audio?: string;
  source: 'musicshowcase' | 'ritualchants';
}

export default function AudioDebugger() {
  const [isOpen, setIsOpen] = useState(false);
  const [audioItems, setAudioItems] = useState<AudioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadAudioItems();
  }, []);

  const loadAudioItems = async () => {
    setIsLoading(true);
    const items: AudioItem[] = [];

    try {
      // Load Music Showcase
      const { items: musicItems } = await BaseCrudService.getAll<MusicShowcase>('musicshowcase');
      musicItems.forEach(item => {
        if (item.audioUrl || item.audio) {
          items.push({
            id: item._id,
            title: item.trackTitle || 'Sans titre',
            audioUrl: item.audioUrl,
            audio: item.audio,
            source: 'musicshowcase',
          });
        }
      });

      // Load Ritual Chants
      const { items: chantItems } = await BaseCrudService.getAll<RitualChants>('ritualchants');
      chantItems.forEach(item => {
        if (item.audio) {
          items.push({
            id: item._id,
            title: item.chantTitle || 'Sans titre',
            audio: item.audio,
            source: 'ritualchants',
          });
        }
      });
    } catch (error) {
      console.error('Error loading audio items:', error);
    }

    setAudioItems(items);
    setIsLoading(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const testAudioURL = async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="fixed bottom-4 left-4 w-96 bg-background border border-secondary/30 rounded-lg shadow-2xl z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-secondary/20 border-b border-secondary/30 hover:bg-secondary/30 transition-colors"
      >
        <h3 className="font-heading text-lg text-secondary">🎵 Audio Debug</h3>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="max-h-96 overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <p className="text-foreground/50 text-sm">Chargement...</p>
          ) : audioItems.length === 0 ? (
            <p className="text-foreground/50 text-sm">Aucun fichier audio trouvé</p>
          ) : (
            audioItems.map((item) => {
              const url = item.audioUrl || item.audio;
              return (
                <div key={item.id} className="border border-secondary/20 rounded p-3 bg-background/50">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <p className="font-paragraph font-semibold text-sm text-foreground">
                        {item.title}
                      </p>
                      <p className="font-paragraph text-xs text-foreground/50 mt-1">
                        {item.source}
                      </p>
                    </div>
                  </div>

                  {url && (
                    <div className="space-y-2">
                      <div className="bg-background/80 p-2 rounded border border-secondary/10">
                        <p className="font-mono text-xs text-secondary break-all">{url}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(url, item.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-secondary/20 hover:bg-secondary/30 rounded text-xs font-semibold text-secondary transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                          {copiedId === item.id ? 'Copié!' : 'Copier'}
                        </button>

                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-secondary/20 hover:bg-secondary/30 rounded text-xs font-semibold text-secondary transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Ouvrir
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}

          <button
            onClick={loadAudioItems}
            className="w-full px-3 py-2 bg-secondary/20 hover:bg-secondary/30 rounded font-paragraph text-sm font-semibold text-secondary transition-colors"
          >
            Actualiser
          </button>
        </div>
      )}
    </div>
  );
}
