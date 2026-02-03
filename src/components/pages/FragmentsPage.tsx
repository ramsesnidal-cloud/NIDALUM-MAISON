import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { FragmentsLexicon } from '@/entities/index';

export default function FragmentsPage() {
  const [lexicon, setLexicon] = useState<FragmentsLexicon[]>([]);
  const [expressions, setExpressions] = useState<FragmentsLexicon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const lexiconResult = await BaseCrudService.getAll<FragmentsLexicon>('fragmentslexicon', [], { limit: 100 });
        const publishedLexicon = (lexiconResult.items || [])
          .filter(l => l.isPublished === true)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setLexicon(publishedLexicon);

        const expressionsResult = await BaseCrudService.getAll<FragmentsLexicon>('dailyexpressions', [], { limit: 100 });
        const publishedExpressions = (expressionsResult.items || [])
          .filter(e => e.isPublished === true)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setExpressions(publishedExpressions);
      } catch (error) {
        console.error('Error loading fragments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
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
          {isLoading ? (
            <div className="text-center text-muted">Loading...</div>
          ) : lexicon.length === 0 ? (
            <div className="text-center text-muted">No lexicon available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {lexicon.map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 space-y-1"
                >
                  <p className="text-base md:text-lg font-medium tracking-wide text-[#C8A45D]">
                    {item.termNidalum}
                  </p>
                  <p className="text-xs md:text-sm text-blue-300/90">
                    {item.translationFrench}
                  </p>
                  <p className="text-xs md:text-sm text-white/85">
                    {item.translationEnglish}
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

          {/* Expressions List */}
          {isLoading ? (
            <div className="text-center text-muted">Loading...</div>
          ) : expressions.length === 0 ? (
            <div className="text-center text-muted">No expressions available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {expressions.map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 space-y-1"
                >
                  <p className="text-base md:text-lg font-medium tracking-wide text-[#C8A45D]">
                    {item.termNidalum}
                  </p>
                  <p className="text-xs md:text-sm text-blue-300/90">
                    {item.translationFrench}
                  </p>
                  <p className="text-xs md:text-sm text-white/85">
                    {item.translationEnglish}
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
