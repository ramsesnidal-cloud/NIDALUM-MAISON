import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Pages
import HomePage from '@/components/pages/HomePage';
import AlphabetPage from '@/components/pages/AlphabetPage';
import GrammarPage from '@/components/pages/GrammarPage';
import PhoneticsPage from '@/components/pages/PhoneticsPage';
import LexiconPage from '@/components/pages/LexiconPage';
import GrandLexiquePage from '@/components/pages/GrandLexiquePage';
import ChantsPage from '@/components/pages/ChantsPage';
import OriginsPage from '@/components/pages/OriginsPage';
import AcademyPage from '@/components/pages/AcademyPage';
import PublicationsPage from '@/components/pages/PublicationsPage';
import ResourcesPage from '@/components/pages/ResourcesPage';
import LexicalArchivesPage from '@/components/pages/LexicalArchivesPage';
import AuthorPage from '@/components/pages/AuthorPage';
import ContactPage from '@/components/pages/ContactPage';
import SignUpPage from '@/components/pages/SignUpPage';
import InitializeLexicalData from '@/components/pages/InitializeLexicalData';
import TermsPage from '@/components/pages/TermsPage';
import PrivacyPage from '@/components/pages/PrivacyPage';
import DictionaryPage from '@/components/pages/DictionaryPage';
import ProfilePage from '@/components/pages/ProfilePage';
import CompleteLexicalDiagnostic from '@/components/pages/CompleteLexicalDiagnostic';
import RepertoireLinguistiquePage from '@/components/pages/RepertoireLinguistiquePage';
import GrammaireNidalumPage from '@/components/pages/GrammaireNidalumPage';
import ApprendreLangagePage from '@/components/pages/Apprendre LangagePage';
import NidalumMaisonPage from '@/components/pages/NidalumMaisonPage';
import ArtistPortfolioPage from '@/components/pages/ArtistPortfolioPage';
import VideoShowcasePage from '@/components/pages/VideoShowcasePage';
import DiagnosticPage from '@/components/pages/DiagnosticPage';
import PerfumePage from '@/components/pages/PerfumePage';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

// Diagnostic
import LexicalArchivesDiagnostic from '@/components/LexicalArchivesDiagnostic';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <NidalumMaisonPage />,
      },
      {
        path: "alphabet",
        element: <AlphabetPage />,
      },
      {
        path: "grammar",
        element: <GrammarPage />,
      },
      {
        path: "phonetics",
        element: <PhoneticsPage />,
      },
      {
        path: "lexicon",
        element: <LexiconPage />,
      },
      {
        path: "grand-lexique",
        element: <GrandLexiquePage />,
      },
      {
        path: "repertoire-linguistique",
        element: <RepertoireLinguistiquePage />,
      },
      {
        path: "grammaire-nidalum",
        element: <GrammaireNidalumPage />,
      },
      {
        path: "apprendre-langage",
        element: <ApprendreLangagePage />,
      },
      {
        path: "chants",
        element: <ChantsPage />,
      },
      {
        path: "origins",
        element: <OriginsPage />,
      },

      {
        path: "publications",
        element: <PublicationsPage />,
      },
      {
        path: "resources",
        element: <ResourcesPage />,
      },
      {
        path: "lexical-archives",
        element: <LexicalArchivesPage />,
      },
      {
        path: "diagnostic-lexical",
        element: <LexicalArchivesDiagnostic />,
      },
      {
        path: "diagnostic-complet",
        element: <CompleteLexicalDiagnostic />,
      },
      {
        path: "author",
        element: <AuthorPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "initialize-lexical",
        element: <InitializeLexicalData />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
      {
        path: "dictionary",
        element: <DictionaryPage />,
      },

      {
        path: "profile",
        element: (
          <MemberProtectedRoute>
            <ProfilePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "portfolio",
        element: <ArtistPortfolioPage />,
      },
      {
        path: "videos",
        element: <VideoShowcasePage />,
      },
      {
        path: "diagnostic",
        element: <DiagnosticPage />,
      },
      {
        path: "perfume",
        element: <PerfumePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
