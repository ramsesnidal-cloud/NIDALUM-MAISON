import { useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Mail, Check } from 'lucide-react';

export default function NewsletterSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Veuillez entrer une adresse email valide');
        setIsLoading(false);
        return;
      }

      // Create subscriber
      await BaseCrudService.create('newslettersubscribers', {
        _id: crypto.randomUUID(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        subscriptionDate: new Date().toISOString(),
        isActive: true,
      });

      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-y border-primary/20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex justify-center mb-4">
            <Mail className="w-12 h-12 text-primary" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary mb-4">
            Rejoignez le Cercle Intérieur
          </h2>
          <p className="font-paragraph text-base sm:text-lg text-foreground/80">
            Recevez les actualités exclusives, les sorties musicales et les invitations spéciales de NIDALUM MAISON
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Success Message */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 flex items-center gap-3 mb-4"
            >
              <Check className="w-5 h-5" />
              <span className="font-paragraph">Merci ! Vous êtes maintenant inscrit à notre newsletter.</span>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/20 border border-red-500/50 text-red-400 p-4 mb-4"
            >
              <span className="font-paragraph">{error}</span>
            </motion.div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full bg-background/50 border border-primary/30 text-foreground placeholder-foreground/50 px-4 py-3 font-paragraph focus:outline-none focus:border-primary/70 transition-colors"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full bg-background/50 border border-primary/30 text-foreground placeholder-foreground/50 px-4 py-3 font-paragraph focus:outline-none focus:border-primary/70 transition-colors"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Votre email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-background/50 border border-primary/30 text-foreground placeholder-foreground/50 px-4 py-3 font-paragraph focus:outline-none focus:border-primary/70 transition-colors"
          />

          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-4 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? 'Inscription en cours...' : isSuccess ? 'Inscrit !' : 'Rejoindre le Cercle'}
          </button>

          <p className="font-paragraph text-xs text-foreground/60 text-center">
            Nous respectons votre vie privée. Désinscription possible à tout moment.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
