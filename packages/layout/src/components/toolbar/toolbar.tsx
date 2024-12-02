import { Component, h, Element } from '@stencil/core';
import { toolbarWidth } from '../../utils/LayoutVar';

/**
 * Placed in the toolbar area of the layout. Automatically sets `--layout-toolbar-width` based on it's own width.
 */
@Component({
    tag: 'l2-toolbar',
    styleUrl: 'toolbar.css',
    shadow: true,
})
export class Toolbar {
    @Element() host!: HTMLL2ToolbarElement;

    private resizeObserver = new ResizeObserver((entries) => {
        for (const {
            borderBoxSize: [{ inlineSize }],
        } of entries) {
            toolbarWidth.set(inlineSize);
        }
    });

    componentWillLoad() {
        this.resizeObserver.observe(this.host);
    }

    disconnectedCallback() {
        this.resizeObserver.disconnect();
        toolbarWidth.reset();
    }

    render() {
        return <slot />;
    }
}
