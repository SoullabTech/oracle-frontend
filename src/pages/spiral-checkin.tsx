import SpiralPetalCheckinPage from '../components/SpiralPetalCheckin/SpiralPetalCheckinPage';

export default function SpiralCheckinPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl w-full bg-white bg-opacity-70 rounded-3xl shadow-2xl p-10 flex flex-col items-center animate-fade-in">
        <SpiralPetalCheckinPage />
      </div>
    </div>
  );
}
<SaveBreathButton selectedElements={selectedElements} lightness={lightness} />
