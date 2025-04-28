// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import HomePage from '@/components/HomePage';
import AboutPage from '@/components/AboutPage';
import ChatInterface from '@/components/ChatInterface';
import TranscriptsPage from '@/pages/TranscriptsPage';
import AuthPage from '@/pages/AuthPage';
import LoginPage from '@/pages/LoginPage';
import MemoryCreatePage from '@/pages/MemoryCreatePage';
import MemoryListPage from '@/pages/MemoryListPage';
import MemoryInsightsPage from '@/pages/MemoryInsightsPage';
import OracleCeremonyPage from '@/pages/OracleCeremonyPage';
import Dashboard from '@/pages/Dashboard';
import BlessingArrival from '@/pages/BlessingArrival';
import BlessingPage from '@/pages/BlessingPage';
import LaunchCelebration from '@/pages/LaunchCelebration';
import MemoryBlossom from '@/pages/MemoryBlossom';
import SpiralogicPath from '@/pages/SpiralogicPath';
import NotFound from '@/pages/NotFound';
import LoginSuccessPage from '@/pages/LoginSuccessPage';
import MagicLinkSentPage from '@/pages/MagicLinkSentPage';
import { useAuthInit } from '@/hooks/useAuthInit';
import { useOracleCheck } from '@/hooks/useOracleCheck';

export default function App() {
  const authReady = useAuthInit();  // Initialize auth state
  useOracleCheck();                 // Check for Oracle logic (optional but good)

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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transcripts"
            element={
              <ProtectedRoute>
                <TranscriptsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-memory"
            element={
              <ProtectedRoute>
                <MemoryCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memories"
            element={
              <ProtectedRoute>
                <MemoryListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <ProtectedRoute>
                <MemoryInsightsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memory-blossom"
            element={
              <ProtectedRoute>
                <MemoryBlossom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/spiralogic-path"
            element={
              <ProtectedRoute>
                <SpiralogicPath />
              </ProtectedRoute>
            }
          />

          {/* Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
