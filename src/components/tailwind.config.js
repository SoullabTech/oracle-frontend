// tailwind.config.js
import { fontFamily } from 'tailwindcss/defaultTheme';

/**
 * Soullab Brand Configuration
 */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6D45A4',     // Primary mystical purple
          dark: '#442C6E',        // Deeper shadow purple
          light: '#BCA6E4',       // Soft lavender
          accent: '#FFD57E',      // Warm sunlight gold
          surface: '#F5F1FB',     // Background wash
        },
        elemental: {
          fire: '#FF6B57',
          water: '#56CCF2',
          earth: '#A3D49A',
          air: '#B2E4EF',
          aether: '#D6BBFB',
        },
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        display: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0,0,0,0.06)',
        deep: '0 10px 15px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};
