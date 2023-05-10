const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: 'apps/toolai/tailwind.config.js',
    },
    autoprefixer: {},
  },
};