import { Component, h } from '@stencil/core';

@Component({
    tag: 'esd-root',
    styleUrl: 'esd-root.css',
    shadow: true,
})
export class EsdRoot {
    render() {
        return (
            <div>
                <p>Hello EsdRoot!</p>
            </div>
        );
    }
}
