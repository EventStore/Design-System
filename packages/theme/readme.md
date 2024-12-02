# @kurrent-ui/theme

Theming for the Kurrent design system.

## Install

### Add to your project

```sh
yarn add @kurrent-ui/theme
```

## Usage

In your `globalScript` file, add an import:

```ts
import '@kurrent-ui/theme';
```

The active theme will be automatically applied as a set of css variables.

```css
background-color: var(--color-background);
```

By default, an appropriate theme will be chosen from the users system settings, or a theme can be chosen directly:

```ts
import { theme } from '@kurrent-ui/theme';

theme.select('high_contrast_dark');
```

Additionally, `@kurrent-ui/layout` contains components for selecting a theme.
