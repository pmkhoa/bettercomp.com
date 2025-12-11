import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      boxShadow: {
        layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        brand: 'var(--color-brand)',
        blue: 'var(--color-blue)',
        'midnight-blue': 'var(--color-midnight-blue)',
        'midnight-blue-darker': 'var(--color-midnight-blue-darker)',
        'bright-blue': 'var(--color-bright-blue)',
        'light-blue': 'var(--color-light-blue)',
        'teal-green': 'var(--color-teal-green)',
        green: 'var(--color-teal-green)',
        'accent-brick': 'var(--color-accent-brick)',
        yellow: 'var(--color-yellow)',
        orange: 'var(--color-orange)',
        gold: 'var(--color-gold)',
        gradient: 'var(--color-gradient)',
        sand: 'var(--color-sand)',
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
          950: 'var(--color-gray-950)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
