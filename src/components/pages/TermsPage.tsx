import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

export default function TermsPage() {
  const { t } = useTranslation();

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
              Conditions d'Utilisation
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Veuillez lire attentivement ces conditions avant d'utiliser notre plateforme
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <div className="space-y-12">
              {/* Section 1 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">1. Acceptation des Conditions</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  En accédant et en utilisant le site NIDALUM Language Institute, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
                </p>
              </div>

              {/* Section 2 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">2. Utilisation Autorisée</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  Vous acceptez d'utiliser ce site uniquement à des fins légales et de manière à ne pas violer les droits d'autrui ou à restreindre leur utilisation et leur jouissance du site.
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li>Ne pas utiliser le site pour du harcèlement ou de la discrimination</li>
                  <li>Ne pas transmettre de virus ou de code malveillant</li>
                  <li>Ne pas collecter ou suivre les informations personnelles d'autrui</li>
                  <li>Ne pas usurper l'identité d'une autre personne</li>
                  <li>Ne pas violer les droits d'auteur ou les droits de propriété intellectuelle</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">3. Propriété Intellectuelle</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  Tout le contenu du site, y compris les textes, les images, les vidéos, les sons et les graphiques, est la propriété de NIDALUM Language Institute ou de ses fournisseurs de contenu et est protégé par les lois internationales sur les droits d'auteur.
                </p>
                <p className="font-paragraph text-foreground/80 leading-relaxed mt-4">
                  La langue Nidalum et tous ses éléments (alphabet, grammaire, vocabulaire) sont la création originale de Ramses Nidal et sont protégés par les droits d'auteur.
                </p>
              </div>

              {/* Section 4 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">4. Comptes Utilisateur</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  Si vous créez un compte sur notre site, vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion et de votre mot de passe.
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li>Vous êtes responsable de toutes les activités qui se produisent sous votre compte</li>
                  <li>Vous acceptez de notifier immédiatement tout accès non autorisé</li>
                  <li>Vous acceptez de fournir des informations exactes et complètes lors de l'inscription</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">5. Limitation de Responsabilité</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  NIDALUM Language Institute ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de votre utilisation ou de votre incapacité à utiliser le site ou les services.
                </p>
              </div>

              {/* Section 6 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">6. Modification des Conditions</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  NIDALUM Language Institute se réserve le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur le site. Votre utilisation continue du site après la publication des modifications constitue votre acceptation des conditions modifiées.
                </p>
              </div>

              {/* Section 7 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">7. Résiliation</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  NIDALUM Language Institute peut résilier ou suspendre votre accès au site à tout moment, sans préavis, pour violation de ces conditions ou pour toute autre raison.
                </p>
              </div>

              {/* Section 8 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">8. Droit Applicable</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  Ces conditions sont régies par et construites conformément aux lois applicables. Tout litige découlant de ces conditions sera soumis à la juridiction exclusive des tribunaux compétents.
                </p>
              </div>

              {/* Section 9 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">9. Contact</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à :
                </p>
                <div className="mt-4 space-y-2 font-paragraph text-foreground/80">
                  <p><strong>Email:</strong> contact@nidalum.com</p>
                  <p><strong>Adresse:</strong> Institut Nidalum, Univers Souma-Ra</p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-center pt-8 border-t border-primary/20">
                <p className="font-paragraph text-sm text-foreground/60">
                  Dernière mise à jour : 27 Novembre 2025
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
