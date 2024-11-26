import { Component, h, Prop, Watch } from '@stencil/core';

import { Page } from '@kurrent-ui/layout';

import type { Lib } from 'sitemap';
import { findAllReferences } from 'utils/typedoc/findAllReferences';
import { isVariable } from 'utils/typedoc/reflectionKind';
import { isReferenceType } from 'utils/typedoc/someType';
import { extractUsage } from 'utils/extractUsage';
import { extractText } from 'utils/extractText';
import type { SomeReflection } from 'utils/typedoc/types';

@Component({
    tag: 'docs-util-docs',
    styleUrl: 'util-docs.css',
    shadow: true,
})
export class UtilDocs {
    @Prop() doc!: SomeReflection;
    @Prop() lib!: Lib;

    private references!: SomeReflection[];
    private instanceOf?: SomeReflection;

    @Watch('lib')
    @Watch('doc')
    componentWillLoad() {
        if (!this.doc || !this.lib) return;

        this.instanceOf =
            isVariable(this.doc) && isReferenceType(this.doc.type!)
                ? this.lib.typeDocs!.lookup.get((this.doc.type as any).name)
                : undefined;

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
                    { name: 'Utils', path: './utils' },
                    {
                        name: this.doc.name,
                        path: `./${this.doc.name}`,
                    },
                ]}
            >
                <docs-markdown class={'intro'} md={extractText(this.doc)} />

                {Object.entries(extractUsage(this.doc)).map(
                    ([uname, usage]) => (
                        <docs-usage
                            key={uname}
                            identifier={`${this.doc.name}-${uname}`}
                            usage={usage}
                        />
                    ),
                )}

                <docs-type-documentation
                    declaration={this.instanceOf ?? this.doc}
                />

                {this.references.map((doc) => (
                    <div key={doc.name} id={doc.name}>
                        <h2>{doc.name}</h2>
                        <docs-markdown
                            class={'intro'}
                            md={
                                doc.comment?.summary
                                    .map(({ text }) => text)
                                    .join('') ?? ''
                            }
                        />
                        <docs-type-documentation declaration={doc} />
                    </div>
                ))}
            </Page>
        );
    }
}
