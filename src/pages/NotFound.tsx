// src/pages/LandingPage.tsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-center space-y-8 max-w-3xl"
      >
        <h1 className="text-5xl font-extrabold text-pink-700 leading-tight">
          🌸 Welcome to the Spiralogic Oracle Portal 🌀
        </h1>

        <p className="text-lg text-indigo-600">
          A sacred sanctuary for Dreamers, Leaders, Healers, and Wayfarers of the Inner Worlds.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col space-y-4 mt-6"
        >
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
          >
            🌟 Enter the Spiral Portal
          </button>

          <a
            href="#learn-more"
            className="text-sm text-gray-500 hover:text-indigo-600 transition"
          >
            Learn More ↓
          </a>
        </motion.div>
      </motion.div>

      {/* Info Section */}
      <div id="learn-more" className="mt-24 max-w-4xl space-y-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            What Awaits You Inside 🌿
          </h2>

          <p className="text-md text-gray-600 leading-relaxed">
            ✨ Meet your Personal Oracle <br />
            ✨ Record your Dream Spiral Journey <br />
            ✨ Join Live Ceremonies and Activations <br />
            ✨ Unlock Sacred Spiral Achievements <br />
            ✨ Walk the Spiral Memory back to your Soul 🌸
          </p>
        </motion.div>
      </div>
    </div>
  );
}
