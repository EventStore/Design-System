# es-radio-card-group



<!-- Auto Generated Below -->


## Overview

A card based single select input.

## Usage

### Example

```tsx
import { createValidatedForm } from '@eventstore-ui/forms';
import type { AccordianSection } from '@eventstore-ui/components';
import type { RadioCardGroupOption } from '@eventstore-ui/fields';

interface Example {
    best: string | null;
    another: string | null;
}

const form = createValidatedForm<Example>({
    best: null,
    another: null,
});

export default () => (
    <es-accordian sections={sections}>
        <es-radio-card-group
            slot={'option_one'}
            labelledby={'option_one'}
            options={options}
            {...form.connect('best')}
        />
        <es-radio-card-group
            slot={'option_two'}
            labelledby={'option_two'}
            options={options}
            groupBy={'group'}
            {...form.connect('another')}
        />
        <es-button
            slot={'footer'}
            onClick={() => {
                form.submit((data) => {
                    console.log(data);
                });
            }}
        >
            {'Submit'}
        </es-button>
    </es-accordian>
);

const options: RadioCardGroupOption[] = [
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

const sections: AccordianSection[] = [
    {
        name: 'option_one',
        title: 'Options 1',
        variant: 'field',
    },
    {
        name: 'option_two',
        title: 'Grouped Options',
        variant: 'field',
    },
    {
        name: 'footer',
        title: '',
        variant: 'footer',
    },
];
```



## Properties

| Property                  | Attribute         | Description                                                                                                                                | Type                                                                                | Default                            |
| ------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ---------------------------------- |
| `groupBy`                 | `group-by`        | Group the cards by a key.                                                                                                                  | `string \| undefined`                                                               | `undefined`                        |
| `icon`                    | `icon`            | Icon to display when checked.                                                                                                              | `[namespace: string \| symbol, name: string] \| string`                             | `[ICON_NAMESPACE, 'check']`        |
| `invalid`                 | `invalid`         | If the field is currently in an error state.                                                                                               | `boolean`                                                                           | `false`                            |
| `labelledby` _(required)_ | `aria-labelledby` | The id of the component that labels this input. This input doesn't bring its own label, so must be labeled externally and referenced here. | `string`                                                                            | `undefined`                        |
| `messages`                | --                | The validation messages of the field                                                                                                       | `ValidationMessages \| undefined`                                                   | `undefined`                        |
| `name` _(required)_       | `name`            | The name of the field.                                                                                                                     | `string`                                                                            | `undefined`                        |
| `options` _(required)_    | --                | The options to be displayed and chosen from.                                                                                               | `RadioCardGroupOption[]`                                                            | `undefined`                        |
| `renderCard`              | --                | Overwrite the default card renderer                                                                                                        | `(h: typeof h, option: any, active: boolean) => string \| VNode \| VNode[] \| null` | `RadioCardGroup.defaultRenderCard` |
| `value` _(required)_      | `value`           | The current value of the field.                                                                                                            | `null \| string`                                                                    | `undefined`                        |


## Events

| Event         | Description                                     | Type                                       |
| ------------- | ----------------------------------------------- | ------------------------------------------ |
| `fieldchange` | Emitted when the value of the field is changed. | `CustomEvent<FieldChange<string \| null>>` |


## Shadow Parts

| Part            | Description                |
| --------------- | -------------------------- |
| `"group-title"` | The title of a card group. |


## Dependencies

### Depends on

- es-icon
- [es-validation-messages](../es-validation-messages)

### Graph
```mermaid
graph TD;
  es-radio-card-group --> es-icon
  es-radio-card-group --> es-validation-messages
  es-validation-messages --> es-icon
  style es-radio-card-group fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


