# es-list-creator



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute       | Description | Type                                                                   | Default      |
| -------------------------- | --------------- | ----------- | ---------------------------------------------------------------------- | ------------ |
| `additionText`             | `addition-text` |             | `string`                                                               | `'Add item'` |
| `disabled`                 | `disabled`      |             | `boolean \| undefined`                                                 | `undefined`  |
| `invalid`                  | `invalid`       |             | `boolean \| undefined`                                                 | `undefined`  |
| `label` _(required)_       | `label`         |             | `string`                                                               | `undefined`  |
| `messages`                 | --              |             | `undefined \| { error: string[]; warning: string[]; info: string[]; }` | `undefined`  |
| `name` _(required)_        | `name`          |             | `string`                                                               | `undefined`  |
| `placeholder` _(required)_ | `placeholder`   |             | `string`                                                               | `undefined`  |
| `value` _(required)_       | --              |             | `string[]`                                                             | `undefined`  |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `fieldchange` |             | `CustomEvent<any>` |


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
  style es-input-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
