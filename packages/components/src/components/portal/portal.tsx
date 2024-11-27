import {
    Component,
    Prop,
    Element,
    Event,
    type EventEmitter,
    Method,
} from '@stencil/core';
import type { RenderFunction } from '../../types';

/**
 * Portals the passed node to a different part of the document. Note that portal does not transfer shadow scoped styles, unlike `c2-popover`, so any portaled elements should be self contained.
 */
@Component({
    tag: 'c2-portal',
    styleUrl: 'portal.css',
    shadow: true,
})
export class Portal {
    @Element() host!: HTMLElement;

    /** A query selector to select the location to portal to. */
    @Prop() target = 'body';
    /** The element to render. */
    @Prop() renderElement!: RenderFunction;
    /** If the element is portaled or not. */
    @Prop({ reflect: true }) open: boolean = false;
    /** If the portal should overlay a backdrop, to prevent external clicks. */
    @Prop() backdrop: boolean = false;
    /** If the portal should prevent overscroll */
    @Prop() preventOverscroll: boolean = false;

    /** Triggers when the popover requests to close. */
    @Event() requestClose!: EventEmitter;

    private portalledBackdrop?: HTMLC2BackdropElement;

    connectedCallback() {
        if (!this.open) return;
        this.portalledBackdrop?.cancelClose();
        this.attachElement();
    }

    disconnectedCallback() {
        if (!this.open) return;
        this.detatchElement();
    }

    /** @internal */
    @Method() async attachElement() {
        const target = document.querySelector(this.target);

        if (!target) return;

        if (!this.portalledBackdrop) {
            const backdrop = document.createElement('c2-backdrop');
            backdrop.showBackdrop = this.backdrop;
            backdrop.preventOverscroll = this.preventOverscroll;
            const zIndexBase = getComputedStyle(this.host).getPropertyValue(
                '--zindex-base',
            );
            backdrop.style.setProperty('--zindex-base', zIndexBase);
            backdrop.style.opacity = '0';

            target.appendChild(backdrop);

            backdrop.addEventListener('requestClose', this.bubbleRequestClose);
            this.portalledBackdrop = backdrop;
        }

        this.portalledBackdrop.renderNode(this.renderElement);
    }

    /** @internal */
    @Method() async detatchElement() {
        if (!this.portalledBackdrop) return;
        const backdrop = this.portalledBackdrop;
        if (await backdrop.close()) {
            backdrop.parentNode?.removeChild(backdrop);
            this.portalledBackdrop = undefined;
        }
    }

    render() {
        if (this.open) {
            this.attachElement();
        } else {
            this.detatchElement();
        }
    }

    private bubbleRequestClose = (e: any) => {
        this.requestClose.emit(e);
    };
}
