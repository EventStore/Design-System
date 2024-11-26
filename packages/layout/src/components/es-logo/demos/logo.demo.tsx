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
                <es-logo />
                <es-logo mode={'icon'} width={40} height={40} />
            </Host>
        );
    }
}
