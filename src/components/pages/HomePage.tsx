import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col">
      <Header />
      
      {/* Hero Section - Ceremonial Entry - Vertically Centered */}
      <section className="min-h-[calc(100vh-80px)] px-6 sm:px-10 lg:px-16 flex items-center justify-center">
        <div className="w-full max-w-[1320px] flex flex-col items-center justify-center text-center">
          {/* Title - Single line, no wrap, fixed size */}
          <div className="flex flex-col items-center">
            <h1 
              className="font-heading font-light leading-[1.05] text-ivory whitespace-nowrap"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
                letterSpacing: '-0.01em',
              }}
            >
              NIDALUM MAISON
            </h1>
            <div 
              style={{
                width: '72px',
                height: '1px',
                backgroundColor: 'rgba(198, 163, 91, 0.55)',
                marginTop: '16px',
              }}
            />
          </div>

          {/* Slogan - Increased font size */}
          <p 
            className="font-body tracking-[0.25em] uppercase text-muted mb-8 md:mb-12 font-light mt-6 md:mt-8"
            style={{
              fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)',
              fontVariant: 'small-caps',
            }}
          >
            A SACRED HOUSE OF CREATION
          </p>

          {/* Manifesto Block - Three lines centered */}
          <div className="mb-10 md:mb-14 max-w-[58ch]">
            <p className="font-body leading-relaxed text-ivory" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}>
              Born from language, memory, and ritual.<br />
              Music becomes architecture. Silence becomes signature.<br />
              Creation becomes rite. It is not a genre. It is a language. It is a House.
            </p>
          </div>

          {/* Enter Button - Hairline border */}
          <Link 
            to="/house" 
            className="mb-10 md:mb-14 px-10 py-3 border border-ivory text-ivory font-body text-sm md:text-base tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-300 inline-block"
          >
            ENTER
          </Link>

          {/* Portals Row - No wrap on desktop, swipe on mobile */}
          <div className="w-full">
            <div className="flex gap-3 md:gap-4 items-center justify-center px-4 md:px-0 overflow-x-auto md:overflow-x-visible scrollbar-hide">
              <Link 
                to="/sacred" 
                className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0 whitespace-nowrap"
              >
                NIDALUM MUSIC
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-xs md:text-sm flex-shrink-0">·</span>
              <Link 
                to="/literature" 
                className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0 whitespace-nowrap"
              >
                NIDALUM LITERATURE
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-xs md:text-sm flex-shrink-0">·</span>
              <Link 
                to="/fashion" 
                className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0 whitespace-nowrap"
              >
                NIDALUM FASHION
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-xs md:text-sm flex-shrink-0">·</span>
              <Link 
                to="/perfume" 
                className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0 whitespace-nowrap"
              >
                NIDALUM PERFUME
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-xs md:text-sm flex-shrink-0">·</span>
              <Link 
                to="/fragments" 
                className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0 whitespace-nowrap"
              >
                NIDALUM LANGUAGE
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fragments Section */}
      <section className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 border-t border-border">
        <div className="mx-auto max-w-[1320px]">
          <h2 className="text-xs md:text-sm font-body tracking-widest uppercase text-muted mb-12 md:mb-16">
            FRAGMENTS
          </h2>
          
          {/* Fragments Grid - 6 items, centered, colored text */}
          {featuredFragments.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 max-w-[1000px] mx-auto">
              {featuredFragments.map((fragment, idx) => (
                <div
                  key={idx}
                  className="text-center"
                >
                  <p className="text-lg md:text-xl font-medium tracking-wide text-white mb-2">
                    {fragment.nidalum}
                  </p>
                  <p className="text-sm md:text-base text-blue-400 mb-1">
                    {fragment.french}
                  </p>
                  <p className="text-sm md:text-base text-white">
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
              className="text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
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
