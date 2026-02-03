import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-8">
        <div className="max-w-content mx-auto text-center">
          <h1 className="text-6xl font-heading font-bold tracking-widest mb-6">
            NIDALUM
          </h1>
          <p className="text-2xl font-heading font-light tracking-wide mb-8 text-gold">
            A House of Literature and Sacred Sound.
          </p>
          <p className="text-base font-body text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            We preserve what cannot be shared. We transmit what cannot be taught. We exist in the space between silence and utterance.
          </p>
          
          <div className="flex gap-6 justify-center">
            <Link 
              to="/contact" 
              className="px-8 py-3 border border-ivory text-ivory hover:bg-gold hover:text-obsidian hover:border-gold transition-all duration-300 rounded-lg font-body text-sm tracking-wide"
            >
              REQUEST PRIVATE ACCESS
            </Link>
            <Link 
              to="/house" 
              className="px-8 py-3 text-ivory hover:text-gold transition-colors duration-300 font-body text-sm tracking-wide"
            >
              ENTER THE HOUSE →
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 px-8 border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-lg font-heading tracking-wide mb-4 text-ivory">THE HOUSE</h3>
              <p className="text-sm font-body text-muted leading-relaxed">
                A lineage of silence, held across generations.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-heading tracking-wide mb-4 text-ivory">LITERATURE</h3>
              <p className="text-sm font-body text-muted leading-relaxed">
                Words that exist only in transmission, never in display.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-heading tracking-wide mb-4 text-ivory">SACRED SOUND</h3>
              <p className="text-sm font-body text-muted leading-relaxed">
                Ritual utterance preserved beyond the reach of recording.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Block */}
      <section className="py-24 px-8 border-t border-border bg-night">
        <div className="max-w-content mx-auto text-center">
          <p className="text-xl font-heading font-light tracking-wide text-ivory">
            A house does not ask for attention. It creates a pause.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 border-t border-border">
        <div className="max-w-content mx-auto text-center">
          <h2 className="text-3xl font-heading tracking-wide mb-6 text-ivory">
            PRIVATE ACCESS IS LIMITED.
          </h2>
          <p className="text-base font-body text-muted max-w-2xl mx-auto">
            Requests may not receive a reply.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
