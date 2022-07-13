import { Component, h, Prop, Watch } from '@stencil/core';

import { Page } from '@eventstore-ui/layout';

import type { Lib } from 'sitemap';
import { findAllReferences } from 'utils/typedoc/findAllReferences';
import { extractUsage } from 'utils/extractUsage';
import {
    extractAbstract,
    extractBodyText,
    extractFullText,
} from 'utils/extractText';
import { hasTag } from 'utils/typedoc/hasTag';
import type { SomeReflection } from 'utils/typedoc/types';

@Component({
    tag: 'docs-functional-component-docs',
    styleUrl: 'functional-component-docs.css',
    shadow: true,
})
export class FunctionalComponentDocs {
    @Prop() doc!: SomeReflection;
    @Prop() lib!: Lib;

    private references!: SomeReflection[];

    @Watch('doc')
    componentWillLoad() {
        this.references = findAllReferences(
            this.doc,
            this.lib.typeDocs!.lookup,
        );
    }

    render() {
        return (
            <Page
                pageTitle={this.doc.name}
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
            >
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
            </Page>
        );
    }
}
