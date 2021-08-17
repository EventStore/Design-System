import { Component, h, Prop, Host, Watch } from '@stencil/core';
import type { JSONOutput } from 'typedoc';

import type { Lib } from 'sitemap';
import { findAllReferences } from 'utils/typedoc/findAllReferences';

@Component({
    tag: 'docs-type-docs',
    styleUrl: 'type-docs.css',
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
        const { name, comment } = this.doc;

        return (
            <Host>
                <docs-breadcrumb
                    crumbs={[
                        this.lib.crumb,
                        { name: 'Types', path: './types' },
                        {
                            name: name,
                            path: `./${name}`,
                        },
                    ]}
                />
                <header>
                    <h1>{name}</h1>
                </header>
                <docs-markdown
                    class={'intro'}
                    md={comment?.text ?? comment?.shortText ?? ''}
                />

                <docs-type-documentation declaration={this.doc} />

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
