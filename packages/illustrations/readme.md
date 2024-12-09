# @eventstore-ui/illustrations

Illustrations for use with the Event Store design system

## Install

### Add to your project

```sh
yarn add @eventstore-ui/illustrations
```

## Usage within a stencil project

In your `globalScript` file, add an import:

```ts
import '@eventstore-ui/illustrations';
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


Finally, build the package to generate the types.

```
yarn build
```
