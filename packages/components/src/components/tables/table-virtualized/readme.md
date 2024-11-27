# c2-table-virtualized



<!-- Auto Generated Below -->


## Overview

Create a virtualized table from data.

## Properties

| Property                   | Attribute         | Description                                                                                                             | Type                                                                                       | Default               |
| -------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------- |
| `afterHeight`              | `after-height`    | The height (in pixels) of the after                                                                                     | `number`                                                                                   | `0`                   |
| `beforeHeight`             | `before-height`   | The height (in pixels) of the before                                                                                    | `number`                                                                                   | `0`                   |
| `blockSize`                | `block-size`      | Groups rows into blocks                                                                                                 | `number`                                                                                   | `10`                  |
| `cells` _(required)_       | --                | A record of table cell definitions.                                                                                     | `{ [x: string]: TableCell<any, any>; }`                                                    | `undefined`           |
| `columns`                  | --                | The order and keys of the cells to be rendered. If omitted, all cells will be rendered.                                 | `string[] \| undefined`                                                                    | `undefined`           |
| `extraCellProps`           | --                | Pass extra props to cells                                                                                               | `((key: string, data: any) => Record<string, any>) \| undefined`                           | `undefined`           |
| `getCellData` _(required)_ | --                | Sync function for extracting the data from the row. By default, it assumes you passed an array of data as your columns. | `(key: string, index: number) => any`                                                      | `undefined`           |
| `getKeyFromIndex`          | --                | Sync function for converting an index into a key                                                                        | `(index: number) => string`                                                                | `(i) => `${i}``       |
| `headerHeight`             | `header-height`   | The height (in pixels) of the header                                                                                    | `number`                                                                                   | `52`                  |
| `headless`                 | `headless`        | Do not render header.                                                                                                   | `boolean`                                                                                  | `false`               |
| `identifier`               | `identifier`      | Passed to cell renderer as `parent`.                                                                                    | `string`                                                                                   | `'table-virtualized'` |
| `linkRowTo`                | --                | A function to calculate a href from the cell data.                                                                      | `((row: any) => string) \| undefined`                                                      | `undefined`           |
| `reflowSize`               | `reflow-size`     | The size of the grid rows before starting a reflow                                                                      | `number`                                                                                   | `1000`                |
| `renderAfter`              | --                | Display in a row after the last row                                                                                     | `((h: typeof h) => string \| VNode \| VNode[] \| null) \| undefined`                       | `undefined`           |
| `renderBefore`             | --                | Display in a row before the first row                                                                                   | `((h: typeof h) => string \| VNode \| VNode[] \| null) \| undefined`                       | `undefined`           |
| `rowClass`                 | --                | A function to calculate the class or classes of the row from the cellData.                                              | `(row: any, key: string, index: number) => string \| Record<string, boolean> \| undefined` | `() => undefined`     |
| `rowCount` _(required)_    | `row-count`       | The total number of rows                                                                                                | `number`                                                                                   | `undefined`           |
| `rowHeight`                | `row-height`      | The height (in pixels) of the row                                                                                       | `number`                                                                                   | `50`                  |
| `rowTakesFocus`            | `row-takes-focus` | If rows should be allowed to take focus                                                                                 | `boolean \| undefined`                                                                     | `undefined`           |
| `scrollLock`               | `scroll-lock`     | If the table should lock scroll on appending events                                                                     | `boolean \| undefined`                                                                     | `undefined`           |
| `sort`                     | --                | How the table is sorted                                                                                                 | `[key: string, order: SortOrder] \| undefined`                                             | `undefined`           |
| `stickyHeader`             | `sticky-header`   | Header sticks to scroll parent.                                                                                         | `boolean`                                                                                  | `true`                |
| `windowSize`               | `window-size`     | The size of the window to render                                                                                        | `number`                                                                                   | `100`                 |


## Events

| Event        | Description                                                                     | Type                         |
| ------------ | ------------------------------------------------------------------------------- | ---------------------------- |
| `clickRow`   | Triggered whenever a row is clicked. The `detail` is the item in the row array. | `CustomEvent<ClickRow<any>>` |
| `clickSort`  | Triggered whenever a sortable header is clicked                                 | `CustomEvent<string>`        |
| `firstBlock` | Triggered when the first block is rendered                                      | `CustomEvent<void>`          |
| `lastBlock`  | Triggered when the last block is rendered                                       | `CustomEvent<void>`          |
| `loadBlock`  | Triggered when a block is rendered                                              | `CustomEvent<LoadWindow>`    |


## Methods

### `jumpToRow(index: number, { highlight, smooth }?: Partial<JumpOptions>) => Promise<void>`

Jump to the passed row, with smooth scroll and highlight, if specified.

#### Parameters

| Name    | Type                                                                           | Description |
| ------- | ------------------------------------------------------------------------------ | ----------- |
| `index` | `number`                                                                       |             |
| `__1`   | `{ highlight?: boolean \| undefined; smooth?: false \| "auto" \| undefined; }` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [c2-button](../../buttons/button)
- [c2-icon](../../icon)

### Graph
```mermaid
graph TD;
  c2-table-virtualized --> c2-button
  c2-table-virtualized --> c2-icon
  style c2-table-virtualized fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


