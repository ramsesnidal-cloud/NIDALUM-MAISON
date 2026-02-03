import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';

interface Artist {
  id: number;
  name: string;
  role: string;
  description: string;
  portraitUrl: string;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize with placeholder data
    const artistData: Artist[] = [
      {
        id: 1,
        name: 'Artist 01',
        role: 'Voice',
        description: 'Keeper of the first utterance.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
      },
      {
        id: 2,
        name: 'Artist 02',
        role: 'Weaver',
        description: 'Threads the sacred into form.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
      },
      {
        id: 3,
        name: 'Artist 03',
        role: 'Herald',
        description: 'Announces what cannot be named.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
      },
      {
        id: 4,
        name: 'Artist 04',
        role: 'Scribe',
        description: 'Records the unrecordable.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
      },
      {
        id: 5,
        name: 'Artist 05',
        role: 'Keeper',
        description: 'Guards the threshold.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
      },
      {
        id: 6,
        name: 'Artist 06',
        role: 'Voice',
        description: 'Echoes the ancient silence.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
      },
      {
        id: 7,
        name: 'Artist 07',
        role: 'Weaver',
        description: 'Binds the invisible together.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
      },
      {
        id: 8,
        name: 'Artist 08',
        role: 'Herald',
        description: 'Speaks in tongues of light.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
      },
      {
        id: 9,
        name: 'Artist 09',
        role: 'Scribe',
        description: 'Writes in the margins of time.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
      },
      {
        id: 10,
        name: 'Artist 10',
        role: 'Keeper',
        description: 'Holds what must not be lost.',
        portraitUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
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
                      alt={`${artist.name}, ${artist.role}`}
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
                    <p className="text-sm font-body text-muted leading-relaxed">
                      {artist.description}
                    </p>
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
