import { Component, h } from '@stencil/core';

/**
 * A container for `es-aciton-*` elements, to be used in tables or panel headers.
 */
@Component({
    tag: 'es-actions',
    styleUrl: 'es-actions.css',
    shadow: true,
})
export class ESActions {
    render() {
        return <slot />;
    }
}
