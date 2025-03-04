# f2-radio-card-field

<!-- Auto Generated Below -->


## Overview

A card based single select field.

## Usage

### Example

```tsx
import { createValidatedForm } from '@kurrent-ui/forms';
import type { RadioCardOption } from '@kurrent-ui/fields';

interface Example {
    best: string | null;
    another: string | null;
}

const form = createValidatedForm<Example>({
    best: null,
    another: null,
});

export default () => (
    <f2-form>
        <f2-radio-card-field
            label={'Select the best letter'}
            documentation={'There is a correct answer to this.'}
            documentationLink={'https://en.wikipedia.org/wiki/Latin_script'}
            options={options}
            {...form.connect('best')}
        />
        <f2-radio-card-field
            label={'Select another letter'}
            documentation={'Just do what you feel is right.'}
            options={options}
            groupBy={'group'}
            {...form.connect('another')}
        />
        <c2-button
            onClick={() => {
                form.submit((data) => {
                    console.log(data);
                });
            }}
        >
            {'Submit'}
        </c2-button>
    </f2-form>
);

const options: RadioCardOption[] = [
    {
        value: 'a',
        name: 'The letter A',
        description: 'The first letter of the alphabet',
        group: 'Vowels',
    },
    {
        value: 'b',
        name: 'The letter B',
        description: 'The second letter of the alphabet',
        group: 'Consonants',
        disabled: true,
    },
    {
        value: 'c',
        name: 'The letter C',
        description: 'The third letter of the alphabet',
        group: 'Consonants',
    },
    {
        value: 'd',
        name: 'The letter D',
        description: 'A letter of the alphabet',
        group: 'Consonants',
    },
    {
        value: 'e',
        name: 'The letter E',
        description: 'A letter of the alphabet',
        group: 'Vowels',
    },
    {
        value: 'f',
        name: 'The letter F',
        description: 'A letter of the alphabet',
        group: 'Consonants',
    },
];
```



## Properties

| Property                | Attribute                 | Description                                         | Type                                                                                               | Default                     |
| ----------------------- | ------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------- |
| `cardParts`             | --                        | Parts in the card, to be exported on the top level. | `string[]`                                                                                         | `[]`                        |
| `checkIcon`             | `check-icon`              | Icon to display when checked.                       | `[namespace: string \| symbol, name: string] \| string`                                            | `[ICON_NAMESPACE, 'check']` |
| `disabled`              | `disabled`                | If the field is disabled.                           | `boolean \| undefined`                                                                             | `undefined`                 |
| `documentation`         | `documentation`           | Inline documentation text.                          | `string \| undefined`                                                                              | `undefined`                 |
| `documentationLink`     | `documentation-link`      | Inline documentation link.                          | `string \| undefined`                                                                              | `undefined`                 |
| `documentationLinkText` | `documentation-link-text` | Inline documentation link text.                     | `string \| undefined`                                                                              | `undefined`                 |
| `groupBy`               | `group-by`                | Group the cards by a key.                           | `string \| undefined`                                                                              | `undefined`                 |
| `invalid`               | `invalid`                 | If the field is currently invalid.                  | `boolean \| undefined`                                                                             | `undefined`                 |
| `label` _(required)_    | `label`                   | The label of the field.                             | `string`                                                                                           | `undefined`                 |
| `messages`              | --                        | The messages to display under the field.            | `ValidationMessages \| undefined`                                                                  | `undefined`                 |
| `name` _(required)_     | `name`                    | The name of the input.                              | `string`                                                                                           | `undefined`                 |
| `options` _(required)_  | --                        | The options to be displayed and chosen from.        | `RadioCardOption[]`                                                                                | `undefined`                 |
| `placeholder`           | `placeholder`             | The placeholder to show if there are no options.    | `string \| undefined`                                                                              | `undefined`                 |
| `renderCard`            | --                        | Overwrite the default card renderer                 | `((h: typeof h, option: any, active: boolean) => string \| VNode \| VNode[] \| null) \| undefined` | `undefined`                 |
| `templated`             | `templated`               | If the field is templated.                          | `"no-edit" \| boolean \| undefined`                                                                | `undefined`                 |
| `value` _(required)_    | `value`                   | The current value of the input.                     | `null \| string`                                                                                   | `undefined`                 |


## Events

| Event         | Description                                     | Type                                       |
| ------------- | ----------------------------------------------- | ------------------------------------------ |
| `fieldchange` | Emitted when the value of the field is changed. | `CustomEvent<FieldChange<string, string>>` |
| `requestEdit` | Emitted when the user requests to edit.         | `CustomEvent<string>`                      |


## Shadow Parts

| Part            | Description                |
| --------------- | -------------------------- |
| `"group-title"` | The title of a card group. |


## Dependencies

### Depends on

- [f2-radio-card-input](../input)

### Graph
```mermaid
graph TD;
  f2-radio-card-field --> f2-radio-card-input
  f2-radio-card-input --> c2-icon
  style f2-radio-card-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


