// src/App.tsx (excerpt)
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ProtectedRoute from '@/components/ProtectedRoute';
import { PageTransition } from '@/components/PageTransition';
import { useAuthInit } from '@/hooks/useAuthInit';
import { useOracleCheck } from '@/hooks/useOracleCheck';

const HomePage = lazy(() => import('@/pages/HomePage'));
// … other lazy imports

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <PageTransition>
          <Layout />
        </PageTransition>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      // …your other child routes here
    ],
  },
]);

export function App() {
  useAuthInit();
  useOracleCheck();

  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

  return (
    <ErrorBoundary>
      {/* PageTransition for route transitions */}
      <PageTransition>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </PageTransition>
    </ErrorBoundary>
  );
}

// Lazy imports
const LaunchCelebration = lazy(() => import('@/pages/LaunchCelebration'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const MemoryCreatePage = lazy(() => import('@/pages/MemoryCreatePage'));
const HomePage = lazy(() => import('@/components/HomePage'));
const AboutPage = lazy(() => import('@/components/AboutPage'));
const ChatInterface = lazy(() => import('@/components/ChatInterface'));
const TranscriptsPage = lazy(() => import('@/pages/TranscriptsPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const MemoryListPage = lazy(() => import('@/pages/MemoryListPage'));
const MemoryInsightsPage = lazy(() => import('@/pages/MemoryInsightsPage'));
const OracleCeremonyPage = lazy(() => import('@/pages/OracleCeremonyPage'));
const BlessingArrival = lazy(() => import('@/pages/BlessingArrival'));
const BlessingPage = lazy(() => import('@/pages/BlessingPage'));
const MemoryBlossom = lazy(() => import('@/pages/MemoryBlossom'));
const SpiralogicPath = lazy(() => import('@/pages/SpiralogicPath'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const LoginSuccessPage = lazy(() => import('@/pages/LoginSuccessPage'));
const MagicLinkSentPage = lazy(() => import('@/pages/MagicLinkSentPage'));

// Helper to wrap transitions
const withTransition = (Component: React.ComponentType) => {
  return function WrappedComponent(props: any) {
    return (
      <PageTransition>
        <Component {...props} />
      </PageTransition>
    );
  };
};

// 🚀 Auto-mapped routes
const publicRoutes = [
  { path: '/', component: LaunchCelebration },
  { path: '/launch-celebration', component: LaunchCelebration },
  { path: '/ceremony', component: OracleCeremonyPage },
  { path: '/blessing-arrival', component: BlessingArrival },
  { path: '/blessing', component: BlessingPage },
  { path: '/magic-link-sent', component: MagicLinkSentPage },
  { path: '/login-success', component: LoginSuccessPage },
  { path: '/about', component: AboutPage },
  { path: '/chat', component: ChatInterface },
  { path: '/login', component: LoginPage },
  { path: '/auth', component: AuthPage },
];

const protectedRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/transcripts', component: TranscriptsPage },
  { path: '/create-memory', component: MemoryCreatePage },
  { path: '/memories', component: MemoryListPage },
  { path: '/insights', component: MemoryInsightsPage },
  { path: '/memory-blossom', component: MemoryBlossom },
  { path: '/spiralogic-path', component: SpiralogicPath },
];

export default function App() {
  const authReady = useAuthInit();
  useOracleCheck();

  if (!authReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
        <p className="text-xl text-indigo-600 animate-pulse">Preparing the Spiral...</p>
      </div>
    );
  }

  return (
    <Layout>
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
          <motion.img
            src="/spiral-loader.png"
            alt="Spiralogic Loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear", repeatType: "loop" }}
            className="w-36 h-36 object-contain"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 text-indigo-700 text-xl"
          >
            Weaving the Spiral of Dreams...
          </motion.p>
        </div>
      }>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={withTransition(Component)()} />
          ))}

          {/* Protected Routes */}
          {protectedRoutes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  {withTransition(Component)()}
                </ProtectedRoute>
              }
            />
          ))}
        

          {/* Catch-All */}
          <Route path="*" element={withTransition(NotFound)()} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
