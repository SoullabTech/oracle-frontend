// src/components/Layout.tsx
import React from 'react';
import { PageTransition } from './PageTransition'; // Assuming you have this component
import { SacredFooter } from './SacredFooter'; // Assuming you have this component
import { Header } from './Header'; // Adjusted import to match your file structure

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
