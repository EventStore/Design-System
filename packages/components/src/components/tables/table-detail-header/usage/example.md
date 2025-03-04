```tsx
import type { TableCells } from '@kurrent-ui/components';
import { iconDetails, type IconDetail } from 'utils/helpers';

const tableCells: TableCells<IconDetail> = {
    name: {
        title: 'Name',
    },
    icon: {
        title: 'Icon',
        cell: (h, { data: { name } }) => <c2-icon icon={name} />,
    },
    component: {
        title: 'Internal Name',
    },
    aliases: {
        title: 'Aliases',
        variant: 'full-width',
        cell: (h, { data: { aliases } }) =>
            aliases?.map((alias) => <pre>{alias}</pre>) ?? <pre>{'-'}</pre>,
    },
    usage: {
        title: 'Usage',
        variant: 'full-width',
        cell: (h, { data: { name } }) => (
            <pre style={{ margin: '0' }}>{`<c2-icon icon={'${name}'} />`}</pre>
        ),
    },
};

const data = iconDetails['markdown'];

export default () => (
    <>
        <c2-table-detail-header
            cells={tableCells}
            data={data}
            titleCell={'component'}
            actionsCell={'icon'}
        />
        <c2-table-detail
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
