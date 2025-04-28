// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-700 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo or Branding */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-pink-500 transition">
            My App
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-lg hover:text-pink-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/memories" className="text-lg hover:text-pink-500 transition">
                Memories
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-lg hover:text-pink-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-lg hover:text-pink-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Profile / Authentication */}
        <div className="flex items-center space-x-4">
          <button className="bg-pink-600 py-2 px-4 rounded-full hover:bg-pink-700 transition text-white">
            Sign In
          </button>
          <button className="bg-indigo-500 py-2 px-4 rounded-full hover:bg-indigo-600 transition text-white">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
