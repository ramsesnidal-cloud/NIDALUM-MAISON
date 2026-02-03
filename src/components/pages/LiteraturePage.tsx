import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { literatureBooks } from '@/content/literature';

export default function LiteraturePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            LITERATURE
          </h1>
          <p className="text-lg font-body text-muted">
            The work exists. It is private. It is transmitted, not displayed.
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-24 px-6 sm:px-10 lg:px-14">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {literatureBooks.map((book) => (
              <div key={book.id} className="flex flex-col">
                <div className="mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <h3 className="text-lg font-heading tracking-wide mb-3 text-ivory">
                  {book.title}
                </h3>
                <p className="text-sm font-body text-muted leading-relaxed">
                  {book.description}
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
