const _ = require('lodash');
const plugin = require('tailwindcss/plugin');
const colors = require('./colors');

const BLACK = 900;
const EXTRABOLD = 800;
const BOLD = 700;
const SEMIBOLD = 600;
const MEDIUM = 500;
const REGULAR = 400;
const LIGHT = 300;

const VARIANTS = {
  s84_medium_black: [84, MEDIUM, colors.black],
  s42_bold_black: [42, BOLD, colors.black],
  s16_bold_black: [15, BOLD, colors.black],
  s16_medium_gold: [16, MEDIUM, colors.gold],
  s16_medium_purple: [16, MEDIUM, colors.purple],
  s16_medium_blue: [16, MEDIUM, colors.blue],
  s16_medium_grey02: [16, MEDIUM, colors.grey02],
  s16_regular_white: [16, REGULAR, colors.white],
  s16_regular_black: [16, REGULAR, colors.black],
  s12_regular_black: [12, REGULAR, colors.black],
  s10_regular_grey02: [10, REGULAR, colors.grey02],
};

module.exports = {
  plugin: plugin(function ({ addComponents, e }) {
    const components = _.toPairs(VARIANTS).map(
      ([name, [size, weight, color]]) => ({
        [`.${e(name)}`]: {
          color: color,
          'font-size': `${size}px`,
          'font-weight': weight,
        },
      }),
    );

    addComponents(components);
  }),
  variants: VARIANTS,
};
