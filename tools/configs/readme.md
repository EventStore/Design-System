# @kurrent-ui/configs

Configs for the Kurrent design system

## Eslint

Install required dependencies for [eslint](https://eslint.org/).

```shell
yarn add --dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

Hook up the config by createing a `.eslint.js` file in the root of your project:

`.eslint.js`

```js
module.exports = require('@kurrent-ui/configs/eslint');
```

## Prettier

Includes all required dependencies for [prettier](https://prettier.io/).

```shell
yarn add --dev prettier
```

Hook up the config adding the following to your `package.json`:

`package.json`

```json
"prettier": "@kurrent-ui/configs/prettier"
```
