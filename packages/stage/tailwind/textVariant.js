const _ = require('lodash');
const plugin = require('tailwindcss/plugin');

const BLACK = 900;
const EXTRABOLD = 800;
const BOLD = 700;
const SEMIBOLD = 600;
const MEDIUM = 500;
const REGULAR = 400;
const LIGHT = 300;

const VARIANTS = {
  s84_medium_black: [84, MEDIUM, 'black'],
  s42_bold_black: [42, BOLD, 'black'],
  s16_medium_gold: [16, MEDIUM, 'gold'],
  s16_medium_purple: [16, MEDIUM, 'purple'],
  s16_medium_blue: [16, MEDIUM, 'blue'],
  s16_regular_white: [16, REGULAR, 'white'],
  s16_regular_black: [16, REGULAR, 'black'],
  s12_regular_black: [12, REGULAR, 'black'],
};

module.exports = {
  plugin: plugin(function ({ addComponents, e, theme }) {
    const components = _.toPairs(VARIANTS).map(
      ([name, [size, weight, color]]) => ({
        [`.${e(name)}`]: {
          color: theme(`colors.${color}`),
          'font-size': `${size}px`,
          'font-weight': weight,
        },
      }),
    );

    addComponents(components);
  }),
  variants: VARIANTS,
};
