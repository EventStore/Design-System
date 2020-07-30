# es-toast



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description | Type                                          | Default     |
| -------------------- | --------- | ----------- | --------------------------------------------- | ----------- |
| `count` _(required)_ | `count`   |             | `number`                                      | `undefined` |
| `icon` _(required)_  | `icon`    |             | `string`                                      | `undefined` |
| `level` _(required)_ | `level`   |             | `"error" \| "info" \| "success" \| "warning"` | `undefined` |


## Methods

### `close() => Promise<unknown>`



#### Returns

Type: `Promise<unknown>`




## Dependencies

### Used by

 - [es-toaster](../es-toaster)

### Depends on

- [es-counter](../../es-counter)
- [es-icon](../../es-icon)

### Graph
```mermaid
graph TD;
  es-toast --> es-counter
  es-toast --> es-icon
  es-toaster --> es-toast
  style es-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
