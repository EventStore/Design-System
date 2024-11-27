import { Component, h } from '@stencil/core';

/**
 * A container for `c2-action-*` elements, to be used in tables or panel headers.
 */
@Component({
    tag: 'c2-actions',
    styleUrl: 'actions.css',
    shadow: true,
})
export class ESActions {
    render() {
        return <slot />;
    }
}
