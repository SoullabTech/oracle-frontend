// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import { Header } from './Header';
import { PageTransition } from './PageTransition';
import { SacredFooter } from './SacredFooter';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-soullab-mist via-soullab-aether to-soullab-twilight">
        <Header />

        <main className="flex-grow container mx-auto px-6 py-10">{children}</main>

        <SacredFooter />
      </div>
    </PageTransition>
  );
};
