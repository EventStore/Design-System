import { sidebarWidth } from '@eventstore/layout';
import { Component, h } from '@stencil/core';

@Component({
    tag: 'docs-sidebar',
    styleUrl: 'docs-sidebar.css',
    shadow: true,
})
export class Sidebar {
    componentWillLoad() {
        sidebarWidth.set(290);
    }

    disconnectedCallback() {
        sidebarWidth.reset();
    }

    render() {
        return (
            <aside>
                <slot />
            </aside>
        );
    }
}
