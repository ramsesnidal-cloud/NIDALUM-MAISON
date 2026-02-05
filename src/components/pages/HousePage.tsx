import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HousePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-14 md:pb-16 lg:pb-16 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-heading font-bold tracking-widest mb-3 sm:mb-4">
            THE HOUSE
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-body text-muted">
            Legitimacy through vision. Mythology, not history.
          </p>
        </div>
      </section>

      {/* Origin */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-heading tracking-wide mb-6 sm:mb-8 text-ivory">ORIGIN</h2>
          <p className="text-xs sm:text-sm md:text-base font-body text-muted max-w-2xl leading-relaxed mb-4 sm:mb-6">
            NIDALUM emerged from the convergence of three ancient practices: the preservation of sacred utterance, the transmission of literary knowledge, and the cultivation of silence as a discipline. We do not claim historical precedent. We claim necessity.
          </p>
        </div>
      </section>

      {/* Axes */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-heading tracking-wide mb-8 sm:mb-10 md:mb-12 text-ivory">AXES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-8">
            <div>
              <h3 className="text-base sm:text-lg md:text-lg font-heading tracking-wide mb-3 sm:mb-4 text-gold">ORIGIN</h3>
              <p className="text-xs sm:text-sm md:text-sm font-body text-muted leading-relaxed">
                NIDALUM emerged from the convergence of three ancient practices: the preservation of sacred utterance, the transmission of literary knowledge, and the cultivation of silence as a discipline. We do not claim historical precedent. We claim necessity.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-lg font-heading tracking-wide mb-3 sm:mb-4 text-gold">BREATH</h3>
              <p className="text-xs sm:text-sm md:text-sm font-body text-muted leading-relaxed">
                Breath is the first measure. It governs cadence, restraint, and the moment a word is allowed to exist. In NIDALUM, breath is not performance. It is permission. The voice enters only when breath has prepared the space.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-lg font-heading tracking-wide mb-3 sm:mb-4 text-gold">MEMORY</h3>
              <p className="text-xs sm:text-sm md:text-sm font-body text-muted leading-relaxed">
                Memory is not nostalgia. It is architecture. What is remembered is shaped, protected, and transmitted with precision. In NIDALUM, memory becomes a vessel, carrying meaning across time without dilution, without noise.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-lg font-heading tracking-wide mb-3 sm:mb-4 text-gold">SOUND</h3>
              <p className="text-xs sm:text-sm md:text-sm font-body text-muted leading-relaxed">
                Sound is material, not decoration. It is vibration with consequence. Sacred chant is treated as structure, not entertainment. What is heard is designed to alter attention, to sharpen presence, to hold the inner line.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-lg font-heading tracking-wide mb-3 sm:mb-4 text-gold">FORM</h3>
              <p className="text-xs sm:text-sm md:text-sm font-body text-muted leading-relaxed">
                Form is the discipline that makes the invisible legible. It is proportion, constraint, and intention. In NIDALUM, form protects rarity. It turns creation into rite, and keeps the House from becoming a product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 border-b border-border bg-night">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-heading tracking-wide mb-8 sm:mb-10 md:mb-12 text-ivory">VALUES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <div>
              <h3 className="text-base sm:text-lg md:text-lg font-heading tracking-wide mb-3 sm:mb-4 text-gold">SILENCE</h3>
              <p className="text-xs sm:text-sm md:text-sm font-body text-muted leading-relaxed">
                Not absence, but presence. The space in which meaning crystallizes.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-lg font-heading tracking-wide mb-3 sm:mb-4 text-gold">TRANSMISSION</h3>
              <p className="text-xs sm:text-sm md:text-sm font-body text-muted leading-relaxed">
                Knowledge moves from hand to hand, never to the masses. Rarity is preserved through restraint.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-lg font-heading tracking-wide mb-3 sm:mb-4 text-gold">RARITY</h3>
              <p className="text-xs sm:text-sm md:text-sm font-body text-muted leading-relaxed">
                What is common loses its power. We guard the exceptional through controlled access.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
