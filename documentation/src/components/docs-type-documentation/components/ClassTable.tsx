import { h, FunctionalComponent, Fragment } from '@stencil/core';
import type { TableCells } from '@eventstore/components';
import type { DeclarationReflection } from 'typedoc';
import type { SomeReflection } from 'utils/typedoc/types';

export const ClassTable: FunctionalComponent<{
    declaration: DeclarationReflection;
}> = ({ declaration }) => {
    const props = !!declaration.comment?.tags?.find(
        (tag) => tag.tagName === 'props' || tag.tagName === 'options',
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

const expandAndFilterSignatures = (declarations: SomeReflection[]) =>
    declarations
        .filter((d) => !d.flags.isExternal && !d.flags.isPrivate)
        .flatMap(
            (d) =>
                (d as DeclarationReflection).signatures?.map(
                    (s) =>
                        ({
                            ...s,
                            flags: d.flags,
                        } as SomeReflection),
                ) ?? d,
        )
        .filter(
            (d) =>
                !d.comment?.tags?.find(({ tagName }) => tagName === 'internal'),
        );

const cells: TableCells<DeclarationReflection> = {
    name: {
        title: 'Name',
        cell: ({ data: { name, comment } }) => (
            <docs-type
                string={name}
                depreciated={
                    !!comment?.tags?.find(
                        ({ tagName }) => tagName === 'depreciated',
                    )
                }
            />
        ),
    },

    docs: {
        title: 'Description',
        cell: ({ data: { comment } }) => {
            const deprecation = comment?.tags?.find(
                ({ tagName }) => tagName === 'depreciated',
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

const rowClass = ({ flags }: DeclarationReflection) => ({
    required: !flags.isOptional,
});
