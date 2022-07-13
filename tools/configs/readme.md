# @eventstore-ui/configs

Configs for the Event Store design system

## Eslint

Includes all required dependencies for [eslint](https://eslint.org/). Hook up the config by createing a `.eslint.js` file in the root of your project:

`.eslint.js`

```js
module.exports = require('@eventstore-ui/configs/eslint');
```

## Prettier

Includes all required dependencies for [prettier](https://prettier.io/). Hook up the config adding the following to your `package.json`:

`package.json`

```json
"prettier": "@eventstore-ui/configs/prettier"
```
