const _ = require('lodash');
const plugin = require('tailwindcss/plugin');
const colors = require('./colors');

const BUTTON_VARIANTS = {
  btn_transparent: {
    'background-color': colors.transparent,
  },
  btn_transparent_yellow: {
    'background-color': colors.transparent,
    border: `1px solid ${colors.yellow}`,
    'border-radius': '9.5px',
  },
  btn_transparent_yellow_02: {
    'background-color': colors.transparent,
    border: `1px solid ${colors.yellow}`,
    'border-radius': '25px',
  },
  btn_black: {
    'background-color': colors.black,
    'border-radius': '5px',
  },
  btn_gray: {
    'background-color': colors.gray,
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
  btn_black_red: {
    'background-color': colors.black,
    border: `1px solid ${colors.red}`,
    'border-radius': '25px',
  },
  btn_white_black: {
    'background-color': colors.white,
    border: `1px solid ${colors.black}`,
    'border-radius': '25px',
  },
  btn_transparent_gray: {
    'background-color': colors.transparent,
    border: `1px solid ${colors.gray}`,
    'border-radius': '24px',
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
