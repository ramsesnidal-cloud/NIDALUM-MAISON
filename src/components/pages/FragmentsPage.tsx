import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fragmentsLexicon100 } from '@/content/fragments_lexicon_100';
import { fragmentsDaily10 } from '@/content/fragments_daily_10';

export default function FragmentsPage() {
  // Use official datasets - exactly 100 lexicon items and 10 expressions
  const [lexicon] = useState(fragmentsLexicon100.slice(0, 100));
  const [expressions] = useState(fragmentsDaily10.slice(0, 10));

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-14 md:pb-16 lg:pb-16 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-heading font-bold tracking-widest mb-3 sm:mb-4">
            FRAGMENTS
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-body text-muted max-w-2xl leading-relaxed">
            Selected fragments only. Not a full dictionary. Inspired by ancient Egyptian resonance and ceremonial language. No historical claims.
          </p>
        </div>
      </section>

      {/* Lexicon Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-heading font-bold tracking-widest mb-8 sm:mb-10 md:mb-12">
            LEXICON ({lexicon.length} WORDS)
          </h2>

          {/* Lexicon Grid */}
          {lexicon.length === 0 ? (
            <div className="text-center text-muted text-sm">No lexicon available.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {lexicon.map((item, idx) => (
                <div
                  key={idx}
                  className="text-center"
                >
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide text-gold mb-1 sm:mb-2">
                    {item.nidalum}
                  </p>
                  <p className="text-[0.65rem] sm:text-xs md:text-sm text-blue-400 mb-0.5 sm:mb-1">
                    {item.french}
                  </p>
                  <p className="text-[0.65rem] sm:text-xs md:text-sm text-ivory">
                    {item.english}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Daily Expressions Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-heading font-bold tracking-widest mb-8 sm:mb-10 md:mb-12">
            DAILY EXPRESSIONS ({expressions.length})
          </h2>

          {/* Expressions Grid */}
          {expressions.length === 0 ? (
            <div className="text-center text-muted text-sm">No expressions available.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {expressions.map((item, idx) => (
                <div
                  key={idx}
                  className="text-center"
                >
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide text-gold mb-1 sm:mb-2">
                    {item.nidalum}
                  </p>
                  <p className="text-[0.65rem] sm:text-xs md:text-sm text-blue-400 mb-0.5 sm:mb-1">
                    {item.french}
                  </p>
                  <p className="text-[0.65rem] sm:text-xs md:text-sm text-ivory">
                    {item.english}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
