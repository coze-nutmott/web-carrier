const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities }) {
  const utilities = {
    '.font-gmarket': {
      'font-family': 'GmarketSansMedium',
    },
  };

  addUtilities(utilities);
});
