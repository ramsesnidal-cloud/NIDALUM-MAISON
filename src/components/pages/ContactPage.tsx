import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
              Contactez-Nous
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Vous avez des questions sur la langue Nidalum, l'Academy, ou l'univers Souma-Ra? Nous sommes là pour vous répondre.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Contact Form Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-8">
                Informations de Contact
              </h2>
              <div className="space-y-6 mb-12">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-secondary mr-4 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl text-secondary mb-2">Email</h3>
                    <p className="font-paragraph text-foreground/70">{"ramsesnidal@gmail.com"}</p>
                    <p className="font-paragraph text-foreground/70">{"(+49) 15563655924"}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-secondary mr-4 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl text-secondary mb-2">Localisation</h3>
                    <p className="font-paragraph text-foreground/70">Institut Nidalum</p>
                    <p className="font-paragraph text-foreground/70">Univers Souma-Ra</p>
                  </div>
                </div>
              </div>

              <div className="border border-primary/20 p-8 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-primary mb-4">Horaires de Réponse</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                  Nous répondons généralement aux messages dans un délai de 24 à 48 heures.
                </p>
                <p className="font-paragraph text-sm text-foreground/60">
                  Pour les questions urgentes concernant l'Academy, veuillez utiliser l'adresse academy@nidalum.com
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-6">
                  Envoyez-nous un Message
                </h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-secondary/10 border border-secondary/30">
                    <p className="font-paragraph text-secondary">
                      Merci pour votre message! Nous vous répondrons bientôt.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="font-paragraph text-sm text-foreground/70 mb-2 block">
                      Nom Complet *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-background border-primary/20 text-foreground font-paragraph"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="font-paragraph text-sm text-foreground/70 mb-2 block">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-background border-primary/20 text-foreground font-paragraph"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="font-paragraph text-sm text-foreground/70 mb-2 block">
                      Sujet *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-background border-primary/20 text-foreground font-paragraph"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="font-paragraph text-sm text-foreground/70 mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="bg-background border-primary/20 text-foreground font-paragraph resize-none"
                      placeholder="Écrivez votre message ici..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-6 hover:bg-primary/90 transition-all duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              Questions Fréquentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-primary/20 p-6 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-xl text-secondary mb-3">
                  Comment puis-je apprendre Nidalum?
                </h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Inscrivez-vous à l'Academy Nidalum pour accéder à nos programmes structurés, du niveau débutant au niveau expert.
                </p>
              </div>
              <div className="border border-primary/20 p-6 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-xl text-secondary mb-3">
                  Les publications sont-elles disponibles?
                </h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Oui, consultez notre page Publications pour découvrir le dictionnaire Nidalum et d'autres ouvrages disponibles à l'achat.
                </p>
              </div>
              <div className="border border-primary/20 p-6 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-xl text-secondary mb-3">
                  Puis-je utiliser Nidalum dans mes projets?
                </h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Contactez-nous pour discuter des licences et autorisations d'utilisation de la langue Nidalum dans vos créations.
                </p>
              </div>
              <div className="border border-primary/20 p-6 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-xl text-secondary mb-3">
                  Comment contacter Ramses Nidal?
                </h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Pour les demandes professionnelles ou collaborations artistiques, utilisez le formulaire de contact ci-dessus.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
