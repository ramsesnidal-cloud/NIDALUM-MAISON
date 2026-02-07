import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('hsSqsEUDWXNhgZ_BK');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const messageId = crypto.randomUUID();
      
      // Step 1: Save to Wix CMS as backup
      const payload = {
        _id: messageId,
        name: formData.name,
        email: formData.email,
        subject: 'Direct Contact',
        message: formData.message,
        submissionDate: new Date(),
      };
      
      await BaseCrudService.create('contactmessages', payload);
      
      // Step 2: Send email via EmailJS (only after successful CMS save)
      await emailjs.send(
        'service_e2vfstw',
        'template_z5dlaqc',
        {
          to_email: 'contact@nidalumuniverse.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );
      
      // Step 3: Show success message ONLY if email was sent successfully
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-14 md:pb-16 lg:pb-16 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-heading font-bold tracking-widest mb-3 sm:mb-4">
            CONTACT
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-body text-muted">
            Direct contact with the House.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-900 border border-red-700 text-ivory rounded">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {submitted ? (
            <div className="text-center py-12">
              <p className="text-base sm:text-lg md:text-lg font-heading text-gold tracking-wide">
                Message Sent.
              </p>
              <p className="text-xs sm:text-sm text-muted mt-2">
                Thank you for reaching out. We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm md:text-sm font-body text-ivory tracking-wide mb-2 sm:mb-3">
                  NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-night border border-border px-3 sm:px-4 py-2 sm:py-3 text-ivory placeholder-muted focus:outline-none focus:border-gold transition-colors text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm md:text-sm font-body text-ivory tracking-wide mb-2 sm:mb-3">
                  EMAIL
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

              {/* Message */}
              <div>
                <label className="block text-xs sm:text-sm md:text-sm font-body text-ivory tracking-wide mb-2 sm:mb-3">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-night border border-border px-3 sm:px-4 py-2 sm:py-3 text-ivory placeholder-muted focus:outline-none focus:border-gold transition-colors resize-none text-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 sm:px-8 py-2 sm:py-3 border border-ivory text-ivory hover:bg-gold hover:text-obsidian hover:border-gold transition-all duration-300 font-body text-xs sm:text-sm md:text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'SENDING...' : 'SEND'}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
