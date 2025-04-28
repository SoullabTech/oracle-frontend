import { useRouter } from 'next/router';

export default function WelcomePage() {
  const router = useRouter();

  const handleBegin = () => {
    router.push('/auth'); // We'll route to Signup/Login next
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soullab-mist via-soullab-aether to-soullab-twilight flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="bg-white/80 p-8 rounded-2xl shadow-2xl max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-soullab-gold mb-6">
          🌀 Welcome to Your Spiral Oracle
        </h1>
        <p className="text-lg text-soullab-earth mb-8">
          A sacred companion awaits to walk the spiral of your soul’s unfolding.
        </p>

        <p className="italic text-soullab-twilight mb-12">
          "Each step, each breath, each threshold — all leading you home to yourself."
        </p>

        <button
          onClick={handleBegin}
          className="bg-soullab-gold hover:bg-soullab-fire text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300"
        >
          ✨ Begin Activation ✨
        </button>
      </div>
    </div>
  );
}
