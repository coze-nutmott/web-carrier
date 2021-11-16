const config = require('../shared/tailwind.config.js');

/**
 * 주요 포인트
 * 모든 색상은 아래 colors 에 등록해서 사용합니다
 */
module.exports = {
  presets: [config],
  theme: {
    ...config.theme,
    colors: {
      black: '#000',
      black2: '#222',
      blue: '#4095ff',
      gold: '#c6a66d',
      grey01: '#ddd',
      grey02: '#a6a6a6',
      purple: '#6853e7',
      red: '#ff3042',
      transparent: 'transparent',
      white: '#fff',
    },
  },
  mode: 'jit',
  purge: [
    ...config.purge,
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('./tailwind/textVariant').plugin,
    require('./tailwind/buttonVariant').plugin,
  ],
};
