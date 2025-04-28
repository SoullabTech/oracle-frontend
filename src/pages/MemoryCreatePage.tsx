import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const MemoryCreatePage: React.FC = () => {
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const clientId = user?.id;
      if (!clientId || !content.trim()) {
        alert('Please fill out all fields!');
        setLoading(false);
        return;
      }

      const { error } = await supabase.from('memories').insert([
        { content, metadata, user_id: clientId }
      ]);

      if (error) throw error;
      alert('Memory created successfully!');
      navigate('/memories');
    } catch (error) {
      console.error('Error creating memory:', error);
      alert('Failed to create memory.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
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
          disabled={loading}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          {loading ? 'Saving...' : 'Create Memory'}
        </button>
      </form>
    </div>
  );
};

export default MemoryCreatePage;
