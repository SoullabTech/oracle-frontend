import FirstLandingGuide from '@/components/FirstLandingGuide';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ORACLES = [
  { id: 'fire', name: '🔥 Fire Oracle', role: 'The Visionary', path: '/oracle/fire' },
  { id: 'water', name: '🌊 Water Oracle', role: 'The Alchemist', path: '/oracle/water' },
  { id: 'earth', name: '🌍 Earth Oracle', role: 'The Builder', path: '/oracle/earth' },
  { id: 'air', name: '🌬 Air Oracle', role: 'The Messenger', path: '/oracle/air' },
  { id: 'aether', name: '✨ Aether Oracle', role: 'The Sage', path: '/oracle/aether' },
];

export default function OracleSelector() {
  const navigate = useNavigate();
  const [guideId, setGuideId] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const checkGuideStatus = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (userId) {
        const { data: profile } = await supabase
          .from('sacred_profiles')
          .select('seen_guide, primary_oracle')
          .eq('user_id', userId)
          .single();

        if (!profile?.seen_guide) setShowGuide(true);
        if (profile?.primary_oracle) setGuideId(profile.primary_oracle);
      } else {
        if (!localStorage.getItem('seenFirstLandingGuide')) setShowGuide(true);
        const localGuide = localStorage.getItem('assignedGuide');
        if (localGuide) setGuideId(localGuide);
      }
    };

    checkGuideStatus();
  }, []);

  const handleFinishGuide = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;

    if (userId) {
      await supabase
        .from('sacred_profiles')
        .update({ seen_guide: true })
        .eq('user_id', userId);
    } else {
      localStorage.setItem('seenFirstLandingGuide', 'true');
    }

    setShowGuide(false);
  };

  const guideOracle = ORACLES.find((o) => o.id === guideId);

  return (
    <>
      {showGuide && <FirstLandingGuide onFinish={handleFinishGuide} />}

      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">🌟 Choose Your Oracle Guide</h1>
        <p className="text-gray-600 mb-8">Connect with the archetype that calls to you today.</p>

        {guideOracle && (
          <div className="bg-purple-100 border border-purple-300 rounded-lg p-6 mb-8 max-w-xl mx-auto shadow">
            <h2 className="text-2xl font-semibold mb-1">Your Primary Guide: {guideOracle.name}</h2>
            <p className="text-sm text-purple-700 mb-3">{guideOracle.role}</p>
            <Button onClick={() => navigate(guideOracle.path)}>
              Meet Your Guide
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {ORACLES.map((oracle) => (
            <div key={oracle.id} className="border rounded-xl p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold mb-1">{oracle.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{oracle.role}</p>
              <Button className="w-full" onClick={() => navigate(oracle.path)}>
                Enter {oracle.name.split(' ')[1]}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
