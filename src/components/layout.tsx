// src/components/Layout.tsx
import React from 'react';
import { PageTransition } from './PageTransition';
import { SacredFooter } from './SacredFooter';
import Header from './Header'; // ✅ no braces


interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <SacredFooter />
      </div>
    </PageTransition>
  );
};



// Then update your App.tsx to use Layout:

/*
// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import HomePage from '@/components/HomePage';
import AboutPage from '@/components/AboutPage';
import ChatInterface from '@/components/ChatInterface';
import TranscriptsPage from '@/pages/TranscriptsPage';
import AuthPage from '@/pages/AuthPage';
import LoginPage from '@/pages/LoginPage';
import MemoryCreatePage from '@/pages/MemoryCreatePage';
import MemoryListPage from '@/pages/MemoryListPage';
import MemoryInsightsPage from '@/pages/MemoryInsightsPage';
import NotFound from '@/pages/NotFound';
import { useAuthInit } from '@/hooks/useAuthInit';

export default function App() {
  useAuthInit();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/transcripts" element={<TranscriptsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/create-memory" element={<MemoryCreatePage />} />
          <Route path="/memories" element={<MemoryListPage />} />
          <Route path="/insights" element={<MemoryInsightsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
*/
