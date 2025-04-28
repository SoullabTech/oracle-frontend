/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Ensure Tailwind scans your components/pages
  ],
  theme: {
    extend: {
      colors: {
        'soullab-gold': '#D4AF37',
        'soullab-twilight': '#374151',
        'soullab-mist': '#F9FAFB',
        'soullab-earth': '#8B5E3C',
        'soullab-fire': '#E25822',
        'soullab-water': '#3B82F6',
        'soullab-aether': '#A78BFA',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'fade-in': 'fadeIn 3s ease-in forwards',
        'breathe': 'breathe 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        breathe: {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.02)' },
        },
      },
      fontFamily: {
        'soullab': ['"Cormorant Garamond"', 'serif'], // You can change later if you want a more mythopoetic font
      },
    },
  },
  plugins: [],
}
