import { TableCells } from '@eventstore/components';
import { h, FunctionalComponent } from '@stencil/core';
import { JSONOutput } from 'typedoc';

export const ObjectTable: FunctionalComponent<{
    declaration: JSONOutput.DeclarationReflection;
}> = ({ declaration }) => (
    <es-table rows={declaration.children!} cells={cells} />
);

const cells: TableCells<JSONOutput.DeclarationReflection> = {
    name: { title: 'Property' },
    value: {
        title: 'Value',
        cell: ({ data }) => <docs-type someType={data.type!} />,
    },
};
