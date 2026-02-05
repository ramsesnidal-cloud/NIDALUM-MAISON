import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await BaseCrudService.create('newslettersubscribers', {
        _id: crypto.randomUUID(),
        email: formData.email,
        firstName: formData.firstName || undefined,
        subscriptionDate: new Date(),
        isActive: true,
      });
      setSubmitted(true);
      setFormData({ email: '', firstName: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-14 md:pb-16 lg:pb-16 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-heading font-bold tracking-widest mb-3 sm:mb-4">
            SIGN UP
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-body text-muted">
            Subscribe for updates.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-12">
              <p className="text-base sm:text-lg md:text-lg font-heading text-gold tracking-wide">
                Subscribed.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm md:text-sm font-body text-ivory tracking-wide mb-2 sm:mb-3">
                  EMAIL <span className="text-gold">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-night border border-border px-3 sm:px-4 py-2 sm:py-3 text-ivory placeholder-muted focus:outline-none focus:border-gold transition-colors text-sm"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm md:text-sm font-body text-ivory tracking-wide mb-2 sm:mb-3">
                  NAME <span className="text-muted">(optional)</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-night border border-border px-3 sm:px-4 py-2 sm:py-3 text-ivory placeholder-muted focus:outline-none focus:border-gold transition-colors text-sm"
                />
              </div>

              {/* Note */}
              <div className="pt-3 sm:pt-4 border-t border-border">
                <p className="text-[0.65rem] sm:text-xs md:text-xs font-body text-muted leading-relaxed">
                  Updates are occasional. No spam. Unsubscribe anytime.<br />
                  No tracking and no cookies by default.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full px-6 sm:px-8 py-2 sm:py-3 border border-ivory text-ivory hover:bg-gold hover:text-obsidian hover:border-gold transition-all duration-300 font-body text-xs sm:text-sm md:text-sm tracking-wide"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
