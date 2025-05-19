// src/App.tsx
import { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import FaviconSetter from '@/components/FaviconSetter';
import Layout from '@/components/Layout';
import { PageTransition } from '@/components/PageTransition';
import ThemeInjector from '@/components/ThemeInjector';

import { useAuthInit } from '@/hooks/useAuthInit';
import { useOracleCheck } from '@/hooks/useOracleCheck';

import { fallbackRoute, protectedRoutes, publicRoutes } from '@/routes';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {[...publicRoutes, ...protectedRoutes, fallbackRoute].map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  const authReady = useAuthInit();
  useOracleCheck();

  if (!authReady) {
    return <div className="text-center p-6 text-gray-500">Initializing auth...</div>;
  }

  return (
    <ErrorBoundary>
      <ThemeInjector />
      <FaviconSetter />
      <Layout>
        <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
          <AnimatedRoutes />
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}
