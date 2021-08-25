import { Component, h, Prop, Host, Watch } from '@stencil/core';
import type { JSONOutput } from 'typedoc';

import type { Lib } from 'sitemap';
import { findAllReferences } from 'utils/typedoc/findAllReferences';
import { extractUsage } from 'utils/extractUsage';

@Component({
    tag: 'docs-functional-component-docs',
    styleUrl: 'functional-component-docs.css',
    shadow: true,
})
export class FunctionalComponentDocs {
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
                        {
                            name: 'Functional Components',
                            path: './functional-components',
                        },
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

                {Object.entries(extractUsage(this.doc)).map(
                    ([uname, usage]) => (
                        <docs-usage
                            key={uname}
                            identifier={`${name}-${uname}`}
                            usage={usage}
                        />
                    ),
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
}
