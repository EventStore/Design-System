import { h, type FunctionalComponent, Fragment } from '@stencil/core';
import type { TableCells } from '@kurrent-ui/components';
import type { DeclarationReflection } from 'typedoc';
import type { SomeReflection } from 'utils/typedoc/types';

export const InterfaceTable: FunctionalComponent<{
    declaration: DeclarationReflection;
}> = ({ declaration }) => {
    const props = !!declaration.comment?.blockTags?.find(
        (tag) => tag.tag === '@props' || tag.tag === '@options',
    );

    return (
        <c2-table
            rows={expandAndFilterSignatures(declaration.children!)}
            columns={props ? undefined : ['name', 'docs', 'type']}
            cells={cells}
            rowClass={rowClass}
            class={{ props }}
        />
    );
};

const expandAndFilterSignatures = (declarations: DeclarationReflection[]) =>
    declarations

        .flatMap(
            (d) =>
                d.signatures?.map(
                    (s) =>
                        ({
                            ...s,
                            flags: d.flags,
                        }) as SomeReflection,
                ) ?? d,
        )
        .filter(
            (d) =>
                !d.comment?.blockTags?.find(({ tag }) => tag === '@internal'),
        );

const cells: TableCells<DeclarationReflection> = {
    name: {
        title: 'Name',
        cell: (h, { data: { name, comment } }) => (
            <docs-type
                string={name}
                depreciated={
                    !!comment?.blockTags?.find(
                        ({ tag }) => tag === '@depreciated',
                    )
                }
            />
        ),
    },

    docs: {
        title: 'Description',
        cell: (h, { data: { comment } }) => {
            const deprecation = comment?.blockTags?.find(
                ({ tag }) => tag === '@depreciated',
            );

            return (
                <>
                    <docs-markdown
                        class={{
                            depreciated: !!deprecation,
                        }}
                        md={
                            comment?.summary.map(({ text }) => text).join('') ??
                            ''
                        }
                    />
                    {deprecation && (
                        <docs-markdown
                            md={
                                deprecation.content
                                    .map(({ text }) => text)
                                    .join('') ?? ''
                            }
                        />
                    )}
                </>
            );
        },
    },
    type: {
        title: 'Type',
        cell: (h, { data }) => <docs-type declaration={data} />,
        class: 'types',
    },
    extras: {
        title: '',
        cell: (h, { data: { flags } }) => (
            <>
                {!flags.isOptional && (
                    <c2-icon icon={'required'} title={'Required'} />
                )}
            </>
        ),
    },
};

const rowClass = ({ flags }: DeclarationReflection) => ({
    required: !flags.isOptional,
});
