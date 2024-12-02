```tsx
import {
    toast,
    type TableCells,
    type ClickRowEvent,
} from '@kurrent-ui/components';
import { iconDetails, type IconDetail } from 'utils/helpers';

const tableCells: TableCells<IconDetail> = {
    name: {
        title: 'Name',
    },
    usage: {
        title: 'Usage',
        cell: (h, { data: { name } }) => (
            <pre style={{ margin: '0' }}>{`<c2-icon icon={'${name}'} />`}</pre>
        ),
    },
    icon: {
        title: '',
        variant: 'no-pad',
        cell: (h, { data: { name } }) => <c2-icon icon={name} />,
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
    <c2-table
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
    color: var(--color-highlight);
}
```
