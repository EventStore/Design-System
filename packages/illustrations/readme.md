# @eventstore/illustrations

Illustrations for use with the Event Store design system

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
yarn add @eventstore/illustrations
```

## Usage within a stencil project

In your `globalScript` file, add an import:

```ts
import '@eventstore/illustrations';
```

Then you can use the element anywhere in your JSX, html, templates etc.

# Adding illustrations

Add your light and dark illustrations to the `raw` directory, with the naming scheme:

```
IllustrationName-Dark.svg
IllustrationName-Light.svg
```

Then run the import script:

```
yarn import
```

Check inside `src/components/[illustration-name]` to ensure that the import worked as expected.
