module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.ts',
    'node_modules/',
    'dist/',
    'coverage/',
    'public/',
    'package.json',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.json'],
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react-refresh', 'prettier', 'react-compiler'],
  rules: {
    'react/require-default-props': [
      'error',
      {
        ignoreFunctionalComponents: true,
      },
    ],
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
      { devDependencies: false, optionalDependencies: false, peerDependencies: false },
    ],
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
