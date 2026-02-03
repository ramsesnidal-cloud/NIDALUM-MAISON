import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ArtistsPage() {
  const artists = [
    { id: 1, name: 'Artist 01', role: 'Voice', description: 'Keeper of the first utterance.' },
    { id: 2, name: 'Artist 02', role: 'Weaver', description: 'Threads the sacred into form.' },
    { id: 3, name: 'Artist 03', role: 'Herald', description: 'Announces what cannot be named.' },
    { id: 4, name: 'Artist 04', role: 'Scribe', description: 'Records the unrecordable.' },
    { id: 5, name: 'Artist 05', role: 'Keeper', description: 'Guards the threshold.' },
    { id: 6, name: 'Artist 06', role: 'Voice', description: 'Echoes the ancient silence.' },
    { id: 7, name: 'Artist 07', role: 'Weaver', description: 'Binds the invisible together.' },
    { id: 8, name: 'Artist 08', role: 'Herald', description: 'Speaks in tongues of light.' },
    { id: 9, name: 'Artist 09', role: 'Scribe', description: 'Writes in the margins of time.' },
    { id: 10, name: 'Artist 10', role: 'Keeper', description: 'Holds what must not be lost.' },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            ARTISTS
          </h1>
          <p className="text-lg font-body text-muted">
            A constellation of practitioners. Each a point of light.
          </p>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-24 px-8">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-8">
            {artists.map((artist) => (
              <div key={artist.id} className="border border-border p-8 hover:border-gold transition-colors duration-300">
                <div className="mb-4">
                  <h3 className="text-lg font-heading tracking-wide text-ivory mb-2">
                    {artist.name}
                  </h3>
                  <p className="text-xs font-body text-gold tracking-widest uppercase mb-4">
                    {artist.role}
                  </p>
                </div>
                
                <p className="text-sm font-body text-muted leading-relaxed">
                  {artist.description}
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
