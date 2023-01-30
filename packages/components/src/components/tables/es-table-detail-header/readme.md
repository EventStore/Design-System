# es-table-detail-header



<!-- Auto Generated Below -->


## Overview

A default header for [`es-table-detail`](/components/components/es-table-detail).

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
        cell: (h, { data: { name } }) => <es-icon icon={name} />,
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
            titleCell={'component'}
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

| Property             | Attribute      | Description                                                | Type                                    | Default           |
| -------------------- | -------------- | ---------------------------------------------------------- | --------------------------------------- | ----------------- |
| `actionsCell`        | `actions-cell` | Which cell to place in the top right as a list of actions. | `string`                                | `'actions'`       |
| `cells` _(required)_ | --             | A record of table cell definitions.                        | `{ [x: string]: TableCell<any, any>; }` | `undefined`       |
| `data` _(required)_  | `data`         | The data to render.                                        | `any`                                   | `undefined`       |
| `identifier`         | `identifier`   | Passed to cell renderer as `parent`.                       | `string`                                | `'detail-header'` |
| `titleCell`          | `title-cell`   | Which cell to place as the title                           | `string`                                | `'title'`         |


----------------------------------------------


