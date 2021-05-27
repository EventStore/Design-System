# es-accordian



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute | Description | Type                 | Default     |
| ----------------------- | --------- | ----------- | -------------------- | ----------- |
| `sections` _(required)_ | --        |             | `AccordianSection[]` | `undefined` |
| `steps`                 | `steps`   |             | `boolean`            | `false`     |


## Shadow Parts

| Part                      | Description |
| ------------------------- | ----------- |
| `"section_content"`       |             |
| `"section_content_inner"` |             |
| `"section_header"`        |             |
| `"section_header_title"`  |             |


## Dependencies

### Depends on

- [es-counter](../es-counter)
- [es-icon](../es-icon)

### Graph
```mermaid
graph TD;
  es-accordian --> es-counter
  es-accordian --> es-icon
  style es-accordian fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
