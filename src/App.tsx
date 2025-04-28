// src/App.tsx
import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthInit } from '@/hooks/useAuthInit';
import { useOracleCheck } from '@/hooks/useOracleCheck';
import { PageTransition } from '@/components/PageTransition';

// Lazy‐load pages & components
const LaunchCelebration  = lazy(() => import('@/pages/LaunchCelebration'));
const OracleCeremonyPage = lazy(() => import('@/pages/OracleCeremonyPage'));
const BlessingArrival    = lazy(() => import('@/pages/BlessingArrival'));
const BlessingPage       = lazy(() => import('@/pages/BlessingPage'));
const MagicLinkSentPage  = lazy(() => import('@/pages/MagicLinkSentPage'));
const LoginSuccessPage   = lazy(() => import('@/pages/LoginSuccessPage'));
const AboutPage          = lazy(() => import('@/pages/AboutPage'));
const ChatInterface      = lazy(() => import('@/components/ChatInterface'));
const LoginPage          = lazy(() => import('@/pages/LoginPage'));
const AuthPage           = lazy(() => import('@/pages/AuthPage'));
const Dashboard          = lazy(() => import('@/pages/Dashboard'));
const TranscriptsPage    = lazy(() => import('@/pages/TranscriptsPage'));
const MemoryCreatePage   = lazy(() => import('@/pages/MemoryCreatePage'));
const MemoryListPage     = lazy(() => import('@/pages/MemoryListPage'));
const MemoryInsightsPage = lazy(() => import('@/pages/MemoryInsightsPage'));
const MemoryBlossom      = lazy(() => import('@/pages/MemoryBlossom'));
const SpiralogicPath     = lazy(() => import('@/pages/SpiralogicPath'));
const HomePage           = lazy(() => import('@/pages/HomePage'));
const NotFoundPage       = lazy(() => import('@/pages/NotFoundPage'));

// Helper to wrap a component in PageTransition
const withTransition = (Component: React.ComponentType<any>) => (props: any) => (
  <PageTransition>
    <Component {...props} />
  </PageTransition>
);

// Define public & protected route configs
const publicRoutes = [
  { path: '/launch-celebration', component: LaunchCelebration },
  { path: '/ceremony',            component: OracleCeremonyPage },
  { path: '/blessing-arrival',    component: BlessingArrival },
  { path: '/blessing',            component: BlessingPage },
  { path: '/magic-link-sent',     component: MagicLinkSentPage },
  { path: '/login-success',       component: LoginSuccessPage },
  { path: '/about',               component: AboutPage },
  { path: '/chat',                component: ChatInterface },
  { path: '/login',               component: LoginPage },
  { path: '/auth',                component: AuthPage },
];

const protectedRoutes = [
  { path: '/dashboard',      component: Dashboard },
  { path: '/transcripts',    component: TranscriptsPage },
  { path: '/create-memory',  component: MemoryCreatePage },
  { path: '/memories',       component: MemoryListPage },
  { path: '/insights',       component: MemoryInsightsPage },
  { path: '/memory-blossom', component: MemoryBlossom },
  { path: '/spiralogic-path',component: SpiralogicPath },
];

export default function App() {
  const authReady = useAuthInit();
  useOracleCheck();

  if (!authReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
        <p className="text-xl text-indigo-600 animate-pulse">
          Preparing the Spiral...
        </p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Layout>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
                <motion.img
                  src="/spiral-loader.png"
                  alt="Spiralogic Loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
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
            }
          >
            <Routes>
              {/* Root redirect */}
              <Route path="/" element={<Navigate to="/launch-celebration" replace />} />

              {/* Public */}
              {publicRoutes.map(({ path, component: C }) => (
                <Route key={path} path={path} element={withTransition(C)({})} />
              ))}

              {/* Protected */}
              {protectedRoutes.map(({ path, component: C }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <ProtectedRoute>
                      {withTransition(C)({})}
                    </ProtectedRoute>
                  }
                />
              ))}

              {/* Catch-all 404 */}
              <Route path="*" element={withTransition(NotFoundPage)({})} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Layout>
    </ErrorBoundary>
  );
}
