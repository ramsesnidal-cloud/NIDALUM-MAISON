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
        <div className="pt-24 md:pt-32" />
        <Footer />
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian text-ivory">
        <Header />
        <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-10 md:pb-12 lg:pb-14 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14">
          <div className="mx-auto max-w-[1320px]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-heading font-bold tracking-widest mb-3 sm:mb-4">ARTISTS</h1>
            <p className="text-sm sm:text-base md:text-lg font-body text-muted">No artists available.</p>
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
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-10 md:pb-12 lg:pb-14 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 border-b border-border">
        <div className="mx-auto max-w-[1320px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-heading font-bold tracking-widest mb-3 sm:mb-4">
            ARTISTS
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-body text-muted">
            Ten artists. One House. Distinct functions, shared discipline.
          </p>
        </div>
      </section>

      {/* Featured Artist */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 border-b border-border">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-start">
            {/* Portrait - Left on desktop */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="w-full md:w-[240px] lg:w-[320px] aspect-[4/5] overflow-hidden bg-night border border-border hover:border-gold/60 transition-colors duration-300">
                <Image
                  src={featuredArtist.portraitImage || 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg'}
                  alt={featuredArtist.name || 'Artist'}
                  width={320}
                  height={400}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>
            
            {/* Info - Right on desktop */}
            <div className="flex flex-col justify-start">
              {/* Featured Label */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="h-px w-4 sm:w-6 bg-gold/40"></div>
                <p className="text-[0.6rem] sm:text-xs md:text-xs font-body text-gold/60 tracking-[0.15em] uppercase font-light">
                  The House Voice
                </p>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-heading tracking-wide text-ivory mb-2">
                {featuredArtist.name}
              </h2>
              <p className="text-xs sm:text-sm md:text-sm font-body text-gold tracking-widest uppercase mb-3 sm:mb-4 truncate">
                {featuredArtist.role}
              </p>
              <p className="text-sm sm:text-base md:text-base font-body text-muted leading-relaxed mb-6 sm:mb-8 line-clamp-2">
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
                    className="w-full h-8 sm:h-10 bg-night border border-border"
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
      <section className="py-8 sm:py-12 md:py-16 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {gridArtists.map((artist) => (
              <div key={artist._id} className="border border-border p-4 sm:p-5 md:p-6 bg-night/30 hover:border-gold/40 transition-colors duration-300 flex flex-col h-full">
                {/* Portrait */}
                <div className="w-full aspect-[4/5] overflow-hidden bg-obsidian border border-border mb-4 sm:mb-5 md:mb-6 hover:border-gold/40 transition-colors duration-300">
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
                <div className="space-y-2 sm:space-y-2.5 md:space-y-3 flex-grow">
                  <h3 className="text-sm sm:text-base md:text-lg font-heading tracking-wide text-ivory truncate">
                    {artist.name}
                  </h3>
                  <p className="text-[0.65rem] sm:text-xs md:text-xs font-body text-gold tracking-widest uppercase truncate">
                    {artist.role}
                  </p>
                  <p className="text-xs sm:text-sm md:text-sm font-body text-muted leading-relaxed line-clamp-2">
                    {artist.shortDescription}
                  </p>
                </div>
                
                {/* Audio Player - Compact */}
                <div className="mt-4 sm:mt-5 md:mt-6">
                  {artist.audioPreviewUrl && (
                    <audio
                      controls
                      controlsList="nodownload noplaybackrate noremoteplayback"
                      disablePictureInPicture
                      preload="none"
                      className="w-full h-7 sm:h-8 bg-night border border-border"
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
