module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    browser: true,
  },
  extends: ['airbnb'],
  globals: {
    __DEV__: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  parserOptions: {
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/core-modules': ['app'],
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      'babel-module': {
        root: ['./src/'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
    'react/prop-types': [0],
    "no-use-before-define": "off",
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 0,
    'no-undef': 'off',
    'max-len': ['off'],
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/jsx-wrap-multilines': 'off',
    'operator-linebreak': 'off',
    'comma-dangle': 'off',
    'import/prefer-default-export': 'off',
    'indent': 'off'
  },
};
