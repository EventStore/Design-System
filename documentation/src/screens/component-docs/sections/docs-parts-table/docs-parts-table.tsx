import { Component, h, Prop } from '@stencil/core';
import { Host, JsonDocsPart } from '@stencil/core/internal';
import type { TableCells } from '@eventstore-ui/components';

@Component({
    tag: 'docs-parts-table',
    styleUrl: 'docs-parts-table.css',
    shadow: true,
})
export class DocsPartsTable {
    @Prop() parts!: JsonDocsPart[];

    render() {
        if (!this.parts?.length) return null;
        return (
            <Host>
                <h2>{'Parts'}</h2>
                <es-table cells={this.cells} rows={this.parts} />
            </Host>
        );
    }

    private cells: TableCells<JsonDocsPart> = {
        name: {
            title: 'Name',
        },
        docs: {
            title: 'Description',
            cell: ({ data: { docs } }) => <docs-markdown md={docs} />,
        },
    };
}
