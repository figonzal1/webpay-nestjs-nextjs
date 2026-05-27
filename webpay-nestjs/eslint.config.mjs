import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import oxlint from 'eslint-plugin-oxlint';

export default tseslint.config(
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Disable ESLint rules already covered by oxlint (prevents double-reporting)
  oxlint.configs['flat/recommended'],

  // Disable ESLint formatting rules that conflict with Prettier
  prettierConfig,

  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
);
