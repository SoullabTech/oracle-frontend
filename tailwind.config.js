/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 🌙 Enables dark mode via class
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
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
        'soullab': ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'fade-in': 'fadeIn 3s ease-in forwards',
        'breathe': 'breathe 6s ease-in-out infinite',
        'background-move': 'backgroundMove 30s ease infinite',
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
        backgroundMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'), // 📐 Responsive media aspect ratios
  ],
};
