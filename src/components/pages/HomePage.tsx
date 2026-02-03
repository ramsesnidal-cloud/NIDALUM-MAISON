import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { axes } from '@/content/axes';
import { fragments } from '@/content/fragments';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero Section - Left Aligned Architectural */}
      <section className="pt-32 pb-10 md:pb-14 lg:pb-18 px-6 sm:px-10 lg:px-14 min-h-[50vh] sm:min-h-[58vh] md:min-h-[62vh] lg:min-h-[70vh] flex items-center">
        <div className="mx-auto max-w-[1120px] w-full flex flex-col items-start justify-center">
          {/* Title - Left Aligned, One Line */}
          <h1 
            className="font-heading font-bold leading-[1.1] mb-6 text-ivory text-left"
            style={{
              fontSize: 'clamp(2.6rem, 8.8vw, 7.2rem)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'clip',
              letterSpacing: 'clamp(-0.02em, -0.5vw, -0.01em)',
            }}
          >
            NIDALUM MAISON
          </h1>

          {/* Slogan - Small Caps, High Tracking, Muted Ivory */}
          <p className="text-xs md:text-sm font-body tracking-[0.15em] uppercase text-ivory mb-12 font-light">
            A SACRED HOUSE OF CREATION
          </p>

          {/* Brand Portals - Left Aligned Horizontal Row - No Wrap */}
          <div className="mb-12 w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 md:gap-6 items-center whitespace-nowrap">
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
            </div>
          </div>

          {/* Enter Action - Left Aligned Text Link */}
          <Link 
            to="/house" 
            className="text-sm md:text-base font-body text-ivory hover:text-gold transition-colors duration-300 tracking-wide inline-block text-left"
          >
            ENTER THE HOUSE →
          </Link>
        </div>
      </section>

      {/* Five Axes - Editorial Row */}
      <section className="py-8 md:py-10 px-6 sm:px-10 lg:px-14 border-t border-border bg-obsidian">
        <div className="mx-auto max-w-[1120px]">
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
      </section>

      {/* Fragments Section */}
      <section className="py-16 md:py-20 lg:py-24 px-6 sm:px-10 lg:px-14 border-t border-border bg-obsidian">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-xs md:text-sm font-body tracking-widest uppercase text-muted mb-10 md:mb-12">
            FRAGMENTS
          </h2>
          
          {/* Fragments Pills - Horizontal Scrollable Row */}
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
