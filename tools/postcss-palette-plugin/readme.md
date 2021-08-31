# @eventstore/postcss-palette-plugin

Imports a palette into your css by convert a js palette into css vars.

## Usage

### Create a palette

```ts
import { Palette } from '@eventstore/postcss-palette-plugin/types';

export const palette: Palette = {
    primary: {
        light: '#536881',
        main: '#09254a',
        dark: '#435261',
        contrast: 'var(--color-white)',
    },
    grey: {
        50: '#fafafa',
        100: '#f6f6f6',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#cccccc',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
    },
    heading: '#1976d2',
};
```

Your palette can contain three types of color definition:

**Color**
A simple key value pair:

```js
{
    orangered: 'hsl(16, 100%, 50%)';
}
```

becomes:

```css
--orangered: hsl(16, 100%, 50%);
```

**Color Set**
A color set provides basic shades of colors, and a contrast color. All keys are optional, however `main` is dropped from the css var name, taking the name of the key.

```js
{
    primary: {
        extraLight: '#feedd1',
        light: '#ea7b04',
        main: '#f49608',
        dark: '#f7b54e',
        extraDark: '#711e00',
        contrast: 'white',
    }
}
```

becomes:

```css
--color-primary-extraLight: #feedd1;
--color-primary-light: #ea7b04;
--color-primary: #f49608;
--color-primary-dark: #f7b54e;
--color-primary-extraDark: #711e00;
--color-primary-contrast: white;
```

**Color Range**
A color range provides numbered shades of colors.

```js
{
    grey: {
        50: '#fafafa',
        100: '#f6f6f6',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#cccccc',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
    },
}
```

becomes:

```css
--color-grey-50: #fafafa;
--color-grey-100: #f6f6f6;
--color-grey-200: #eeeeee;
--color-grey-300: #e0e0e0;
--color-grey-400: #cccccc;
--color-grey-500: #9e9e9e;
--color-grey-600: #757575;
--color-grey-700: #616161;
--color-grey-800: #424242;
--color-grey-900: #212121;
```

### Use the plugin in your postcss config

In your `postcss.config.js`:

```js
const palette = require('./path/to/palette');

module.exports = {
    plugins: [
        // other plugins
        require('@eventstore/postcss-palette-plugin')({ palette }),
    ],
};
```

| Option  | Value                                                                          | Requrired |
| ------- | ------------------------------------------------------------------------------ | --------- |
| palette | Your defined palette                                                           | yes       |
| prefix  | Add a prefix to your css vars. The default is 'color'. Set to null to disable. |           |

### Include the at-rule to place the palette in your css

```css
:root {
    /* see palette.ts for color palette  */
    @inject-palette;
}
```
