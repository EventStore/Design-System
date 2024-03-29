# es-textarea



<!-- Auto Generated Below -->


## Overview

A textarea field.

## Usage

### Example

```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    text: string;
}

const form = createValidatedForm<Example>({
    text: '',
});

export default () => (
    <>
        <es-textarea
            label={'Text'}
            placeholder={'Write some text'}
            {...form.connect('text')}
        />
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

| Property                   | Attribute     | Description                                  | Type                                 | Default     |
| -------------------------- | ------------- | -------------------------------------------- | ------------------------------------ | ----------- |
| `disabled`                 | `disabled`    | If the field is disabled.                    | `boolean \| undefined`               | `undefined` |
| `inputProps`               | --            | Pass props directly to the input.            | `undefined \| { [x: string]: any; }` | `undefined` |
| `invalid`                  | `invalid`     | If the field is currently in an error state. | `boolean \| undefined`               | `undefined` |
| `label` _(required)_       | `label`       | The label of the field.                      | `string`                             | `undefined` |
| `messages`                 | --            | The validation messages of the field         | `ValidationMessages \| undefined`    | `undefined` |
| `name` _(required)_        | `name`        | The name of the field.                       | `string`                             | `undefined` |
| `placeholder` _(required)_ | `placeholder` | The placeholder for the input.               | `string`                             | `undefined` |
| `readonly`                 | `readonly`    | If the field is editable.                    | `boolean \| undefined`               | `undefined` |
| `value` _(required)_       | `value`       | The current value of the field.              | `string`                             | `undefined` |


## Events

| Event         | Description                                     | Type                               |
| ------------- | ----------------------------------------------- | ---------------------------------- |
| `fieldchange` | Emitted when the value of the field is changed. | `CustomEvent<FieldChange<string>>` |


## CSS Custom Properties

| Name                   | Description       |
| ---------------------- | ----------------- |
| `--field-grid-columns` | The field layout. |


## Dependencies

### Depends on

- [es-validation-messages](../es-validation-messages)

### Graph
```mermaid
graph TD;
  es-textarea --> es-validation-messages
  es-validation-messages --> es-icon
  style es-textarea fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


