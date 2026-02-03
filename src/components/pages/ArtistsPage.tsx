import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import ArtistAudioPlayer from '@/components/ArtistAudioPlayer';

interface Artist {
  id: number;
  name: string;
  role: string;
  description: string;
  portraitUrl: string;
  portraitAlt: string;
  previewMp3Url: string;
  hiResWavUrl?: string;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize with placeholder data including audio URLs
    const artistData: Artist[] = [
      {
        id: 1,
        name: 'Artist 01',
        role: 'Voice',
        description: 'Keeper of the first utterance.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 01, Voice',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_01.mp3',
        hiResWavUrl: 'https://static.wixstatic.com/media/12d367_audio_excerpt_01_hires.wav',
      },
      {
        id: 2,
        name: 'Artist 02',
        role: 'Weaver',
        description: 'Threads the sacred into form.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 02, Weaver',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_02.mp3',
        hiResWavUrl: 'https://static.wixstatic.com/media/12d367_audio_excerpt_02_hires.wav',
      },
      {
        id: 3,
        name: 'Artist 03',
        role: 'Herald',
        description: 'Announces what cannot be named.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 03, Herald',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_03.mp3',
      },
      {
        id: 4,
        name: 'Artist 04',
        role: 'Scribe',
        description: 'Records the unrecordable.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 04, Scribe',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_04.mp3',
      },
      {
        id: 5,
        name: 'Artist 05',
        role: 'Keeper',
        description: 'Guards the threshold.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 05, Keeper',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_05.mp3',
        hiResWavUrl: 'https://static.wixstatic.com/media/12d367_audio_excerpt_05_hires.wav',
      },
      {
        id: 6,
        name: 'Artist 06',
        role: 'Voice',
        description: 'Echoes the ancient silence.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 06, Voice',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_06.mp3',
      },
      {
        id: 7,
        name: 'Artist 07',
        role: 'Weaver',
        description: 'Binds the invisible together.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 07, Weaver',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_07.mp3',
        hiResWavUrl: 'https://static.wixstatic.com/media/12d367_audio_excerpt_07_hires.wav',
      },
      {
        id: 8,
        name: 'Artist 08',
        role: 'Herald',
        description: 'Speaks in tongues of light.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 08, Herald',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_08.mp3',
      },
      {
        id: 9,
        name: 'Artist 09',
        role: 'Scribe',
        description: 'Writes in the margins of time.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 09, Scribe',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_09.mp3',
        hiResWavUrl: 'https://static.wixstatic.com/media/12d367_audio_excerpt_09_hires.wav',
      },
      {
        id: 10,
        name: 'Artist 10',
        role: 'Keeper',
        description: 'Holds what must not be lost.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 10, Keeper',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_10.mp3',
      },
    ];
    setArtists(artistData);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            ARTISTS
          </h1>
          <p className="text-lg font-body text-muted">
            Ten artists. One House. Distinct functions, shared discipline.
          </p>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-24 px-8">
        <div className="max-w-content mx-auto">
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {artists.map((artist) => (
                <div key={artist.id} className="flex flex-col">
                  {/* Portrait - 4:5 aspect ratio */}
                  <div className="aspect-[4/5] mb-6 overflow-hidden bg-night border border-border">
                    <Image
                      src={artist.portraitUrl}
                      alt={artist.portraitAlt}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Info */}
                  <div>
                    <h3 className="text-lg font-heading tracking-wide text-ivory mb-2">
                      {artist.name}
                    </h3>
                    <p className="text-xs font-body text-gold tracking-widest uppercase mb-3">
                      {artist.role}
                    </p>
                    <p className="text-sm font-body text-muted leading-relaxed mb-4">
                      {artist.description}
                    </p>
                    
                    {/* Audio Player */}
                    <ArtistAudioPlayer
                      previewMp3Url={artist.previewMp3Url}
                      hiResWavUrl={artist.hiResWavUrl}
                      artistName={artist.name}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
