module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  plugins: [
    'prettier'
  ],
  rules: {
    "prettier/prettier": "error",

    // Import
    "import/order": [
      "error",
      {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always"
      }
    ],

    //others
    "no-unused-vars": "warn",
    "no-console": "warn",
    'prefer-template': ['error'],
    'no-var': ['error'],
  },
};
