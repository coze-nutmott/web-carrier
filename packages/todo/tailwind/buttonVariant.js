const _ = require('lodash');
const plugin = require('tailwindcss/plugin');
const colors = require('../tailwind/colors');

const BUTTON_VARIANTS = {
  btn_transparent: {
    'background-color': colors.transparent,
  },
  btn_transparent_gold: {
    'background-color': colors.transparent,
    border: `1px solid ${colors.gold}`,
    'border-radius': '9.5px',
  },
  btn_transparent_gold_02: {
    'background-color': colors.transparent,
    border: `1px solid ${colors.gold}`,
    'border-radius': '25px',
  },
  btn_black: {
    'background-color': colors.black,
    'border-radius': '5px',
  },
  btn_grey01: {
    'background-color': colors.grey01,
    'border-radius': '3px',
    '&:disabled': {
      opacity: 1,
    },
  },
  btn_black_white: {
    'background-color': colors.black,
    border: `1px solid ${colors.white}`,
    'border-radius': '25px',
  },
  btn_black_blue: {
    'background-color': colors.black,
    border: `1px solid ${colors.blue}`,
    'border-radius': '25px',
  },
  btn_white_black: {
    'background-color': colors.white,
    border: `1px solid ${colors.black}`,
    'border-radius': '25px',
  },
};

module.exports = {
  plugin: plugin(function ({ addComponents, e }) {
    const components = _.toPairs(BUTTON_VARIANTS).map(([name, value]) => {
      return {
        [`.${e(name)}`]: value,
      };
    });

    addComponents(components);
  }),
  variants: BUTTON_VARIANTS,
};
