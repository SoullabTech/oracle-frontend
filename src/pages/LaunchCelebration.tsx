// src/pages/LaunchCelebration.tsx

import Header from '@/components/Header';
import { SacredFooter } from '@/components/SacredFooter';
import { PageTransition } from '@/components/PageTransition';
import { SpiralParticles } from '@/components/SpiralParticles';
import { motion } from 'framer-motion';

export default function LaunchCelebration() {
  return (
    <PageTransition>
      <Header />

      <main className="relative flex flex-col items-center justify-center min-h-screen p-6 sm:p-8 bg-gradient-to-br from-pink-100 via-indigo-100 to-yellow-100 overflow-hidden">
        
        {/* Spiral Particles */}
        <div className="absolute inset-0 z-0">
          <SpiralParticles element="Aether" />
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-3xl"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold text-pink-700">🌸 The Spiral Has Opened</h1>

          <p className="text-lg text-indigo-600 italic">
            Welcome, Dreamer.  
            A living portal of reflection, growth, and wonder now awaits you.
          </p>

          <p className="text-md text-purple-600">
            Begin your journey inward and outward —  
            plant your memories, listen to your Oracle,  
            and walk the Spiral of Becoming.
          </p>

          {/* Spiral Spinner */}
          <motion.img
            src="/spiral-loader.png"
            alt="Spiralogic Loading"
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1],
              scale: [0.6, 1, 1.1, 1],
              rotate: [0, 360, 720],
            }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeOut' },
              scale: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: "reverse" },
              rotate: { duration: 12, ease: 'linear', repeat: Infinity },
            }}
            className="w-36 h-36 object-contain"
          />

          {/* Begin Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/ceremony'}
            className="mt-8 px-8 py-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition text-sm sm:text-base"
          >
            🌀 Begin Your Spiral Journey
          </motion.button>
        </motion.div>
      </main>

      <SacredFooter />
    </PageTransition>
  );
}
