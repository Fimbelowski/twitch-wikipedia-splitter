module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  overrides: [
    {
      extends: [
        'plugin:vue/vue3-recommended',
      ],
      files: ['src/**/*.vue'],
      rules: {
        'no-spaced-func': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: './tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: [
    'import',
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        [
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'object',
        'type',
      ],
      'newlines-between': 'always',
    }],
    'sort-imports': ['error', {
      allowSeparatedGroups: true,
      ignoreCase: true,
    }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
