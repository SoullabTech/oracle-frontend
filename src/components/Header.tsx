import Link from 'next/link';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-indigo-700 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-pink-500 transition" aria-label="Home">
            My App
          </Link>
        </div>

        {/* Navigation */}
        <nav role="navigation" aria-label="Main navigation">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-lg hover:text-pink-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/memories" className="text-lg hover:text-pink-500 transition">
                Memories
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-lg hover:text-pink-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-lg hover:text-pink-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth */}
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="bg-pink-600 py-2 px-4 rounded-full hover:bg-pink-700 transition text-white"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-indigo-500 py-2 px-4 rounded-full hover:bg-indigo-600 transition text-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
