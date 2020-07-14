# es-typeahead



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute         | Description | Type                                                                       | Default                                                                                 |
| -------------------------- | ----------------- | ----------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `clearOnSelect`            | `clear-on-select` |             | `boolean`                                                                  | `false`                                                                                 |
| `closeOnSelect`            | `close-on-select` |             | `boolean`                                                                  | `false`                                                                                 |
| `disabled`                 | `disabled`        |             | `boolean \| undefined`                                                     | `undefined`                                                                             |
| `name` _(required)_        | `name`            |             | `string`                                                                   | `undefined`                                                                             |
| `optionFilter`             | --                |             | `(filter: string, option: TypeaheadOption) => boolean`                     | `(f, { name }) => {         return name.toLowerCase().includes(f.toLowerCase());     }` |
| `options` _(required)_     | --                |             | `TypeaheadOption[]`                                                        | `undefined`                                                                             |
| `readonly`                 | `readonly`        |             | `boolean \| undefined`                                                     | `undefined`                                                                             |
| `renderField` _(required)_ | --                |             | `(params: RenderTypeaheadFieldParams) => VNode \| VNode[]`                 | `undefined`                                                                             |
| `renderOption`             | --                |             | `(option: TypeaheadOption, chosen: boolean) => string \| VNode \| VNode[]` | `({ name }) => name`                                                                    |
| `value` _(required)_       | --                |             | `string[]`                                                                 | `undefined`                                                                             |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `enter`       |             | `CustomEvent<any>` |
| `fieldchange` |             | `CustomEvent<any>` |


## Shadow Parts

| Part       | Description |
| ---------- | ----------- |
| `"list"`   |             |
| `"option"` |             |


## Dependencies

### Used by

 - [es-list-creator](../es-list-creator)
 - [es-select](../es-select)

### Depends on

- es-popover

### Graph
```mermaid
graph TD;
  es-typeahead --> es-popover
  es-popover --> es-popper
  es-popover --> es-popper-inner
  es-list-creator --> es-typeahead
  es-select --> es-typeahead
  style es-typeahead fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


