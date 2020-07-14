import { Component, h } from '@stencil/core';

@Component({
    tag: 'docs-page',
    styleUrl: 'docs-page.css',
})
export class DocsPage {
    render() {
        return <es-page pageTitle={'Hello'}>{'hello!'}</es-page>;
    }
}
