import { Component, h, Host } from '@stencil/core';

/** Copy */
@Component({
    tag: 'es-copy-demo',
    styleUrl: './copy-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <es-copy>
                    {'Click to copy this text to your clipboard.'}
                </es-copy>
            </Host>
        );
    }
}
