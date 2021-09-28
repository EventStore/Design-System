import { Component, h, Prop, Host, Watch } from '@stencil/core';
import type { JSONOutput } from 'typedoc';

import type { Lib } from 'sitemap';
import { findAllReferences } from 'utils/typedoc/findAllReferences';
import { isVariable } from 'utils/typedoc/reflectionKind';
import { isReferenceType } from 'utils/typedoc/someType';
import { extractUsage } from 'utils/extractUsage';
import { extractAbstract, extractBodyText } from 'utils/extractText';

@Component({
    tag: 'docs-util-docs',
    styleUrl: 'util-docs.css',
    shadow: true,
})
export class UtilDocs {
    @Prop() doc!: JSONOutput.DeclarationReflection;
    @Prop() lib!: Lib;

    private references!: JSONOutput.DeclarationReflection[];
    private instanceOf?: JSONOutput.DeclarationReflection;

    @Watch('doc')
    componentWillLoad() {
        const isInstance =
            isVariable(this.doc) && isReferenceType(this.doc.type!);

        this.instanceOf = isInstance
            ? this.lib.typeDocs!.lookup.get((this.doc.type as any).name)
            : undefined;

        this.references = findAllReferences(
            this.instanceOf ?? this.doc,
            this.lib.typeDocs!.lookup,
        );
    }

    render() {
        return (
            <Host>
                <es-breadcrumb
                    crumbs={[
                        this.lib.crumb,
                        { name: 'Utils', path: './utils' },
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

                <docs-type-documentation
                    declaration={this.instanceOf ?? this.doc}
                />

                <docs-markdown class={'body'} md={extractBodyText(this.doc)} />

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
