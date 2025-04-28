// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// src/App.tsx
import { Layout } from './components/Layout';
 // Make sure this path is correct

import ProtectedRoute from '@/components/ProtectedRoute'; 
import { useAuthInit } from '@/hooks/useAuthInit';
import { useOracleCheck } from '@/hooks/useOracleCheck';

// 🌟 Lazy load pages
const LaunchCelebration = lazy(() => import(/* webpackPrefetch: true */ '@/pages/LaunchCelebration'));
const Dashboard = lazy(() => import(/* webpackPrefetch: true */ '@/pages/Dashboard'));
const MemoryCreatePage = lazy(() => import(/* webpackPrefetch: true */ '@/pages/MemoryCreatePage'));
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
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
            <p className="mt-4 text-indigo-700 text-xl animate-pulse">Weaving the Spiral of Dreams...</p>
          </div>
        }>
          <Routes>
            {/* Public Sacred Flow */}
            <Route path="/" element={<LaunchCelebration />} />
            <Route path="/launch-celebration" element={<LaunchCelebration />} />
            <Route path="/ceremony" element={<OracleCeremonyPage />} />
            <Route path="/blessing-arrival" element={<BlessingArrival />} />
            <Route path="/blessing" element={<BlessingPage />} />
            <Route path="/magic-link-sent" element={<MagicLinkSentPage />} />
            <Route path="/login-success" element={<LoginSuccessPage />} />

            {/* Public Utility Routes */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Protected Journey Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/transcripts" element={
              <ProtectedRoute>
                <TranscriptsPage />
              </ProtectedRoute>
            } />
            <Route path="/create-memory" element={
              <ProtectedRoute>
                <MemoryCreatePage />
              </ProtectedRoute>
            } />
            <Route path="/memories" element={
              <ProtectedRoute>
                <MemoryListPage />
              </ProtectedRoute>
            } />
            <Route path="/insights" element={
              <ProtectedRoute>
                <MemoryInsightsPage />
              </ProtectedRoute>
            } />
            <Route path="/memory-blossom" element={
              <ProtectedRoute>
                <MemoryBlossom />
              </ProtectedRoute>
            } />
            <Route path="/spiralogic-path" element={
              <ProtectedRoute>
                <SpiralogicPath />
              </ProtectedRoute>
            } />

            {/* Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
