import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fragments } from '@/content/fragments';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col">
      <Header />
      
      {/* Hero Section - Ceremonial Entry */}
      <section className="flex-1 px-6 sm:px-10 lg:px-16 flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="w-full max-w-[1320px] flex flex-col items-center justify-center text-center">
          {/* Title - Single line, no wrap */}
          <h1 
            className="font-heading font-light leading-[1.05] mb-8 text-ivory whitespace-nowrap"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
              letterSpacing: '-0.01em',
            }}
          >
            NIDALUM MAISON
          </h1>

          {/* Slogan - Slightly larger, small caps, high tracking */}
          <p 
            className="font-body tracking-[0.25em] uppercase text-muted mb-14 font-light"
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
              fontVariant: 'small-caps',
            }}
          >
            A SACRED HOUSE OF CREATION
          </p>

          {/* Manifesto Block - Centered, calm line height */}
          <div className="mb-14 max-w-[58ch]">
            <p className="font-body text-base md:text-lg leading-relaxed text-ivory">
              Born of language, memory, and ritual. Music becomes architecture. Silence becomes signature. Creation becomes rite. Not a genre. A language. A House.
            </p>
          </div>

          {/* Enter Button - Hairline border */}
          <Link 
            to="/house" 
            className="mb-16 px-10 py-3 border border-ivory text-ivory font-body text-sm md:text-base tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-300 inline-block"
          >
            ENTER
          </Link>

          {/* Portals Row - Text only, no wrap on desktop */}
          <div className="w-full">
            <div className="flex gap-4 md:gap-6 items-center justify-center flex-wrap px-4 md:flex-nowrap md:overflow-x-auto md:scrollbar-hide">
              <Link 
                to="/sacred" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0"
              >
                NIDALUM MUSIC
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-sm md:text-base flex-shrink-0">·</span>
              <Link 
                to="/literature" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0"
              >
                NIDALUM LITERATURE
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-sm md:text-base flex-shrink-0">·</span>
              <Link 
                to="/" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0"
              >
                NIDALUM FASHION
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-sm md:text-base flex-shrink-0">·</span>
              <Link 
                to="/" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0"
              >
                NIDALUM PERFUME
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-sm md:text-base flex-shrink-0">·</span>
              <Link 
                to="/" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0"
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
          
          {/* Fragments Pills - Horizontal row, scrollable on mobile */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 md:gap-4 flex-nowrap">
              {fragments.map((fragment, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 h-12 px-5 md:px-6 border border-border bg-obsidian text-ivory text-xs font-body tracking-widest uppercase flex items-center transition-colors duration-300 hover:border-gold group rounded-lg"
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
