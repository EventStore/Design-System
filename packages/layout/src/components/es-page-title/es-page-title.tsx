import { Component, h } from '@stencil/core';

@Component({
    tag: 'es-page-title',
    styleUrl: 'es-page-title.css',
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
