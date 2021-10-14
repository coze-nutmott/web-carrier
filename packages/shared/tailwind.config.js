const config = require('../../tailwind.config.js');
config.purge.push(
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
);
module.exports = config;
