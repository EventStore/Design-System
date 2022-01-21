| old                 | mapping (light) | color (old) | closest (light)  |
| ------------------- | --------------- | ----------- | ---------------- |
| primary-extra-light |                 | #e0e4e8     | grey_40          |
| primary-light       |                 | #536881     | dark_grey        |
| primary             |                 | #09254a     | navy             |
| primary-dark        |                 | #435261     | dark_grey        |
| primary-contrast    |                 | #ffffff     | primary-contrast |
| secondary-light     |                 | #acd9a9     | light_green      |
| secondary           |                 | #5bb553     | green            |
| secondary-dark      |                 | #3c8235     | green            |
| secondary-contrast  |                 | #ffffff     | white            |
| error-extra-light   |                 | #fbebe7     | grey_30          |
| error-light         |                 | #ff8564     | red              |
| error               |                 | #dc3813     | red              |
| error-dark          |                 | #c32908     | red              |
| error-contrast      |                 | #ffffff     | white            |
| warning-extra-light |                 | #feedd1     | light_orange     |
| warning-light       |                 | #ea7b04     | orange           |
| warning             |                 | #f49608     | orange           |
| warning-dark        |                 | #f7b54e     | orange           |
| warning-contrast    |                 | #ffffff     | white            |
| success-extra-light |                 | #e6f4e5     | light_green      |
| success-light       |                 | #addaa9     | light_green      |
| success             |                 | #5ab552     | green            |
| success-dark        |                 | #45943e     | green            |
| success-contrast    |                 | #ffffff     | white            |
| info-extra-light    |                 | #e8f1fa     | grey_40          |
| info-light          |                 | #e8f1fa     | grey_40          |
| info                |                 | #1976d2     | blue             |
| info-dark           |                 | #435261     | dark_grey        |
| info-contrast       |                 | #ffffff     | white            |
| grey-50             | shade-10        | #fafafa     | grey_10          |
| grey-100            | shade-20        | #f6f6f6     | grey_20          |
| grey-200            | shade-30        | #eeeeee     | grey_30          |
| grey-300            | shade-40        | #e0e0e0     | grey_40          |
| grey-400            | shade-50        | #cccccc     | grey_50          |
| grey-500            | shade-50        | #9e9e9e     | grey_50          |
| grey-600            | text            | #757575     | dark_grey        |
| grey-700            | text            | #616161     | dark_grey        |
| grey-800            | text            | #424242     | dark_grey        |
| grey-900            | title-2         | #212121     | navy             |
| white               | background      | #ffffff     | white            |
| black               | title-2         | #000000     | navy             |
| text                | text            | #757575     | dark_grey        |
| heading             | title-1         | #1976d2     | blue             |

```js
const { closest } = require('color-diff');

const hexToRGB = (h) => {
    const aRgbHex = h.match(/.{1,2}/g);
    return {
        r: parseInt(aRgbHex[0], 16),
        g: parseInt(aRgbHex[1], 16),
        b: parseInt(aRgbHex[2], 16),
    };
};

const RGBToHex = ({ r, g, b }) => {
    const to = (c) =>
        c.toString(16).length === 1 ? `0${c.toString(16)}` : c.toString(16);
    return `${to(r)}${to(g)}${to(b)}`;
};

const colors = {
    blue: '1976d2',
    dark_blue: '0d47a1',
    green: '5ab552',
    light_green: 'd6ecd4',
    purple: '9214be',
    red: 'dc3813',
    orange: 'f8a71b',
    light_orange: 'feedd1',
    white: 'ffffff',
    grey_10: 'f9f9f9',
    grey_20: 'f6f6f6',
    grey_30: 'eeeeee',
    grey_40: 'e0e4e8',
    grey_50: 'ced4db',
    dark_grey: '435261',
    navy: '09264a',
};

const palette = Object.values(colors).map((h) => hexToRGB(h));

const matched = (c) => {
    const rgb = hexToRGB(c);
    const match = closest(rgb, palette);
    const hex = RGBToHex(match);
    const result = Object.entries(colors).find(([k, v]) => hex === v);
    return result;
};

console.log(matched('e0e4e8'));
```
