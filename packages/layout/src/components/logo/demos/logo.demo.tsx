import { Component, h, Host } from '@stencil/core';

/**
 * Logo
 */
@Component({
    tag: 'logo-demo',
    styleUrl: 'logo-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <l2-logo />
                <l2-logo mode={'icon'} width={40} height={40} />
            </Host>
        );
    }
}
