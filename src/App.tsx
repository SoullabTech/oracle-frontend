// src/App.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import HomePage from '@/components/HomePage';
import AboutPage from '@/components/AboutPage';
import ChatInterface from '@/components/ChatInterface';
import TranscriptsPage from '@/pages/TranscriptsPage';
import AuthPage from '@/pages/AuthPage';
import LoginPage from '@/pages/LoginPage';

import { useAuthInit } from '@/hooks/useAuthInit';

export default function App() {
  useAuthInit(); // 🔐 Set up Supabase or Oracle session

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/transcripts" element={<TranscriptsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
    </div>
  );
}

const Header = () => (
  <header className="flex justify-between items-center border-b pb-4 mb-4">
    <h1 className="text-2xl font-bold">🔮 Spiralogic Oracle</h1>
    <nav className="flex gap-4 text-sm font-medium text-indigo-700">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/chat">Chat</NavLink>
      <NavLink to="/transcripts">Transcripts</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  </header>
);

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="hover:underline transition duration-150 ease-in-out">
    {children}
  </Link>
);
