/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: [
    '!**/.server',
    '!**/.client',
    'app/entry.client.tsx',
    'app/entry.server.tsx',
    'dist',
    '.eslintrc.cjs',
    'vite.config.ts',
    'node_modules/',
    'dist/',
    'coverage/',
    'public/',
    'package.json',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    extraFileExtensions: ['.json'],
  },

  // Base config
  extends: ['eslint:recommended'],

  overrides: [
    // React
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: [
        'react',
        'jsx-a11y',
        '@typescript-eslint',
        'react-refresh',
        'prettier',
        'react-compiler',
      ],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:jsx-a11y/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: ['Form'],
        linkComponents: [
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
        ],
        'import/resolver': {
          typescript: {},
        },
      },
      rules: {
        'react/require-default-props': [
          'error',
          {
            ignoreFunctionalComponents: true,
          },
        ],
        'no-param-reassign': 'off',
        'no-console': 'off',
        'import/extensions': 'off',
        'react/button-has-type': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'consistent-return': 'off',
        'no-param-reassign': ['error', { props: false }],
        'react/jsx-props-no-spreading': 'off',
        'react-compiler/react-compiler': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
          'off',
          {
            devDependencies: false,
            optionalDependencies: false,
            peerDependencies: false,
          },
        ],
        'react/react-in-jsx-scope': 0,
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
      },
    },

    // Typescript
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint', 'import'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/internal-regex': '^~/',
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        'no-param-reassign': 'off',
      },
    },

    // Node
    {
      files: ['.eslintrc.cjs'],
      env: {
        node: true,
      },
    },
  ],
};
