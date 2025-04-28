// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';

import ProtectedRoute from '@/components/ProtectedRoute';
import { PageTransition } from '@/components/PageTransition';
import { useAuthInit } from '@/hooks/useAuthInit';
import { useOracleCheck } from '@/hooks/useOracleCheck';
import { PageWrapper } from '@/components/PageWrapper'; // ✅
import { AuthProvider } from '@/context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
);

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

// ✅ Helper to wrap transitions
const withTransition = (Component: JSX.Element) => (
  <PageTransition>{Component}</PageTransition>
);

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
    <BrowserRouter>
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
            {/* Public Sacred Flow */}
            <Route path="/" element={withTransition(<LaunchCelebration />)} />
            <Route path="/launch-celebration" element={withTransition(<LaunchCelebration />)} />
            <Route path="/ceremony" element={withTransition(<OracleCeremonyPage />)} />
            <Route path="/blessing-arrival" element={withTransition(<BlessingArrival />)} />
            <Route path="/blessing" element={withTransition(<BlessingPage />)} />
            <Route path="/magic-link-sent" element={withTransition(<MagicLinkSentPage />)} />
            <Route path="/login-success" element={withTransition(<LoginSuccessPage />)} />

            {/* Public Utility Routes */}
            <Route path="/about" element={withTransition(<AboutPage />)} />
            <Route path="/chat" element={withTransition(<ChatInterface />)} />
            <Route path="/login" element={withTransition(<LoginPage />)} />
            <Route path="/auth" element={withTransition(<AuthPage />)} />

            {/* Protected Journey Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>{withTransition(<Dashboard />)}</ProtectedRoute>
            } />
            <Route path="/transcripts" element={
              <ProtectedRoute>{withTransition(<TranscriptsPage />)}</ProtectedRoute>
            } />
            <Route path="/create-memory" element={
              <ProtectedRoute>{withTransition(<MemoryCreatePage />)}</ProtectedRoute>
            } />
            <Route path="/memories" element={
              <ProtectedRoute>{withTransition(<MemoryListPage />)}</ProtectedRoute>
            } />
            <Route path="/insights" element={
              <ProtectedRoute>{withTransition(<MemoryInsightsPage />)}</ProtectedRoute>
            } />
            <Route path="/memory-blossom" element={
              <ProtectedRoute>{withTransition(<MemoryBlossom />)}</ProtectedRoute>
            } />
            <Route path="/spiralogic-path" element={
              <ProtectedRoute>{withTransition(<SpiralogicPath />)}</ProtectedRoute>
            } />

            {/* Catch-All */}
            <Route path="*" element={withTransition(<NotFound />)} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
