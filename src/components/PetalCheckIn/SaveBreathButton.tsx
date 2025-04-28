import { supabase } from '../../lib/supabaseClient'; // adjust path if needed
import { useRouter } from 'next/router';

interface SaveBreathButtonProps {
  selectedElements: { [id: string]: string };
  lightness: string;
}

export default function SaveBreathButton({ selectedElements, lightness }: SaveBreathButtonProps) {
  const router = useRouter();

  const handleSave = async () => {
    const ritualData = {
      date: new Date().toISOString(),
      elements: selectedElements,
      lightness: lightness,
      dream: null,         // empty for now (can fill later)
      dream_petal: null,   // empty for now (draw later)
      wild_petals: [],     // empty for now (summon later)
    };

    const { error } = await supabase
      .from('spiral_breaths')
      .insert([ritualData]);

    if (error) {
      console.error('Error saving Spiral Breath:', error.message);
      alert('⚡ Failed to save Spiral Breath. Try again.');
    } else {
      alert('🌸 Your Spiral Breath was saved to Sacred Memory!');
      router.push('/spiral-calendar'); // redirect to calendar after save
    }
  };

  return (
    <button
      onClick={handleSave}
      className="mt-8 px-8 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
    >
      🌬️ Save Today's Spiral Breath
    </button>
  );
}
