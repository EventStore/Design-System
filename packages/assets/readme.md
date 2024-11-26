# @kurrent-ui/assets

Fonts and favicons for use in Event Store sites

## Add to your project

```sh
yarn add @kurrent-ui/assets
```

## Set up within a Stencil project:

In your stencil config, add the assets to your [copy task](https://stenciljs.com/docs/copy-tasks#copy-tasks-for-output-targets).

```tsx
// import the path to the workers
import { assetsPath } from '@kurrent-ui/assets';

export const config: Config = {
    // ...
    outputTargets: [
        {
            // ...
            copy: [
                // ...
                {
                    src: assetsPath,
                    dest: 'assets',
                },
            ],
        },
    ],
};
```

In your `globalStyle` css file, import the fonts:

```css
@import url('~@kurrent-ui/assets/font-face.css');
```

In your `index.html`, reference the favicons

```html
<link rel="icon" type="image/x-icon" href="/assets/favicons/favicon.ico" />
<link rel="icon" href="/assets/favicons/favicon-32.png" sizes="32x32" />
<link rel="icon" href="/assets/favicons/favicon-128.png" sizes="128x128" />
<link rel="icon" href="/assets/favicons/favicon-152.png" sizes="152x152" />

<!-- Android -->
<link
    rel="shortcut icon"
    href="/assets/favicons/favicon-196.png"
    sizes="196x196"
/>

<!-- iOS -->
<link
    rel="apple-touch-icon"
    href="/assets/favicons/favicon-152.png"
    sizes="152x152"
/>
<link
    rel="apple-touch-icon"
    href="/assets/favicons/favicon-180.png"
    sizes="180x180"
/>
```
