// src/components/Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-white shadow">
      <ul className="flex space-x-4 p-4">
        <li>
          <Link to="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/spiral-checkin" className="hover:text-indigo-600 transition">
            Spiral Check-In
          </Link>
        </li>
        <li>
          <Link to="/wild-portal" className="hover:text-indigo-600 transition">
            Wild Petal Portal
          </Link>
        </li>
      </ul>
    </nav>
  );
}
