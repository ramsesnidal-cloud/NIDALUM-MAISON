import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            PRIVACY POLICY
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6 sm:px-10 lg:px-14">
        <div className="max-w-[1320px] mx-auto max-w-2xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-heading tracking-wide mb-4 text-ivory">
                DATA COLLECTION
              </h2>
              <p className="text-base font-body text-muted leading-relaxed">
                We collect only the information you provide through our contact form. This includes your name, email address, inquiry type, and message.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-heading tracking-wide mb-4 text-ivory">
                DATA USE
              </h2>
              <p className="text-base font-body text-muted leading-relaxed">
                Your information is used solely to respond to your inquiry. We do not share your data with third parties.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-heading tracking-wide mb-4 text-ivory">
                COOKIES
              </h2>
              <p className="text-base font-body text-muted leading-relaxed">
                This site does not use cookies or tracking technologies by default.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-heading tracking-wide mb-4 text-ivory">
                CONTACT
              </h2>
              <p className="text-base font-body text-muted leading-relaxed">
                For privacy inquiries, please contact us through the contact form.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
