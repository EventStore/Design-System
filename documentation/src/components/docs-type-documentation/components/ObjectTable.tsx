import type { TableCells } from '@kurrent-ui/components';
import { h, type FunctionalComponent } from '@stencil/core';
import type { DeclarationReflection } from 'typedoc';

export const ObjectTable: FunctionalComponent<{
    declaration: DeclarationReflection;
}> = ({ declaration }) => (
    <c2-table rows={declaration.children!} cells={cells} />
);

const cells: TableCells<DeclarationReflection> = {
    name: { title: 'Property' },
    value: {
        title: 'Value',
        cell: (h, { data }) => <docs-type someType={data.type!} />,
    },
};
