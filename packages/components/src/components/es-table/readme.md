# es-table



<!-- Auto Generated Below -->


## Usage

### Example

```tsx
import { iconDetails, IconDetail } from 'helpers';
import { TableCells, toast } from '@eventstore/components';

const tableCells: TableCells<IconDetail> = {
    name: {
        title: 'Name',
    },
    usage: {
        title: 'Usage',
        cell: ({ data: { name } }) => (
            <pre style={{ margin: 0 }}>{`<es-icon icon={'${name}'} />`}</pre>
        ),
    },
    icon: {
        title: '',
        variant: 'no-pad',
        cell: ({ data: { name } }) => <es-icon icon={name} />,
    },
};

const onClickRow = (e: CustomEvent<IconDetail>) => {
    const icon = e.detail;
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

| Property             | Attribute         | Description                                                                                                              | Type                                                           | Default           |
| -------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ----------------- |
| `cells` _(required)_ | --                | A record of table cell definitions.                                                                                      | `{ [x: string]: TableCell<any>; }`                             | `undefined`       |
| `columns`            | --                | The order and keys of the cells to be rendered. If omitted, all cells will be rendered.                                  | `string[] \| undefined`                                        | `undefined`       |
| `getCellData`        | --                | Sync function for extracting the data from the row. By default, it assumes you passed an array of data as your columns.  | `(key: string) => any`                                         | `(d) => d`        |
| `headless`           | `headless`        | Do not render header.                                                                                                    | `boolean`                                                      | `false`           |
| `identifier`         | `identifier`      | Passed to cell renderer as `parent`.                                                                                     | `string`                                                       | `'table'`         |
| `linkRowTo`          | --                | A function to calculate a href from the cell data.                                                                       | `((row: any) => string) \| undefined`                          | `undefined`       |
| `renderExpansion`    | --                | Allows rendering a node after the row.                                                                                   | `(key: string) => VNode \| null`                               | `() => null`      |
| `rowClass`           | --                | A function to calculate the class or classes of the row from the cellData.                                               | `(row: any) => string \| Record<string, boolean> \| undefined` | `() => undefined` |
| `rowTakesFocus`      | `row-takes-focus` | If rows should be allowed to take focus                                                                                  | `boolean \| undefined`                                         | `undefined`       |
| `rows` _(required)_  | --                | An array of rows to render. Each item in the array is passed to getCellData, to allow passing keys or other identifiers. | `any[]`                                                        | `undefined`       |


## Events

| Event      | Description                                                                     | Type               |
| ---------- | ------------------------------------------------------------------------------- | ------------------ |
| `clickRow` | Triggered whenever a row is clicked. The `detail` is the item in the row array. | `CustomEvent<any>` |


## Dependencies

### Used by

 - [es-table-nested](../es-table-nested)

### Graph
```mermaid
graph TD;
  es-table-nested --> es-table
  style es-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


