# f2-select-input

<!-- Auto Generated Below -->


## Overview

A searchable select dropdown.

## Usage

### Example

```tsx
import { createValidatedForm } from '@kurrent-ui/forms';

interface Example {
    name: string | null;
}

const form = createValidatedForm<Example>({
    name: null,
});

const options = [
    { name: 'Jim', value: 'jim' },
    { name: 'John', value: 'john' },
    { name: 'Nathanial', value: 'nathanial' },
];

export default () => (
    <f2-form>
        <f2-select-input
            placeholder={'Choose a name from the list'}
            options={options}
            {...form.connect('name')}
        />
        <f2-select-input
            disabled
            placeholder={'Choose a name from the list'}
            options={options}
            {...form.connect('name')}
        />
    </f2-form>
);
```



## Properties

| Property               | Attribute      | Description                                  | Type                                                                                               | Default                       |
| ---------------------- | -------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------- |
| `chevronIcon`          | `chevron-icon` | Icon to use as a chevron.                    | `[namespace: string \| symbol, name: string] \| string`                                            | `[ICON_NAMESPACE, 'chevron']` |
| `disabled`             | `disabled`     | If the field is disabled.                    | `boolean \| undefined`                                                                             | `undefined`                   |
| `inputProps`           | --             | Pass props directly to the input.            | `undefined \| { [x: string]: any; }`                                                               | `undefined`                   |
| `invalid`              | `invalid`      | If the field is currently in an error state. | `boolean \| undefined`                                                                             | `undefined`                   |
| `name` _(required)_    | `name`         | The name of the field.                       | `string`                                                                                           | `undefined`                   |
| `optionFilter`         | --             | Pass a custom search filter function         | `((filter: string, option: TypeaheadOption) => boolean) \| undefined`                              | `undefined`                   |
| `options` _(required)_ | --             | A list of options to choose from.            | `TypeaheadOption[]`                                                                                | `undefined`                   |
| `placeholder`          | `placeholder`  | The placeholder for the input.               | `string \| undefined`                                                                              | `undefined`                   |
| `readonly`             | `readonly`     | If the field is editable.                    | `boolean \| undefined`                                                                             | `undefined`                   |
| `renderOption`         | --             | Overwrite the default option renderer.       | `((h: typeof h, option: any, chosen: boolean) => string \| VNode \| VNode[] \| null) \| undefined` | `undefined`                   |
| `renderValue`          | --             | Overwrite the default value renderer.        | `(h: typeof h, value: any, rawValue: string) => string \| VNode \| VNode[] \| null`                | `(_, o, v) => o?.name ?? v`   |
| `value` _(required)_   | `value`        | The current value of the field.              | `null \| string`                                                                                   | `undefined`                   |


## Events

| Event         | Description                                     | Type                                               |
| ------------- | ----------------------------------------------- | -------------------------------------------------- |
| `fieldchange` | Emitted when the value of the field is changed. | `CustomEvent<FieldChange<string \| null, string>>` |


## Shadow Parts

| Part           | Description                    |
| -------------- | ------------------------------ |
| `"input"`      | The wrapping div of the input. |
| `"true_input"` | The input element.             |


## Dependencies

### Used by

 - [f2-select-field](../field)

### Depends on

- c2-icon
- f2-typeahead

### Graph
```mermaid
graph TD;
  f2-select-input --> c2-icon
  f2-select-input --> f2-typeahead
  f2-typeahead --> c2-popover
  c2-popover --> c2-popper
  c2-popover --> c2-popper-inner
  c2-popover --> c2-popper-x
  c2-popover --> c2-popper-y
  f2-select-field --> f2-select-input
  style f2-select-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


