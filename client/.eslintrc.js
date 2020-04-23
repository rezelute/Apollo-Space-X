module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
  plugins: [
    'prettier', 'react'
  ],
  rules: {
    // React
    'jsx-quotes': ['error', 'prefer-double'],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'react/jsx-one-expression-per-line': 'off',
    
    "prettier/prettier": "error",

    // Import
    "import/no-extraneous-dependencies": ["off"],
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "never"
      }
    ],

    // others
    // "max-lines": ["error", {"max": 150, "skipComments": true}],
    "no-plusplus": ["off"],
    "linebreak-style": 0, //unix/windows line style
    "quotes" : ["error", "double"],

    "camelcase" : ["error", { ignoreDestructuring: true, properties: "never" }],
    "no-unused-vars": "warn",
    "no-console": ["warn", { allow: ["info", "warn", "error"] }],
    'prefer-template': ['error'],
    'no-var': ['error'],
  },

   settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['./src']
      }
    }
  },

};
