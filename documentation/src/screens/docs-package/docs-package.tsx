import { Component, h, Prop } from '@stencil/core';
import type { JsonDocs } from '@stencil/core/internal';

@Component({
    tag: 'docs-package',
    styleUrl: 'docs-package.css',
    shadow: true,
})
export class DocsPackage {
    @Prop() packageTitle!: string;
    @Prop() packageName!: string;
    @Prop() slug!: string;
    @Prop() path!: string;
    @Prop() docs?: JsonDocs;

    render() {
        return (
            <div>
                <p>Hello {this.packageTitle}</p>
            </div>
        );
    }
}
