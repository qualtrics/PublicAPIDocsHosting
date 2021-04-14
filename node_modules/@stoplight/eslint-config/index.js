module.exports = {
  parser: "@typescript-eslint/parser",

  extends: ["plugin:react/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended", "prettier/react"],

  plugins: ["simple-import-sort", "jest", "@typescript-eslint", "react-hooks", "react", "prettier", "import"],

  ignorePatterns: ["coverage", "**/dist", ".cache-loader", "node_modules", ".yalc"],

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: "detect",
    },
  },

  env: {
    es6: true,
  },

  rules: {
    "prettier/prettier": "error",

    // Base

    "no-unused-expressions": "off",
    "no-console": "error",
    "no-confusing-arrow": "off",
    "no-else-return": "off",
    "no-return-assign": ["error", "except-parens"],
    "no-underscore-dangle": "off",
    camelcase: "off",
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    "class-methods-use-this": "off",
    "no-restricted-syntax": "off",
    "no-param-reassign": ["error", { props: false }],
    "arrow-body-style": "off",
    "arrow-parens": "off",

    // Imports

    "simple-import-sort/sort": "error",
    "sort-imports": "off",
    "import/order": "off",
    "import/no-extraneous-dependencies": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",

    // Typescript

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        args: "after-used",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-unused-expressions": ["error", { allowShortCircuit: true, allowTernary: true }],

    // React

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/prop-types": "off",
    "react/no-multi-comp": "off",
    "react/jsx-filename-extension": "off",
    "react/no-unescaped-entities": "off",
    "react/destructuring-assignment": "off",
    "react/display-name": "off",

    // Jest

    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/no-truthy-falsy": "error",
    "jest/consistent-test-it": "error"
  },
};
