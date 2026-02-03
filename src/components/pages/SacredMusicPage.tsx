import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SacredChantList from '@/components/SacredChantList';
import { axes } from '@/content/axes';
import { fragments } from '@/content/fragments';
import { artists } from '@/content/artists';
import { discography } from '@/content/discography';
import { Image } from '@/components/ui/image';

export default function SacredMusicPage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="mx-auto max-w-[1120px]">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            SACRED MUSIC
          </h1>
          <div className="space-y-3">
            <p className="text-lg font-body text-muted">
              Six Sacred Chants. Public excerpts only.
            </p>
            <p className="text-sm font-body text-muted">
              No lyrics are published.
            </p>
          </div>
        </div>
      </section>

      {/* Chants Grid */}
      <section className="py-24 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="mx-auto max-w-[1120px]">
          <SacredChantList />
        </div>
      </section>

      {/* Our Artists Section */}
      <section className="py-20 md:py-24 lg:py-28 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-xs md:text-sm font-body tracking-widest uppercase text-muted mb-12 md:mb-16">
            OUR ARTISTS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {artists.map((artist) => (
              <div key={artist.id} className="flex flex-col">
                {/* Portrait */}
                <div className="mb-6 aspect-square overflow-hidden bg-night">
                  <Image
                    src={artist.portraitUrl}
                    alt={artist.name}
                    width={400}
                    height={400}
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
                <audio
                  controls
                  preload="none"
                  className="w-full h-8 md:h-10 bg-night border border-border rounded-none"
                >
                  <source src={artist.audioPreviewUrl} type="audio/mpeg" />
                </audio>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discography Section */}
      <section className="py-20 md:py-24 lg:py-28 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-xs md:text-sm font-body tracking-widest uppercase text-muted mb-12 md:mb-16">
            DISCOGRAPHY
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {discography.map((item) => (
              <div key={item.id} className="flex flex-col">
                <div className="mb-4 aspect-square overflow-hidden bg-night">
                  <Image
                    src={item.coverImageUrl}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs md:text-sm font-body text-ivory">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language Section - Five Axes */}
      <section className="py-20 md:py-24 lg:py-28 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-xs md:text-sm font-body tracking-widest uppercase text-muted mb-12 md:mb-16">
            LANGUAGE
          </h2>
          
          {/* Five Axes Row */}
          <div className="mb-16 md:mb-20">
            <div className="flex items-center justify-start gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
              {axes.map((axis, idx) => (
                <div key={idx} className="flex items-center gap-4 md:gap-6 flex-shrink-0">
                  <p className="text-xs md:text-sm font-body tracking-[0.15em] uppercase text-ivory whitespace-nowrap">
                    {axis}
                  </p>
                  {idx < axes.length - 1 && (
                    <span className="text-border h-px w-4 md:w-6 flex-shrink-0"></span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Fragments Pills */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 md:gap-4 flex-nowrap">
              {fragments.map((fragment, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 px-4 md:px-5 py-2 md:py-3 border border-border bg-night text-ivory text-xs md:text-sm font-body tracking-wide uppercase transition-all duration-300 hover:border-gold group"
                >
                  <span className="relative">
                    {fragment}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
