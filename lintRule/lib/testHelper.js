const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();
module.exports = {
  run({ name, message, validList = [], invalidList = [] }) {
    const rule = require(`../${name}.js`);
    const parserOptions = {
      ecmaVersion: 6,
      ecmaFeatures: { jsx: true },
      sourceType: 'module',
    };

    console.info(`testing ${name}`);
    ruleTester.run(name, rule, {
      valid: validList.map(code => ({ code, parserOptions })),
      invalid: invalidList.map(code => ({
        code,
        parserOptions,
        errors: [{ message }],
      })),
    });
  },
};
