import { Component, h } from '@stencil/core';

@Component({
    tag: 'docs-sidebar',
    styleUrl: 'docs-sidebar.css',
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
