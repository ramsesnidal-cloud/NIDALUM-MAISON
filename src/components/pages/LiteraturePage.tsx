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
            The work exists. It is private. It is transmitted, not displayed.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-8">
        <div className="max-w-content mx-auto max-w-2xl">
          <p className="text-base font-body text-ivory leading-relaxed">
            No excerpts. No plot explanation. No summary. The work remains whole, known only to those who have been chosen to receive it.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
