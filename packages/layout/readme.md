# @eventstore/layout

Page layout components for the Event Store design system.

## Install

### Log in to github packages

```sh
$ npm login --registry=https://npm.pkg.github.com
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

`TOKEN` can be obtained from https://github.com/settings/tokens and requires `repo` and `read:packages` permissions

### Add to your project

```sh
yarn add @eventstore/layout
```

Also, include the peer dependencies:

```sh
yarn add @eventstore/router @eventstore/utils
```

## Usage within a stencil project

In your `globalScript` file, add an import:

```ts
import '@eventstore/layout';
```

Then you can use the elements anywhere in your JSX, html, templates etc.

In your `globalStyle` file, add an import:

```css
@import url('~@eventstore/layout/css/root.css');
```

This sets up the base styles and css vars needed for layout components.
