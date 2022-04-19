import { Component, h, Host } from '@stencil/core';

import { standardStore } from 'stores/standardStore/standardStore';

@Component({
    tag: 'data-demo-app',
    styleUrl: 'data-demo-app.css',
    shadow: true,
})
export class DataDemoApp {
    render() {
        // eslint-disable-next-line no-console
        console.log('render data demo render');

        return (
            <Host>
                <div>
                    <p>Hello {standardStore.foo}</p>
                    <p>{standardStore.bar ? 'Yeah' : 'Nope'}</p>
                </div>
                <standard-store-form />
                <item-list />
            </Host>
        );
    }
}
