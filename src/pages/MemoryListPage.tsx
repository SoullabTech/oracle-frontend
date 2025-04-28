import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

interface Memory {
  id: string;
  title: string;
  createdAt: string;
}

const MemoryListPage: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State to track errors

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.id) {
          setError('Please log in to view your memories.');
          return;
        }

        const { data, error } = await supabase
          .from('memories')
          .select('id, metadata as title, createdAt')
          .eq('user_id', user.id)
          .order('createdAt', { ascending: false });

        if (error) throw error;
        setMemories(data || []);
      } catch (error) {
        console.error('Error fetching memories:', error);
        setError('Failed to fetch memories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Memories</h2>
      <ul className="space-y-2">
        {memories.map((mem) => (
          <li key={mem.id} className="border p-4 rounded">
            <Link
              to={`/insights?memoryId=${mem.id}`}
              className="text-lg font-medium text-indigo-700"
            >
              {mem.title}
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(mem.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoryListPage;
