// src/components/Navigation.tsx
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav role="navigation" aria-label="Main navigation" className="bg-white shadow">
      <ul className="flex space-x-4 p-4">
        <li>
          <Link
            to="/"
            className="hover:text-indigo-600 transition focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/spiral-checkin"
            className="hover:text-indigo-600 transition focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Spiral Check-In
          </Link>
        </li>
        <li>
          <Link
            to="/wild-portal"
            className="hover:text-indigo-600 transition focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Wild Petal Portal
          </Link>
        </li>
      </ul>
    </nav>
  );
}
