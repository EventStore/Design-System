import { Component, h } from '@stencil/core';

@Component({
    tag: 'docs-page-title',
    styleUrl: 'docs-page-title.css',
    shadow: true,
})
export class PageTitle {
    render() {
        return (
            <h1 role="heading" aria-level="1">
                <slot />
            </h1>
        );
    }
}
