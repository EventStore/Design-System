# es-mega-input



<!-- Auto Generated Below -->


## Usage

### Example

```tsx
import { createWorkingData } from '@eventstore/fields';

interface Example {
    text: string;
}

const workingData = createWorkingData<Example>({
    text: '',
});

const sections = [
    {
        name: 'mega_example',
        title: '', // mega inputs are self labeled
        variant: 'mega',
    },
    {
        name: 'mega_disabled',
        title: '', // mega inputs are self labeled
        variant: 'mega',
    },
    {
        name: 'footer',
        title: '',
        variant: 'footer',
    },
];

export default () => (
    <es-accordian sections={sections}>
        <es-mega-input
            slot={'mega_example'}
            label={'Text'}
            placeholder={'Write some text'}
            {...workingData.connect('text')}
        />
        <es-mega-input
            disabled
            slot={'mega_disabled'}
            label={'Disabled'}
            placeholder={'This is disabled'}
            {...workingData.connect('text')}
        />
        <es-button
            slot={'footer'}
            onClick={() => {
                workingData.submit((data) => {
                    console.log(data);
                });
            }}
        >
            {'Submit'}
        </es-button>
    </es-accordian>
);
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


## Dependencies

### Depends on

- [es-validation-messages](../es-validation-messages)

### Graph
```mermaid
graph TD;
  es-mega-input --> es-validation-messages
  es-validation-messages --> es-icon
  style es-mega-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


