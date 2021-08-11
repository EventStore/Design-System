import { Component, h, Prop, Fragment } from '@stencil/core';
import { Host, JsonDocsMethod } from '@stencil/core/internal';
import { TableCells } from '@eventstore/components';

@Component({
    tag: 'docs-methods-table',
    styleUrl: 'docs-methods-table.css',
    shadow: true,
})
export class DocsMethodsTable {
    @Prop() methods!: JsonDocsMethod[];

    render() {
        if (!this.methods.length) return null;
        return (
            <Host>
                <h2>{'Methods'}</h2>
                <es-table cells={this.cells} rows={this.methods} />
            </Host>
        );
    }

    private cells: TableCells<JsonDocsMethod> = {
        name: {
            title: 'Name',
            cell: ({ data: { name, deprecation } }) => (
                <pre class={{ depreciated: !!deprecation }}>{name}</pre>
            ),
        },
        signature: {
            title: 'Signature',
            cell: ({ data: { signature } }) => <pre>{signature}</pre>,
        },
        docs: {
            title: 'Description',
            cell: ({ data: { docs, deprecation } }) => (
                <>
                    <docs-markdown
                        class={{ depreciated: !!deprecation }}
                        md={docs}
                    />
                    {deprecation && <docs-markdown md={deprecation} />}
                </>
            ),
        },
    };
}
