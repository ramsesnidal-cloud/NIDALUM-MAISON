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
import ChantsPage from '@/components/pages/ChantsPage';
import OriginsPage from '@/components/pages/OriginsPage';
import AcademyPage from '@/components/pages/AcademyPage';
import PublicationsPage from '@/components/pages/PublicationsPage';
import ResourcesPage from '@/components/pages/ResourcesPage';
import AuthorPage from '@/components/pages/AuthorPage';
import ContactPage from '@/components/pages/ContactPage';
import AdminPage from '@/components/pages/AdminPage';

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
        element: <HomePage />,
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
        path: "chants",
        element: <ChantsPage />,
      },
      {
        path: "origins",
        element: <OriginsPage />,
      },
      {
        path: "academy",
        element: <AcademyPage />,
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
        path: "author",
        element: <AuthorPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
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
