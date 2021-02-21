module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    // https://eslint.org/docs/rules/
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'max-len': ['error',{'code': 150}],
    'brace-style': ['error', 'stroustrup'],
    'function-call-argument-newline': ['error', 'consistent'],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs']
  }
};
