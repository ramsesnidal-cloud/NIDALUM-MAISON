import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col">
      <Header />
      
      {/* Hero Section - Adjusted positioning and sizing */}
      <section className="flex-1 px-6 sm:px-10 lg:px-16 flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="w-full max-w-6xl flex flex-col items-center justify-center text-center">
          {/* Title - Larger, Wider, Slightly Lower */}
          <h1 
            className="font-heading font-bold leading-[1.05] mb-8 text-ivory"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
              letterSpacing: 'clamp(-0.02em, -0.5vw, -0.01em)',
            }}
          >
            NIDALUM MAISON
          </h1>

          {/* Subtitle - Slightly Larger */}
          <p 
            className="font-body tracking-[0.2em] uppercase text-muted mb-14 font-light"
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
            }}
          >
            A SACRED HOUSE OF CREATION
          </p>

          {/* Manifesto Block - Slightly Larger */}
          <div className="mb-14 max-w-[56ch]">
            <p className="font-body text-base md:text-lg leading-relaxed text-ivory">
              Born from language, memory, and ritual. Music becomes architecture. Silence becomes signature. Creation becomes rite. Not a genre. A language. A House.
            </p>
          </div>

          {/* Enter Action - Slightly Larger */}
          <Link 
            to="/house" 
            className="mb-16 px-10 py-3 border border-ivory text-ivory font-body text-sm md:text-base tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-300 inline-block"
          >
            ENTER
          </Link>

          {/* Portals Row - Spread horizontally with larger text */}
          <div className="w-full">
            <div className="flex gap-6 md:gap-8 items-center justify-center flex-wrap px-4">
              <Link 
                to="/sacred" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
              >
                NIDALUM MUSIC
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-sm md:text-base">·</span>
              <Link 
                to="/literature" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
              >
                LITERATURE
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-sm md:text-base">·</span>
              <Link 
                to="/sacred" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
              >
                SACRED MUSIC
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-sm md:text-base">·</span>
              <Link 
                to="/artists" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
              >
                ARTISTS
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-sm md:text-base">·</span>
              <Link 
                to="/" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
              >
                PERFUME
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-sm md:text-base">·</span>
              <Link 
                to="/" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
              >
                FASHION
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-sm md:text-base">·</span>
              <Link 
                to="/contact" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
              >
                CONTACT
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-muted text-sm md:text-base">·</span>
              <Link 
                to="/contact" 
                className="text-sm md:text-base font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
              >
                S'INSCRIRE
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
