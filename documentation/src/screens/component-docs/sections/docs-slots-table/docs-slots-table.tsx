import { Component, h, Prop } from '@stencil/core';
import { Host, JsonDocsSlot } from '@stencil/core/internal';
import type { TableCells } from '@eventstore-ui/components';

@Component({
    tag: 'docs-slots-table',
    styleUrl: 'docs-slots-table.css',
    shadow: true,
})
export class DocsSlotsTable {
    @Prop() slots!: JsonDocsSlot[];

    render() {
        if (!this.slots?.length) return null;
        return (
            <Host>
                <h2>{'Slots'}</h2>
                <es-table cells={this.cells} rows={this.slots} />
            </Host>
        );
    }

    private cells: TableCells<JsonDocsSlot> = {
        name: {
            title: 'Name',
        },
        docs: {
            title: 'Description',
            cell: ({ data: { docs } }) => <docs-markdown md={docs} />,
        },
    };
}
