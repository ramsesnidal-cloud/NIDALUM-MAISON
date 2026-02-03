import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Music } from 'lucide-react';

export default function SacredMusicPage() {
  const chants = [
    { id: 1, title: 'Chant I', duration: '4:32', energy: 'Invocation' },
    { id: 2, title: 'Chant II', duration: '5:18', energy: 'Veil' },
    { id: 3, title: 'Chant III', duration: '3:45', energy: 'Fire' },
    { id: 4, title: 'Chant IV', duration: '6:02', energy: 'Salt' },
    { id: 5, title: 'Chant V', duration: '4:15', energy: 'Memory' },
    { id: 6, title: 'Chant VI', duration: '5:50', energy: 'Silence' },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            SACRED MUSIC
          </h1>
          <p className="text-lg font-body text-muted">
            Ritual utterance. Experience without explanation.
          </p>
        </div>
      </section>

      {/* Chants Grid */}
      <section className="py-24 px-8">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-8">
            {chants.map((chant) => (
              <div key={chant.id} className="border border-border p-8 hover:border-gold transition-colors duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-heading tracking-wide text-ivory mb-2">
                      {chant.title}
                    </h3>
                    <p className="text-sm font-body text-muted">
                      {chant.duration}
                    </p>
                  </div>
                  <span className="text-xs font-body text-gold tracking-widest uppercase">
                    {chant.energy}
                  </span>
                </div>
                
                <button className="flex items-center gap-2 text-ivory hover:text-gold transition-colors duration-300 font-body text-sm tracking-wide">
                  <Music size={16} />
                  LISTEN
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
