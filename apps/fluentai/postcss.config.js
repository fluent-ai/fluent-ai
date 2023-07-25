const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: 'apps/fluentai/tailwind.config.js',
    },
    autoprefixer: {},
  },
};
