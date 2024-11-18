import { Component, h, Host } from '@stencil/core';

/**
 * Loading Dots
 * @group Loading
 */
@Component({
    tag: 'es-loading-dots-demo',
    styleUrl: './loading-dots-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <es-loading-dots />
            </Host>
        );
    }
}
