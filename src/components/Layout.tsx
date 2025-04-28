// src/components/Layout.tsx
import React from 'react';
import { PageTransition } from './PageTransition';
import { SacredFooter } from './SacredFooter';
import Header from './Header'; // ✅ no braces needed!

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 animate-breathe">
        {/* Animated background shimmer */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 animate-background-move pointer-events-none"></div>

        {/* Main Content */}
        <div className="flex flex-col min-h-screen relative z-10">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <SacredFooter />
        </div>
      </div>
    </PageTransition>
  );
};
