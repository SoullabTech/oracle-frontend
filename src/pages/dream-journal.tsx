import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import DreamPetalGallery from '../components/SpiralMemory/DreamPetalGallery';

export default function DreamJournalPage() {
  return <DreamPetalGallery />;
}

export default function DreamJournal() {
  const [dreams, setDreams] = useState<any[]>([]);

  useEffect(() => {
    const fetchDreams = async () => {
      const { data, error } = await supabase
        .from('spiral_breaths')
        .select('id, date, dream')
        .neq('dream', null)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching dreams:', error.message);
      } else {
        setDreams(data);
      }
    };

    fetchDreams();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-5xl w-full bg-white bg-opacity-80 rounded-3xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-center">🌙 Spiral Dream Journal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dreams.map((dream) => (
            <div key={dream.id} className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-sm text-gray-500 mb-2">
                {new Date(dream.date).toLocaleDateString()}
              </p>
              <p className="text-md text-indigo-700">{dream.dream}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
