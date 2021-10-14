module.exports = {
  presets: ['next/babel'],
  env: {
    real: {
      plugins: ['./script/babel/remove-debug.js'],
    },
    test: {
      plugins: ['babel-plugin-dynamic-import-node'],
    },
  },
};
