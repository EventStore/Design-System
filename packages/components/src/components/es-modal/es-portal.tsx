import {
    Component,
    Prop,
    Element,
    Event,
    EventEmitter,
    Method,
    VNode,
} from '@stencil/core';

@Component({
    tag: 'es-portal',
    styleUrl: 'es-portal.css',
    shadow: true,
})
export class Portal {
    @Element() host!: HTMLElement;

    @Prop() target = 'body';
    @Prop() element!: VNode;
    @Prop({ reflect: true }) open: boolean = false;
    @Prop() backdrop: boolean = false;

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

    @Method() async attachElement() {
        const target = document.querySelector(this.target);

        if (!target) return;

        if (!this.portalledBackdrop) {
            const backdrop = document.createElement('es-backdrop');
            backdrop.setAttribute('show-backdrop', `${this.backdrop}`);
            backdrop.style.opacity = '0';

            target.appendChild(backdrop);

            backdrop.addEventListener('requestClose', this.bubbleRequestClose);
            this.portalledBackdrop = backdrop;
        }

        this.portalledBackdrop.renderNode(this.element);
    }

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
