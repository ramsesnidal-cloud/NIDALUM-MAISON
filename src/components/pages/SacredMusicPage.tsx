import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SacredChantList from '@/components/SacredChantList';

export default function SacredMusicPage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            SACRED MUSIC
          </h1>
          <div className="space-y-3">
            <p className="text-lg font-body text-muted">
              Six Sacred Chants. Public excerpts only.
            </p>
            <p className="text-sm font-body text-muted">
              No lyrics are published.
            </p>
          </div>
        </div>
      </section>

      {/* Chants Grid */}
      <section className="py-24 px-8">
        <div className="max-w-content mx-auto">
          <SacredChantList />
        </div>
      </section>

      <Footer />
    </div>
  );
}
