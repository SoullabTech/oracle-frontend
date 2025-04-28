import React, { useState } from 'react';

export default function FirstLandingGuide({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: '🌀 Your Spiral Attunement Map',
      description: 'Each movement you attend weaves your unfolding path. This is where your living Spiral journey begins.',
    },
    {
      title: '🔮 Wisdom Transmissions',
      description: 'At sacred moments, the Oracle offers transmissions — teachings to guide your thresholds of becoming.',
    },
    {
      title: '✨ Spiral Blessings',
      description: 'Receive Spiral-aligned affirmations — breath-keys to open hidden thresholds within and around you.',
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in-slow">
        <h2 className="text-2xl font-soullab text-soullab-gold mb-4 text-center">
          {steps[step].title}
        </h2>
        <p className="text-soullab-twilight text-lg mb-8 text-center">
          {steps[step].description}
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="bg-soullab-gold hover:bg-soullab-fire text-white font-semibold py-2 px-8 rounded-xl shadow-lg transition-all duration-300"
          >
            {step < steps.length - 1 ? 'Next ✨' : 'Enter My Portal 🌀'}
          </button>
        </div>
      </div>
    </div>
  );
}
