import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col">
      <Header />
      
      {/* Hero Section - Centered Ceremonial Entry */}
      <section className="flex-1 px-6 sm:px-10 lg:px-14 flex items-center justify-center py-20 md:py-24">
        <div className="w-full max-w-2xl flex flex-col items-center justify-center text-center">
          {/* Title - Centered, Monumental, One Line */}
          <h1 
            className="font-heading font-bold leading-[1.1] mb-6 text-ivory"
            style={{
              fontSize: 'clamp(2.8rem, 9vw, 7.4rem)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'clip',
              letterSpacing: 'clamp(-0.02em, -0.5vw, -0.01em)',
            }}
          >
            NIDALUM MAISON
          </h1>

          {/* Subtitle - Centered, High Tracking, Muted Ivory */}
          <p 
            className="font-body tracking-[0.2em] uppercase text-muted mb-12 font-light"
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
            }}
          >
            A SACRED HOUSE OF CREATION
          </p>

          {/* Manifesto Block - Centered, Max Width 52ch */}
          <div className="mb-12 max-w-[52ch]">
            <p className="font-body text-sm md:text-base leading-relaxed text-ivory">
              Born from language, memory, and ritual. Music becomes architecture. Silence becomes signature. Creation becomes rite. Not a genre. A language. A House.
            </p>
          </div>

          {/* Enter Action - Centered, Minimal Bordered Button */}
          <Link 
            to="/house" 
            className="mb-12 px-8 py-3 border border-ivory text-ivory font-body text-sm md:text-base tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-300 inline-block"
          >
            ENTER
          </Link>

          {/* Portals Row - Centered, Text Only, No Wrap on Desktop */}
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 md:gap-6 items-center justify-center whitespace-nowrap px-4">
              <Link 
                to="/sacred" 
                className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0"
              >
                NIDALUM MUSIC
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-xs md:text-sm flex-shrink-0">·</span>
              <Link 
                to="/literature" 
                className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0"
              >
                NIDALUM LITERATURE
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-xs md:text-sm flex-shrink-0">·</span>
              <Link 
                to="/" 
                className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0"
              >
                NIDALUM FASHION
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-xs md:text-sm flex-shrink-0">·</span>
              <Link 
                to="/" 
                className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0"
              >
                NIDALUM FRAGRANCE
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-xs md:text-sm flex-shrink-0">·</span>
              <Link 
                to="/" 
                className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group flex-shrink-0"
              >
                LANGUAGE
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
