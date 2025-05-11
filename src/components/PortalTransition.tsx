import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function PortalTransition() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/portal/journey'); // Redirect after animation finishes
    }, 4000); // 4 seconds animation duration

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-soullab-aether via-soullab-mist to-soullab-twilight flex items-center justify-center relative overflow-hidden">
      <div className="animate-pulse-slow bg-white/20 rounded-full w-64 h-64 flex items-center justify-center shadow-2xl">
        <div className="bg-soullab-gold/80 rounded-full w-40 h-40 animate-breathe" />
      </div>

      <div className="absolute bottom-12 text-center text-white text-xl font-semibold animate-fade-in-slow">
        🌟 "The Portal Opens..." 🌟
      </div>
    </div>
  );
}
