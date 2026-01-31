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
              Terms of Use
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Please read these terms carefully before using this platform.
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
                <h2 className="font-heading text-3xl text-primary mb-4">1. Acceptance of Terms</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  By accessing and using the NIDALUM platform, you accept these terms of use. If you do not accept these terms, do not use this site.
                </p>
              </div>

              {/* Section 2 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">2. Authorized Use</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  You agree to use this site only for lawful purposes and in a manner that does not violate the rights of others or restrict their use and enjoyment of the site.
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li>Do not use the site for harassment or discrimination</li>
                  <li>Do not transmit viruses or malicious code</li>
                  <li>Do not collect or track personal information of others</li>
                  <li>Do not impersonate another person</li>
                  <li>Do not violate copyright or intellectual property rights</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">3. Intellectual Property</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  All content on this site, including text, images, videos, sounds, and graphics, is the property of NIDALUM or its content providers and is protected by international copyright laws.
                </p>
                <p className="font-paragraph text-foreground/80 leading-relaxed mt-4">
                  The Nidalum language and all its elements (alphabet, grammar, vocabulary) are the original creation of Ramses Nidal and are protected by copyright.
                </p>
              </div>

              {/* Section 4 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">4. User Accounts</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  If you create an account on this site, you are responsible for maintaining the confidentiality of your login credentials and password.
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>You agree to notify immediately of any unauthorized access</li>
                  <li>You agree to provide accurate and complete information during registration</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">5. Limitation of Liability</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  NIDALUM will not be responsible for direct, indirect, incidental, special, or consequential damages resulting from your use or inability to use the site or services.
                </p>
              </div>

              {/* Section 6 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">6. Modification of Terms</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  NIDALUM reserves the right to modify these terms at any time. Modifications will take effect upon publication on the site. Your continued use of the site after publication of modifications constitutes your acceptance of the modified terms.
                </p>
              </div>

              {/* Section 7 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">7. Termination</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  NIDALUM may terminate or suspend your access to the site at any time, without notice, for violation of these terms or for any other reason.
                </p>
              </div>

              {/* Section 8 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">8. Governing Law</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  These terms are governed by and construed in accordance with applicable law. Any dispute arising from these terms will be subject to the exclusive jurisdiction of the competent courts.
                </p>
              </div>

              {/* Section 9 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">9. Contact</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  If you have questions regarding these terms of use, please contact us at:
                </p>
                <div className="mt-4 space-y-2 font-paragraph text-foreground/80">
                  <p><strong>Email:</strong> contact@nidalum.com</p>
                  <p><strong>Address:</strong> NIDALUM Institute</p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-center pt-8 border-t border-primary/20">
                <p className="font-paragraph text-sm text-foreground/60">
                  Last updated: January 31, 2026
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
