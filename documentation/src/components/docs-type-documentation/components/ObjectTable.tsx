import type { TableCells } from '@eventstore/components';
import { h, FunctionalComponent } from '@stencil/core';
import type { DeclarationReflection } from 'typedoc';

export const ObjectTable: FunctionalComponent<{
    declaration: DeclarationReflection;
}> = ({ declaration }) => (
    <es-table rows={declaration.children!} cells={cells} />
);

const cells: TableCells<DeclarationReflection> = {
    name: { title: 'Property' },
    value: {
        title: 'Value',
        cell: ({ data }) => <docs-type someType={data.type!} />,
    },
};
