# es-textarea



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute     | Description | Type                                                                   | Default     |
| -------------------------- | ------------- | ----------- | ---------------------------------------------------------------------- | ----------- |
| `disabled`                 | `disabled`    |             | `boolean \| undefined`                                                 | `undefined` |
| `inputProps`               | --            |             | `undefined \| { [x: string]: any; }`                                   | `undefined` |
| `invalid`                  | `invalid`     |             | `boolean \| undefined`                                                 | `undefined` |
| `label` _(required)_       | `label`       |             | `string`                                                               | `undefined` |
| `messages`                 | --            |             | `undefined \| { error: string[]; warning: string[]; info: string[]; }` | `undefined` |
| `name` _(required)_        | `name`        |             | `string`                                                               | `undefined` |
| `placeholder` _(required)_ | `placeholder` |             | `string`                                                               | `undefined` |
| `readonly`                 | `readonly`    |             | `boolean \| undefined`                                                 | `undefined` |
| `value` _(required)_       | `value`       |             | `string`                                                               | `undefined` |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `fieldchange` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [es-validation-messages](../es-validation-messages)

### Graph
```mermaid
graph TD;
  es-textarea --> es-validation-messages
  style es-textarea fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


