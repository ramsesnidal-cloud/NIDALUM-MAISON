import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

export default function PrivacyPage() {
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
              Politique de Confidentialité
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Nous respectons votre vie privée et nous engageons à protéger vos données personnelles
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
                <h2 className="font-heading text-3xl text-primary mb-4">1. Introduction</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  NIDALUM Language Institute (ci-après "nous", "notre" ou "le site") s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et sauvegardons vos informations.
                </p>
              </div>

              {/* Section 2 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">2. Informations que Nous Collectons</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  Nous collectons les informations suivantes :
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li><strong>Informations d'enregistrement:</strong> Nom, prénom, adresse e-mail, mot de passe</li>
                  <li><strong>Informations de profil:</strong> Photo de profil, biographie, préférences de langue</li>
                  <li><strong>Informations de contact:</strong> Messages via le formulaire de contact</li>
                  <li><strong>Données d'utilisation:</strong> Pages visitées, temps passé, interactions</li>
                  <li><strong>Informations techniques:</strong> Adresse IP, type de navigateur, système d'exploitation</li>
                  <li><strong>Cookies:</strong> Identifiants de session, préférences utilisateur</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">3. Utilisation de Vos Informations</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  Nous utilisons vos informations pour :
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li>Créer et gérer votre compte utilisateur</li>
                  <li>Fournir les services et fonctionnalités du site</li>
                  <li>Personnaliser votre expérience utilisateur</li>
                  <li>Communiquer avec vous concernant votre compte</li>
                  <li>Envoyer des mises à jour et des newsletters (avec consentement)</li>
                  <li>Analyser l'utilisation du site pour améliorer nos services</li>
                  <li>Détecter et prévenir les fraudes et les abus</li>
                  <li>Respecter les obligations légales</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">4. Partage de Vos Informations</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  Nous ne vendons, ne louons et ne partageons pas vos informations personnelles avec des tiers, sauf dans les cas suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li>Avec votre consentement explicite</li>
                  <li>Pour respecter la loi ou les ordonnances judiciaires</li>
                  <li>Avec nos prestataires de services (hébergement, email, analytics)</li>
                  <li>En cas de fusion, acquisition ou vente d'actifs</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">5. Sécurité de Vos Données</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est 100% sécurisée.
                </p>
              </div>

              {/* Section 6 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">6. Cookies et Technologies de Suivi</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  Nous utilisons des cookies et des technologies similaires pour :
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li>Maintenir votre session de connexion</li>
                  <li>Mémoriser vos préférences</li>
                  <li>Analyser l'utilisation du site</li>
                  <li>Afficher des publicités pertinentes</li>
                </ul>
                <p className="font-paragraph text-foreground/80 leading-relaxed mt-4">
                  Vous pouvez contrôler les cookies via les paramètres de votre navigateur.
                </p>
              </div>

              {/* Section 7 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">7. Vos Droits</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  Vous avez les droits suivants concernant vos données personnelles :
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li><strong>Droit d'accès:</strong> Vous pouvez demander l'accès à vos données</li>
                  <li><strong>Droit de rectification:</strong> Vous pouvez corriger vos données inexactes</li>
                  <li><strong>Droit à l'oubli:</strong> Vous pouvez demander la suppression de vos données</li>
                  <li><strong>Droit à la portabilité:</strong> Vous pouvez demander une copie de vos données</li>
                  <li><strong>Droit d'opposition:</strong> Vous pouvez vous opposer au traitement de vos données</li>
                </ul>
              </div>

              {/* Section 8 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">8. Rétention des Données</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et respecter nos obligations légales. Vous pouvez demander la suppression de vos données à tout moment.
                </p>
              </div>

              {/* Section 9 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">9. Modifications de cette Politique</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  Nous pouvons modifier cette politique de confidentialité à tout moment. Les modifications entreront en vigueur dès leur publication sur le site. Votre utilisation continue du site après la publication des modifications constitue votre acceptation de la politique modifiée.
                </p>
              </div>

              {/* Section 10 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">10. Contact</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques en matière de confidentialité, veuillez nous contacter à :
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
