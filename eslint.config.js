import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import nPlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'
import prettierConfig from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'import/order': 'warn',
      'n/no-missing-import': 'off',
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',
      ...prettierConfig,
    },
  },
]
