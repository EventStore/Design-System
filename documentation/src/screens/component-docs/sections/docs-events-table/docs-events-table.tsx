import { Component, h, Prop, Fragment } from '@stencil/core';
import { Host, JsonDocsEvent } from '@stencil/core/internal';
import { TableCells } from '@eventstore/components';

@Component({
    tag: 'docs-events-table',
    styleUrl: 'docs-events-table.css',
    shadow: true,
})
export class DocsEventsTable {
    @Prop() events!: JsonDocsEvent[];

    render() {
        if (!this.events.length) return null;
        return (
            <Host>
                <h2>{'Events'}</h2>
                <es-table cells={this.cells} rows={this.events} />
            </Host>
        );
    }

    private cells: TableCells<JsonDocsEvent> = {
        name: {
            title: 'Event',
            cell: ({ data: { event, deprecation } }) => (
                <pre class={{ depreciated: !!deprecation }}>{event}</pre>
            ),
        },
        detail: {
            title: 'Detail',
            cell: ({ data: { detail } }) => <pre>{detail}</pre>,
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
        extras: {
            title: '',
            class: 'extras',
            width: 'fit-content(100%)',
            cell: ({ data: { bubbles, cancelable, composed } }) => (
                <>
                    {bubbles && <es-icon icon={'bubbles'} title={'Bubbles'} />}
                    {cancelable && (
                        <es-icon icon={'cancelable'} title={'Cancelable'} />
                    )}
                    {composed && (
                        <es-icon icon={'composed'} title={'Composed'} />
                    )}
                </>
            ),
        },
    };
}
