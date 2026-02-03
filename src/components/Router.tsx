import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Pages
import HomePage from '@/components/pages/HomePage';
import HousePage from '@/components/pages/HousePage';
import LiteraturePage from '@/components/pages/LiteraturePage';
import SacredMusicPage from '@/components/pages/SacredMusicPage';
import ArtistsPage from '@/components/pages/ArtistsPage';
import ContactPage from '@/components/pages/ContactPage';
import SignUpPage from '@/components/pages/SignUpPage';
import FragmentsPage from '@/components/pages/FragmentsPage';
import ImprintPage from '@/components/pages/ImprintPage';
import PrivacyPage from '@/components/pages/PrivacyPage';
import PerfumePage from '@/components/pages/PerfumePage';
import NidalumFashionPage from '@/components/pages/NidalumFashionPage';

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
        path: "house",
        element: <HousePage />,
      },
      {
        path: "literature",
        element: <LiteraturePage />,
      },
      {
        path: "sacred",
        element: <SacredMusicPage />,
      },
      {
        path: "artists",
        element: <ArtistsPage />,
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
        path: "fragments",
        element: <FragmentsPage />,
      },
      {
        path: "imprint",
        element: <ImprintPage />,
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
      {
        path: "perfume",
        element: <PerfumePage />,
      },
      {
        path: "fashion",
        element: <NidalumFashionPage />,
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
