const config = require('../shared/tailwind.config.js');

/**
 * 주요 포인트
 * 모든 색상은 아래 colors 에 등록해서 사용합니다
 */
module.exports = {
  presets: [config],
  theme: {
    ...config.theme,
    screens: require('./tailwind/screen'),
    colors: require('./tailwind/colors'),
  },
  mode: 'jit',
  purge: [
    ...config.purge,
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('./tailwind/layout'),
    require('./tailwind/textVariant').plugin,
    require('./tailwind/buttonVariant').plugin,
  ],
};
