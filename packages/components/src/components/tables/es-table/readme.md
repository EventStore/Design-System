# es-table

<!-- Auto Generated Below -->


## Overview

Create a table from data.

## Usage

### Example

```tsx
import {
    toast,
    type TableCells,
    type ClickRowEvent,
} from '@eventstore-ui/components';
import { iconDetails, type IconDetail } from 'utils/helpers';

const tableCells: TableCells<IconDetail> = {
    name: {
        title: 'Name',
    },
    usage: {
        title: 'Usage',
        cell: (h, { data: { name } }) => (
            <pre style={{ margin: '0' }}>{`<es-icon icon={'${name}'} />`}</pre>
        ),
    },
    icon: {
        title: '',
        variant: 'no-pad',
        cell: (h, { data: { name } }) => <es-icon icon={name} />,
    },
};

const onClickRow = (e: ClickRowEvent<IconDetail>) => {
    const icon = e.detail.data;
    toast.success({
        title: 'Clicked row',
        message: `You clicked ${icon.name}.`,
        icon: icon.name,
    });
};

export default () => (
    <es-table
        cells={tableCells}
        rows={Object.values(iconDetails)}
        onClickRow={onClickRow}
    />
);
```

```css
:host {
    padding: 0;
}

*[role='row'] {
    cursor: pointer;
    transition: color 500ms ease;
}

*[role='row']:hover {
    color: var(--color-secondary);
}
```



## Properties

| Property             | Attribute         | Description                                                                                                                                                            | Type                                                                                    | Default                                                                                                                                                                                                                                                                                                                      |
| -------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cells` _(required)_ | --                | A record of table cell definitions.                                                                                                                                    | `{ [x: string]: TableCell<any, any>; }`                                                 | `undefined`                                                                                                                                                                                                                                                                                                                  |
| `columns`            | --                | The order and keys of the cells to be rendered. If omitted, all cells will be rendered.                                                                                | `string[] \| undefined`                                                                 | `undefined`                                                                                                                                                                                                                                                                                                                  |
| `extraCellProps`     | --                | Pass extra props to cells                                                                                                                                              | `((key: string, data: any) => Record<string, any>) \| undefined`                        | `undefined`                                                                                                                                                                                                                                                                                                                  |
| `getCellData`        | --                | Sync function for extracting the data from the row. By default, it assumes you passed an array of data as your columns.                                                | `(row: any) => any`                                                                     | `(d) => d`                                                                                                                                                                                                                                                                                                                   |
| `getRowKey`          | --                | Sync function for extracting a key from your row data. By default, if the passed rows are strings it will use them directly, otherwise it will warn and use the index. | `(row: any, i: number) => string`                                                       | `(row, i) => {         if (typeof row === 'string') return row;         logger.warn.once(             'es-table:',             `Key not found for row ${row} at index ${i}. Using index as key (unsafe).`,             'Pass the `getRowKey` prop to convert your row into a key.',         );         return `${i}`;     }` |
| `headless`           | `headless`        | Do not render header.                                                                                                                                                  | `boolean`                                                                               | `false`                                                                                                                                                                                                                                                                                                                      |
| `identifier`         | `identifier`      | Passed to cell renderer as `parent`.                                                                                                                                   | `string`                                                                                | `'table'`                                                                                                                                                                                                                                                                                                                    |
| `linkRowTo`          | --                | A function to calculate a href from the cell data.                                                                                                                     | `((data: any) => string) \| undefined`                                                  | `undefined`                                                                                                                                                                                                                                                                                                                  |
| `loading`            | `loading`         | Indicates if the loading indicators should be displayed                                                                                                                | `boolean \| undefined`                                                                  | `undefined`                                                                                                                                                                                                                                                                                                                  |
| `loadingRows`        | `loading-rows`    | Specifies the number of rows to display when loading is true. Defaults to 1.                                                                                           | `number`                                                                                | `1`                                                                                                                                                                                                                                                                                                                          |
| `renderExpansion`    | --                | Allows rendering a node after the row.                                                                                                                                 | `(h: typeof h, row: any, key: string, i: number) => string \| VNode \| VNode[] \| null` | `() => null`                                                                                                                                                                                                                                                                                                                 |
| `rowClass`           | --                | A function to calculate the class or classes of the row from the cellData.                                                                                             | `(data: any, row: any) => string \| Record<string, boolean> \| undefined`               | `() => undefined`                                                                                                                                                                                                                                                                                                            |
| `rowTakesFocus`      | `row-takes-focus` | If rows should be allowed to take focus                                                                                                                                | `boolean \| undefined`                                                                  | `undefined`                                                                                                                                                                                                                                                                                                                  |
| `rows` _(required)_  | --                | An array of rows to render. Each item in the array is passed to getCellData, to allow passing keys or other identifiers.                                               | `unknown[]`                                                                             | `undefined`                                                                                                                                                                                                                                                                                                                  |
| `sort`               | --                | How the table is sorted                                                                                                                                                | `[key: string, order: SortOrder] \| undefined`                                          | `undefined`                                                                                                                                                                                                                                                                                                                  |
| `stickyHeader`       | `sticky-header`   | Header sticks to scroll parent.                                                                                                                                        | `boolean`                                                                               | `false`                                                                                                                                                                                                                                                                                                                      |


## Events

| Event       | Description                                     | Type                         |
| ----------- | ----------------------------------------------- | ---------------------------- |
| `clickRow`  | Triggered whenever a row is clicked.            | `CustomEvent<ClickRow<any>>` |
| `clickSort` | Triggered whenever a sortable header is clicked | `CustomEvent<string>`        |


## Dependencies

### Used by

 - [es-table-nested](../es-table-nested)

### Depends on

- [es-loading-text](../../es-loading-text)
- [es-button](../../buttons/es-button)
- [es-icon](../../es-icon)

### Graph
```mermaid
graph TD;
  es-table --> es-loading-text
  es-table --> es-button
  es-table --> es-icon
  es-table-nested --> es-table
  style es-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


