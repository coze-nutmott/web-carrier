const _ = require('lodash');
const plugin = require('tailwindcss/plugin');
const colors = require('./colors');

const BOLD = 700;
const MEDIUM = 500;
const NORMAL = 400;

const VARIANTS = {
  // from stage
  s10_normal_grey: [10, NORMAL, colors.grayFont],
  s12_normal_gray: [12, NORMAL, colors.grayFont],
  s12_medium_gray: [12, MEDIUM, colors.grayFont],
  s14_normal_gray: [14, NORMAL, colors.grayFont],
  s14_medium_gray: [14, MEDIUM, colors.grayFont],
  s15_normal_gray: [15, NORMAL, colors.grayFont],
  s15_normal_black: [15, NORMAL, colors.black],
  s16_medium_gray: [16, MEDIUM, colors.grayFont],
  s22_bold_black: [22, BOLD, colors.black],
  // from todo
  s84_medium_black: [84, MEDIUM, colors.black],
  s42_bold_black: [42, BOLD, colors.black],
  s16_bold_black: [15, BOLD, colors.black],
  s16_medium_gold: [16, MEDIUM, colors.gold],
  s16_medium_purple: [16, MEDIUM, colors.purple],
  s16_medium_blue: [16, MEDIUM, colors.blue],
  s16_normal_white: [16, NORMAL, colors.white],
  s16_normal_black: [16, NORMAL, colors.black],
  s12_normal_black: [12, NORMAL, colors.black],
  s10_normal_grey02: [10, NORMAL, colors.grey02],
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
