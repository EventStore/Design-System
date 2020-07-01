# es-select



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute     | Description | Type                                                                                      | Default     |
| ---------------------- | ------------- | ----------- | ----------------------------------------------------------------------------------------- | ----------- |
| `disabled`             | `disabled`    |             | `boolean \| undefined`                                                                    | `undefined` |
| `invalid`              | `invalid`     |             | `boolean \| undefined`                                                                    | `undefined` |
| `label` _(required)_   | `label`       |             | `string`                                                                                  | `undefined` |
| `messages`             | --            |             | `undefined \| { error: string[]; warning: string[]; info: string[]; }`                    | `undefined` |
| `name` _(required)_    | `name`        |             | `string`                                                                                  | `undefined` |
| `optionFilter`         | --            |             | `((filter: string, option: TypeaheadOption) => boolean) \| undefined`                     | `undefined` |
| `options` _(required)_ | --            |             | `TypeaheadOption[]`                                                                       | `undefined` |
| `placeholder`          | `placeholder` |             | `string \| undefined`                                                                     | `undefined` |
| `readonly`             | `readonly`    |             | `boolean \| undefined`                                                                    | `undefined` |
| `renderOption`         | --            |             | `((option: TypeaheadOption, chosen: boolean) => string \| VNode \| VNode[]) \| undefined` | `undefined` |
| `renderValue`          | --            |             | `(value: string) => string \| VNode`                                                      | `(v) => v`  |
| `value` _(required)_   | `value`       |             | `null \| string`                                                                          | `undefined` |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `fieldchange` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [es-typeahead](../es-typeahead)
- [es-validation-messages](../es-validation-messages)

### Graph
```mermaid
graph TD;
  es-select --> es-typeahead
  es-select --> es-validation-messages
  style es-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
