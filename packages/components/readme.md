# @eventstore-ui/components

Base web components for the Event Store design system.

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
yarn add @eventstore-ui/components
```

Also, include the peer dependencies:

```sh
yarn add @eventstore-ui/router @eventstore-ui/utils
```

## Usage within a stencil project

In your `globalScript` file, add an import:

```ts
import '@eventstore-ui/components';
```

Then you can use the element anywhere in your JSX, html, templates etc.
