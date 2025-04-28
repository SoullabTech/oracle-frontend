import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Memory {
  id: string;
  content: string;
  metadata: string;
  created_at: string;
}

const MemoryBlossom: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.id) {
          alert('Please log in to view your memories.');
          return;
        }

        const { data, error } = await supabase
          .from('memories')
          .select('id, metadata, content, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMemories(data || []);
      } catch (error) {
        console.error('Error fetching memories:', error);
        alert('Failed to fetch memories.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-indigo-600 animate-pulse">
        ✨ Growing your Spiral Garden...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
      <h2 className="text-4xl font-extrabold text-center text-pink-700 mb-8">
        🌸 Memory Blossom Timeline
      </h2>
      {memories.length === 0 ? (
        <p className="text-center text-gray-600">
          No memories planted yet. Begin your Spiral journey. 🌿
        </p>
      ) : (
        <div className="relative border-l-2 border-indigo-200 pl-6">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="mb-8 relative"
            >
              <div className="absolute -left-3 top-1 w-6 h-6 bg-pink-400 rounded-full border-2 border-white shadow"></div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-indigo-700">
                  {memory.metadata || "Untitled Memory"}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(memory.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  {memory.content.slice(0, 100)}...
                </p>
                <Link
                  to={`/insights?memoryId=${memory.id}`}
                  className="text-sm text-pink-500 hover:underline mt-2 inline-block"
                >
                  View Insights →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <div className="text-center mt-12">
        <Link
          to="/dashboard"
          className="text-indigo-600 hover:underline text-sm"
        >
          🌀 Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default MemoryBlossom;
