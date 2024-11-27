# c2-confirm-modal

<!-- Auto Generated Below -->


## Overview

A modal to confirm an action.

## Usage

### Example

```tsx
// Despite being intended to be used with `c2-action-with-confirmation` or
// `c2-button-with-confirmation, `c2-confirm-modal` can be used standalone.

import { createStore } from '@kurrent-ui/stores';

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
        <c2-portal
            backdrop
            open={state.open}
            onRequestClose={requestClose}
            renderElement={(h) => (
                <c2-confirm-modal
                    onRequestDeletion={deleteAndClose}
                    preHeading={'Group name'}
                    heading={'c2-action-delete'}
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
        <c2-button
            variant={'outline'}
            onClick={() => {
                state.open = true;
            }}
        >
            {'Open delete modal'}
        </c2-button>
    </>
);
```



## Properties

| Property                  | Attribute         | Description                                               | Type                                                                                | Default     |
| ------------------------- | ----------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------- |
| `body` _(required)_       | `body`            | Text or component to display in the body of the modal.    | `FunctionalComponent<{}> \| string`                                                 | `undefined` |
| `confirm` _(required)_    | `confirm`         | Text to display within the confirm button.                | `string`                                                                            | `undefined` |
| `confirmVariant`          | `confirm-variant` | Button variant for the confirm button.                    | `"cancel" \| "default" \| "delete" \| "filled" \| "link" \| "minimal" \| "outline"` | `'delete'`  |
| `heading` _(required)_    | `heading`         | Text to display in the heading.                           | `string`                                                                            | `undefined` |
| `preHeading` _(required)_ | `pre-heading`     | Text to display above the heading.                        | `string`                                                                            | `undefined` |
| `typeToConfirm`           | `type-to-confirm` | String required to be typed to enable the confirm button. | `string \| undefined`                                                               | `undefined` |
| `warning`                 | `warning`         | Text to display in red below the body.                    | `string \| undefined`                                                               | `undefined` |


## Events

| Event             | Description                                                              | Type               |
| ----------------- | ------------------------------------------------------------------------ | ------------------ |
| `requestClose`    | Triggered when the user has indicated that they want to close the modal. | `CustomEvent<any>` |
| `requestDeletion` | Triggered when the user has indicated that they want to close the modal. | `CustomEvent<any>` |


## Shadow Parts

| Part                | Description                             |
| ------------------- | --------------------------------------- |
| `"body"`            | The body of the modal.                  |
| `"cancel"`          | The cancel button.                      |
| `"confirm"`         | The confirm button.                     |
| `"heading"`         | The h1 heading.                         |
| `"preheading"`      | The h2 above the heading.               |
| `"type_to_confirm"` | The type to confirm label (if enabled). |
| `"warning"`         | The warning text (if provided).         |


## Dependencies

### Used by

 - [c2-action-with-confirmation](../../actions/action-with-confirmation)
 - [c2-button-with-confirmation](../../buttons/button-with-confirmation)

### Depends on

- [c2-modal](../modal)
- [c2-popover](../../popover)
- [c2-button](../../buttons/button)

### Graph
```mermaid
graph TD;
  c2-confirm-modal --> c2-modal
  c2-confirm-modal --> c2-popover
  c2-confirm-modal --> c2-button
  c2-modal --> c2-icon
  c2-popover --> c2-popper
  c2-popover --> c2-popper-inner
  c2-popover --> c2-popper-x
  c2-popover --> c2-popper-y
  c2-action-with-confirmation --> c2-confirm-modal
  c2-button-with-confirmation --> c2-confirm-modal
  style c2-confirm-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


