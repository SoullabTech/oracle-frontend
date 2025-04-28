import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="w-full flex justify-center bg-indigo-200 py-4 shadow-md sticky top-0 z-50">
      <div className="flex space-x-8 text-lg font-semibold text-indigo-800">
        <Link href="/">Home</Link>
        <Link href="/spiral-checkin">Spiral Check-In</Link>
        <Link href="/wild-portal">Wild Petal Portal</Link>
      </div>
    </nav>
  );
}
