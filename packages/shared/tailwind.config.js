const range = require('lodash/range');

const px0_200 = {};
range(0, 201).forEach(n => (px0_200[n] = `${n}px`));

const px0_100 = {};
range(0, 101).forEach(n => (px0_100[n] = `${n}px`));

const px0_10 = {};
range(0, 11).forEach(n => (px0_10[n] = `${n}px`));

const n0_10 = {};
range(0, 11).forEach(n => (n0_10[n] = `${n}`));

module.exports = {
  purge: ['../shared/**/*.{js,ts,jsx,tsx}'], // shared 를 사용하는 프로젝트 기준 상대 경로
  darkMode: false, // or 'media' or 'class'
  theme: {
    /**
     * TODO
     * stage 패키지로 이동
     */
    extend: {
      transitionProperty: {
        border: 'border',
      },
      maxWidth: { default: '1068px' },
    },
    spacing: px0_200,
    fontSize: px0_100,
    borderRadius: { ...px0_100, '1/2': '50%' },
    borderWidth: px0_10,
    cursor: {
      pointer: 'pointer',
      'zoom-out': 'zoom-out',
      'zoom-in': 'zoom-in',
      auto: 'auto',
    },
    zIndex: n0_10,
    gridColumn: {
      1: '1',
      span1: 'span 1',
      '1/9': '1/9',
      '9/-1': '9/-1',
      '1/-1': '1/-1',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
