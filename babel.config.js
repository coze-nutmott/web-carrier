module.exports = {
  presets: ['next/babel'],
  plugins: ['inline-react-svg'],
  env: {
    real: {
      plugins: ['./script/babel/remove-debug.js'],
    },
    test: {
      plugins: ['babel-plugin-dynamic-import-node'],
    },
  },
};
