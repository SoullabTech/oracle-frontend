// src/components/MemoryInsights.tsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MemoryInsights: React.FC = () => {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch memory insights from backend API
  const fetchMemoryInsights = async () => {
    try {
      const response = await axios.get('/api/memory/insights'); // Backend route for insights
      setInsights(response.data.insights); // Assuming the response has an 'insights' field
    } catch (error) {
      console.error('Error fetching memory insights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemoryInsights();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Lato, sans-serif' }}>
      <h2>Memory Insights</h2>
      {loading ? (
        <p>Loading insights...</p>
      ) : insights.length === 0 ? (
        <p>No insights available. Try uploading some memories first.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {insights.map((insight, index) => (
            <li
              key={index}
              style={{
                backgroundColor: '#f9f9f9',
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '5px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              {insight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemoryInsights;
