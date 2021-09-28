import { Component, h, Prop, Host, Watch } from '@stencil/core';
import type { JSONOutput } from 'typedoc';

import type { Lib } from 'sitemap';
import { findAllReferences } from 'utils/typedoc/findAllReferences';
import { extractUsage } from 'utils/extractUsage';
import {
    extractAbstract,
    extractBodyText,
    extractFullText,
} from 'utils/extractText';
import { hasTag } from 'utils/typedoc/hasTag';

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
        return (
            <Host>
                <es-breadcrumb
                    crumbs={[
                        this.lib.crumb,
                        {
                            name: 'Functional Components',
                            path: './functional-components',
                        },
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
                <docs-markdown class={'body'} md={extractBodyText(this.doc)} />

                {Object.entries(extractUsage(this.doc)).map(
                    ([uname, usage]) => (
                        <docs-usage
                            key={uname}
                            identifier={`${this.doc.name}-${uname}`}
                            usage={usage}
                        />
                    ),
                )}

                {this.references.map((doc) => (
                    <div key={doc.name} id={doc.name}>
                        <h2>{hasTag(doc, 'props') ? 'Props' : doc.name}</h2>
                        <docs-markdown
                            class={'intro'}
                            md={extractFullText(doc)}
                        />
                        <docs-type-documentation declaration={doc} />
                    </div>
                ))}
            </Host>
        );
    }
}
