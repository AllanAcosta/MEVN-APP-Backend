/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  'array-bracket-newline': ['error', { multiline: true }],
  rules: {
    'prettier/prettier': 'warn',
  },
}
