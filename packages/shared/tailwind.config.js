const spacing = {};
for (let i = 0; i <= 100; i++) {
  spacing[i] = `${i}px`;
}

module.exports = {
  purge: ['../shared/**/*.{js,ts,jsx,tsx}'], // shared 를 사용하는 프로젝트 기준 상대 경로
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    spacing,
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
