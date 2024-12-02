import { Component, h, Host } from '@stencil/core';

/** Copy */
@Component({
    tag: 'copy-demo',
    styleUrl: './copy-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <c2-copy>
                    {'Click to copy this text to your clipboard.'}
                </c2-copy>
            </Host>
        );
    }
}
