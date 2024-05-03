import { Component, h, Host, Watch, Element, Prop } from '@stencil/core';

import {
    bannerHeight,
    cookieHeight,
    panelHeight,
    sidebarWidth,
    toolbarWidth,
} from '../../../utils/LayoutVar';
import type { TargetableArea, TargetableEdge } from '../types';

/**
 * A panel that takes the size of it's content.
 * Automatically sets the relevant layout var based on it's size.
 */
@Component({
    tag: 'es-sized-panel',
    styleUrl: 'es-sized-panel.css',
    shadow: true,
})
export class SizedPanel {
    @Element() host!: HTMLEsSizedPanelElement;

    /** Where to place the panel. */
    @Prop({ reflect: true }) area: TargetableArea = 'panel';
    /**
     * Where to start the panel, inclusive.
     * Must be the opposite axis to the area.
     */
    @Prop({ reflect: true }) start?: TargetableEdge;
    /**
     * Where to end the panel, inclusive.
     * Must be the opposite axis to the area.
     */
    @Prop({ reflect: true }) end?: TargetableEdge;

    private resizeObserver = new ResizeObserver((entries) => {
        for (const {
            borderBoxSize: [size],
        } of entries) {
            this.setSize(size);
        }
    });

    componentWillLoad() {
        this.resizeObserver.observe(this.host);
    }

    disconnectedCallback() {
        this.resizeObserver.disconnect();
        this.cssVar.reset();
    }

    @Watch('area')
    reInit(_next: TargetableArea, prev: TargetableArea) {
        this.getCssVar(prev).reset();
    }

    render() {
        return (
            <Host>
                <slot />
            </Host>
        );
    }

    private setSize = ({ inlineSize, blockSize }: ResizeObserverSize) => {
        switch (this.area) {
            case 'panel':
            case 'cookie':
            case 'banner': {
                this.cssVar.set(blockSize);
                break;
            }
            case 'sidebar':
            case 'toolbar': {
                this.cssVar.set(inlineSize);
                break;
            }
        }
    };

    get cssVar() {
        return this.getCssVar(this.area);
    }

    private getCssVar = (area: TargetableArea) => {
        switch (area) {
            case 'panel':
                return panelHeight;
            case 'cookie':
                return cookieHeight;
            case 'banner':
                return bannerHeight;
            case 'sidebar':
                return sidebarWidth;
            case 'toolbar':
                return toolbarWidth;
        }
    };
}
