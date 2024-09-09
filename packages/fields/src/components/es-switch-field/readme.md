# es-switch



<!-- Auto Generated Below -->


## Overview

A switchable switch field.

## Usage

### Example

```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    good: boolean;
}

const form = createValidatedForm<Example>({
    good: false,
});

export default () => (
    <>
        <es-switch-field label={'Text'} {...form.connect('good')} />
    </>
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

| Property             | Attribute       | Description                                               | Type                                                                 | Default     |
| -------------------- | --------------- | --------------------------------------------------------- | -------------------------------------------------------------------- | ----------- |
| `activeIcon`         | `active-icon`   | Icon to display when switch is on in high contrast mode.  | `[namespace: string \| symbol, name: string] \| string \| undefined` | `undefined` |
| `activeText`         | `active-text`   | Text to display when switch is on in high contrast mode.  | `string \| undefined`                                                | `undefined` |
| `disabled`           | `disabled`      | If the field is disabled.                                 | `boolean \| undefined`                                               | `undefined` |
| `inactiveIcon`       | `inactive-icon` | Icon to display when switch is off in high contrast mode. | `[namespace: string \| symbol, name: string] \| string \| undefined` | `undefined` |
| `inactiveText`       | `inactive-text` | Text to display when switch is off in high contrast mode. | `string \| undefined`                                                | `undefined` |
| `invalid`            | `invalid`       | If the field is currently in an error state.              | `boolean \| undefined`                                               | `undefined` |
| `label` _(required)_ | `label`         | The label of the field.                                   | `string`                                                             | `undefined` |
| `messages`           | --              | The validation messages of the field                      | `ValidationMessages \| undefined`                                    | `undefined` |
| `name` _(required)_  | `name`          | The name of the field.                                    | `string`                                                             | `undefined` |
| `readonly`           | `readonly`      | If the field is editable.                                 | `boolean \| undefined`                                               | `undefined` |
| `value` _(required)_ | `value`         | The current value of the field.                           | `boolean`                                                            | `undefined` |


## Events

| Event         | Description                                     | Type                                |
| ------------- | ----------------------------------------------- | ----------------------------------- |
| `fieldchange` | Emitted when the value of the field is changed. | `CustomEvent<FieldChange<boolean>>` |


## Methods

### `setPending(pending: boolean) => Promise<void>`

Allows you to pause interaction with the input while an operation completes.

#### Parameters

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| `pending` | `boolean` |             |

#### Returns

Type: `Promise<void>`




## CSS Custom Properties

| Name                   | Description       |
| ---------------------- | ----------------- |
| `--field-grid-columns` | The field layout. |


## Dependencies

### Depends on

- [es-switch](../es-switch)
- [es-validation-messages](../es-validation-messages)

### Graph
```mermaid
graph TD;
  es-switch-field --> es-switch
  es-switch-field --> es-validation-messages
  es-switch --> es-icon
  es-validation-messages --> es-icon
  style es-switch-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


