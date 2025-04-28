// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
      <Link to="/" className="text-soullab-fire underline">
        Go Home
      </Link>
    </div>
  );
}
