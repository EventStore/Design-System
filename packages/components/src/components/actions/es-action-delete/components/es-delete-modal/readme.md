# es-delete-modal



<!-- Auto Generated Below -->


## Overview

A modal to confirm the deletion of something.

## Usage

### Example

```tsx
// Despite being intended to be used with `es-action-delete`,
// `es-delete-modal` can be used standalone.

import { createStore } from '@eventstore-ui/stores';

const { state } = createStore<{ open: boolean }>({
    open: false,
});

const requestClose = () => {
    state.open = false;
};

const deleteAndClose = () => {
    console.log('deleted!');
    state.open = false;
};

export default () => (
    <>
        <es-portal
            backdrop
            open={state.open}
            onRequestClose={requestClose}
            renderElement={(h) => (
                <es-delete-modal
                    onRequestDeletion={deleteAndClose}
                    preHeading={'Group name'}
                    heading={'es-action-delete'}
                    body={
                        'Deleting this group will remove it from your organization. This operation cannot be undone.'
                    }
                    warning={
                        'Are you sure you want to proceed in deleting this group?'
                    }
                    confirm={'Delete group'}
                />
            )}
        />
        <es-button
            variant={'outline'}
            onClick={() => {
                state.open = true;
            }}
        >
            {'Open delete modal'}
        </es-button>
    </>
);
```



## Properties

| Property                  | Attribute        | Description                                              | Type                                | Default     |
| ------------------------- | ---------------- | -------------------------------------------------------- | ----------------------------------- | ----------- |
| `body` _(required)_       | `body`           | Text or component to display in the body of the modal.   | `FunctionalComponent<{}> \| string` | `undefined` |
| `confirm` _(required)_    | `confirm`        | Text to display within the confirm button.               | `string`                            | `undefined` |
| `heading` _(required)_    | `heading`        | Text to display in the heading.                          | `string`                            | `undefined` |
| `preHeading` _(required)_ | `pre-heading`    | Text to display above the heading.                       | `string`                            | `undefined` |
| `typeToDelete`            | `type-to-delete` | String required to be typed to enable the delete button. | `string \| undefined`               | `undefined` |
| `warning`                 | `warning`        | Text to display in red below the body.                   | `string \| undefined`               | `undefined` |


## Events

| Event             | Description                                                              | Type               |
| ----------------- | ------------------------------------------------------------------------ | ------------------ |
| `requestClose`    | Triggered when the user has indicated that they want to close the modal. | `CustomEvent<any>` |
| `requestDeletion` | Triggered when the user has indicated that they want to close the modal. | `CustomEvent<any>` |


## Dependencies

### Used by

 - [es-action-delete](../..)

### Depends on

- [es-modal](../../../../es-modal)
- [es-popover](../../../../es-popover)
- [es-button](../../../../buttons/es-button)

### Graph
```mermaid
graph TD;
  es-delete-modal --> es-modal
  es-delete-modal --> es-popover
  es-delete-modal --> es-button
  es-modal --> es-icon
  es-popover --> es-popper
  es-popover --> es-popper-inner
  es-popover --> es-popper-x
  es-popover --> es-popper-y
  es-action-delete --> es-delete-modal
  style es-delete-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


