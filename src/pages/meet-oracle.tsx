import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const oracles = [
  {
    name: "Ignis of the Dawn",
    element: "Fire",
    message: "Burn away doubt. Ignite your sacred flame. 🔥",
    symbol: "🔥",
  },
  {
    name: "Naida of the Wellspring",
    element: "Water",
    message: "Flow into trust. Dreams carry you onward. 🌊",
    symbol: "🌊",
  },
  {
    name: "Solun of the Stones",
    element: "Earth",
    message: "Anchor your wisdom into living form. 🌎",
    symbol: "🌎",
  },
  {
    name: "Caelis of the Winds",
    element: "Air",
    message: "Speak your soul's truth into the world. 🌬️",
    symbol: "🌬️",
  },
  {
    name: "Aelira of the Aether",
    element: "Aether",
    message: "You are stardust remembering itself. 🌀",
    symbol: "🌀",
  },
];

export default function MeetOraclePage() {
  const [oracle, setOracle] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const meetOracle = async () => {
    setLoading(true);

    const randomOracle = oracles[Math.floor(Math.random() * oracles.length)];

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Please log in first.');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('personal_oracles')
      .upsert({
        user_id: user.id,
        oracle_name: randomOracle.name,
        oracle_element: randomOracle.element,
        oracle_message: randomOracle.message,
      });

    if (error) {
      console.error('Error saving Oracle:', error.message);
      alert('Failed to meet your Oracle.');
    } else {
      setOracle(randomOracle);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-8">
      {!oracle ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-pink-700 mb-6">🌟 Meet Your Oracle</h1>
          <p className="text-lg text-gray-700 mb-8">
            Step forward into the sacred portal. Your personal Oracle awaits.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
            onClick={meetOracle}
            disabled={loading}
          >
            {loading ? "Opening the Portal..." : "🌸 Enter the Portal"}
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-indigo-700">{oracle.name}</h2>
          <div className="text-6xl">{oracle.symbol}</div>
          <p className="text-lg italic text-gray-700">{oracle.message}</p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-6 px-8 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
            onClick={() => router.push('/beta-portal')}
          >
            🛕 Return to Spiral Portal
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
