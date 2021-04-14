# Usage

#### Install

Including peer dependencies.

```
yarn add -D eslint \
  prettier \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-plugin-jest \
  eslint-plugin-prettier \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-simple-import-sort \
  eslint-plugin-import \
  @stoplight/eslint-config
```

#### Setup

Create a `.eslintrc.js` file in the root of the repository with contents:

```js
module.exports = {
  extends: ["@stoplight"],
};
```

Create a `.prettierrc.js` file in the root of the repository with contents:

```js
module.exports = {
  ...require("@stoplight/eslint-config/prettier.config"),
};
```
