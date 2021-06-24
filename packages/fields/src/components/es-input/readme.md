# es-input



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute     | Description | Type                                                                   | Default     |
| -------------------------- | ------------- | ----------- | ---------------------------------------------------------------------- | ----------- |
| `disabled`                 | `disabled`    |             | `boolean \| undefined`                                                 | `undefined` |
| `inputProps`               | --            |             | `undefined \| { [x: string]: any; }`                                   | `undefined` |
| `invalid`                  | `invalid`     |             | `boolean \| undefined`                                                 | `undefined` |
| `label` _(required)_       | `label`       |             | `string`                                                               | `undefined` |
| `mask`                     | --            |             | `MaskOptions \| undefined`                                             | `undefined` |
| `messages`                 | --            |             | `undefined \| { error: string[]; warning: string[]; info: string[]; }` | `undefined` |
| `name` _(required)_        | `name`        |             | `string`                                                               | `undefined` |
| `placeholder` _(required)_ | `placeholder` |             | `string`                                                               | `undefined` |
| `readonly`                 | `readonly`    |             | `boolean \| undefined`                                                 | `undefined` |
| `value` _(required)_       | `value`       |             | `string`                                                               | `undefined` |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `enter`       |             | `CustomEvent<any>` |
| `fieldchange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [es-input-list](../es-input-list)

### Depends on

- [es-validation-messages](../es-validation-messages)

### Graph
```mermaid
graph TD;
  es-input --> es-validation-messages
  es-input-list --> es-input
  style es-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
