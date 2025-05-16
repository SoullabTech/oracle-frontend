// src/pages/__tests__/HomePage.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-100 via-indigo-100 to-purple-100">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">Welcome to Spiralogic</h1>
      <p className="text-lg text-gray-600 mb-6">
        This is your gateway into a realm of insight, reflection, and transformation.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Enter the Spiral
      </Link>
    </div>
  );
}
