import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // ========== DIAGNOSTIC LOGGING ==========
    console.log('=== CONTACT FORM SUBMISSION DIAGNOSTIC ===');
    console.log('TIMESTAMP:', new Date().toISOString());
    console.log('SERVICE USED: Wix CMS (BaseCrudService)');
    console.log('COLLECTION: contactmessages');
    console.log('DESTINATION EMAIL: contact@nidalumuniverse.com (stored in CMS, NOT sent via email service)');
    console.log('FORM DATA:', {
      name: formData.name,
      email: formData.email,
      message: formData.message.substring(0, 50) + '...',
    });
    console.log('NOTE: This form stores data in CMS database only. NO EMAIL SERVICE is configured.');
    console.log('To receive emails, you need to:');
    console.log('1. Set up an email service (EmailJS, Formspree, etc.)');
    console.log('2. Configure it with Service ID, Template ID, and Public Key');
    console.log('3. Update this component to send emails to contact@nidalumuniverse.com');
    console.log('=========================================');
    
    try {
      const messageId = crypto.randomUUID();
      console.log('CREATING MESSAGE:', messageId);
      
      const payload = {
        _id: messageId,
        name: formData.name,
        email: formData.email,
        subject: 'Direct Contact',
        message: formData.message,
        submissionDate: new Date(),
      };
      
      console.log('PAYLOAD:', payload);
      console.log('CALLING: BaseCrudService.create("contactmessages", payload)');
      
      const result = await BaseCrudService.create('contactmessages', payload);
      
      console.log('✓ SUCCESS: Message stored in CMS database');
      console.log('RESULT:', result);
      console.log('MESSAGE ID:', messageId);
      console.log('⚠️  WARNING: Email NOT sent. Data only stored in CMS.');
      
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('✗ ERROR: Failed to store message in CMS');
      console.error('ERROR DETAILS:', error);
      console.error('ERROR TYPE:', error instanceof Error ? error.message : 'Unknown error');
      
      setError('Failed to submit form. Please try again.');
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
                Received.
              </p>
              <p className="text-xs sm:text-sm text-muted mt-2">
                ⚠️ Your message has been stored but NO EMAIL was sent. Check browser console for details.
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
                className="w-full px-6 sm:px-8 py-2 sm:py-3 border border-ivory text-ivory hover:bg-gold hover:text-obsidian hover:border-gold transition-all duration-300 font-body text-xs sm:text-sm md:text-sm tracking-wide"
              >
                SEND
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
