import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero Section - Responsive height without full screen */}
      <section className="pt-32 pb-12 px-8 min-h-[50vh] sm:min-h-[58vh] md:min-h-[62vh] lg:min-h-[70vh] flex items-center">
        <div className="max-w-content mx-auto text-center w-full">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight leading-tight mb-8 text-ivory">
            NIDALUM<br />MAISON
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-heading font-light tracking-wide mb-6 text-gold">
            A House of Literature and Sacred Sound.
          </p>
          <p className="text-sm sm:text-base font-body text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            A house does not seek attention. It creates a pause.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link 
              to="/contact" 
              className="px-6 sm:px-8 py-3 border border-ivory text-ivory hover:bg-gold hover:text-obsidian hover:border-gold transition-all duration-300 rounded-lg font-body text-xs sm:text-sm tracking-wide"
            >
              REQUEST PRIVATE ACCESS
            </Link>
            <Link 
              to="/house" 
              className="px-6 sm:px-8 py-3 text-ivory hover:text-gold transition-colors duration-300 font-body text-xs sm:text-sm tracking-wide"
            >
              ENTER THE HOUSE →
            </Link>
          </div>
        </div>
      </section>

      {/* Production Label */}
      <section className="py-8 px-8 border-t border-border bg-night">
        <div className="max-w-content mx-auto">
          <p className="text-xs sm:text-sm font-body text-muted tracking-widest uppercase text-center">
            Production Label: NIDALUM MUSIC
          </p>
        </div>
      </section>

      {/* Editorial Block */}
      <section className="py-16 sm:py-24 px-8 border-t border-border bg-obsidian">
        <div className="max-w-content mx-auto text-center">
          <p className="text-lg sm:text-xl font-heading font-light tracking-wide text-ivory">
            Private access is limited. Requests may not receive a reply.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
