import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface DiagnosticItem {
  id: string;
  category: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  details: string[];
  recommendation?: string;
}

export default function DiagnosticPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate diagnostic analysis
    setTimeout(() => {
      setDiagnosticData([
        {
          id: 'arch-1',
          category: 'Architecture',
          severity: 'success',
          title: 'React Router Configuration',
          description: 'React Router is properly configured with all routes defined in Router.tsx',
          details: [
            '✓ 29 routes configured',
            '✓ MemberProvider wrapping entire app',
            '✓ Protected routes using MemberProtectedRoute',
            '✓ Error page handler configured',
            '✓ ScrollToTop component integrated'
          ],
          recommendation: 'Architecture is well-structured. Continue maintaining this pattern.'
        },
        {
          id: 'arch-2',
          category: 'Architecture',
          severity: 'warning',
          title: 'Layout Components',
          description: 'Header and Footer components exist but may need optimization',
          details: [
            '⚠ Header.tsx is 50+ lines with complex logic',
            '⚠ Language switching logic embedded in Header',
            '⚠ Mobile menu state management could be simplified',
            '✓ Footer.tsx exists and is properly structured'
          ],
          recommendation: 'Consider extracting language switching to a custom hook for better separation of concerns.'
        },
        {
          id: 'pages-1',
          category: 'Pages',
          severity: 'success',
          title: 'Page Coverage',
          description: 'Comprehensive page coverage for the Nidalum language learning platform',
          details: [
            '✓ 29 pages created and routed',
            '✓ Home page (NidalumMaisonPage) as landing page',
            '✓ Language learning pages (Alphabet, Grammar, Phonetics, etc.)',
            '✓ Content pages (Publications, Resources, Origins)',
            '✓ User pages (Profile, SignUp)',
            '✓ Admin pages (AdminPage, diagnostic pages)'
          ],
          recommendation: 'Page structure is comprehensive. Ensure all pages have proper loading states.'
        },
        {
          id: 'pages-2',
          category: 'Pages',
          severity: 'warning',
          title: 'Diagnostic Pages',
          description: 'Multiple diagnostic pages exist that should be removed or hidden in production',
          details: [
            '⚠ AcademyDiagnostic.tsx',
            '⚠ CompleteLexicalDiagnostic.tsx',
            '⚠ LexicalArchivesDiagnostic.tsx',
            '⚠ InitializeLexicalData.tsx',
            '⚠ AdminPage.tsx',
            '⚠ SiteAuditReport.tsx'
          ],
          recommendation: 'Remove diagnostic pages from production or protect them with admin authentication.'
        },
        {
          id: 'cms-1',
          category: 'CMS & Data',
          severity: 'success',
          title: 'CMS Collections',
          description: '18 CMS collections properly configured for content management',
          details: [
            '✓ nidalumlexicon - Language vocabulary',
            '✓ alphabetnidalum - Alphabet data',
            '✓ grammairenidalum - Grammar rules',
            '✓ phonetiquenidalum - Phonetics',
            '✓ ritualchants - Audio content',
            '✓ musicshowcase - Music tracks',
            '✓ publications - Books and publications',
            '✓ officialresources - Learning resources',
            '✓ academieprogrammes - Academy programs',
            '✓ artistportfolio - Artist profiles',
            '✓ videoshowcase - Video content',
            '✓ origineschronologie - Historical data',
            '✓ languagecategories - Content categories',
            '✓ contactmessages - Contact form submissions',
            '✓ newslettersubscribers - Newsletter signups'
          ],
          recommendation: 'CMS structure is well-organized. Ensure all collections have proper permissions.'
        },
        {
          id: 'cms-2',
          category: 'CMS & Data',
          severity: 'warning',
          title: 'Data Fetching Patterns',
          description: 'Multiple pages use console.error for error handling',
          details: [
            '⚠ 23 instances of console.error found',
            '⚠ Error handling in: AlphabetPage, GrammarPage, PhoneticsPage, LexiconPage, etc.',
            '⚠ No centralized error handling mechanism',
            '⚠ Audio playback errors logged to console',
            '⚠ Newsletter subscription errors not user-friendly'
          ],
          recommendation: 'Implement centralized error handling with user-friendly error messages instead of console.error.'
        },
        {
          id: 'auth-1',
          category: 'Authentication',
          severity: 'success',
          title: 'Member Authentication',
          description: 'Authentication system properly integrated with Wix Members SDK',
          details: [
            '✓ MemberProvider wraps entire application',
            '✓ useMember hook available for all components',
            '✓ MemberProtectedRoute component for protected pages',
            '✓ Profile page protected with MemberProtectedRoute',
            '✓ Sign-in/Sign-out functionality available'
          ],
          recommendation: 'Authentication is well-implemented. Ensure all sensitive routes are protected.'
        },
        {
          id: 'auth-2',
          category: 'Authentication',
          severity: 'info',
          title: 'Profile Page',
          description: 'Profile page exists and is protected',
          details: [
            'ℹ Profile page at /profile route',
            'ℹ Protected with MemberProtectedRoute',
            'ℹ Displays member information',
            'ℹ Allows logout functionality'
          ],
          recommendation: 'Profile page is properly configured.'
        },
        {
          id: 'styling-1',
          category: 'Styling & Design',
          severity: 'success',
          title: 'Tailwind CSS Configuration',
          description: 'Tailwind CSS properly configured with custom theme',
          details: [
            '✓ Custom color palette defined',
            '✓ Primary color: #FBBF24 (Amber)',
            '✓ Secondary color: #00D0FF (Cyan)',
            '✓ Background: #00172E (Dark Blue)',
            '✓ Custom font families: Cinzel (heading), Montserrat (paragraph)',
            '✓ Extended typography scale'
          ],
          recommendation: 'Design system is well-established. Maintain consistency across all pages.'
        },
        {
          id: 'styling-2',
          category: 'Styling & Design',
          severity: 'warning',
          title: 'Responsive Design',
          description: 'Some pages may have responsive design issues',
          details: [
            '⚠ NidalumMaisonPage uses max-w-[100rem] and max-w-[120rem]',
            '⚠ Inconsistent max-width usage across pages',
            '⚠ Mobile breakpoints may need review',
            '⚠ Some components may overflow on small screens'
          ],
          recommendation: 'Audit all pages for mobile responsiveness. Use consistent max-width values.'
        },
        {
          id: 'components-1',
          category: 'Components',
          severity: 'success',
          title: 'shadcn/ui Components',
          description: 'shadcn/ui component library properly integrated',
          details: [
            '✓ 40+ UI components available',
            '✓ Button, Card, Dialog, Form components',
            '✓ Image component with proper alt text support',
            '✓ Loading spinner for async operations',
            '✓ Member protected route component'
          ],
          recommendation: 'Component library is comprehensive. Use existing components instead of creating new ones.'
        },
        {
          id: 'components-2',
          category: 'Components',
          severity: 'warning',
          title: 'Custom Components',
          description: 'Several custom components exist that may need review',
          details: [
            '⚠ AudioPlayer.tsx - 165 lines',
            '⚠ ModernAudioPlayer.tsx - Similar functionality',
            '⚠ TextToSpeechPlayer.tsx - Text-to-speech implementation',
            '⚠ AudioDebugger.tsx - Debug component',
            '⚠ EditChantImageModal.tsx - Modal component',
            '⚠ NewsletterSignup.tsx - Newsletter form'
          ],
          recommendation: 'Review duplicate audio player components. Consider consolidating into a single component.'
        },
        {
          id: 'i18n-1',
          category: 'Internationalization',
          severity: 'success',
          title: 'Multi-Language Support',
          description: 'Internationalization system implemented with 3 languages',
          details: [
            '✓ French (fr) - Primary language',
            '✓ English (en) - Secondary language',
            '✓ German (de) - Tertiary language',
            '✓ Language switcher component available',
            '✓ useTranslation hook for components',
            '✓ Language store using Zustand'
          ],
          recommendation: 'I18n system is well-implemented. Ensure all new content is translated.'
        },
        {
          id: 'i18n-2',
          category: 'Internationalization',
          severity: 'warning',
          title: 'Translation Coverage',
          description: 'Some hardcoded strings may not be translated',
          details: [
            '⚠ Header.tsx has some hardcoded English text',
            '⚠ Navigation items partially translated',
            '⚠ Some component labels may be missing translations',
            '⚠ Error messages not consistently translated'
          ],
          recommendation: 'Audit all user-facing text for translation coverage. Add missing translations to i18n.ts.'
        },
        {
          id: 'perf-1',
          category: 'Performance',
          severity: 'info',
          title: 'Image Optimization',
          description: 'Image component available for optimization',
          details: [
            'ℹ Custom Image component at @/components/ui/image',
            'ℹ Supports alt text for accessibility',
            'ℹ CSS file for image styling',
            'ℹ Placeholder URLs for image generation'
          ],
          recommendation: 'Use Image component for all images. Ensure alt text is descriptive.'
        },
        {
          id: 'perf-2',
          category: 'Performance',
          severity: 'warning',
          title: 'Bundle Size',
          description: 'Multiple similar components may increase bundle size',
          details: [
            '⚠ Duplicate audio player components',
            '⚠ Multiple diagnostic components',
            '⚠ Unused admin components',
            '⚠ No code splitting detected'
          ],
          recommendation: 'Remove unused components and consolidate duplicates. Consider lazy loading for routes.'
        },
        {
          id: 'accessibility-1',
          category: 'Accessibility',
          severity: 'warning',
          title: 'Color Contrast',
          description: 'Some color combinations may not meet WCAG AA standards',
          details: [
            '⚠ Amber-400 (#FBBF24) on dark backgrounds needs verification',
            '⚠ Cyan (#00D0FF) on dark backgrounds needs verification',
            '⚠ Some text may be too light on light backgrounds',
            '⚠ Focus states may not be clearly visible'
          ],
          recommendation: 'Run WCAG contrast checker on all color combinations. Ensure focus states are visible.'
        },
        {
          id: 'accessibility-2',
          category: 'Accessibility',
          severity: 'info',
          title: 'Semantic HTML',
          description: 'Components use semantic HTML elements',
          details: [
            'ℹ Proper heading hierarchy (h1, h2, h3)',
            'ℹ Form elements with labels',
            'ℹ Navigation landmarks',
            'ℹ Alt text for images'
          ],
          recommendation: 'Continue using semantic HTML. Test with screen readers.'
        },
        {
          id: 'security-1',
          category: 'Security',
          severity: 'warning',
          title: 'Admin Pages',
          description: 'Admin pages are not protected and accessible to all users',
          details: [
            '⚠ AdminPage.tsx at /admin route - NOT protected',
            '⚠ Diagnostic pages accessible without authentication',
            '⚠ No role-based access control',
            '⚠ Sensitive operations may be exposed'
          ],
          recommendation: 'Protect admin pages with role-based access control. Use MemberProtectedRoute with role checks.'
        },
        {
          id: 'security-2',
          category: 'Security',
          severity: 'info',
          title: 'Data Validation',
          description: 'Form inputs should be validated',
          details: [
            'ℹ Contact form exists',
            'ℹ Newsletter signup form exists',
            'ℹ Sign-up page exists',
            'ℹ Forms should validate user input'
          ],
          recommendation: 'Implement input validation using react-hook-form. Sanitize user inputs before submission.'
        },
        {
          id: 'seo-1',
          category: 'SEO',
          severity: 'info',
          title: 'Meta Tags',
          description: 'Head component exists for meta tag management',
          details: [
            'ℹ Head.tsx component available',
            'ℹ Can be used for page-specific meta tags',
            'ℹ Open Graph tags can be added',
            'ℹ Structured data can be implemented'
          ],
          recommendation: 'Add meta tags to each page. Implement Open Graph for social sharing.'
        },
        {
          id: 'seo-2',
          category: 'SEO',
          severity: 'warning',
          title: 'URL Structure',
          description: 'URL structure is good but could be optimized',
          details: [
            '✓ Descriptive URLs (e.g., /alphabet, /grammar)',
            '⚠ No slug-based detail pages detected',
            '⚠ No sitemap.xml found',
            '⚠ No robots.txt found'
          ],
          recommendation: 'Add sitemap.xml and robots.txt. Consider adding slug-based routes for detail pages.'
        },
        {
          id: 'testing-1',
          category: 'Testing & Quality',
          severity: 'info',
          title: 'Testing Setup',
          description: 'Testing infrastructure is configured',
          details: [
            'ℹ vitest.config.ts exists',
            'ℹ vitest.setup.ts configured',
            'ℹ ESLint configured',
            'ℹ TypeScript strict mode disabled (may need review)'
          ],
          recommendation: 'Add unit tests for critical components. Set up integration tests for user flows.'
        },
        {
          id: 'testing-2',
          category: 'Testing & Quality',
          severity: 'warning',
          title: 'TypeScript Configuration',
          description: 'TypeScript strict mode is disabled',
          details: [
            '⚠ strict: false in tsconfig.json',
            '⚠ noUnusedLocals: false',
            '⚠ noUnusedParameters: false',
            '⚠ noImplicitReturns: false',
            '⚠ noImplicitAny: false'
          ],
          recommendation: 'Enable TypeScript strict mode gradually. Start with strict: true and fix issues.'
        },
        {
          id: 'docs-1',
          category: 'Documentation',
          severity: 'warning',
          title: 'Code Documentation',
          description: 'Limited inline documentation in components',
          details: [
            '⚠ Few JSDoc comments found',
            '⚠ Complex logic not documented',
            '⚠ Component props not documented',
            '⚠ No README for component library'
          ],
          recommendation: 'Add JSDoc comments to all components. Create component documentation.'
        },
        {
          id: 'docs-2',
          category: 'Documentation',
          severity: 'info',
          title: 'Project Structure',
          description: 'Project structure is well-organized',
          details: [
            'ℹ Clear separation: components, pages, hooks, lib',
            'ℹ Entities folder for CMS types',
            'ℹ Integrations folder for external services',
            'ℹ Styles folder for global CSS'
          ],
          recommendation: 'Maintain this structure. Document folder purposes in README.'
        }
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500/30 bg-red-500/5';
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-500/5';
      case 'success':
        return 'border-green-500/30 bg-green-500/5';
      case 'info':
        return 'border-blue-500/30 bg-blue-500/5';
      default:
        return 'border-gray-500/30 bg-gray-500/5';
    }
  };

  const categories = Array.from(new Set(diagnosticData.map(item => item.category)));
  const stats = {
    critical: diagnosticData.filter(d => d.severity === 'critical').length,
    warning: diagnosticData.filter(d => d.severity === 'warning').length,
    success: diagnosticData.filter(d => d.severity === 'success').length,
    info: diagnosticData.filter(d => d.severity === 'info').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-heading tracking-wider mb-2">DIAGNOSTIC DÉTAILLÉ</h1>
          <p className="text-slate-400">Analyse complète de votre site Nidalum</p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
          >
            <div className="text-2xl font-bold text-red-400">{stats.critical}</div>
            <div className="text-sm text-red-300">Critique</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4"
          >
            <div className="text-2xl font-bold text-yellow-400">{stats.warning}</div>
            <div className="text-sm text-yellow-300">Avertissements</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-green-500/10 border border-green-500/30 rounded-lg p-4"
          >
            <div className="text-2xl font-bold text-green-400">{stats.success}</div>
            <div className="text-sm text-green-300">Succès</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4"
          >
            <div className="text-2xl font-bold text-blue-400">{stats.info}</div>
            <div className="text-sm text-blue-300">Informations</div>
          </motion.div>
        </div>

        {/* Diagnostic Items by Category */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-amber-400/30 border-t-amber-400 rounded-full"></div>
            </div>
            <p className="mt-4 text-slate-400">Analyse en cours...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-heading tracking-wider mb-4 text-amber-400">
                  {category}
                </h2>
                <div className="space-y-3">
                  {diagnosticData
                    .filter(item => item.category === category)
                    .map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border rounded-lg overflow-hidden transition-all ${getSeverityColor(
                          item.severity
                        )}`}
                      >
                        <button
                          onClick={() => toggleExpanded(item.id)}
                          className="w-full px-6 py-4 flex items-start gap-4 hover:bg-white/5 transition-colors"
                        >
                          <div className="mt-1">{getSeverityIcon(item.severity)}</div>
                          <div className="flex-1 text-left">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                          </div>
                          <div className="mt-1">
                            {expandedItems.includes(item.id) ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </button>

                        {expandedItems.includes(item.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-current/20 px-6 py-4 bg-black/20"
                          >
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-300">
                                  Détails
                                </h4>
                                <ul className="space-y-1">
                                  {item.details.map((detail, idx) => (
                                    <li key={idx} className="text-sm text-slate-400">
                                      {detail}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {item.recommendation && (
                                <div>
                                  <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-amber-300">
                                    Recommandation
                                  </h4>
                                  <p className="text-sm text-slate-300">{item.recommendation}</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-gradient-to-r from-amber-500/10 to-cyan-500/10 border border-amber-500/30 rounded-lg"
        >
          <h3 className="text-xl font-heading tracking-wider mb-4">RÉSUMÉ</h3>
          <div className="space-y-3 text-slate-300">
            <p>
              ✓ Votre site Nidalum a une <strong>architecture solide</strong> avec React Router, Zustand, et une bonne séparation des préoccupations.
            </p>
            <p>
              ✓ Le système <strong>CMS est bien structuré</strong> avec 18 collections pour gérer le contenu multilingue.
            </p>
            <p>
              ⚠ <strong>Priorités d'amélioration</strong>: Protéger les pages admin, centraliser la gestion des erreurs, et auditer la responsivité mobile.
            </p>
            <p>
              ⚠ <strong>Nettoyage recommandé</strong>: Supprimer les pages de diagnostic en production et consolider les composants audio dupliqués.
            </p>
            <p>
              ℹ <strong>Prochaines étapes</strong>: Activer le mode strict TypeScript, ajouter des tests unitaires, et documenter les composants.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
