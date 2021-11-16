const _ = require('lodash');
const plugin = require('tailwindcss/plugin');

const getVariants = theme => ({
  btn_transparent: {
    'background-color': theme('colors.transparent'),
  },
  btn_transparent_gold: {
    'background-color': theme('colors.transparent'),
    border: `1px solid ${theme('colors.gold')}`,
    'border-radius': '9.5px',
  },
  btn_transparent_gold_02: {
    'background-color': theme('colors.transparent'),
    border: `1px solid ${theme('colors.gold')}`,
    'border-radius': '25px',
  },
  btn_black: {
    'background-color': theme('colors.black'),
    'border-radius': '5px',
  },
  btn_grey01: {
    'background-color': theme('colors.grey01'),
    'border-radius': '3px',
    '&:disabled': {
      opacity: 1,
    },
  },
  btn_black_white: {
    'background-color': theme('colors.black'),
    border: `1px solid ${theme('colors.white')}`,
    'border-radius': '25px',
  },
  btn_black_blue: {
    'background-color': theme('colors.black'),
    border: `1px solid ${theme('colors.blue')}`,
    'border-radius': '25px',
  },
  btn_white_black: {
    'background-color': theme('colors.white'),
    border: `1px solid ${theme('colors.black')}`,
    'border-radius': '25px',
  },
});

module.exports = {
  plugin: plugin(function ({ addComponents, theme, e }) {
    const components = _.toPairs(getVariants(theme)).map(
      ([name, properties]) => {
        return {
          [`.${e(name)}`]: properties,
        };
      },
    );

    addComponents(components);
  }),
  variants: getVariants(color => color),
};
