/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // ✅ Ensure Tailwind scans your entire frontend
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
        fontFamily: {
          'soullab': ['"Cormorant Garamond"', 'serif'], // Mythopoetic beauty 🌟
        },
        animation: {
          'spin-slow': 'spin 12s linear infinite',
          'fade-in': 'fadeIn 3s ease-in forwards',
          'fade-in-slow': 'fadeInSlow 6s ease-in-out forwards',
          'breathe': 'breathe 6s ease-in-out infinite',
          'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          fadeInSlow: {
            '0%': { opacity: 0 },
            '50%': { opacity: 0.5 },
            '100%': { opacity: 1 },
          },
          breathe: {
            '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
            '50%': { opacity: 1, transform: 'scale(1.04)' },
          },
          pulseSlow: {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
            '50%': { transform: 'scale(1.05)', opacity: 1 },
          },
        },
      },
    },
    plugins: [],
  }
  