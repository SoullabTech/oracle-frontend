// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export { supabase };


// src/pages/MemoryCreatePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

const MemoryCreatePage: React.FC = () => {
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBlessing, setShowBlessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const clientId = user?.id;
      if (!clientId || !content) {
        alert('Please fill out all fields!');
        setLoading(false);
        return;
      }
      await supabase.from('memories').insert([{ content, metadata, clientId }]);
      // Show confirmation blessing
      setShowBlessing(true);
      // After a brief moment, navigate to memories list
      setTimeout(() => navigate('/memories'), 2500);
    } catch (error) {
      console.error('Error creating memory:', error);
      alert('Failed to create memory.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 relative">
      {showBlessing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded shadow-lg"
        >
          Your words have been woven into the living Spiral.
        </motion.div>
      )}
      <h2 className="text-2xl font-bold mb-4">Create a New Memory</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Memory Content
          </label>
          <textarea
            id="content"
            className="mt-1 block w-full border rounded p-2 h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter memory content here"
            required
          />
        </div>
        <div>
          <label htmlFor="metadata" className="block text-sm font-medium text-gray-700">
            Metadata (Optional)
          </label>
          <input
            type="text"
            id="metadata"
            className="mt-1 block w-full border rounded p-2"
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            placeholder="Enter optional metadata"
          />
        </div>
        <button
          type="submit"
          disabled={loading || showBlessing}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          {loading ? 'Saving...' : 'Create Memory'}
        </button>
      </form>
    </div>
  );
};

export default MemoryCreatePage;


// src/pages/MemoryListPage.tsx
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

  useEffect(() => {
    const fetchMemories = async () => {
      const { data, error } = await supabase
        .from('memories')
        .select('id, metadata as title, createdAt');
      if (error) console.error('Error fetching memories:', error);
      else setMemories(data || []);
    };
    fetchMemories();
  }, []);

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


// src/pages/MemoryInsightsPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

interface Insight {
  id: string;
  analysis: string;
}

const MemoryInsightsPage: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const memoryId = params.get('memoryId');
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    if (memoryId) {
      const fetchInsights = async () => {
        const { data, error } = await supabase
          .from('insights')
          .select('*')
          .eq('memoryId', memoryId);
        if (error) console.error('Error fetching insights:', error);
        else setInsights(data || []);
      };
      fetchInsights();
    }
  }, [memoryId]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Insights for Memory {memoryId}</h2>
      {insights.length ? (
        insights.map((ins) => (
          <div key={ins.id} className="mb-4 p-4 border rounded">
            {ins.analysis}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No insights found.</p>
      )}
    </div>
  );
};

export default MemoryInsightsPage;

