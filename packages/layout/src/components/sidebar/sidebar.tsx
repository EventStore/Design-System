import { Component, h, Element, Build, Host } from '@stencil/core';
import { sidebarWidth } from '../../utils/LayoutVar';

/**
 * A sidebar. Automatically sets `--layout-sidebar-width` based on it's own width.
 * @slot after - After the aside.
 * @part aside - The internal aside.
 */
@Component({
    tag: 'l2-sidebar',
    styleUrl: 'sidebar.css',
    shadow: true,
})
export class Sidebar {
    @Element() host!: HTMLL2SidebarElement;

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
            <Host>
                <aside part={'aside'}>
                    <slot />
                </aside>
                <slot name={'after'} />
            </Host>
        );
    }
}
