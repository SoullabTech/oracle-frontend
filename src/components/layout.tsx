// src/components/Layout.tsx
import React from 'react';
import { PageTransition } from './PageTransition';
import { SacredFooter } from './SacredFooter';
import { Header } from './Header'; // Ensure this is correctly imported

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <SacredFooter />
      </div>
    </PageTransition>
  );
};
