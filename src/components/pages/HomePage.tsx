import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero Section - Responsive height without full screen */}
      <section className="pt-32 pb-10 md:pb-14 lg:pb-18 px-6 sm:px-10 lg:px-14 min-h-[50vh] sm:min-h-[58vh] md:min-h-[62vh] lg:min-h-[70vh] flex items-center">
        <div className="mx-auto max-w-[1120px] text-center w-full">
          <h1 
            className="font-heading font-bold leading-[1.1] mb-8 text-ivory"
            style={{
              fontSize: 'clamp(2.1rem, 7.2vw, 5.6rem)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'clip',
              letterSpacing: 'clamp(-0.02em, -0.5vw, -0.01em)',
            }}
          >
            NIDALUM MAISON
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

      {/* Editorial Block */}
      <section className="py-10 md:py-14 lg:py-18 px-6 sm:px-10 lg:px-14 border-t border-border bg-obsidian">
        <div className="mx-auto max-w-[1120px] text-center">
          <p className="text-lg sm:text-xl font-heading font-light tracking-wide text-ivory">
            Private access is limited. Requests may not receive a reply.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
