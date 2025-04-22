// src/app/collective-dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import PolarChart from '@/components/PolarChart';

export default function CollectiveDashboard() {
  const [collectiveData, setCollectiveData] = useState<any[]>([]);
  const [personalData, setPersonalData] = useState<any | null>(null);
  const [showPersonal, setShowPersonal] = useState(false);
  const [timeRange, setTimeRange] = useState('last30Days');

  useEffect(() => {
    const fetchCollectiveData = async () => {
      const response = await fetch(`/api/collective-facets?timeRange=${timeRange}`); // Pass timeRange as query
      const data = await response.json();
      setCollectiveData(data);
    };

    const fetchPersonalData = async () => {
      const response = await fetch(`/api/personal-facets?timeRange=${timeRange}`); // Pass timeRange as query
      const data = await response.json();
      setPersonalData(data);
    };

    fetchCollectiveData();
    fetchPersonalData();
  }, [timeRange]);

  const formattedData = collectiveData.map((userData: any) => ({
    name: userData.user_id,
    fire: userData.fire,
    water: userData.water,
    earth: userData.earth,
    air: userData.air,
    aether: userData.aether,
  }));

  const personalFormattedData = personalData ? [{
    name: 'You',
    fire: personalData.fire,
    water: personalData.water,
    earth: personalData.earth,
    air: personalData.air,
    aether: personalData.aether,
  }] : [];

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold text-center">🌍 Collective Spiral Dashboard</h1>

      {/* Timeframe Filter */}
      <div className="flex justify-center space-x-4 mb-6">
        <select
          onChange={(e) => setTimeRange(e.target.value)}
          value={timeRange}
          className="p-2 border rounded-md"
        >
          <option value="last30Days">Last 30 Days</option>
          <option value="lastYear">Last Year</option>
          <option value="allTime">All Time</option>
        </select>
      </div>

      {/* Toggle for Personal vs Collective */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setShowPersonal(!showPersonal)}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          {showPersonal ? 'View Collective Data' : 'View Personal Data'}
        </button>
      </div>

      {/* Display Polar Chart */}
      <PolarChart data={showPersonal ? personalFormattedData : formattedData} />
    </div>
  );
}
