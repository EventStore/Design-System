# f2-text-field

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

| Property                | Attribute                 | Description                              | Type                                                                                               | Default     |
| ----------------------- | ------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------- |
| `chevronIcon`           | `chevron-icon`            | Icon to use as a chevron.                | `[namespace: string \| symbol, name: string] \| string \| undefined`                               | `undefined` |
| `disabled`              | `disabled`                | If the field is disabled.                | `boolean \| undefined`                                                                             | `undefined` |
| `documentation`         | `documentation`           | Inline documentation text.               | `string \| undefined`                                                                              | `undefined` |
| `documentationLink`     | `documentation-link`      | Inline documentation link.               | `string \| undefined`                                                                              | `undefined` |
| `documentationLinkText` | `documentation-link-text` | Inline documentation link text.          | `string \| undefined`                                                                              | `undefined` |
| `inputProps`            | --                        | Pass props directly to the input.        | `undefined \| { [x: string]: any; }`                                                               | `undefined` |
| `invalid`               | `invalid`                 | If the field is currently invalid.       | `boolean \| undefined`                                                                             | `undefined` |
| `label` _(required)_    | `label`                   | The label of the field.                  | `string`                                                                                           | `undefined` |
| `messages`              | --                        | The messages to display under the field. | `ValidationMessages \| undefined`                                                                  | `undefined` |
| `name` _(required)_     | `name`                    | The name of the field.                   | `string`                                                                                           | `undefined` |
| `optionFilter`          | --                        | Pass a custom search filter function     | `((filter: string, option: TypeaheadOption) => boolean) \| undefined`                              | `undefined` |
| `options` _(required)_  | --                        | A list of options to choose from.        | `TypeaheadOption[]`                                                                                | `undefined` |
| `placeholder`           | `placeholder`             | The placeholder for the input.           | `string \| undefined`                                                                              | `undefined` |
| `readonly`              | `readonly`                | If the field is editable.                | `boolean \| undefined`                                                                             | `undefined` |
| `renderOption`          | --                        | Overwrite the default option renderer.   | `((h: typeof h, option: any, chosen: boolean) => string \| VNode \| VNode[] \| null) \| undefined` | `undefined` |
| `renderValue`           | --                        | Overwrite the default value renderer.    | `((h: typeof h, value: any, rawValue: string) => string \| VNode \| VNode[] \| null) \| undefined` | `undefined` |
| `templated`             | `templated`               | If the field is templated.               | `any`                                                                                              | `undefined` |
| `value` _(required)_    | `value`                   | The current value of the field.          | `null \| string`                                                                                   | `undefined` |


## Events

| Event         | Description                                              | Type                                       |
| ------------- | -------------------------------------------------------- | ------------------------------------------ |
| `enter`       | Emitted on keyup of enter, if no modifier keys are held. | `CustomEvent<any>`                         |
| `fieldchange` | Emitted when the value of the field is changed.          | `CustomEvent<FieldChange<string, string>>` |
| `requestEdit` | Emitted when the user requests to edit.                  | `CustomEvent<string>`                      |


## Dependencies

### Depends on

- [f2-select-input](../input)

### Graph
```mermaid
graph TD;
  f2-select-field --> f2-select-input
  f2-select-input --> es-icon
  f2-select-input --> f2-typeahead
  f2-typeahead --> es-popover
  es-popover --> es-popper
  es-popover --> es-popper-inner
  es-popover --> es-popper-x
  es-popover --> es-popper-y
  style f2-select-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


