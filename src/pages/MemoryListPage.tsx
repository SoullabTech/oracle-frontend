import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Link } from 'react-router-dom';

interface Memory {
  id: string;
  content: string;
  metadata: string;
  created_at: string;
}

const MemoryListPage: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  // State to track errors

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        // Retrieve the authenticated user from Supabase
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.id) {
          setError('Please log in to view your memories.');  // Show error if user is not logged in
          return;
        }

        // Fetch memories associated with the logged-in user
        const { data, error } = await supabase
          .from('memories')
          .select('id, content, metadata, created_at')
          .eq('user_id', user.id)  // Ensure user is querying their own memories
          .order('created_at', { ascending: false });  // Sorting memories by creation date

        if (error) throw error;  // If there's an error, throw it
        setMemories(data || []);  // Set memories if no error
      } catch (error) {
        console.error('Error fetching memories:', error);  // Log error to console
        setError('Failed to fetch memories. Please try again later.');  // Show user-friendly error message
      } finally {
        setLoading(false);  // Set loading to false when the fetch is completed
      }
    };

    fetchMemories();  // Call the fetch function when the component mounts
  }, []);

  // Loading state - showing a loading message while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-indigo-600 animate-pulse">
        Loading your memories...
      </div>
    );
  }

  // Error handling - if an error occurs while fetching memories
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        <p>{error}</p>  {/* Display error message if there's an issue */}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">🌸 Your Memories</h2>
      {memories.length === 0 ? (
        <p className="text-center text-gray-500">You don't have any memories yet. Start by creating one! 🌿</p>
      ) : (
        <ul className="space-y-6">
          {memories.map((memory) => (
            <li key={memory.id} className="border rounded-lg p-4 bg-white shadow-md">
              <h3 className="text-lg font-semibold text-pink-600 mb-2">{memory.metadata || "Untitled Memory"}</h3>
              <p className="text-gray-700 mb-2">{memory.content}</p>
              <p className="text-xs text-gray-400">{new Date(memory.created_at).toLocaleDateString()}</p>
              <Link
                to={`/insights?memoryId=${memory.id}`}
                className="mt-2 inline-block text-indigo-500 hover:underline text-sm"
              >
                View Insights →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemoryListPage;
