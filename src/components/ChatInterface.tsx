import { useVoiceProfile } from '@/hooks/useVoiceProfile';
import { generatePrompt } from '@/lib/apiService';
import { useSession } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';
const ChatInterface: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const userId = session?.user?.id;
  const voiceProfile = useVoiceProfile();
  const labels = voiceProfile.uiLabels;

  const handleSend = async () => {
    if (!query.trim() || !userId) return;
    setLoading(true);
    try {
      const result = await generatePrompt(query, userId);
      setResponse(result);
    } catch (error) {
      console.error('Oracle error:', error);
      setResponse('Error connecting to Oracle backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{labels.chatHeader}</h2>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={labels.chatPlaceholder}
        rows={4}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          backgroundColor: '#4F46E5',
          color: '#fff',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {loading ? `${labels.sendButton}...` : labels.sendButton}
      </button>
      {response && (
        <pre
          style={{ marginTop: '1rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}
        >
          {response}
        </pre>
      )}
    </div>
  );
};

export default ChatInterface;
