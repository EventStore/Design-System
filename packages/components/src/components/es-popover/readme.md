# es-popper-inner



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                  | Default     |
| ------------- | -------------- | ----------- | --------------------- | ----------- |
| `attachmentX` | `attachment-x` |             | `string`              | `'middle'`  |
| `attachmentY` | `attachment-y` |             | `string`              | `'bottom'`  |
| `backdrop`    | `backdrop`     |             | `boolean`             | `false`     |
| `offsetX`     | `offset-x`     |             | `number`              | `0`         |
| `offsetY`     | `offset-y`     |             | `number`              | `0`         |
| `open`        | `open`         |             | `boolean`             | `false`     |
| `popperClass` | `popper-class` |             | `string \| undefined` | `undefined` |
| `positionX`   | `position-x`   |             | `string`              | `'middle'`  |
| `positionY`   | `position-y`   |             | `string`              | `'top'`     |
| `target`      | `target`       |             | `string`              | `'body'`    |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `requestClose` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [es-popper](./components/es-popper)
- [es-popper-inner](./components/es-popper-inner)

### Graph
```mermaid
graph TD;
  es-popover --> es-popper
  es-popover --> es-popper-inner
  style es-popover fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
