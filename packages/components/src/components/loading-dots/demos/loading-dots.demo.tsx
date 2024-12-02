import { Component, h, Host } from '@stencil/core';

/**
 * Loading Dots
 * @group Loading
 */
@Component({
    tag: 'loading-dots-demo',
    styleUrl: './loading-dots-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <c2-loading-dots />
            </Host>
        );
    }
}
