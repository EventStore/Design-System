import { Component, h, Host, Element } from '@stencil/core';
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
        for (const { contentRect } of entries) {
            sidebarWidth.set(contentRect.width);
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
            <Host>
                <aside>
                    <slot />
                </aside>
            </Host>
        );
    }
}
