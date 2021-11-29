const config = require('../../babel.config.js');
module.exports = {
  ...config,
  plugins: [
    [
      'inline-react-svg',
      {
        svgo: false,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@icons': './public/static/icons',
        },
      },
    ],
  ],
};
