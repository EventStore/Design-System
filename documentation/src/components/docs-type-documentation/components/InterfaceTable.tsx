import { h, FunctionalComponent, Fragment } from '@stencil/core';
import { TableCells } from '@eventstore/components';
import { JSONOutput } from 'typedoc';

export const InterfaceTable: FunctionalComponent<{
    declaration: JSONOutput.DeclarationReflection;
}> = ({ declaration }) => (
    <es-table
        rows={expandSignatures(declaration.children!)}
        cells={cells}
        rowClass={rowClass}
    />
);

const expandSignatures = (declarations: JSONOutput.DeclarationReflection[]) =>
    declarations.flatMap(
        (d) => d.signatures?.map((s) => ({ ...s, flags: d.flags })) ?? d,
    );

const cells: TableCells<JSONOutput.DeclarationReflection> = {
    name: {
        title: 'Name',
        cell: ({ data: { name, comment } }) => (
            <docs-type
                string={name}
                depreciated={
                    !!comment?.tags?.find(({ tag }) => tag === 'depreciated')
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
                    <docs-markdown
                        class={{
                            depreciated: !!deprecation,
                        }}
                        md={comment?.text ?? comment?.shortText ?? ''}
                    />
                    {deprecation && (
                        <docs-markdown md={deprecation.text ?? ''} />
                    )}
                </>
            );
        },
    },
    type: {
        title: 'Type',
        cell: ({ data }) => <docs-type declaration={data} />,
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

const rowClass = ({ flags }: JSONOutput.DeclarationReflection) => ({
    required: !flags.isOptional,
});
