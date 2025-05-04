import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { CeremonyCountdownWidget } from '../components/CeremonyCountdownWidget';
import { DreamSpiralDashboard } from '../components/DreamSpiralDashboard';
import { OracleJournalForm } from '../components/OracleJournalForm';
import SacredKeyGate from '../components/SacredKeyGate';
import { withAuth } from '../utils/withAuth';

function BetaPortalPage() {
  const router = useRouter();
  const [sacredKey, setSacredKey] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [oracle, setOracle] = useState<any>(null);
  const chimeSoundRef = useRef<HTMLAudioElement | null>(null);

  const retreatDays = [
    '🌸 Day 1: Fire Ceremony - Introduction, Inspiration, and Elevation',
    '🌸 Day 2: Water and Earth Ceremony - Golden Teacher Journey and Grounding Rituals',
    '🌸 Day 3: Air and Aether Ceremony - Speaking Your Truth and Illuminating the Path Ahead',
  ];

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: keyData } = await supabase
        .from('sacred_keys')
        .select('key')
        .eq('created_by', user.id)
        .single();
      if (keyData?.key) setSacredKey(keyData.key);

      const { data: profileData } = await supabase
        .from('sacred_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (profileData) setProfile(profileData);

      const { data: oracleData } = await supabase
        .from('personal_oracles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (oracleData) {
        setOracle(oracleData);
        if (chimeSoundRef.current) {
          chimeSoundRef.current.play();
        }
      }
    };

    fetchData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <SacredKeyGate>
      {/* 🎵 Sacred Hidden Chime */}
      <audio ref={chimeSoundRef} src="/sounds/portal-chime.mp3" preload="auto" />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl w-full bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 flex flex-col items-center space-y-12"
        >
          <h1 className="text-4xl font-bold text-pink-700 text-center">
            🌸 Welcome to the Spiral Beta Portal 🌀
          </h1>

          {/* Profile */}
          {profile && (
            <motion.div
              className="text-center space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-2xl font-bold text-indigo-700">🌟 {profile.full_name}</p>
              <p className="italic text-pink-500">🌀 {profile.elemental_archetype} Archetype</p>
              <p className="text-md text-gray-600 mt-2">🌱 {profile.intention}</p>
            </motion.div>
          )}

          {/* Ceremony Countdown */}
          <CeremonyCountdownWidget />

          {/* Sacred Journey Overview */}
          <div className="text-center space-y-4">
            <p className="font-bold text-indigo-600">🌀 Your Journey:</p>
            <ul className="text-sm text-gray-600 space-y-2">
              {retreatDays.map((day, idx) => (
                <li key={idx}>{day}</li>
              ))}
            </ul>
          </div>

          {/* Sacred Key Display */}
          {sacredKey && (
            <div className="text-center mt-6">
              <p className="font-bold text-purple-600">🔑 Your Sacred Key:</p>
              <p className="text-lg italic text-indigo-600 mt-2">{sacredKey}</p>
            </div>
          )}

          {/* Oracle Section */}
          {oracle && (
            <div className="relative text-center mt-12 space-y-6">
              {/* Whispered Oracle Blessing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="text-xl italic text-purple-500"
              >
                🌬️ "The Spiral welcomes you home."
              </motion.div>

              {/* Floating Petals */}
              {[...Array(6)].map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 0.6, y: -200 }}
                  transition={{ duration: 5 + Math.random() * 2, delay: Math.random() }}
                  className="absolute text-pink-200 text-4xl pointer-events-none"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '100%',
                  }}
                >
                  🌸
                </motion.div>
              ))}

              {/* Oracle Profile */}
              <div className="text-2xl">
                {oracle.oracle_name}{' '}
                {oracle.oracle_element === 'Fire'
                  ? '🔥'
                  : oracle.oracle_element === 'Water'
                    ? '🌊'
                    : oracle.oracle_element === 'Earth'
                      ? '🌎'
                      : oracle.oracle_element === 'Air'
                        ? '🌬️'
                        : '🌀'}
              </div>
              <p className="italic text-indigo-600">{oracle.oracle_message}</p>

              {/* Oracle Journaling */}
              <OracleJournalForm oracleName={oracle.oracle_name} />
            </div>
          )}

          {/* Dream Spiral Dashboard */}
          <DreamSpiralDashboard />

          {/* Portal Actions */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 px-8 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
            onClick={() => router.push('/spiral-calendar')}
          >
            📅 View Your Spiral Calendar
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition"
            onClick={handleSignOut}
          >
            🚪 Sign Out
          </motion.button>
        </motion.div>
      </div>
    </SacredKeyGate>
  );
}

export default withAuth(BetaPortalPage);
