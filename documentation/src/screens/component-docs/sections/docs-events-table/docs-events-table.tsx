import { Component, h, Prop, Fragment } from '@stencil/core';
import { Host, type JsonDocsEvent } from '@stencil/core/internal';
import type { TableCells } from '@kurrent-ui/components';

@Component({
    tag: 'docs-events-table',
    styleUrl: 'docs-events-table.css',
    shadow: true,
})
export class DocsEventsTable {
    @Prop() events!: JsonDocsEvent[];

    render() {
        if (!this.events?.length) return null;
        return (
            <Host>
                <h2>{'Events'}</h2>
                <c2-table cells={this.cells} rows={this.events} />
            </Host>
        );
    }

    private cells: TableCells<JsonDocsEvent> = {
        name: {
            title: 'Event',
            cell: (h, { data: { event, deprecation } }) => (
                <pre class={{ depreciated: !!deprecation }}>{event}</pre>
            ),
        },
        detail: {
            title: 'Detail',
            cell: (h, { data: { detail } }) => <pre>{detail}</pre>,
        },
        docs: {
            title: 'Description',
            cell: (h, { data: { docs, deprecation } }) => (
                <>
                    <docs-markdown
                        class={{ depreciated: !!deprecation }}
                        md={docs}
                    />
                    {deprecation && <docs-markdown md={deprecation} />}
                </>
            ),
        },
        extras: {
            title: '',
            class: 'extras',
            width: 'fit-content(100%)',
            cell: (h, { data: { bubbles, cancelable, composed } }) => (
                <>
                    {bubbles && <c2-icon icon={'bubbles'} title={'Bubbles'} />}
                    {cancelable && (
                        <c2-icon icon={'cancelable'} title={'Cancelable'} />
                    )}
                    {composed && (
                        <c2-icon icon={'composed'} title={'Composed'} />
                    )}
                </>
            ),
        },
    };
}
