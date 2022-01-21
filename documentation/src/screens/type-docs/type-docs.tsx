import { Component, h, Prop, Host, Watch } from '@stencil/core';
import type { JSONOutput } from 'typedoc';

import type { Lib } from 'sitemap';
import { findAllReferences } from 'utils/typedoc/findAllReferences';
import { extractAbstract } from 'utils/extractText';
import { extractUsage } from 'utils/extractUsage';

@Component({
    tag: 'docs-type-docs',
    styleUrl: 'type-docs.css',
    shadow: true,
})
export class TypeDocs {
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
        return (
            <Host>
                <es-breadcrumb
                    crumbs={[
                        this.lib.crumb,
                        { name: 'Types', path: './types' },
                        {
                            name: this.doc.name,
                            path: `./${this.doc.name}`,
                        },
                    ]}
                />
                <header>
                    <h1>{this.doc.name}</h1>
                </header>

                <docs-markdown class={'intro'} md={extractAbstract(this.doc)} />

                {Object.entries(extractUsage(this.doc)).map(
                    ([uname, usage]) => (
                        <docs-usage
                            key={uname}
                            identifier={`${this.doc.name}-${uname}`}
                            usage={usage}
                        />
                    ),
                )}

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
