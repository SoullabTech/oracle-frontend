'use client'; // ✅ Required for client-side rendering

// 📓 Spiral Dream Journal (Enhanced)
// File: src/pages/dream-journal.tsx

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import DreamPetalGallery from '@/components/SpiralMemory/DreamPetalGallery';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DreamEntry {
  id: number;
  date: string;
  dream: string;
  element?: string;
  tags?: string[];
  insight?: string;
}

const elementColors: Record<string, string> = {
  fire: 'bg-orange-100 text-orange-800',
  water: 'bg-blue-100 text-blue-800',
  earth: 'bg-green-100 text-green-800',
  air: 'bg-sky-100 text-sky-800',
  aether: 'bg-purple-100 text-purple-800',
};

export default function DreamJournal() {
  const [dreams, setDreams] = useState<DreamEntry[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDreams = async () => {
      const { data, error } = await supabase
        .from('spiral_breaths')
        .select('id, date, dream, element, tags, insight')
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-5xl mx-auto w-full">
        <DreamPetalGallery />

        <div className="bg-white bg-opacity-80 rounded-3xl shadow-2xl p-10 mt-8">
          <h1 className="text-3xl font-bold mb-8 text-center">🌙 Spiral Dream Journal</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dreams.map((dream) => {
              const isExpanded = expandedId === dream.id;
              const colorClass = dream.element ? elementColors[dream.element.toLowerCase()] || '' : '';

              return (
                <div
                  key={dream.id}
                  className="bg-white p-6 rounded-xl shadow-md cursor-pointer border hover:shadow-lg transition"
                  onClick={() => setExpandedId(isExpanded ? null : dream.id)}
                >
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(dream.date).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-md text-indigo-700 line-clamp-2">
                      {dream.dream}
                    </p>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>

                  {dream.element && (
                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
                    >
                      {dream.element.toUpperCase()}
                    </span>
                  )}

                  {isExpanded && (
                    <div className="mt-4 text-sm text-gray-600">
                      <p className="whitespace-pre-wrap mb-2">
                        {dream.insight || 'No insight recorded.'}
                      </p>
                      {dream.tags && (
                        <div className="text-xs text-gray-400 italic">
                          Tags: {dream.tags.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
