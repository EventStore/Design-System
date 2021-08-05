import { Component, h, Prop, Fragment, Host } from '@stencil/core';
import { TableCells } from '@eventstore/components';
import { JSONOutput } from 'typedoc';

@Component({
    tag: 'docs-type-table',
    styleUrl: 'docs-type-table.css',
    shadow: true,
})
export class DocsTypeTable {
    @Prop() declaration!: JSONOutput.DeclarationReflection;

    render() {
        return (
            <Host>
                <h2>{this.declaration.name}</h2>
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
                <docs-type
                    string={name}
                    depreciated={
                        !!comment?.tags?.find(
                            ({ tag }) => tag === 'depreciated',
                        )
                    }
                />
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
                        <p
                            class={{
                                description: true,
                                depreciated: !!deprecation,
                            }}
                        >
                            {comment?.text ?? comment?.shortText}
                            {deprecation && <span>{deprecation}</span>}
                        </p>
                    </>
                );
            },
        },
        type: {
            title: 'Type',
            cell: ({ data: { type } }) => <docs-type someType={type} />,
            class: 'types',
        },
        extras: {
            title: '',
            cell: ({ data: { flags } }) => (
                <>
                    {!flags.isOptional && (
                        <es-icon icon={'required'} title={'Required'} />
                    )}
                </>
            ),
        },
    };

    private rowClass = ({ flags }: JSONOutput.DeclarationReflection) => ({
        required: !flags.isOptional,
    });
}
