# es-checkbox



<!-- Auto Generated Below -->


## Overview

A checkbox component

## Usage

### Example

```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    enabled: boolean;
}

const form = createValidatedForm<Example>({
    enabled: false,
});

export default () => (
    <f2-checkbox {...form.connect('enabled')}>
        {'I agree to the terms and conditions?'}
    </f2-checkbox>
);
```

```css
:host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
```



## Properties

| Property             | Attribute  | Description                                  | Type                                                    | Default                     |
| -------------------- | ---------- | -------------------------------------------- | ------------------------------------------------------- | --------------------------- |
| `disabled`           | `disabled` | If the field is disabled.                    | `boolean \| undefined`                                  | `undefined`                 |
| `icon`               | `icon`     | The icon to use.                             | `[namespace: string \| symbol, name: string] \| string` | `[ICON_NAMESPACE, 'check']` |
| `invalid`            | `invalid`  | If the field is currently in an error state. | `boolean \| undefined`                                  | `undefined`                 |
| `name` _(required)_  | `name`     | The name of the field.                       | `string`                                                | `undefined`                 |
| `readonly`           | `readonly` | If the field is editable.                    | `boolean \| undefined`                                  | `undefined`                 |
| `value` _(required)_ | `value`    | The current value of the field.              | `boolean`                                               | `undefined`                 |


## Events

| Event         | Description                                     | Type                                        |
| ------------- | ----------------------------------------------- | ------------------------------------------- |
| `fieldchange` | Emitted when the value of the field is changed. | `CustomEvent<FieldChange<boolean, string>>` |


## Dependencies

### Depends on

- es-icon

### Graph
```mermaid
graph TD;
  f2-checkbox --> es-icon
  style f2-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


