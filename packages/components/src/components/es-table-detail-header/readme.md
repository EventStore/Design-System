# es-table-detail-header



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
    icon: {
        title: 'Icon',
        cell: ({ data: { name } }) => <es-icon icon={name} />,
    },
    component: {
        title: 'Internal Name',
    },
    aliases: {
        title: 'Aliases',
        variant: 'full-width',
        cell: ({ data: { aliases } }) =>
            aliases?.map((alias) => <pre>{alias}</pre>) ?? <pre>{'-'}</pre>,
    },
    usage: {
        title: 'Usage',
        variant: 'full-width',
        cell: ({ data: { name } }) => (
            <pre style={{ margin: 0 }}>{`<es-icon icon={'${name}'} />`}</pre>
        ),
    },
};

const data = iconDetails['markdown'];

export default () => (
    <>
        <es-table-detail-header
            cells={tableCells}
            data={data}
            titleKey={'component'}
            actionsCell={'icon'}
        />
        <es-table-detail
            cells={tableCells}
            data={data}
            columns={['name', 'aliases', 'usage']}
        />
    </>
);
```

```css
pre {
    margin: 0;
}
```



## Properties

| Property                | Attribute      | Description                                                | Type                               | Default           |
| ----------------------- | -------------- | ---------------------------------------------------------- | ---------------------------------- | ----------------- |
| `actionsCell`           | `actions-cell` | Which cell to place in the top right as a list of actions. | `string`                           | `'actions'`       |
| `cells` _(required)_    | --             | A record of table cell definitions.                        | `{ [x: string]: TableCell<any>; }` | `undefined`       |
| `data` _(required)_     | `data`         | The data to render.                                        | `any`                              | `undefined`       |
| `identifier`            | `identifier`   | Passed to cell renderer as `parent`.                       | `string`                           | `'detail-header'` |
| `titleKey` _(required)_ | `title-key`    | The key of the title in the data                           | `string`                           | `undefined`       |


----------------------------------------------


