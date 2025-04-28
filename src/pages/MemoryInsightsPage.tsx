import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Archetype blessings based on metadata
const archetypeBlessings: { [key: string]: string } = {
  Healer: "🌿 A sacred touch stirs worlds unseen. You heal by simply being.",
  Visionary: "🌟 You dream futures no one else yet sees. Keep reaching beyond the stars.",
  Explorer: "🌍 The unknown calls you — and you answer with fearless footsteps.",
  Alchemist: "⚗️ Transformation is your art, turning shadow into gold.",
  Mystic: "🔮 Between veils and stars, your knowing dances freely.",
};

// Emotional tones for different emotions found in content
const emotionalTones: { [key: string]: string } = {
  joy: "🌞 Joy radiates from your memory like sunlight through ancient trees.",
  fear: "🌑 Your courage glows even in the deepest night.",
  longing: "🌊 Your longing sings like the ocean — wide, brave, eternal.",
  hope: "🕊️ Hope lifts your Spiral higher, feather-light and true.",
};

const MemoryInsightsPage: React.FC = () => {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state for better handling

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.id) {
          setError('Please log in to view your memory insights.');
          return;
        }

        const { data, error } = await supabase
          .from('memories')
          .select('content, metadata, created_at')
          .eq('user_id', user.id);  // Only fetch memories for the logged-in user

        if (error) throw error;

        const generatedInsights = (data || []).flatMap((memory) => {
          const insightsForMemory: string[] = [];
          const snippet = memory.content?.slice(0, 40) || "Unknown memory";

          // 1. Spiral Memory Seed: Creates a small snippet from the memory content
          insightsForMemory.push(`🌟 Spiral Memory: "${snippet}..." contains seeds of your unfolding.`);

          // 2. Archetype Blessing based on metadata
          if (memory.metadata && archetypeBlessings[memory.metadata]) {
            insightsForMemory.push(archetypeBlessings[memory.metadata]);
          }

          // 3. Emotional Tone Detection: Looks for emotions in the content and adds a blessing
          const loweredContent = memory.content?.toLowerCase() || '';
          for (const [emotion, blessing] of Object.entries(emotionalTones)) {
            if (loweredContent.includes(emotion)) {
              insightsForMemory.push(blessing);
              break; // One emotion detected per memory
            }
          }

          return insightsForMemory;
        });

        setInsights(generatedInsights);  // Set insights for rendering
      } catch (error) {
        console.error('Error fetching memory insights:', error);
        setError('Failed to fetch memory insights. Please try again later.');
      } finally {
        setLoading(false);  // Stop loading once data is fetched or error is caught
      }
    };

    fetchInsights();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-indigo-600 animate-pulse">
        ✨ Weaving deeper Spiral insights...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        <p>{error}</p>  {/* Display the error message if there's an issue */}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">🌸 Memory Insights</h2>
      {insights.length === 0 ? (
        <p className="text-center text-gray-600">
          No deep insights yet. 🌿 Reflect, create, and the Spiral will bloom.
        </p>
      ) : (
        <ul className="space-y-6">
          {insights.map((insight, index) => (
            <li key={index} className="border rounded-lg p-4 bg-white shadow-md">
              {insight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemoryInsightsPage;
