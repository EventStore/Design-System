# es-table



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description | Type                                                           | Default           |
| -------------------- | --------- | ----------- | -------------------------------------------------------------- | ----------------- |
| `cells` _(required)_ | --        |             | `{ [x: string]: TableCell<any>; }`                             | `undefined`       |
| `columns`            | --        |             | `string[] \| undefined`                                        | `undefined`       |
| `data` _(required)_  | --        |             | `{ [x: string]: any; }`                                        | `undefined`       |
| `linkRowTo`          | --        |             | `((row: any) => string) \| undefined`                          | `undefined`       |
| `rowClass`           | --        |             | `(row: any) => string \| Record<string, boolean> \| undefined` | `() => undefined` |
| `rows` _(required)_  | --        |             | `string[]`                                                     | `undefined`       |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `clickRow` |             | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
