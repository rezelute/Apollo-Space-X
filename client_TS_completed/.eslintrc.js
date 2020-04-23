module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended" // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    allowImportExportEverywhere: true
  },
  plugins: [
    'prettier', 'react', "import"
  ],
  rules: {
    "prettier/prettier": "error",

    // React
    'jsx-quotes': ['error', 'prefer-double'],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
    'react/jsx-one-expression-per-line': 'off',

    // Import
    "import/order": [
      "error",
      {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "never"
      }
    ],

    //others
    "no-unused-vars": "warn",
    "no-console": "warn",
    'prefer-template': ['error'],
    'no-var': ['error'],

    //typescript
    //allow empty interfaces
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/explicit-function-return-type": "off"

  },
};
