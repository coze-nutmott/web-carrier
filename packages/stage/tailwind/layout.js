const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities }) {
  const utilities = {
    '.flex-1-1-full': {
      flex: '1 1 100%',
    },
    '.flex-1-0-full': {
      flex: '1 0 100%',
    },
    '.flex-1-0-auto': {
      flex: '1 0 auto',
    },
    '.flex-0-0-auto': {
      flex: '0 0 auto',
    },
    '.scrolling-touch': {
      '-webkit-overflow-scrolling': 'touch',
    },
    '.max-w-full-view': {
      'max-width': '100vw',
    },
  };

  addUtilities(utilities);
});
