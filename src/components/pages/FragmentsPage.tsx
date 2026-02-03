import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fragmentsLexicon } from '@/content/fragments_lexicon';
import { fragmentsExpressions } from '@/content/fragments_expressions';

export default function FragmentsPage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            FRAGMENTS
          </h1>
          <p className="text-lg font-body text-muted">
            Selected words and expressions from the Nidalum language.
          </p>
        </div>
      </section>

      {/* Lexicon Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-heading font-bold tracking-widest mb-4">
            LEXICON
          </h2>
          
          {/* Note */}
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-body text-muted leading-relaxed mb-4">
              Selected fragments only. Not a full dictionary.
            </p>
            <p className="text-xs font-body text-muted leading-relaxed italic">
              Inspired by ancient Egyptian resonance and ceremonial language. No historical claims.
            </p>
          </div>

          {/* Lexicon Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {fragmentsLexicon.map((item, idx) => (
              <div
                key={idx}
                className="border border-border p-4 md:p-5 text-center hover:border-gold transition-colors duration-300"
              >
                <p className="text-sm md:text-base font-heading text-ivory mb-2 tracking-widest">
                  {item.nidalum}
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
            DAILY EXPRESSIONS
          </h2>

          {/* Expressions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {fragmentsExpressions.map((item, idx) => (
              <div
                key={idx}
                className="border border-border p-6 md:p-8 hover:border-gold transition-colors duration-300"
              >
                <p className="text-base md:text-lg font-heading text-ivory mb-3 tracking-widest">
                  {item.nidalum}
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
