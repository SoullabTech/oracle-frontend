// src/pages/MemoryListPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

interface Memory {
  id: string;
  title: string;
  created_at: string;
}

const MemoryListPage: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [error, setError] = useState<string | null>(null);  // State to track errors

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const { data, error } = await supabase
          .from('memories')
          .select('id, metadata as title, created_at')
          .order('created_at', { ascending: false });

        if (error) throw error; // Handle the error if any
        setMemories(data || []); // Set data to memories state
      } catch (error) {
        console.error('Error fetching memories:', error);
        setError('Failed to fetch memories.');
      }
    };
    fetchMemories();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Memories</h2>
      {error && <p className="text-red-500">{error}</p>}
      {memories.length === 0 ? (
        <p className="text-center text-gray-500">You don't have any memories yet. Start by creating one! 🌿</p>
      ) : (
        <ul className="space-y-2">
          {memories.map((mem) => (
            <li key={mem.id} className="border p-4 rounded">
              <Link to={`/insights?memoryId=${mem.id}`} className="text-lg font-medium text-indigo-700">
                {mem.title}
              </Link>
              <p className="text-sm text-gray-500">{new Date(mem.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemoryListPage;
