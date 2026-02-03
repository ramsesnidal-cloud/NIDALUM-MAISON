import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HousePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            THE HOUSE
          </h1>
          <p className="text-lg font-body text-muted">
            Legitimacy through vision. Mythology, not history.
          </p>
        </div>
      </section>

      {/* Origin */}
      <section className="py-24 px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <h2 className="text-2xl font-heading tracking-wide mb-8 text-ivory">ORIGIN</h2>
          <p className="text-base font-body text-muted max-w-2xl leading-relaxed mb-6">
            NIDALUM emerged from the convergence of three ancient practices: the preservation of sacred utterance, the transmission of literary knowledge, and the cultivation of silence as a discipline. We do not claim historical precedent. We claim necessity.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-8 border-b border-border bg-night">
        <div className="max-w-content mx-auto">
          <h2 className="text-2xl font-heading tracking-wide mb-12 text-ivory">VALUES</h2>
          <div className="grid grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-heading tracking-wide mb-4 text-gold">SILENCE</h3>
              <p className="text-sm font-body text-muted leading-relaxed">
                Not absence, but presence. The space in which meaning crystallizes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading tracking-wide mb-4 text-gold">TRANSMISSION</h3>
              <p className="text-sm font-body text-muted leading-relaxed">
                Knowledge moves from hand to hand, never to the masses. Rarity is preserved through restraint.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading tracking-wide mb-4 text-gold">RARITY</h3>
              <p className="text-sm font-body text-muted leading-relaxed">
                What is common loses its power. We guard the exceptional through controlled access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Divisions */}
      <section className="py-24 px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <h2 className="text-2xl font-heading tracking-wide mb-12 text-ivory">FUTURE DIVISIONS</h2>
          <div className="grid grid-cols-2 gap-12">
            <div className="pb-8 border-b border-border">
              <h3 className="text-lg font-heading tracking-wide mb-4 text-ivory">NIDALUM PARFUM</h3>
              <p className="text-sm font-body text-muted">
                Coming later.
              </p>
            </div>
            <div className="pb-8 border-b border-border">
              <h3 className="text-lg font-heading tracking-wide mb-4 text-ivory">NIDALUM FASHION</h3>
              <p className="text-sm font-body text-muted">
                Coming later.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
