import { Component, h, Host } from '@stencil/core';

/** @internal */
@Component({
    tag: 'c2-popper-inner',
    styleUrl: 'popper-inner.css',
    shadow: true,
})
export class Popper {
    render() {
        return <Host />;
    }
}
