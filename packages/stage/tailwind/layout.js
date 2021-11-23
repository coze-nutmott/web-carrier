const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities }) {
  const utilities = {
    '.flex-1-0-full': {
      flex: '1 0 100%',
    },
    '.flex-1-0-auto': {
      flex: '1 0 auto',
    },
    '.max-w-full-view': {
      'max-width': '100vw',
    },
  };

  addUtilities(utilities);
});
