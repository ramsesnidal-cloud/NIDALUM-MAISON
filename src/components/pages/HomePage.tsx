import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const nidalumExpressions = [
    { nidalum: "Vel'thar", english: 'The silence between words' },
    { nidalum: "Shen'mora", english: 'A house that remembers' },
    { nidalum: "Keth'ala", english: 'The sound of becoming' },
    { nidalum: "Mir'ven", english: 'Sacred threshold' },
    { nidalum: "Thal'esh", english: 'The breath of time' },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero Section - Wide and Structural */}
      <section className="pt-32 pb-10 md:pb-14 lg:pb-18 px-6 sm:px-10 lg:px-14 min-h-[50vh] sm:min-h-[58vh] md:min-h-[62vh] lg:min-h-[70vh] flex items-center">
        <div className="mx-auto max-w-[1120px] w-full">
          {/* Title - Increased size, slightly offset left */}
          <h1 
            className="font-heading font-bold leading-[1.1] mb-12 text-ivory"
            style={{
              fontSize: 'clamp(2.52rem, 8.64vw, 6.72rem)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'clip',
              letterSpacing: 'clamp(-0.02em, -0.5vw, -0.01em)',
              marginLeft: 'clamp(0rem, 2vw, 3rem)',
            }}
          >
            NIDALUM MAISON
          </h1>

          {/* Brand Portals - Horizontal Editorial Row */}
          <div className="flex flex-wrap gap-6 md:gap-8 mb-12 items-center">
            <Link 
              to="/sacred" 
              className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
            >
              NIDALUM MUSIC
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
            </Link>
            <span className="w-px h-4 bg-border hidden md:block"></span>
            <Link 
              to="/literature" 
              className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
            >
              NIDALUM LITERATURE
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
            </Link>
            <span className="w-px h-4 bg-border hidden md:block"></span>
            <Link 
              to="/" 
              className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
            >
              NIDALUM FASHION
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
            </Link>
            <span className="w-px h-4 bg-border hidden md:block"></span>
            <Link 
              to="/" 
              className="text-xs md:text-sm font-body tracking-widest uppercase text-ivory hover:text-gold transition-colors duration-300 relative group"
            >
              NIDALUM PERFUME
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Enter Action - Text Link */}
          <Link 
            to="/house" 
            className="text-sm md:text-base font-body text-ivory hover:text-gold transition-colors duration-300 tracking-wide inline-block"
          >
            ENTER THE HOUSE →
          </Link>
        </div>
      </section>

      {/* Language Fragment - Ritual Section */}
      <section className="py-16 md:py-20 lg:py-24 px-6 sm:px-10 lg:px-14 border-t border-border bg-obsidian">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-xs md:text-sm font-body tracking-widest uppercase text-muted mb-10 md:mb-12">
            Selected Nidalum Expressions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {nidalumExpressions.map((expr, idx) => (
              <div key={idx} className="border-l border-border pl-4 md:pl-6">
                <p className="text-xs md:text-sm font-heading text-gold mb-2">
                  {expr.nidalum}
                </p>
                <p className="text-xs md:text-sm font-body text-muted leading-relaxed">
                  {expr.english}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
