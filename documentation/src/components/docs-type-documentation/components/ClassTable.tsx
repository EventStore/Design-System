import { h, FunctionalComponent, Fragment } from '@stencil/core';
import { TableCells } from '@eventstore/components';
import { JSONOutput } from 'typedoc';

export const ClassTable: FunctionalComponent<{
    declaration: JSONOutput.DeclarationReflection;
}> = ({ declaration }) => {
    const props = !!declaration.comment?.tags?.find(
        (tag) => tag.tag === 'props' || tag.tag === 'options',
    );

    return (
        <es-table
            rows={expandAndFilterSignatures(declaration.children!)}
            columns={props ? undefined : ['name', 'docs', 'type']}
            cells={cells}
            rowClass={rowClass}
            class={{ props }}
        />
    );
};

const expandAndFilterSignatures = (
    declarations: JSONOutput.DeclarationReflection[],
) =>
    declarations
        .filter((d) => !d.flags.isExternal && !d.flags.isPrivate)
        .flatMap(
            (d) => d.signatures?.map((s) => ({ ...s, flags: d.flags })) ?? d,
        )
        .filter((d) => !d.comment?.tags?.find(({ tag }) => tag === 'internal'));

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
