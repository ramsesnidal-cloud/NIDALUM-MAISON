import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fragmentsLexicon100 } from '@/content/fragments_lexicon_100';
import { fragmentsDaily10 } from '@/content/fragments_daily_10';

export default function FragmentsPage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-6">
            FRAGMENTS
          </h1>
          <p className="text-base md:text-lg font-body text-muted max-w-2xl leading-relaxed">
            Nidalum draws inspiration from ancient Egyptian aesthetics and sacred language principles. It is a constructed language for the NIDALUM universe.
          </p>
        </div>
      </section>

      {/* Lexicon Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-heading font-bold tracking-widest mb-12">
            LEXICON (100 WORDS)
          </h2>

          {/* Lexicon Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {fragmentsLexicon100.map((item, idx) => (
              <div
                key={idx}
                className="text-center group"
              >
                <p className="text-sm md:text-base font-heading text-ivory mb-2 tracking-widest transition-colors duration-300 group-hover:text-gold">
                  {item.nidalum}
                </p>
                <p className="text-xs md:text-sm font-body text-muted mb-1">
                  {item.french}
                </p>
                <p className="text-xs md:text-sm font-body text-muted">
                  {item.english}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Expressions Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-14">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-heading font-bold tracking-widest mb-12">
            DAILY EXPRESSIONS (10)
          </h2>

          {/* Expressions List */}
          <div className="space-y-6 md:space-y-8 max-w-2xl">
            {fragmentsDaily10.map((item, idx) => (
              <div
                key={idx}
                className="group"
              >
                <p className="text-base md:text-lg font-heading text-ivory mb-2 tracking-widest transition-colors duration-300 group-hover:text-gold">
                  {item.nidalum}
                </p>
                <p className="text-sm md:text-base font-body text-muted mb-1">
                  {item.french}
                </p>
                <p className="text-sm md:text-base font-body text-muted">
                  {item.english}
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
