import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Marque audit hygiène
        vert: {
          DEFAULT: '#10B981',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        ink: {
          DEFAULT: '#0C1B17',
          light: '#16302A',
        },
        gris: {
          DEFAULT: '#6B7D77',
          light: '#9AA8A3',
        },
      },
      fontFamily: {
        // Police Apple (San Francisco) : SF Pro sur Apple, fallback propre ailleurs.
        sans: [
          'var(--font-stripe)',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(12, 27, 23, 0.12)',
        card: '0 2px 16px -4px rgba(12, 27, 23, 0.10)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
