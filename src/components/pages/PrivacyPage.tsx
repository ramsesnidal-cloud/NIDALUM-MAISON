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
              Privacy Policy
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              We respect your privacy and are committed to protecting your personal data.
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
                  NIDALUM (hereinafter "we", "our", or "the site") is committed to protecting your privacy. This privacy policy explains how we collect, use, disclose, and safeguard your information.
                </p>
              </div>

              {/* Section 2 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">2. Information We Collect</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  We collect the following information:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li><strong>Registration Information:</strong> Name, email address, password</li>
                  <li><strong>Profile Information:</strong> Profile photo, biography, language preferences</li>
                  <li><strong>Contact Information:</strong> Messages via contact form</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent, interactions</li>
                  <li><strong>Technical Information:</strong> IP address, browser type, operating system</li>
                  <li><strong>Cookies:</strong> Session identifiers, user preferences</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">3. Use of Your Information</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li>Create and manage your user account</li>
                  <li>Provide the services and features of the site</li>
                  <li>Personalize your user experience</li>
                  <li>Communicate with you regarding your account</li>
                  <li>Send updates and newsletters (with consent)</li>
                  <li>Analyze site usage to improve our services</li>
                  <li>Detect and prevent fraud and abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">4. Sharing Your Information</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  We do not sell, rent, or share your personal information with third parties, except in the following cases:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li>With your explicit consent</li>
                  <li>To comply with law or court orders</li>
                  <li>With our service providers (hosting, email, analytics)</li>
                  <li>In case of merger, acquisition, or asset sale</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">5. Data Security</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, modification, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </div>

              {/* Section 6 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">6. Cookies and Tracking Technologies</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li>Maintain your login session</li>
                  <li>Remember your preferences</li>
                  <li>Analyze site usage</li>
                  <li>Display relevant content</li>
                </ul>
                <p className="font-paragraph text-foreground/80 leading-relaxed mt-4">
                  You can control cookies through your browser settings.
                </p>
              </div>

              {/* Section 7 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">7. Your Rights</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  You have the following rights regarding your personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-foreground/80">
                  <li><strong>Right of Access:</strong> You can request access to your data</li>
                  <li><strong>Right of Correction:</strong> You can correct inaccurate data</li>
                  <li><strong>Right to be Forgotten:</strong> You can request deletion of your data</li>
                  <li><strong>Right to Data Portability:</strong> You can request a copy of your data</li>
                  <li><strong>Right to Object:</strong> You can object to processing of your data</li>
                </ul>
              </div>

              {/* Section 8 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">8. Data Retention</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  We retain your personal data as long as necessary to provide our services and comply with our legal obligations. You can request deletion of your data at any time.
                </p>
              </div>

              {/* Section 9 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">9. Changes to This Policy</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  We may modify this privacy policy at any time. Changes will take effect upon publication on the site. Your continued use of the site after publication of changes constitutes your acceptance of the modified policy.
                </p>
              </div>

              {/* Section 10 */}
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h2 className="font-heading text-3xl text-primary mb-4">10. Contact</h2>
                <p className="font-paragraph text-foreground/80 leading-relaxed">
                  If you have questions regarding this privacy policy or our privacy practices, please contact us at:
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
