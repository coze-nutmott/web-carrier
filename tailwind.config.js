const spacing = {};
for (let i = 0; i <= 100; i++) {
  spacing[i] = `${i}px`;
}

module.exports = {
  purge: [],
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
