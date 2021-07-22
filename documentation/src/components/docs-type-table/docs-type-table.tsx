import { Component, h, Prop, Fragment, Host } from '@stencil/core';
import { JsonDocsProp } from '@stencil/core/internal';
import { TableCells } from '@eventstore/components';
import { JSONOutput } from 'typedoc';
import { displaySomeType } from 'utils/someType';

@Component({
    tag: 'docs-type-table',
    styleUrl: 'docs-type-table.css',
    shadow: true,
})
export class DocsTypeTable {
    @Prop() declaration!: JSONOutput.DeclarationReflection;

    render() {
        console.log(this.declaration);
        return (
            <Host>
                <h2>
                    <pre>{this.declaration.name}</pre>
                </h2>
                {this.declaration.comment?.text && (
                    <p>{this.declaration.comment.text}</p>
                )}
                {this.declaration.children && (
                    <es-table
                        cells={this.cells}
                        rows={this.declaration.children}
                        rowClass={this.rowClass}
                    />
                )}
            </Host>
        );
    }

    private cells: TableCells<JSONOutput.DeclarationReflection> = {
        name: {
            title: 'Name',
            cell: ({ data: { name, comment } }) => (
                <pre
                    class={{
                        depreciated: !!comment?.tags?.find(
                            ({ tag }) => tag === 'depreciated',
                        ),
                    }}
                >
                    {name}
                </pre>
            ),
        },

        docs: {
            title: 'Description',
            cell: ({ data: { comment } }) => {
                const deprecation = comment?.tags?.find(
                    ({ tag }) => tag === 'depreciated',
                );

                return (
                    <>
                        <span
                            class={{
                                depreciated: !!deprecation,
                            }}
                        >
                            {comment?.text ?? comment?.shortText}
                        </span>
                        {deprecation && <span>{deprecation}</span>}
                    </>
                );
            },
        },
        type: {
            title: 'Type',
            cell: ({ data: { type } }) => <pre>{displaySomeType(type)}</pre>,
            class: 'types',
        },
        default: {
            title: 'Default',
            cell: ({ data: { defaultValue: d } }) =>
                d && d !== '...' ? (
                    <pre class={d.startsWith("'") ? 'string' : 'default'}>
                        {d.replace(/'/g, '')}
                    </pre>
                ) : null,
        },
    };

    private rowClass = ({ required }: JsonDocsProp) => ({
        required,
    });
}
