const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      'blue': {
        0: '#78dce8',
        10: '#86e0ea',
        50: '#d7f5f8',
        70: '#244246'},
      'purple': '#ab9df2',
      'red': '#ff6188',
      'orange': '#fc9867',
      'green': '#a9dc76',
      'yellow': '#ffd866',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    extend: {},
  },
  plugins: [],
}

