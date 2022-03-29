import { Component, h, Host } from '@stencil/core';

/** @internal */
@Component({
    tag: 'es-popper-inner',
    styleUrl: 'es-popper-inner.css',
    shadow: true,
})
export class Popper {
    render() {
        return <Host />;
    }
}
