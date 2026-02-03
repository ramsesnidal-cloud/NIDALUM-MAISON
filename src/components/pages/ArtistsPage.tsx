import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import ArtistAudioPlayer from '@/components/ArtistAudioPlayer';

interface Artist {
  id: number;
  name: string;
  role: string;
  oneLine: string;
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
        oneLine: 'Keeper of the first utterance.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 01, Voice',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_01.mp3',
        hiResWavUrl: 'https://static.wixstatic.com/media/12d367_audio_excerpt_01_hires.wav',
      },
      {
        id: 2,
        name: 'Artist 02',
        role: 'Weaver',
        oneLine: 'Threads the sacred into form.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 02, Weaver',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_02.mp3',
        hiResWavUrl: 'https://static.wixstatic.com/media/12d367_audio_excerpt_02_hires.wav',
      },
      {
        id: 3,
        name: 'Artist 03',
        role: 'Herald',
        oneLine: 'Announces what cannot be named.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 03, Herald',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_03.mp3',
      },
      {
        id: 4,
        name: 'Artist 04',
        role: 'Scribe',
        oneLine: 'Records the unrecordable.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 04, Scribe',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_04.mp3',
      },
      {
        id: 5,
        name: 'Artist 05',
        role: 'Keeper',
        oneLine: 'Guards the threshold.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 05, Keeper',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_05.mp3',
        hiResWavUrl: 'https://static.wixstatic.com/media/12d367_audio_excerpt_05_hires.wav',
      },
      {
        id: 6,
        name: 'Artist 06',
        role: 'Voice',
        oneLine: 'Echoes the ancient silence.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 06, Voice',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_06.mp3',
      },
      {
        id: 7,
        name: 'Artist 07',
        role: 'Weaver',
        oneLine: 'Binds the invisible together.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 07, Weaver',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_07.mp3',
        hiResWavUrl: 'https://static.wixstatic.com/media/12d367_audio_excerpt_07_hires.wav',
      },
      {
        id: 8,
        name: 'Artist 08',
        role: 'Herald',
        oneLine: 'Speaks in tongues of light.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 08, Herald',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_08.mp3',
      },
      {
        id: 9,
        name: 'Artist 09',
        role: 'Scribe',
        oneLine: 'Writes in the margins of time.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 09, Scribe',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_09.mp3',
        hiResWavUrl: 'https://static.wixstatic.com/media/12d367_audio_excerpt_09_hires.wav',
      },
      {
        id: 10,
        name: 'Artist 10',
        role: 'Keeper',
        oneLine: 'Holds what must not be lost.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
        portraitAlt: 'Artist 10, Keeper',
        previewMp3Url: 'https://static.wixstatic.com/media/12d367_audio_excerpt_10.mp3',
      },
    ];
    setArtists(artistData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-obsidian text-ivory">
        <Header />
        <div className="pt-32" />
        <Footer />
      </div>
    );
  }

  const featuredArtist = artists[0];
  const gridArtists = artists.slice(1);

  return (
    <div className="min-h-screen bg-obsidian text-ivory" onContextMenu={(e) => e.preventDefault()}>
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-10 md:pb-14 lg:pb-18 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="mx-auto max-w-[1320px]">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            ARTISTS
          </h1>
          <p className="text-lg font-body text-muted">
            Ten artists. One House. Distinct functions, shared discipline.
          </p>
        </div>
      </section>

      {/* Featured Artist */}
      <section className="py-14 md:py-18 lg:py-24 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Portrait - Left on desktop */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="w-full md:w-[280px] lg:w-[340px] aspect-[4/5] overflow-hidden bg-night border border-border hover:border-gold/60 transition-colors duration-300">
                <Image
                  src={featuredArtist.portraitUrl}
                  alt={featuredArtist.portraitAlt}
                  width={340}
                  height={425}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>
            
            {/* Info - Right on desktop */}
            <div className="flex flex-col justify-start">
              {/* Featured Label */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-6 bg-gold/40"></div>
                <p className="text-xs font-body text-gold/60 tracking-[0.15em] uppercase font-light">
                  The House Voice
                </p>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading tracking-wide text-ivory mb-2">
                {featuredArtist.name}
              </h2>
              <p className="text-sm font-body text-gold tracking-widest uppercase mb-4 truncate">
                {featuredArtist.role}
              </p>
              <p className="text-base font-body text-muted leading-relaxed mb-8 line-clamp-2">
                {featuredArtist.oneLine}
              </p>
              
              {/* Audio Player */}
              <div>
                <ArtistAudioPlayer
                  previewMp3Url={featuredArtist.previewMp3Url}
                  hiResWavUrl={featuredArtist.hiResWavUrl}
                  artistName={featuredArtist.name}
                  playerId={`artist-featured`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Remaining Artists */}
      <section className="py-14 md:py-18 lg:py-24 px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {gridArtists.map((artist) => (
              <div key={artist.id} className="border border-border p-6 bg-night/30 hover:border-gold/40 transition-colors duration-300 flex flex-col h-full">
                {/* Portrait */}
                <div className="w-full aspect-[4/5] overflow-hidden bg-obsidian border border-border mb-6 hover:border-gold/40 transition-colors duration-300">
                  <Image
                    src={artist.portraitUrl}
                    alt={artist.portraitAlt}
                    width={260}
                    height={325}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                
                {/* Info */}
                <div className="space-y-3 flex-grow">
                  <h3 className="text-base md:text-lg font-heading tracking-wide text-ivory truncate">
                    {artist.name}
                  </h3>
                  <p className="text-xs font-body text-gold tracking-widest uppercase truncate">
                    {artist.role}
                  </p>
                  <p className="text-sm font-body text-muted leading-relaxed line-clamp-2">
                    {artist.oneLine}
                  </p>
                </div>
                
                {/* Audio Player - Compact */}
                <div className="mt-6">
                  <ArtistAudioPlayer
                    previewMp3Url={artist.previewMp3Url}
                    hiResWavUrl={artist.hiResWavUrl}
                    artistName={artist.name}
                    playerId={`artist-${artist.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
