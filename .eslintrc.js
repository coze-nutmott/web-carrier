module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  plugins: ['kakaoent-plugin', 'prettier'],
  rules: {
    'kakaoent-plugin/no-date': 'error',
    'kakaoent-plugin/no-next-router': 'error',
    'kakaoent-plugin/disallowed-element': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'import/order': [
      'off',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'type',
        ],
        pathGroups: [
          {
            // external 중에 react group을 우선하도록
            pattern: '+(react*|redux*|next*)', // glob expressions (by minimatch---https://www.npmjs.com/package/minimatch)로 패턴을 찾는다. see https://github.com/import-js/eslint-plugin-import/blob/7c239fed485ea0785a96c1fa2045d96c181bb79c/src/rules/order.js#L303
            group: 'external',
            position: 'before',
          },
          {
            // internal 중에 shared/에서 가져온 것을 우선하도록.
            pattern: 'shared/**',
            group: 'internal', // v2.25.2에서는 path로 internal을 판단하여, 실제 internal도 상대 경로로 입력하지 않으면 external로 분류되는 문제가 있다. see https://github.com/import-js/eslint-plugin-import/blob/7c239fed485ea0785a96c1fa2045d96c181bb79c/src/core/importType.js#L96
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'internal', 'object'], // default로 ['builtin', 'external', 'object'] 인데, 여기에서 누락된 타입은 excludedImportTypes.has(impType)이 false가 되면서 pathGroups를 사용하게 된다. see https://github.com/import-js/eslint-plugin-import/blob/7c239fed485ea0785a96c1fa2045d96c181bb79c/src/rules/order.js#L319
        'newlines-between': 'always', // group 사이에 new-line
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
