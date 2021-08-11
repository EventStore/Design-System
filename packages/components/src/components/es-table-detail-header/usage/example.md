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
