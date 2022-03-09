# es-list-creator



<!-- Auto Generated Below -->


## Usage

### Example

```tsx
import { createWorkingData, createWorkingDataArray } from '@eventstore/fields';

interface Example {
    names: string[];
}

const workingData = createWorkingData<Example>({
    names: createWorkingDataArray({
        initialValue: ['John', ''],
        name: 'names',
    }),
});

export default () => (
    <es-input-list
        label={'Names'}
        placeholder={'Add a name to your list'}
        {...workingData.connect('names')}
    />
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

| Property                   | Attribute       | Description                         | Type                                                    | Default               |
| -------------------------- | --------------- | ----------------------------------- | ------------------------------------------------------- | --------------------- |
| `additionIcon`             | `addition-icon` | Icon for the add item button.       | `[namespace: string \| symbol, name: string] \| string` | `[ES_FIELDS, 'plus']` |
| `additionText`             | `addition-text` | Text for the add item button.       | `string`                                                | `'Add item'`          |
| `data` _(required)_        | --              | The backing WorkingDataArray        | `WorkingDataArray<string>`                              | `undefined`           |
| `deleteIcon`               | `delete-icon`   | Icon for the delete button.         | `[namespace: string \| symbol, name: string] \| string` | `[ES_FIELDS, 'plus']` |
| `disabled`                 | `disabled`      | If the input is disabled.           | `boolean \| undefined`                                  | `undefined`           |
| `label` _(required)_       | `label`         | The label of the field.             | `string`                                                | `undefined`           |
| `name` _(required)_        | `name`          | The name of the field.              | `string`                                                | `undefined`           |
| `placeholder` _(required)_ | `placeholder`   | Display a placeholder in the input. | `string`                                                | `undefined`           |


## CSS Custom Properties

| Name                   | Description       |
| ---------------------- | ----------------- |
| `--field-grid-columns` | The field layout. |


## Dependencies

### Depends on

- [es-input](../es-input)
- es-button
- es-icon
- [es-validation-messages](../es-validation-messages)

### Graph
```mermaid
graph TD;
  es-input-list --> es-input
  es-input-list --> es-button
  es-input-list --> es-icon
  es-input-list --> es-validation-messages
  es-input --> es-validation-messages
  es-validation-messages --> es-icon
  style es-input-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


