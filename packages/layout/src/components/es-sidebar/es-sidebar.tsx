import { Component, h, Element } from '@stencil/core';
import { sidebarWidth } from '../../utils/LayoutVar';

/**
 * A sidebar. Automatically sets `--layout-sidebar-width` based on it's own width.
 */
@Component({
    tag: 'es-sidebar',
    styleUrl: 'es-sidebar.css',
    shadow: true,
})
export class Sidebar {
    @Element() host!: HTMLEsSidebarElement;

    private resizeObserver = new ResizeObserver((entries) => {
        for (const {
            borderBoxSize: [{ inlineSize }],
        } of entries) {
            sidebarWidth.set(inlineSize);
        }
    });

    componentWillLoad() {
        this.resizeObserver.observe(this.host);
    }

    disconnectedCallback() {
        this.resizeObserver.disconnect();
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
