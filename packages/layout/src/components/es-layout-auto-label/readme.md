# es-popover-group



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute   | Description                                   | Type                                                                                                                                                                 | Default                                                                                                                        |
| ------------------------ | ----------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `extractLabel`           | --          | How to extract the label text                 | `(($el: HTMLElement) => string) \| undefined`                                                                                                                        | `undefined`                                                                                                                    |
| `placement` _(required)_ | `placement` | Where to place the label                      | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `undefined`                                                                                                                    |
| `selector`               | `selector`  | Selector for selecting elements to auto label | `string`                                                                                                                                                             | `[         'es-layout-link:not([disable-auto-label])',         'es-layout-button:not([disable-auto-label])',     ].join(', ')` |


## Dependencies

### Used by

 - [es-layout-section](../es-layout-section)

### Depends on

- es-popover

### Graph
```mermaid
graph TD;
  es-layout-auto-label --> es-popover
  es-popover --> es-popper
  es-popover --> es-popper-inner
  es-popover --> es-popper-x
  es-popover --> es-popper-y
  es-layout-section --> es-layout-auto-label
  style es-layout-auto-label fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


