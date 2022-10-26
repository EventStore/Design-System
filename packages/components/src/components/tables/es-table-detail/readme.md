# es-table-detail



<!-- Auto Generated Below -->


## Usage

### Example

```tsx
import { iconDetails, IconDetail } from 'helpers';
import { TableCells, toast } from '@eventstore-ui/components';

const tableCells: TableCells<IconDetail> = {
    name: {
        title: 'Name',
    },
    icon: {
        title: 'Icon',
        cell: ({ data: { name } }) => <es-icon icon={name} />,
    },
    component: {
        title: 'Internal Name',
    },
    aliases: {
        title: 'Aliases',
        cell: ({ data: { aliases } }) => aliases?.join(', ') ?? '-',
    },
    usage: {
        title: 'Usage',
        variant: 'full-width',
        cell: ({ data: { name } }) => (
            <pre style={{ margin: 0 }}>{`<es-icon icon={'${name}'} />`}</pre>
        ),
    },
};

export default () => (
    <es-table-detail cells={tableCells} data={iconDetails['spinner']} />
);
```

```css
:host {
    display: contents;
}
```



## Properties

| Property             | Attribute    | Description                                                                             | Type                               | Default     |
| -------------------- | ------------ | --------------------------------------------------------------------------------------- | ---------------------------------- | ----------- |
| `cells` _(required)_ | --           | A record of table cell definitions.                                                     | `{ [x: string]: TableCell<any>; }` | `undefined` |
| `columns`            | --           | The order and keys of the cells to be rendered. If omitted, all cells will be rendered. | `string[] \| undefined`            | `undefined` |
| `data` _(required)_  | `data`       | The data to render.                                                                     | `any`                              | `undefined` |
| `identifier`         | `identifier` | Passed to cell renderer as `parent`.                                                    | `string`                           | `'detail'`  |


----------------------------------------------


