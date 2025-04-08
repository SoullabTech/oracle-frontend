// src/components/MemoryInsights.tsx
import React, { useState, useEffect } from 'react';

const MemoryInsights: React.FC = () => {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulated function to fetch memory insights
  const fetchMemoryInsights = async () => {
    try {
      // Replace with your API call later:
      // const res = await fetch('http://localhost:3000/api/memory/insights');
      // const data = await res.json();
      // setInsights(data.insights);

      // Simulated data:
      const simulatedInsights = [
        "Insight 1: Transformation begins with self-reflection.",
        "Insight 2: Every memory holds a lesson.",
        "Insight 3: Your journey is unique and evolving."
      ];
      setInsights(simulatedInsights);
    } catch (error) {
      console.error("Error fetching memory insights:", error);
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
            <li key={index} style={{
              backgroundColor: '#f9f9f9',
              marginBottom: '1rem',
              padding: '1rem',
              borderRadius: '5px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              {insight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemoryInsights;
