# c2-popover-group

<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute   | Description                                   | Type                                                                                                                                                                 | Default                                                                                                                        |
| ------------------------ | ----------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `extractLabel`           | --          | How to extract the label text                 | `(($el: HTMLElement) => string) \| undefined`                                                                                                                        | `undefined`                                                                                                                    |
| `placement` _(required)_ | `placement` | Where to place the label                      | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `undefined`                                                                                                                    |
| `selector`               | `selector`  | Selector for selecting elements to auto label | `string`                                                                                                                                                             | `[         'l2-layout-link:not([disable-auto-label])',         'l2-layout-button:not([disable-auto-label])',     ].join(', ')` |


## Dependencies

### Used by

 - [l2-layout-section](../layout-section)

### Depends on

- c2-popover

### Graph
```mermaid
graph TD;
  l2-layout-auto-label --> c2-popover
  c2-popover --> c2-popper
  c2-popover --> c2-popper-inner
  c2-popover --> c2-popper-x
  c2-popover --> c2-popper-y
  l2-layout-section --> l2-layout-auto-label
  style l2-layout-auto-label fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


