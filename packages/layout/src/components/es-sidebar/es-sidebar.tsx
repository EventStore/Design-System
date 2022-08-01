import { Component, h, Element, Build } from '@stencil/core';
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

    componentDidLoad() {
        if (Build.isServer) {
            sidebarWidth.set(this.host.offsetWidth ?? 260);
        }
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
