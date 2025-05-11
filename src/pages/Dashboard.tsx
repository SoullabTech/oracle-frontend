import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { PageTransition } from '@/components/PageTransition';
import { SacredFooter } from '@/components/SacredFooter';
import { SpiralParticles } from '@/components/SpiralParticles';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

// Oracle interface
interface Oracle {
  oracle_name: string;
  oracle_element: keyof typeof blessingsByElement;
  oracle_archetype: string;
}

// Blessings data
const blessingsByElement = {
  Fire: ['Your passion lights the way 🔥', 'A spark within you ignites the stars 🌟'],
  Water: ['Your emotions are your compass 🌊', 'Flow gracefully with the tides 🐚'],
  Earth: ['Your roots grow deep and strong 🌿', 'Patience blossoms into miracles 🌻'],
  Air: ['Your thoughts weave new worlds 🌬️', 'Speak your dreams into being 🕊️'],
  Aether: ['You are the breath between worlds ✨', 'The unseen realms open before you 🔮'],
} as const;

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [oracle, setOracle] = useState<Oracle | null>(null);
  const [dailyBlessing, setDailyBlessing] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchOracle = async () => {
      const { data, error } = await supabase
        .from('oracles')
        .select('oracle_name, oracle_element, oracle_archetype')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching oracle:', error);
      } else if (data) {
        setOracle(data as Oracle);
        const blessings =
          blessingsByElement[data.oracle_element as keyof typeof blessingsByElement];
        if (blessings) {
          const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
          setDailyBlessing(randomBlessing);
        }
      }
    };

    fetchOracle();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-yellow-50 overflow-hidden">
      <SpiralParticles />
      <Header />
      <PageTransition>
        <main className="flex flex-col items-center justify-center pt-24">
          <motion.h1
            className="text-4xl font-bold text-indigo-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome, {user.email}!
          </motion.h1>

          {oracle && (
            <motion.div
              className="mt-8 p-6 bg-white bg-opacity-70 rounded-lg shadow-lg text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
                Oracle: {oracle.oracle_name}
              </h2>
              <p className="text-lg text-gray-700 mb-1">Archetype: {oracle.oracle_archetype}</p>
              <p className="text-lg text-gray-700 mb-1">Element: {oracle.oracle_element}</p>
              {dailyBlessing && <p className="mt-4 italic text-indigo-500">{dailyBlessing}</p>}
            </motion.div>
          )}
        </main>
      </PageTransition>
      <SacredFooter />
    </div>
  );
}
