# f2-text-input



<!-- Auto Generated Below -->


## Overview

A text input.

## Usage

### Example

```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    text: string;
    id: string;
}

const forms = createValidatedForm<Example>({
    text: '',
    id: {
        initialValue: '',
        validations: [
            {
                validator: (v) => v.length === 12,
                message: 'Please provide a complete Id',
            },
        ],
    },
});

const onEnter = () => {
    forms.submit((data) => {
        console.log(data);
    });
};

export default () => (
    <>
        <es-input
            label={'Text'}
            placeholder={'Write some text'}
            onEnter={onEnter}
            {...forms.connect('text')}
        />
        <es-input
            label={'Account Id'}
            placeholder={'Account Id'}
            onEnter={onEnter}
            mask={{
                mask: '0000-0000-0000',
                unmask: true,
                lazy: false,
                placeholderChar: '_',
            }}
            {...forms.connect('id')}
        />
        <es-input
            disabled
            label={'Disabled'}
            placeholder={'This is disabled'}
            {...forms.connect('text')}
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

| Property                   | Attribute     | Description                        | Type                                 | Default     |
| -------------------------- | ------------- | ---------------------------------- | ------------------------------------ | ----------- |
| `disabled`                 | `disabled`    | If the input is disabled.          | `boolean \| undefined`               | `undefined` |
| `inputProps`               | --            | Pass props directly to the input.  | `undefined \| { [x: string]: any; }` | `undefined` |
| `invalid`                  | `invalid`     | If the input is currently invalid. | `boolean \| undefined`               | `undefined` |
| `name` _(required)_        | `name`        | The name of the input.             | `string`                             | `undefined` |
| `placeholder` _(required)_ | `placeholder` | The placeholder for the input.     | `string`                             | `undefined` |
| `readonly`                 | `readonly`    | If the input is editable.          | `boolean \| undefined`               | `undefined` |
| `value` _(required)_       | `value`       | The current value of the field.    | `string`                             | `undefined` |


## Events

| Event         | Description                                              | Type                                       |
| ------------- | -------------------------------------------------------- | ------------------------------------------ |
| `enter`       | Emitted on keyup of enter, if no modifier keys are held. | `CustomEvent<any>`                         |
| `fieldchange` | Emitted when the value of the field is changed.          | `CustomEvent<FieldChange<string, string>>` |


## Dependencies

### Used by

 - [f2-text-field](../field)
 - [f2-text-list-field](../../text-list)

### Graph
```mermaid
graph TD;
  f2-text-field --> f2-text-input
  f2-text-list-field --> f2-text-input
  style f2-text-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

