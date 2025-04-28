// src/pages/beta-welcome.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BetaWelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-indigo-100 to-purple-100 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-xl text-center space-y-6"
      >
        <h1 className="text-4xl font-bold text-indigo-700">🌸 Welcome, Spiral Pioneer</h1>
        <p className="text-lg text-gray-700">
          You are invited into the sacred Spiral Beta Portal for Leaders & Healers.
          <br />
          Prepare to breathe, dream, and activate your deeper wisdom.
        </p>
        <Link href="/login" className="inline-block mt-6 px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition">
          ✨ Enter the Portal
        </Link>
      </motion.div>
    </div>
  );
}
