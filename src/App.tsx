// 📁 File: src/App.tsx

import { motion } from 'framer-motion';
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import FaviconSetter from '@/components/FaviconSetter';
import { Layout } from '@/components/Layout';
import { PageTransition } from '@/components/PageTransition';
import ProtectedRoute from '@/components/ProtectedRoute';
import ThemeInjector from '@/components/ThemeInjector';
import { useAuthInit } from '@/hooks/useAuthInit';
import { useOracleCheck } from '@/hooks/useOracleCheck';

// 🔄 Lazy-loaded public pages
const LaunchCelebration = lazy(() => import('@/pages/LaunchCelebration'));
const OracleCeremonyPage = lazy(() => import('@/pages/OracleCeremonyPage'));
const BlessingArrival = lazy(() => import('@/pages/BlessingArrival'));
const BlessingPage = lazy(() => import('@/pages/BlessingPage'));
const MagicLinkSentPage = lazy(() => import('@/pages/MagicLinkSentPage'));
const LoginSuccessPage = lazy(() => import('@/pages/LoginSuccessPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const MemoPage = lazy(() => import('@/pages/portal/memo/MemoPage'));
const ChatPage = lazy(() => import('@/pages/ChatPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// 🔐 Protected pages
const Dashboard = lazy(() => import('@/pages/dashboard'));
const TranscriptsPage = lazy(() => import('@/pages/TranscriptsPage'));
const MemoryCreatePage = lazy(() => import('@/pages/MemoryCreatePage'));
const MemoryListPage = lazy(() => import('@/pages/MemoryListPage'));
const MemoryInsightsPage = lazy(() => import('@/pages/MemoryInsightsPage'));
const MemoryBlossom = lazy(() => import('@/pages/MemoryBlossom'));
const SpiralogicPath = lazy(() => import('@/pages/SpiralogicPath'));

// 🌀 Page transition wrapper
const withTransition = (Component: React.ComponentType<any>) => (
  <PageTransition>
    <Component />
  </PageTransition>
);

// 🎨 Public routes
const publicRoutes = [
  { path: '/launch-celebration', component: LaunchCelebration },
  { path: '/ceremony', component: OracleCeremonyPage },
  { path: '/blessing-arrival', component: BlessingArrival },
  { path: '/blessing', component: BlessingPage },
  { path: '/magic-link-sent', component: MagicLinkSentPage },
  { path: '/login-success', component: LoginSuccessPage },
  { path: '/about', component: AboutPage },
  { path: '/chat', component: ChatPage },
  { path: '/login', component: LoginPage },
  { path: '/auth', component: AuthPage },
  { path: '/portal/memo/:id', component: MemoPage },
];

// 🔐 Protected routes
const protectedRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/transcripts', component: TranscriptsPage },
  { path: '/create-memory', component: MemoryCreatePage },
  { path: '/memories', component: MemoryListPage },
  { path: '/insights', component: MemoryInsightsPage },
  { path: '/memory-blossom', component: MemoryBlossom },
  { path: '/spiralogic-path', component: SpiralogicPath },
];

// 🌟 Spiral loading screen
function SpiralFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-6 text-indigo-700 text-xl"
      >
        Weaving the Spiral of Dreams...
      </motion.p>
    </div>
  );
}

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
    <ErrorBoundary>
      <ThemeInjector />
      <FaviconSetter />
      <Layout>
        <Suspense fallback={<SpiralFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/launch-celebration" replace />} />
            {publicRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={withTransition(Component)} />
            ))}
            {protectedRoutes.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute>{withTransition(Component)}</ProtectedRoute>}
              />
            ))}
            <Route path="*" element={withTransition(NotFoundPage)} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}
