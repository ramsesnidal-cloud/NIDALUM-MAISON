import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { SacredChants, Artists } from '@/entities/index';

export default function SacredMusicPage() {
  const [chants, setChants] = useState<SacredChants[]>([]);
  const [artists, setArtists] = useState<Artists[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const chantsResult = await BaseCrudService.getAll<SacredChants>('sacredchants', [], { limit: 100 });
        const publishedChants = (chantsResult.items || [])
          .filter(c => c.isPublished === true)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setChants(publishedChants);

        const artistsResult = await BaseCrudService.getAll<Artists>('artists', [], { limit: 100 });
        const publishedArtists = (artistsResult.items || [])
          .filter(a => a.isPublished === true)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setArtists(publishedArtists);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  return (
    <div className="min-h-screen bg-obsidian text-ivory" onContextMenu={(e) => e.preventDefault()}>
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="mx-auto max-w-[1320px]">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            SACRED MUSIC
          </h1>
          <div className="space-y-3">
            <p className="text-lg font-body text-muted">
              {chants.length} Sacred Chants. Public excerpts only.
            </p>
            <p className="text-sm font-body text-muted">
              No lyrics are published.
            </p>
          </div>
        </div>
      </section>

      {/* Chants Grid */}
      <section className="py-24 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="mx-auto max-w-[1320px]">
          {isLoading ? (
            <div className="text-center text-muted">Loading...</div>
          ) : chants.length === 0 ? (
            <div className="text-center text-muted">No chants available.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chants.map((chant) => (
                <div key={chant._id} className="flex flex-col h-full">
                  {/* Cover Image */}
                  <div className="mb-6 aspect-[4/5] overflow-hidden bg-night border border-border">
                    <Image
                      src={chant.coverImage || 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg'}
                      alt={chant.title || 'Chant'}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Title and Description */}
                  <h3 className="text-sm md:text-base font-heading text-ivory mb-2">
                    {chant.title}
                  </h3>
                  <p className="text-xs md:text-sm font-body text-muted mb-2">
                    {chant.duration}
                  </p>
                  <p className="text-xs md:text-sm font-body text-muted mb-6 flex-grow">
                    {chant.shortDescription}
                  </p>
                  
                  {/* Audio Player */}
                  {chant.audioPreviewUrl && (
                    <audio
                      controls
                      controlsList="nodownload noplaybackrate noremoteplayback"
                      disablePictureInPicture
                      preload="none"
                      className="w-full h-8 md:h-10 bg-night border border-border mt-auto"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <source src={chant.audioPreviewUrl} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our Artists Section */}
      <section className="py-20 md:py-24 lg:py-28 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="mx-auto max-w-[1320px]">
          <h2 className="text-xs md:text-sm font-body tracking-widest uppercase text-muted mb-12 md:mb-16">
            OUR ARTISTS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {artists.map((artist) => (
              <div key={artist._id} className="flex flex-col h-full">
                {/* Portrait - 4:5 aspect ratio */}
                <div className="mb-6 aspect-[4/5] overflow-hidden bg-night border border-border">
                  <Image
                    src={artist.portraitImage || 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg'}
                    alt={artist.name || 'Artist'}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Name and Role */}
                <h3 className="text-sm md:text-base font-heading text-ivory mb-1">
                  {artist.name}
                </h3>
                <p className="text-xs md:text-sm font-body text-muted mb-6">
                  {artist.role}
                </p>
                
                {/* Audio Player */}
                {artist.audioPreviewUrl && (
                  <audio
                    controls
                    controlsList="nodownload noplaybackrate noremoteplayback"
                    disablePictureInPicture
                    preload="none"
                    className="w-full h-8 md:h-10 bg-night border border-border mt-auto"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <source src={artist.audioPreviewUrl} type="audio/mpeg" />
                  </audio>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
