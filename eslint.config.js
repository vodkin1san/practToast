import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
