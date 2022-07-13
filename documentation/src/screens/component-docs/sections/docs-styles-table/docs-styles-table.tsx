import { Component, h, Prop } from '@stencil/core';
import { Host, JsonDocsStyle } from '@stencil/core/internal';
import type { TableCells } from '@eventstore-ui/components';

@Component({
    tag: 'docs-styles-table',
    styleUrl: 'docs-styles-table.css',
    shadow: true,
})
export class DocsPropsTable {
    @Prop() styles!: JsonDocsStyle[];

    render() {
        if (!this.styles.length) return null;
        return (
            <Host>
                <h2>{'CSS Variables'}</h2>
                <es-table cells={this.cells} rows={this.styles} />
            </Host>
        );
    }

    private cells: TableCells<JsonDocsStyle> = {
        name: {
            title: 'Name',
        },
        docs: {
            title: 'Description',
            cell: ({ data: { docs } }) => <docs-markdown md={docs} />,
        },
    };
}
