import { Component, h, Host } from '@stencil/core';

/**
 * Standard page title
 */
@Component({
    tag: 'l2-page-title',
    styleUrl: 'page-title.css',
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
