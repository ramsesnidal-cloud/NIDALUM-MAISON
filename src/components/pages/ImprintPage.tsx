import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ImprintPage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            IMPRINT
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-8">
        <div className="max-w-content mx-auto max-w-2xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-heading tracking-wide mb-4 text-ivory">
                PUBLISHER INFORMATION
              </h2>
              <p className="text-base font-body text-muted leading-relaxed">
                NIDALUM is a House dedicated to the preservation and transmission of rare literary and musical works. This website serves as a portal to our practice.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-heading tracking-wide mb-4 text-ivory">
                CONTACT
              </h2>
              <p className="text-base font-body text-muted leading-relaxed">
                For inquiries, please use the contact form on our Contact page.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-heading tracking-wide mb-4 text-ivory">
                LIABILITY
              </h2>
              <p className="text-base font-body text-muted leading-relaxed">
                This website is provided as is. NIDALUM is not liable for any damages arising from the use or inability to use this site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
