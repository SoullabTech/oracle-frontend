// src/components/SacredFooter.tsx
import React from 'react';

export const SacredFooter: React.FC = () => (
  <footer className="mt-12 py-4 text-center text-sm text-indigo-500">
    © {new Date().getFullYear()} Spiralogic Oracle Portal. All rights reserved.
  </footer>
);
