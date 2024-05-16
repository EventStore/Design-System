# es-table-detail

<!-- Auto Generated Below -->


## Overview

Render a single row data as a grid of information.

## Usage

### Example

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



## Properties

| Property             | Attribute      | Description                                                                             | Type                                    | Default     |
| -------------------- | -------------- | --------------------------------------------------------------------------------------- | --------------------------------------- | ----------- |
| `cells` _(required)_ | --             | A record of table cell definitions.                                                     | `{ [x: string]: TableCell<any, any>; }` | `undefined` |
| `columns`            | --             | The order and keys of the cells to be rendered. If omitted, all cells will be rendered. | `string[] \| undefined`                 | `undefined` |
| `data` _(required)_  | `data`         | The data to render.                                                                     | `any`                                   | `undefined` |
| `identifier`         | `identifier`   | Passed to cell renderer as `parent`.                                                    | `string`                                | `'detail'`  |
| `loading`            | `loading`      | Indicates if the loading indicators should be displayed                                 | `boolean \| undefined`                  | `undefined` |
| `loadingRows`        | `loading-rows` | Specifies the number of rows to display when loading is true. Defaults to 1.            | `number`                                | `1`         |


----------------------------------------------


