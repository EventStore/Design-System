# c2-action

<!-- Auto Generated Below -->


## Overview

A generic button action.

## Usage

### Example

```tsx
import { toast } from '@kurrent-ui/components';

export default () => (
    <c2-actions>
        <c2-action
            icon={'id-card'}
            action={() =>
                toast.info({
                    title: 'Clicked!',
                    message: 'Thank you for clicking.',
                })
            }
        >
            {'Generic action'}
        </c2-action>
    </c2-actions>
);
```



## Properties

| Property              | Attribute       | Description                                                                   | Type                                                    | Default     |
| --------------------- | --------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------- | ----------- |
| `action` _(required)_ | --              | The action to take when the button is clicked.                                | `(e: MouseEvent) => any`                                | `undefined` |
| `disabled`            | `disabled`      | If the action should be disabled.                                             | `boolean`                                               | `false`     |
| `dot`                 | `dot`           | If a dot should be shown on the action, to indicate attention being required. | `"error" \| "okay" \| "warning" \| undefined`           | `undefined` |
| `dropdownItem`        | `dropdown-item` | If the action is within an `c2-action-dropdown`.                              | `boolean`                                               | `false`     |
| `icon` _(required)_   | `icon`          | The icon to show for the action.                                              | `[namespace: string \| symbol, name: string] \| string` | `undefined` |


## Slots

| Slot | Description                                                              |
| ---- | ------------------------------------------------------------------------ |
|      | The label for the action, applied to the button, or shown in a dropdown. |


## Dependencies

### Depends on

- [c2-button](../../buttons/button)
- [c2-badge](../../badge)
- [c2-icon](../../icon)

### Graph
```mermaid
graph TD;
  c2-action --> c2-button
  c2-action --> c2-badge
  c2-action --> c2-icon
  c2-badge --> c2-counter
  style c2-action fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


