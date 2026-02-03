import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LiteraturePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            LITERATURE
          </h1>
          <p className="text-lg font-body text-muted">
            Desire without access. The work exists beyond reach.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-8">
        <div className="max-w-content mx-auto max-w-2xl">
          <div className="space-y-8">
            <div>
              <p className="text-base font-body text-ivory leading-relaxed mb-6">
                The work exists.
              </p>
            </div>
            
            <div>
              <p className="text-base font-body text-ivory leading-relaxed mb-6">
                It is private.
              </p>
            </div>
            
            <div>
              <p className="text-base font-body text-ivory leading-relaxed mb-6">
                It is transmitted, not displayed.
              </p>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-sm font-body text-muted leading-relaxed">
                No excerpts. No plot explanation. No summary. The work remains whole, known only to those who have been chosen to receive it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
