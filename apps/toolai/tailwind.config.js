const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  variants: {
    extend: {
      outline: ['focus', 'focus-visible'],
    },
  },
  theme: {
    colors: {
      primary: colors.gray[800],
      'primary-hover': colors.gray[600],
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      blue: {
        0: '#78dce8',
        10: '#86e0ea',
        50: '#d7f5f8',
        70: '#244246',
      },
      purple: '#ab9df2',
      red: '#ff6188',
      orange: '#fc9867',
      green: '#a9dc76',
      yellow: '#ffd866',
      'gray-dark': '#273444',
      gray: colors.gray,
      'gray-light': '#d3dce6',
    },
    keyframes: {
      slideDown: {
        from: { height: 0 },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      slideUp: {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: 0 },
      },
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      contentShow: {
        from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
        to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
      },
    },
    animation: {
      slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
