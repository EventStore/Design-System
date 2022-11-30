import {
    Component,
    Prop,
    Element,
    Event,
    EventEmitter,
    Method,
    VNode,
} from '@stencil/core';

/**
 * Portals the passed node to a different part of the document. Note that portal does not transfer shadow scoped styles, unlike `es-popover`, so any portaled elements should be self contained.
 */
@Component({
    tag: 'es-portal',
    styleUrl: 'es-portal.css',
    shadow: true,
})
export class Portal {
    @Element() host!: HTMLElement;

    /** A query selector to select the location to portal to. */
    @Prop() target = 'body';
    /** The element to render. */
    @Prop() element!: VNode;
    /** If the element is portaled or not. */
    @Prop({ reflect: true }) open: boolean = false;
    /** If the portal should overlay a backdrop, to prevent external clicks. */
    @Prop() backdrop: boolean = false;
    /** If the portal should prevent overscroll */
    @Prop() preventOverscroll: boolean = false;

    /** Triggers when the popover requests to close. */
    @Event() requestClose!: EventEmitter;

    private portalledBackdrop?: HTMLEsBackdropElement;

    connectedCallback() {
        if (this.open) {
            this.attachElement();
        }
    }

    disconnectedCallback() {
        if (this.open) {
            this.detatchElement();
        }
    }

    /** @internal */
    @Method() async attachElement() {
        const target = document.querySelector(this.target);

        if (!target) return;

        if (!this.portalledBackdrop) {
            const backdrop = document.createElement('es-backdrop');
            backdrop.showBackdrop = this.backdrop;
            backdrop.preventOverscroll = this.preventOverscroll;
            backdrop.style.opacity = '0';

            target.appendChild(backdrop);

            backdrop.addEventListener('requestClose', this.bubbleRequestClose);
            this.portalledBackdrop = backdrop;
        }

        this.portalledBackdrop.renderNode(this.element);
    }

    /** @internal */
    @Method() async detatchElement() {
        if (!this.portalledBackdrop) return;
        const backdrop = this.portalledBackdrop;
        this.portalledBackdrop = undefined;
        await backdrop.close();
        backdrop.parentNode?.removeChild(backdrop);
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
