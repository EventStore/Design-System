import { Component, h, Prop } from '@stencil/core';
import { Host, JsonDocs } from '@stencil/core/internal';

@Component({
    tag: 'docs-component-docs',
    styleUrl: 'component-docs.css',
    shadow: true,
})
export class DocsPackage {
    @Prop() comp!: JsonDocs['components'][0];

    render() {
        return (
            <Host>
                <docs-breadcrumb
                    crumbs={[
                        { name: 'Components', path: '/components' },
                        {
                            name: this.comp.tag,
                            path: `./${this.comp.tag}`,
                        },
                    ]}
                />
                <h1>{this.comp.tag}</h1>
            </Host>
        );
    }
}
