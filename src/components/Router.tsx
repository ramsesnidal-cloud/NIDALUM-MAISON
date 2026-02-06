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
// Perfume and Fashion pages hidden - will be re-enabled in 6 months
// const PerfumePage = lazy(() => import('@/components/pages/PerfumePage'));
// const NidalumFashionPage = lazy(() => import('@/components/pages/NidalumFashionPage'));

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
      // Perfume and Fashion routes hidden - will be re-enabled in 6 months
      // {
      //   path: "perfume",
      //   element: <PerfumePage />,
      // },
      // {
      //   path: "fashion",
      //   element: <NidalumFashionPage />,
      // },
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
    <RouterProvider router={router} />
  );
}
