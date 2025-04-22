// src/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';

export default function CollectiveSpiralDashboard() {
  const [trends, setTrends] = useState<any>(null);

  useEffect(() => {
    fetch('/api/spiral/trends')
      .then((res) => res.json())
      .then((data) => setTrends(data))
      .catch((err) => console.error('Failed to load trends:', err));
  }, []);

  if (!trends) {
    return <div className="text-center py-20">🔄 Loading Spiral Intelligence...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-6">
      <h1 className="text-4xl font-bold text-center">🌐 Collective Spiral Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">🔥 Dominant Element</h2>
          <p className="text-2xl text-emerald-700">{trends.mostCommonElement}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">🌀 Active Phase</h2>
          <p className="text-2xl text-indigo-700">Phase {trends.mostCommonPhase + 1}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">💓 Top Emotions</h2>
          <ul className="list-disc ml-5">
            {trends.dominantEmotions.map((e: string) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">🪞 Symbolic Themes</h2>
          <ul className="list-disc ml-5">
            {trends.recentSymbols.map((s: string) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow col-span-1 md:col-span-2">
          <h2 className="font-semibold text-lg">🔮 Oracle Whisper</h2>
          <p className="italic text-slate-700">“{trends.collectiveOracleQuote}”</p>
        </div>
      </div>
    </div>
  );
}
