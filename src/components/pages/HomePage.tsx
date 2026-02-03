import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { FragmentsLexicon } from '@/entities/index';

export default function HomePage() {
  const [featuredFragments, setFeaturedFragments] = useState<FragmentsLexicon[]>([]);
  const [isLoadingFragments, setIsLoadingFragments] = useState(true);

  useEffect(() => {
    const loadFragments = async () => {
      try {
        const result = await BaseCrudService.getAll<FragmentsLexicon>('fragmentslexicon', [], { limit: 6 });
        const featured = (result.items || [])
          .filter(f => f.isFeatured === true && f.isPublished === true)
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .slice(0, 6);
        
        // Fallback: if fewer than 6 featured, take first 6 published
        if (featured.length < 6) {
          const allPublished = (result.items || [])
            .filter(f => f.isPublished === true)
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .slice(0, 6);
          setFeaturedFragments(allPublished);
        } else {
          setFeaturedFragments(featured);
        }
      } catch (error) {
        console.error('Error loading featured fragments:', error);
      } finally {
        setIsLoadingFragments(false);
      }
    };
    loadFragments();
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col">
      <Header />
      
      {/* Hero Section - Ceremonial Entry - Vertically Centered */}
      <section className="min-h-[calc(100vh-80px)] px-6 sm:px-10 lg:px-16 flex items-center justify-center">
        <div className="w-full max-w-[1320px] flex flex-col items-center justify-center text-center">
          {/* Title - Single line, no wrap, fixed size */}
          <h1 
            className="font-heading font-light leading-[1.05] mb-6 md:mb-8 text-ivory whitespace-nowrap"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
              letterSpacing: '-0.01em',
            }}
          >
            NIDALUM MAISON
          </h1>

          {/* Slogan - Increased font size */}
          <p 
            className="font-body tracking-[0.25em] uppercase text-muted mb-8 md:mb-12 font-light"
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
          
          {/* Fragments Pills - 6 on one line, white only, no translations */}
          {!isLoadingFragments && featuredFragments.length > 0 && (
            <div className="flex flex-wrap gap-3 md:gap-4 mb-12 md:mb-16 justify-center">
              {featuredFragments.map((fragment) => (
                <div
                  key={fragment._id}
                  className="px-4 py-2 rounded-full border border-white/20 bg-black/10 text-ivory text-sm md:text-base font-body tracking-wide"
                >
                  {fragment.termNidalum}
                </div>
              ))}
            </div>
          )}

          {/* See More Fragments Link */}
          <div className="flex justify-center md:justify-start">
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
