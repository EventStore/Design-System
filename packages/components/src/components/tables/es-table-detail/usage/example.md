```tsx
import type { TableCells } from '@eventstore-ui/components';
import { iconDetails, type IconDetail } from 'utils/helpers';

const tableCells: TableCells<IconDetail> = {
    name: {
        title: 'Name',
    },
    icon: {
        title: 'Icon',
        cell: (h, { data: { name } }) => <es-icon icon={name} />,
    },
    component: {
        title: 'Internal Name',
    },
    aliases: {
        title: 'Aliases',
        cell: (_, { data: { aliases } }) => aliases?.join(', ') ?? '-',
    },
    usage: {
        title: 'Usage',
        variant: 'full-width',
        cell: (h, { data: { name } }) => (
            <pre style={{ margin: '0' }}>{`<es-icon icon={'${name}'} />`}</pre>
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
