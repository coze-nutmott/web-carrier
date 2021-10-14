module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'order/properties-alphabetical-order': true,
    'no-empty-source': null,
    'rule-empty-line-before': null,
    'selector-list-comma-newline-after': null,
    'no-descending-specificity': null,
    'function-name-case': null,
    'value-keyword-case': null,
    'property-no-unknown': [true, {
      'ignoreSelectors': [":export"]
    }],
    'selector-pseudo-class-no-unknown': [true, {
      'ignorePseudoClasses': ['export']
    }],
    'property-case': null
  },
};