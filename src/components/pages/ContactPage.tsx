import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { ContactMessages } from '@/entities';
import { useTranslation } from '@/hooks/useTranslation';

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) return false;
    if (!validateEmail(formData.email)) return false;
    if (!formData.subject.trim()) return false;
    if (formData.message.trim().length < 10) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    setIsSubmitting(true);

    try {
      await BaseCrudService.create<ContactMessages>('contactmessages', {
        _id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        submissionDate: new Date()
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading text-6xl md:text-7xl tracking-widest mb-8 font-light">
            CONTACT
          </h1>
          <p className="text-base md:text-lg tracking-wide text-stone-400">
            Reach the inner circle
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 mt-12"></div>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Name */}
            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500 mb-3 block">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-transparent border-b border-white border-opacity-30 focus:border-opacity-100 py-3 px-0 text-base tracking-wide placeholder-stone-600 focus:outline-none transition-all duration-300"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500 mb-3 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full bg-transparent border-b border-white border-opacity-30 focus:border-opacity-100 py-3 px-0 text-base tracking-wide placeholder-stone-600 focus:outline-none transition-all duration-300"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500 mb-3 block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Your subject"
                className="w-full bg-transparent border-b border-white border-opacity-30 focus:border-opacity-100 py-3 px-0 text-base tracking-wide placeholder-stone-600 focus:outline-none transition-all duration-300"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500 mb-3 block">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                rows={6}
                className="w-full bg-transparent border border-white border-opacity-30 focus:border-opacity-100 p-4 text-base tracking-wide placeholder-stone-600 focus:outline-none transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-950 border border-green-700 p-4 text-center"
              >
                <p className="text-sm tracking-wide text-green-300">
                  Message received. We will be in touch.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-950 border border-red-700 p-4 text-center"
              >
                <p className="text-sm tracking-wide text-red-300">
                  Please check your information and try again.
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-xs tracking-widest uppercase border border-white px-6 py-4 hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            <p className="text-xs text-stone-600 text-center tracking-wide">
              We respect your privacy. Your message is secure.
            </p>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
