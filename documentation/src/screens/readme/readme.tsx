import { Component, h, Prop } from '@stencil/core';
import { Page } from '@eventstore-ui/layout';
import type { Lib } from 'sitemap';

@Component({
    tag: 'docs-readme',
    styleUrl: 'readme.css',
    shadow: true,
})
export class UtilDocs {
    @Prop() lib!: Lib;

    render() {
        return (
            <Page pageTitle={this.lib.title} headerTitle={false}>
                <docs-markdown md={this.lib.readme} />
            </Page>
        );
    }
}
