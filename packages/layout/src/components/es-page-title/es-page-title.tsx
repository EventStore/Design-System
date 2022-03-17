import { Component, h, Host } from '@stencil/core';

/**
 * Standard page title
 */
@Component({
    tag: 'es-page-title',
    styleUrl: 'es-page-title.css',
    shadow: true,
})
export class PageTitle {
    render() {
        return (
            <Host role={'heading'} aria-level={'1'}>
                <slot />
            </Host>
        );
    }
}
