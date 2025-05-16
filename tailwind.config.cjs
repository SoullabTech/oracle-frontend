// tailwind.config.cjs
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'soullab-gold': '#D4AF37',
        'soullab-twilight': '#1f2937',
        'soullab-mist': '#f9fafb',
        'soullab-earth': '#8B5E3C',
        'soullab-fire': '#E25822',
        'soullab-water': '#3B82F6',
        'soullab-aether': '#A78BFA',
        'soullab-shadow': '#111827',
      },
      fontFamily: {
        soullab: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        magic: '0 0 60px rgba(167, 139, 250, 0.6)',
        ether: '0 0 40px rgba(212, 175, 55, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 3s ease-in-out forwards',
        'breathe': 'breathe 6s ease-in-out infinite',
        'orbit': 'orbit 10s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        breathe: {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.03)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      });
    }),
  ],
};
