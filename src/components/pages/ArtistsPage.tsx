import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Artists } from '@/entities/index';

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artists[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const result = await BaseCrudService.getAll<Artists>('artists', [], { limit: 100 });
        const publishedArtists = (result.items || [])
          .filter(a => a.isPublished === true)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setArtists(publishedArtists);
      } catch (error) {
        console.error('Error loading artists:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadArtists();
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

  if (artists.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian text-ivory">
        <Header />
        <section className="pt-32 pb-10 md:pb-14 lg:pb-18 px-6 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[1320px]">
            <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">ARTISTS</h1>
            <p className="text-lg font-body text-muted">No artists available.</p>
          </div>
        </section>
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
                  src={featuredArtist.portraitImage || 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg'}
                  alt={featuredArtist.name || 'Artist'}
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
                {featuredArtist.shortDescription}
              </p>
              
              {/* Audio Player */}
              <div>
                {featuredArtist.audioPreviewUrl && (
                  <audio
                    controls
                    controlsList="nodownload noplaybackrate noremoteplayback"
                    disablePictureInPicture
                    preload="none"
                    className="w-full h-10 bg-night border border-border"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <source src={featuredArtist.audioPreviewUrl} type="audio/mpeg" />
                  </audio>
                )}
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
              <div key={artist._id} className="border border-border p-6 bg-night/30 hover:border-gold/40 transition-colors duration-300 flex flex-col h-full">
                {/* Portrait */}
                <div className="w-full aspect-[4/5] overflow-hidden bg-obsidian border border-border mb-6 hover:border-gold/40 transition-colors duration-300">
                  <Image
                    src={artist.portraitImage || 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg'}
                    alt={artist.name || 'Artist'}
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
                    {artist.shortDescription}
                  </p>
                </div>
                
                {/* Audio Player - Compact */}
                <div className="mt-6">
                  {artist.audioPreviewUrl && (
                    <audio
                      controls
                      controlsList="nodownload noplaybackrate noremoteplayback"
                      disablePictureInPicture
                      preload="none"
                      className="w-full h-8 bg-night border border-border"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <source src={artist.audioPreviewUrl} type="audio/mpeg" />
                    </audio>
                  )}
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
