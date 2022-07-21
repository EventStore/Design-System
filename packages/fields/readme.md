# @eventstore-ui/fields

Form field web components for the Event Store design system.

The components are designed to be used in conjuction with `@eventstore-ui/forms` to provide validation and data orchestration, but can be used independantly by directly listening to the `fieldchange` events, and passing validation messages via the `message` prop.

## Install

### Add to your project

```sh
yarn add @eventstore-ui/fields
```

Also, include the peer dependencies:

```sh
yarn add @eventstore-ui/components @eventstore-ui/theme @eventstore-ui/utils
```

## Usage within a stencil project

In your `globalScript` file, add the imports:

```ts
// Add the core web components to the global pool
import '@eventstore-ui/components';
// Add the field web components to the global pool
import '@eventstore-ui/fields';
```

Then you can use the element anywhere in your JSX, html, templates etc.
