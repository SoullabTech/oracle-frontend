import PolarChart from '@/components/PolarChart'; // Ensure proper path
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [facetScores, setFacetScores] = useState([
    { name: 'Fire', value: 7 },
    { name: 'Water', value: 6 },
    { name: 'Earth', value: 8 },
    { name: 'Air', value: 9 },
    { name: 'Aether', value: 5 },
  ]);

  useEffect(() => {
    const fetchFacetData = async () => {
      const response = await fetch('/api/facets');  // Adjust the API endpoint accordingly
      const data = await response.json();
      setFacetScores(data);  // Update the chart with real data
    };

    fetchFacetData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold text-center">Elemental Facets Dashboard</h1>
      <PolarChart data={facetScores} />
    </div>
  );
}
