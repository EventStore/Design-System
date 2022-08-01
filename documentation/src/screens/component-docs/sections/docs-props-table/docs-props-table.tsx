import { Component, h, Prop, Fragment, Host } from '@stencil/core';
import type { JsonDocsProp } from '@stencil/core/internal';
import type { TableCells } from '@eventstore-ui/components';

@Component({
    tag: 'docs-props-table',
    styleUrl: 'docs-props-table.css',
    shadow: true,
})
export class DocsPropsTable {
    @Prop() props!: JsonDocsProp[];

    render() {
        if (!this.props?.length) return null;

        return (
            <Host>
                <h2>{'Props'}</h2>
                <es-table
                    cells={this.cells}
                    rows={this.props}
                    rowClass={this.rowClass}
                />
            </Host>
        );
    }

    private cells: TableCells<JsonDocsProp> = {
        name: {
            title: 'Name',
            cell: ({ data: { name, deprecation } }) => (
                <pre class={{ depreciated: !!deprecation }}>{name}</pre>
            ),
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
        type: {
            title: 'Type',
            cell: ({ data: { values } }) =>
                values.map(({ type, value }, i, c) => (
                    <>
                        <pre class={type}>{value ?? type}</pre>
                        {i !== c.length - 1 && <span>{'or'}</span>}
                    </>
                )),
            class: 'types',
        },
        default: {
            title: 'Default',
            cell: ({ data: { default: d } }) =>
                d ? (
                    <pre class={d.startsWith("'") ? 'string' : 'default'}>
                        {d.replace(/'/g, '')}
                    </pre>
                ) : null,
        },
        extras: {
            title: '',
            class: 'extras',
            width: 'fit-content(100%)',
            cell: ({ data: { mutable, reflectToAttr, required, attr } }) => (
                <>
                    {required && (
                        <es-icon icon={'required'} title={'Required'} />
                    )}
                    {mutable && <es-icon icon={'mutable'} title={'Mutable'} />}
                    {reflectToAttr && (
                        <es-icon
                            icon={'reflect-to-attr'}
                            title={`Reflects To Attribute: "${attr}"`}
                        />
                    )}
                </>
            ),
        },
    };

    private rowClass = ({ required }: JsonDocsProp) => ({
        required,
    });
}
