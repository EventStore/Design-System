# es-action-link



<!-- Auto Generated Below -->


## Overview

A link action.

## Usage

### Example

```tsx
export default () => (
    <es-actions>
        <es-action-link url={'/cheese'} icon={'users'}>
            {'Link action'}
        </es-action-link>
    </es-actions>
);
```



## Properties

| Property            | Attribute       | Description                                                                   | Type                                                    | Default     |
| ------------------- | --------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------- | ----------- |
| `disabled`          | `disabled`      | If the action should be disabled.                                             | `boolean`                                               | `false`     |
| `dot`               | `dot`           | If a dot should be shown on the action, to indicate attention being required. | `"error" \| "okay" \| "warning" \| undefined`           | `undefined` |
| `dropdownItem`      | `dropdown-item` | If the action is within an `es-action-dropdown`.                              | `boolean`                                               | `false`     |
| `icon` _(required)_ | `icon`          | The icon to show for the action.                                              | `[namespace: string \| symbol, name: string] \| string` | `undefined` |
| `url` _(required)_  | `url`           | The url to go to when clicked.                                                | `string`                                                | `undefined` |


## Slots

| Slot | Description                                                            |
| ---- | ---------------------------------------------------------------------- |
|      | The label for the action, applied to the link, or shown in a dropdown. |


## Dependencies

### Depends on

- [es-button-link](../../buttons/es-button-link)
- [es-badge](../../es-badge)
- [es-icon](../../es-icon)

### Graph
```mermaid
graph TD;
  es-action-link --> es-button-link
  es-action-link --> es-badge
  es-action-link --> es-icon
  es-badge --> es-counter
  style es-action-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


