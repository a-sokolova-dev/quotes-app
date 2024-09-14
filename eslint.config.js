import vitest from '@vitest/eslint-plugin'
import customTsConfig from 'eslint-config/ts'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['/dist/', 'vite.config.ts'],
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals
      }
    }
  },
  ...customTsConfig,
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'prefer-const': 'error',
      'prefer-let/prefer-let': 'off'
    }
  },
  {
    files: ['**/*.test.{jsx,tsx}'],
    plugins: {
      vitest
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'no-unused-vars': 'off'
    }
  }
]
