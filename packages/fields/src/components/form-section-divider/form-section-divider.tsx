import { h, Component } from '@stencil/core';

/**
 * A horizontal rule for dividing form sections
 * Can optionally have a title slotted
 */
@Component({
    tag: 'f2-form-section-divider',
    styleUrl: 'form-section-divider.css',
    shadow: true,
})
export class Hr {
    render() {
        return <slot />;
    }
}
