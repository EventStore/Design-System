import { Component, h, Prop, Host, Watch } from '@stencil/core';
import type { JSONOutput } from 'typedoc';

import type { Lib } from 'sitemap';
import { findAllReferences } from 'utils/typedoc/findAllReferences';
import { isVariable } from 'utils/typedoc/reflectionKind';
import { isReferenceType } from 'utils/typedoc/someType';

@Component({
    tag: 'docs-util-docs',
    styleUrl: 'util-docs.css',
    shadow: true,
})
export class DocsPackage {
    @Prop() doc!: JSONOutput.DeclarationReflection;
    @Prop() lib!: Lib;

    private references!: JSONOutput.DeclarationReflection[];

    @Watch('doc')
    componentWillLoad() {
        this.references = findAllReferences(
            this.doc,
            this.lib.typeDocs!.lookup,
        );
    }

    render() {
        const { name, comment, signatures } = this.doc;
        let commentText = comment?.text ?? comment?.shortText;

        if (signatures?.length === 1) {
            commentText =
                commentText ??
                signatures[0].comment?.text ??
                signatures[0].comment?.shortText;
        }

        return (
            <Host>
                <docs-breadcrumb
                    crumbs={[
                        this.lib.crumb,
                        { name: 'Utils', path: './utils' },
                        {
                            name: name,
                            path: `./${name}`,
                        },
                    ]}
                />
                <header>
                    <h1>{name}</h1>
                </header>
                <docs-markdown class={'intro'} md={commentText ?? ''} />

                {Object.entries(this.usage()).map(([uname, usage]) => (
                    <docs-usage
                        key={uname}
                        identifier={`${name}-${uname}`}
                        usage={usage}
                    />
                ))}

                {!(isVariable(this.doc) && isReferenceType(this.doc.type!)) && (
                    <docs-type-documentation declaration={this.doc} />
                )}

                {this.references.map((doc) => (
                    <div key={doc.name} id={doc.name}>
                        <h2>{doc.name}</h2>
                        <docs-markdown
                            class={'intro'}
                            md={
                                doc.comment?.text ??
                                doc.comment?.shortText ??
                                ''
                            }
                        />
                        <docs-type-documentation declaration={doc} />
                    </div>
                ))}
            </Host>
        );
    }

    private usage = (): Record<string, string> =>
        this.doc.comment?.tags?.reduce<Record<string, string>>(
            (acc, { tag, text, param }) => {
                if (tag !== 'usage') return acc;
                return {
                    ...acc,
                    [param ?? this.doc.name]: text,
                };
            },
            {},
        ) ?? {};
}
