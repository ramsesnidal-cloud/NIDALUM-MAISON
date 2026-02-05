import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const HousePage = lazy(() => import('@/components/pages/HousePage'));
const LiteraturePage = lazy(() => import('@/components/pages/LiteraturePage'));
const SacredMusicPage = lazy(() => import('@/components/pages/SacredMusicPage'));
const ArtistsPage = lazy(() => import('@/components/pages/ArtistsPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));
const SignUpPage = lazy(() => import('@/components/pages/SignUpPage'));
const FragmentsPage = lazy(() => import('@/components/pages/FragmentsPage'));
const ImprintPage = lazy(() => import('@/components/pages/ImprintPage'));
const PrivacyPage = lazy(() => import('@/components/pages/PrivacyPage'));
const PerfumePage = lazy(() => import('@/components/pages/PerfumePage'));
const NidalumFashionPage = lazy(() => import('@/components/pages/NidalumFashionPage'));

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </>
  );
}

// Pre-create JSX elements to avoid Babel plugin issues
const layoutElement = <Layout />;
const errorElement = <ErrorPage />;
const homeElement = <HomePage />;
const houseElement = <HousePage />;
const literatureElement = <LiteraturePage />;
const sacredMusicElement = <SacredMusicPage />;
const artistsElement = <ArtistsPage />;
const contactElement = <ContactPage />;
const signUpElement = <SignUpPage />;
const fragmentsElement = <FragmentsPage />;
const imprintElement = <ImprintPage />;
const privacyElement = <PrivacyPage />;
const perfumeElement = <PerfumePage />;
const fashionElement = <NidalumFashionPage />;
const notFoundElement = <Navigate to="/" replace />;

const router = createBrowserRouter([
  {
    path: "/",
    element: layoutElement,
    errorElement: errorElement,
    children: [
      {
        index: true,
        element: homeElement,
      },
      {
        path: "house",
        element: houseElement,
      },
      {
        path: "literature",
        element: literatureElement,
      },
      {
        path: "sacred",
        element: sacredMusicElement,
      },
      {
        path: "artists",
        element: artistsElement,
      },
      {
        path: "contact",
        element: contactElement,
      },
      {
        path: "signup",
        element: signUpElement,
      },
      {
        path: "fragments",
        element: fragmentsElement,
      },
      {
        path: "imprint",
        element: imprintElement,
      },
      {
        path: "privacy",
        element: privacyElement,
      },
      // Perfume and Fashion routes hidden - will be re-enabled in 6 months
      // {
      //   path: "perfume",
      //   element: perfumeElement,
      // },
      // {
      //   path: "fashion",
      //   element: fashionElement,
      // },
      {
        path: "*",
        element: notFoundElement,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}
