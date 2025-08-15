import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...tseslint.configs.recommended,

  // Next.js recommended configs
  // Note: "next/core-web-vitals" automatically includes TypeScript support.
  ...compat.extends('next/core-web-vitals'),

  // Plugin for sorting imports, exports, etc.
  perfectionist.configs['eslint-plugin-perfectionist/recommended-natural'],

  // Add Prettier last to disable conflicting rules
  prettier,

  // custom ESLint rules
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // --- Code Quality & Bug Prevention ---
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],

      // --- TypeScript Specific Rules ---
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',

      // --- React Specific Rules ---
      'react/self-closing-comp': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
    },
  },
];

export default eslintConfig;
