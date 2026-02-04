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
      <section className="pt-32 pb-16 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-6">
            FRAGMENTS
          </h1>
          <p className="text-base md:text-lg font-body text-muted max-w-2xl leading-relaxed">
            Selected fragments only. Not a full dictionary. Inspired by ancient Egyptian resonance and ceremonial language. No historical claims.
          </p>
        </div>
      </section>

      {/* Lexicon Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-heading font-bold tracking-widest mb-12">
            LEXICON ({lexicon.length} WORDS)
          </h2>

          {/* Lexicon Grid */}
          {lexicon.length === 0 ? (
            <div className="text-center text-muted">No lexicon available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {lexicon.map((item, idx) => (
                <div
                  key={idx}
                  className="text-center"
                >
                  <p className="text-lg md:text-xl font-medium tracking-wide text-[#FBBF24] mb-2">
                    {item.nidalum}
                  </p>
                  <p className="text-sm md:text-base text-blue-400 mb-1">
                    {item.french}
                  </p>
                  <p className="text-sm md:text-base text-white">
                    {item.english}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Daily Expressions Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-14">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-heading font-bold tracking-widest mb-12">
            DAILY EXPRESSIONS ({expressions.length})
          </h2>

          {/* Expressions Grid */}
          {expressions.length === 0 ? (
            <div className="text-center text-muted">No expressions available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {expressions.map((item, idx) => (
                <div
                  key={idx}
                  className="text-center"
                >
                  <p className="text-lg md:text-xl font-medium tracking-wide text-[#FBBF24] mb-2">
                    {item.nidalum}
                  </p>
                  <p className="text-sm md:text-base text-blue-400 mb-1">
                    {item.french}
                  </p>
                  <p className="text-sm md:text-base text-white">
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
