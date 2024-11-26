# @kurrent-ui/layout

Page layout components for the Event Store design system.

## Install

### Add to your project

```sh
yarn add @kurrent-ui/layout
```

Also, include the peer dependencies:

```sh
yarn add @eventstore-ui/router @kurrent-ui/utils
```

## Usage within a stencil project

In your `globalScript` file, add an import:

```ts
import '@kurrent-ui/layout';
```

Then you can use the elements anywhere in your JSX, html, templates etc.

In your `globalStyle` file, add an import:

```css
@import url('~@kurrent-ui/layout/css/root.css');
```

This sets up the base styles and css vars needed for layout components.
