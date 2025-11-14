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
        'black': 'var(--color-black)',
        'white': 'var(--color-white)',
        'brand': 'var(--color-brand)',
        'blue': 'var(--color-blue)',
        'midnight-blue': 'var(--color-midnight-blue)',
        'midnight-blue-darker': 'var(--color-midnight-blue-darker)',
        'bright-blue': 'var(--color-bright-blue)',
        'light-blue': 'var(--color-light-blue)',
        'teal-green': 'var(--color-teal-green)',
        'green': 'var(--color-teal-green)',
        'accent-brick': 'var(--color-accent-brick)',
        'yellow': 'var(--color-yellow)',
        'orange': 'var(--color-orange)',
        'gold': 'var(--color-gold)',
        'gradient': 'var(--color-gradient)',
        'sand': 'var(--color-sand)',
        'gray': {
          50: '#f6f6f8',
          100: '#eeeef1',
          200: '#e3e4e8',
          300: '#bbbdc9',
          400: '#9499ad',
          500: '#727892',
          600: '#515870',
          700: '#383d51',
          800: '#252837',
          900: '#1b1d27',
          950: '#13141b',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-zilla-slab)'],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
