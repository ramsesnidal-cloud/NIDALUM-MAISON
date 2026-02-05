import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header.tsx';
import Footer from '@/components/layout/Footer.tsx';
import { BaseCrudService } from '@/integrations';
import type { Portals } from '@/entities/index';

export default function HomePage() {
  // Featured fragments data
  const featuredFragments = [
    { nidalum: 'ORAA', french: 'Souffle, vie, essence', english: 'Breath, life essence' },
    { nidalum: 'RA', french: 'Soleil, présence souveraine', english: 'Sun, sovereign presence' },
    { nidalum: 'SOUMA', french: 'Source, origine', english: 'Source, origin' },
    { nidalum: 'LUMÉ', french: 'Lumière', english: 'Light' },
    { nidalum: 'LUMERA', french: 'Chant de lumière, lumière chantée', english: 'Song of light, luminous chant' },
    { nidalum: 'ASHÂLIM', french: 'Parole sacrée', english: 'Sacred utterance' },
  ];

  const [portals, setPortals] = useState<Portals[]>([]);

  useEffect(() => {
    const fetchPortals = async () => {
      try {
        const result = await BaseCrudService.getAll<Portals>('portals');
        const publishedPortals = (result.items || [])
          .filter(p => p.isPublished === true)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setPortals(publishedPortals);
      } catch (error) {
        console.error('Error fetching portals:', error);
      }
    };
    fetchPortals();
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col">
      <Header />
      
      {/* Hero Section - Ceremonial Entry - Vertically Centered */}
      <section className="min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-16 flex items-center justify-center pt-24 sm:pt-28 md:pt-0 md:min-h-screen">
        <div className="w-full max-w-[1320px] flex flex-col items-center justify-center text-center">
          {/* Title - Single line, no wrap, fixed size */}
          <div className="flex flex-col items-center">
            <h1 
              className="font-heading font-light leading-[1.05] text-ivory"
              style={{
                fontSize: 'clamp(2rem, 8vw, 9.5rem)',
                letterSpacing: '-0.01em',
                wordBreak: 'break-word',
              }}
            >
              NIDALUM MAISON
            </h1>
            <div 
              style={{
                width: 'clamp(48px, 10vw, 72px)',
                height: '1px',
                backgroundColor: 'rgba(198, 163, 91, 0.55)',
                marginTop: 'clamp(12px, 3vw, 16px)',
              }}
            />
          </div>

          {/* Slogan - Increased font size */}
          <p 
            className="font-body tracking-[0.25em] uppercase text-muted mb-6 sm:mb-8 md:mb-12 font-light mt-4 sm:mt-6 md:mt-8 px-2"
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.8rem)',
              fontVariant: 'small-caps',
            }}
          >
            A SACRED HOUSE OF CREATION
          </p>

          {/* Manifesto Block - Three lines centered */}
          <div className="mb-6 sm:mb-10 md:mb-14 max-w-[58ch] px-4">
            <p className="font-body leading-relaxed text-ivory" style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.15rem)' }}>
              Born from language, memory, and ritual.<br />
              Music becomes architecture. Silence becomes signature.<br />
              Creation becomes rite. It is not a genre. It is a language. It is a House.
            </p>
          </div>

          {/* Enter Button - Hairline border */}
          <Link 
            to="/house" 
            className="mb-6 sm:mb-10 md:mb-14 px-6 sm:px-10 py-2 sm:py-3 border border-ivory text-ivory font-body text-xs sm:text-sm md:text-base tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-300 inline-block"
          >
            ENTER
          </Link>

          {/* Portals Row - No wrap on desktop, swipe on mobile */}
          <div className="w-full overflow-x-hidden">
            <div className="flex gap-2 sm:gap-3 md:gap-4 items-center justify-center overflow-x-auto md:overflow-x-visible scrollbar-hide flex-wrap md:flex-nowrap max-w-full px-0">
              {portals.map((portal, idx) => (
                <div key={portal._id} className="flex gap-2 sm:gap-3 md:gap-4 items-center">
                  <Link 
                    to={portal.portalRoute || '#'} 
                    className="text-[0.65rem] sm:text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0 whitespace-nowrap"
                  >
                    {portal.portalLabel}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  {idx < portals.length - 1 && (
                    <span className="text-muted text-[0.65rem] sm:text-xs md:text-sm flex-shrink-0">·</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fragments Section */}
      <section className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-16 border-t border-border">
        <div className="mx-auto max-w-[1320px]">
          <h2 className="text-[0.65rem] sm:text-xs md:text-sm font-body tracking-widest uppercase text-muted mb-8 sm:mb-12 md:mb-16">
            FRAGMENTS
          </h2>
          
          {/* Fragments Grid - 6 items, centered, colored text */}
          {featuredFragments.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 max-w-[1000px] mx-auto">
              {featuredFragments.map((fragment, idx) => (
                <div
                  key={idx}
                  className="text-center px-2"
                >
                  <p className="text-base sm:text-lg md:text-xl font-medium tracking-wide text-white mb-1 sm:mb-2">
                    {fragment.nidalum}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-blue-400 mb-1">
                    {fragment.french}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-white">
                    {fragment.english}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* See More Fragments Link */}
          <div className="flex justify-center">
            <Link 
              to="/fragments" 
              className="text-xs sm:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
            >
              See more FRAGMENTS
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
