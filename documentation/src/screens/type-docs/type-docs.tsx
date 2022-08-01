import { Component, h, Prop, Watch } from '@stencil/core';

import { Page } from '@eventstore-ui/layout';

import type { Lib } from 'sitemap';
import { findAllReferences } from 'utils/typedoc/findAllReferences';
import { extractAbstract } from 'utils/extractText';
import { extractUsage } from 'utils/extractUsage';
import type { SomeReflection } from 'utils/typedoc/types';

@Component({
    tag: 'docs-type-docs',
    styleUrl: 'type-docs.css',
    shadow: true,
})
export class TypeDocs {
    @Prop() doc!: SomeReflection;
    @Prop() lib!: Lib;

    private references!: SomeReflection[];

    @Watch('lib')
    @Watch('doc')
    componentWillLoad() {
        if (!this.doc || !this.lib) return;
        this.references = findAllReferences(
            this.doc,
            this.lib.typeDocs!.lookup,
        );
    }

    render() {
        if (!this.doc || !this.lib) return null;

        return (
            <Page
                pageTitle={this.doc.name}
                crumbs={[
                    this.lib.crumb,
                    { name: 'Types', path: './types' },
                    {
                        name: this.doc.name,
                        path: `./${this.doc.name}`,
                    },
                ]}
            >
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
            </Page>
        );
    }
}
