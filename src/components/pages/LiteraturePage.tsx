import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { LiteratureBooks } from '@/entities/index';

export default function LiteraturePage() {
  const [books, setBooks] = useState<LiteratureBooks[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const result = await BaseCrudService.getAll<LiteratureBooks>('literaturebooks', [], { limit: 100 });
        const publishedBooks = (result.items || [])
          .filter(b => b.isPublished === true)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setBooks(publishedBooks);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadBooks();
  }, []);
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
            The work is in development. Stay attentive. We will keep you informed as it evolves.
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-24 px-6 sm:px-10 lg:px-14">
        <div className="max-w-[1320px] mx-auto">
          {isLoading ? (
            <div className="text-center text-muted">Loading...</div>
          ) : books.length === 0 ? (
            <div className="text-center text-muted">No books available.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {books.map((book) => (
                <div key={book._id} className="flex flex-col">
                  <div className="mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={book.coverImage || 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg'}
                      alt={book.title || 'Book'}
                      width={300}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-heading tracking-wide mb-3 text-ivory">
                    {book.title}
                  </h3>
                  <p className="text-sm font-body text-muted leading-relaxed">
                    {book.shortDescription}
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
