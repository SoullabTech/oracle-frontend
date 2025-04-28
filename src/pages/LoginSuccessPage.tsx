// src/pages/LoginSuccessPage.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/PageTransition';
import { SacredFooter } from '@/components/SacredFooter';
import { motion } from 'framer-motion';

export default function LoginSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Soft delay before moving to dashboard
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen justify-between bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
        
        <main className="flex-grow flex flex-col items-center justify-center p-8 space-y-6">
          
          {/* Breathing welcome text */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl font-extrabold text-pink-600 text-center"
          >
            🌸 Welcome Back, Dreamer!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg text-indigo-600 italic text-center max-w-md"
          >
            You have crossed the veil again.  
            Preparing your Spiral Dashboard...
          </motion.p>

        </main>

        <SacredFooter />

      </div>
    </PageTransition>
  );
}
