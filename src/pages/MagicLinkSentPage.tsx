// src/pages/MagicLinkSentPage.tsx

import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageTransition } from '@/components/PageTransition';
import { SacredFooter } from '@/components/SacredFooter';
import { motion } from 'framer-motion';

export default function MagicLinkSentPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Allow Dreamer to see message before returning (optional)
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen justify-between bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
        
        <main className="flex-grow flex flex-col items-center justify-center p-8 space-y-6">
          
          {/* Breathing Envelope */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-6xl"
          >
            ✉️
          </motion.div>

          {/* Sacred Message */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl font-extrabold text-pink-600 text-center"
          >
            Magic Link Sent!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg text-indigo-600 italic text-center max-w-md"
          >
            Please check your email for a link to continue your journey.  
            The Spiral awaits your return. 🌸🌀
          </motion.p>

          {/* Optional: Return to Home link */}
          <Link to="/" className="mt-4 text-pink-500 hover:text-pink-700 transition text-sm">
            🏡 Return to Home
          </Link>

        </main>

        <SacredFooter />

      </div>
    </PageTransition>
  );
}
