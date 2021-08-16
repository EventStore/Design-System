import { Component, h, Prop, Host } from '@stencil/core';
import type { JSONOutput } from 'typedoc';

import type { Lib } from 'sitemap';

@Component({
    tag: 'docs-util-docs',
    styleUrl: 'util-docs.css',
    shadow: true,
})
export class DocsPackage {
    @Prop() doc!: JSONOutput.DeclarationReflection;
    @Prop() lib!: Lib;

    render() {
        const { name, comment } = this.doc;

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
                <docs-markdown
                    class={'intro'}
                    md={comment?.text ?? comment?.shortText ?? ''}
                />
                {Object.entries(this.usage()).map(([uname, usage]) => (
                    <docs-usage
                        key={uname}
                        identifier={`${name}-${uname}`}
                        usage={usage}
                    />
                ))}
                <docs-type-documentation declaration={this.doc} />
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
