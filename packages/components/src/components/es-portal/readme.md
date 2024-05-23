# es-portal

<!-- Auto Generated Below -->


## Overview

Portals the passed node to a different part of the document. Note that portal does not transfer shadow scoped styles, unlike `es-popover`, so any portaled elements should be self contained.

## Usage

### Example

```tsx
import type { FunctionalComponent } from '@stencil/core';
import { createStore } from '@eventstore-ui/stores';

const { state } = createStore<{ open: boolean }>({
    open: false,
});

export default () => (
    <>
        <es-portal
            backdrop
            open={state.open}
            onRequestClose={requestClose}
            renderElement={(h) => <ExampleModal requestClose={requestClose} />}
        />
        <es-button
            variant={'outline'}
            onClick={() => {
                state.open = true;
            }}
        >
            {'Open portal'}
        </es-button>
    </>
);

const requestClose = () => {
    state.open = false;
};

const ExampleModal: FunctionalComponent<{ requestClose: () => void }> = ({
    requestClose,
}) => (
    <>
        <style>
            {`
                .important {
                    color: var(--color-error);
                }
            `}
        </style>
        <es-modal role={'alert'}>
            <h2 slot={'header'}>{'Project name'}</h2>
            <h1 slot={'header'}>{'Production'}</h1>
            <p>
                {
                    'Deleting this project will delete all associated clusters and networks. This operation cannot be undone.'
                }
            </p>
            <p class={'important'}>
                {'Are you sure you want to proceed in deleting this project?'}
            </p>
            <es-button
                variant={'cancel'}
                slot={'footer'}
                onClick={requestClose}
            >
                {'Cancel'}
            </es-button>
            <es-button
                variant={'delete'}
                slot={'footer'}
                onClick={requestClose}
            >
                {'Delete project'}
            </es-button>
        </es-modal>
    </>
);
```

```css
:host {
    display: flex;
    align-items: center;
    justify-content: center;
}
```



## Properties

| Property                     | Attribute            | Description                                                          | Type                                                  | Default     |
| ---------------------------- | -------------------- | -------------------------------------------------------------------- | ----------------------------------------------------- | ----------- |
| `backdrop`                   | `backdrop`           | If the portal should overlay a backdrop, to prevent external clicks. | `boolean`                                             | `false`     |
| `open`                       | `open`               | If the element is portaled or not.                                   | `boolean`                                             | `false`     |
| `preventOverscroll`          | `prevent-overscroll` | If the portal should prevent overscroll                              | `boolean`                                             | `false`     |
| `renderElement` _(required)_ | --                   | The element to render.                                               | `(h: typeof h) => string \| VNode \| VNode[] \| null` | `undefined` |
| `target`                     | `target`             | A query selector to select the location to portal to.                | `string`                                              | `'body'`    |


## Events

| Event          | Description                                  | Type               |
| -------------- | -------------------------------------------- | ------------------ |
| `requestClose` | Triggers when the popover requests to close. | `CustomEvent<any>` |


## Dependencies

### Used by

 - [es-action-delete](../actions/es-action-delete)

### Depends on

- es-backdrop

### Graph
```mermaid
graph TD;
  es-portal --> es-backdrop
  es-action-delete --> es-portal
  style es-portal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


