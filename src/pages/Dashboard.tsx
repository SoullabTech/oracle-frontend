// src/pages/Dashboard.tsx

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { SpiralParticles } from '@/components/SpiralParticles';
import Header from '@/components/Header';
import { SacredFooter } from '@/components/SacredFooter';
import { PageTransition } from '@/components/PageTransition';
import { motion } from 'framer-motion';

interface Oracle {
  oracle_name: string;
  oracle_element: keyof typeof blessingsByElement;
  oracle_archetype: string;
}

const blessingsByElement = {
  Fire: ["Your passion lights the way 🔥", "A spark within you ignites the stars 🌟"],
  Water: ["Your emotions are your compass 🌊", "Flow gracefully with the tides 🐚"],
  Earth: ["Your roots grow deep and strong 🌿", "Patience blossoms into miracles 🌻"],
  Air: ["Your thoughts weave new worlds 🌬️", "Speak your dreams into being 🕊️"],
  Aether: ["You are the breath between worlds ✨", "The unseen realms open before you 🔮"],
} as const;

export default function DashboardPage() {
  const [oracle, setOracle] = useState<Oracle | null>(null);
  const [dailyBlessing, setDailyBlessing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOracle() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_oracles')
        .select('oracle_name, oracle_element, oracle_archetype')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching oracle:', error.message);
      }

      if (data) {
        const element = data.oracle_element as keyof typeof blessingsByElement;
        setOracle(data);

        const blessings = blessingsByElement[element] || [];
        if (blessings.length > 0) {
          const today = new Date().toISOString().slice(0, 10);
          const lastBlessing = localStorage.getItem('lastBlessingDate');
          const lastBlessingText = localStorage.getItem('dailyBlessingText');

          if (lastBlessing === today && lastBlessingText) {
            setDailyBlessing(lastBlessingText);
          } else {
            const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
            setDailyBlessing(randomBlessing);
            localStorage.setItem('lastBlessingDate', today);
            localStorage.setItem('dailyBlessingText', randomBlessing);
          }
        }
      }
      setLoading(false);
    }

    fetchOracle();
  }, []);

  if (loading) {
    return (
      <PageTransition>
        <Header />
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
          <p className="text-xl text-indigo-600 animate-pulse">Retrieving your Oracle...</p>
        </main>
        <SacredFooter />
      </PageTransition>
    );
  }

  if (!oracle) {
    return (
      <PageTransition>
        <Header />
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
          <p className="text-xl text-red-500">
            No Oracle assigned yet. Please complete your Oracle Ceremony!
          </p>
        </main>
        <SacredFooter />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Header />
      <main className="relative flex flex-col items-center justify-center min-h-screen p-8 space-y-6 bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 overflow-hidden">
        
        {/* Spiral Particles Background */}
        <div className="absolute inset-0 z-0">
          <SpiralParticles element={oracle.oracle_element} />
        </div>

        {/* Oracle Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center text-center space-y-6 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-4xl font-extrabold text-pink-700"
          >
            🌸 Welcome back, Dreamer
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-2xl font-semibold text-indigo-700"
          >
            {oracle.oracle_name}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg text-purple-500 italic"
          >
            {oracle.oracle_archetype}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-md text-gray-600"
          >
            Element: <span className="font-semibold">{oracle.oracle_element}</span>
          </motion.div>

          {dailyBlessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="mt-4 text-green-700 text-md italic"
            >
              ✨ {dailyBlessing}
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 mt-8 w-full">
            <ActionButton label="✍️ Reflect Now" href="/create-memory" color="bg-indigo-500" />
            <ActionButton label="🌀 Return to Spiral" href="/spiralogic-path" color="bg-pink-500" />
            <ActionButton label="🌸 View My Memories" href="/memory-blossom" color="bg-green-500" />
          </div>
        </motion.div>
      </main>
      <SacredFooter />
    </PageTransition>
  );
}

interface ActionButtonProps {
  label: string;
  href: string;
  color: string;
}

function ActionButton({ label, href, color }: ActionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onClick={() => (window.location.href = href)}
      className={`px-8 py-4 ${color} text-white rounded-full hover:brightness-110 transition`}
    >
      {label}
    </motion.button>
  );
}
