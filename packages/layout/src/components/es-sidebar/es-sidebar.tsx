import { Component, h } from '@stencil/core';

@Component({
    tag: 'es-sidebar',
    styleUrl: 'es-sidebar.css',
    shadow: true,
})
export class Sidebar {
    render() {
        return (
            <aside>
                <slot />
            </aside>
        );
    }
}
