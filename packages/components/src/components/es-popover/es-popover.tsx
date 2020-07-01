import {
    Component,
    Prop,
    h,
    Watch,
    Element,
    Event,
    EventEmitter,
} from '@stencil/core';
import { calcPosition } from '../../utils/calcPosition';

@Component({
    tag: 'es-popover',
    styleUrl: 'es-popover.css',
    shadow: true,
})
export class Popover {
    @Element() host!: HTMLElement;

    @Prop() popperClass?: string;
    @Prop() target = 'body';
    @Prop({ reflect: true }) open: boolean = false;
    @Prop() backdrop: boolean = false;

    @Prop() positionY: string = 'top';
    @Prop() positionX: string = 'middle';
    @Prop() attachmentY: string = 'bottom';
    @Prop() attachmentX: string = 'middle';
    @Prop() offsetY: number = 0;
    @Prop() offsetX: number = 0;

    @Event() requestClose!: EventEmitter;

    private assigedNodes: Node[] = [];
    private portalledNodes: Node[] = [];
    private popper?: HTMLEsPopperElement;
    private popperShadow?: HTMLEsPopperInnerElement;
    private popperInner?: HTMLDivElement;

    connectedCallback() {
        this.assigedNodes = Array.from(this.host.childNodes);

        if (this.open) {
            this.attachPopper();
        }
    }

    disconnectedCallback() {
        if (this.open) {
            this.closePopper();
        }
    }

    @Watch('popperClass') setPopperClass(
        popperClass?: string,
        previousClass?: string,
    ) {
        if (!this.popperInner) return;

        if (previousClass) {
            this.popperInner.classList.remove(previousClass);
        }

        if (popperClass) {
            this.popperInner.classList.add(popperClass);
        }
    }

    @Watch('open') togglePopover(isOpen: boolean) {
        if (isOpen) {
            this.attachPopper();
        } else {
            this.closePopper();
        }
    }

    render() {
        return <slot onSlotchange={this.slotChange} />;
    }

    private slotChange = (e: Event) => {
        const slot = e.target as HTMLSlotElement;
        this.assigedNodes = slot.assignedNodes();
    };

    private adoptStyleRules = ({
        from,
        to,
    }: {
        from: StyleSheetList;
        to: CSSStyleSheet;
    }) => {
        if (!from || !to) return;
        for (const sheet of Array.from(from)) {
            const rules = (sheet as CSSStyleSheet).cssRules;

            for (let i = 0; i < rules.length; i++) {
                const rule = rules.item(i) as CSSStyleRule;
                if (rule.selectorText !== ':host') {
                    to.insertRule(rule.cssText, to.cssRules.length);
                }
            }
        }
    };

    private attachPopper = () => {
        const target = document.querySelector(this.target);

        if (!target) return;

        const parentShadow = this.host.parentNode?.getRootNode() as ShadowRoot;
        const popper = document.createElement('es-popper');
        const shadowStyle = document.createElement('style');
        const popperShadow = document.createElement('es-popper-inner');
        const popperInner = document.createElement('div');

        popper.style.opacity = '0';
        popper.setAttribute('backdrop', `${this.backdrop}`);
        popperInner.classList.add('inner');

        if (this.popperClass) {
            popperInner.classList.add(this.popperClass);
        }

        target.appendChild(popper);
        popper.appendChild(popperShadow);
        popperShadow.shadowRoot?.appendChild(popperInner);
        popperShadow.shadowRoot?.appendChild(shadowStyle);

        if (parentShadow) {
            const shadowSheet = shadowStyle.sheet as CSSStyleSheet;

            this.adoptStyleRules({
                from: (parentShadow as any).adoptedStyleSheets,
                to: shadowSheet,
            });

            this.adoptStyleRules({
                from: parentShadow.styleSheets,
                to: shadowSheet,
            });
        }

        for (const node of this.assigedNodes) {
            popperInner.appendChild(node);
        }

        this.portalledNodes = this.assigedNodes;
        popper.addEventListener('requestClose', this.bubbleRequestClose);

        this.popper = popper;
        this.popperShadow = popperShadow;
        this.popperInner = popperInner;
        this.positionPopper();
        this.attachDocumentListeners();

        setTimeout(this.enterPopper, 50);
    };

    private attachDocumentListeners = () => {
        window.addEventListener('scroll', this.positionPopper, {
            passive: true,
        });
        window.addEventListener('resize', this.positionPopper, {
            passive: true,
        });
    };

    private detachDocumentListeners = () => {
        window.removeEventListener('scroll', this.positionPopper);
        window.removeEventListener('resize', this.positionPopper);
    };

    private enterPopper = () => {
        if (!this.popper) return;
        this.popperInner?.classList.add('entered');
        this.popper.style.opacity = '1';
    };

    private closePopper = () => {
        if (!this.popper) return;

        this.popperInner?.classList.add('exiting');
        this.popperInner?.classList.remove('entered');
        setTimeout(this.detachPopper, 400);
    };

    private detachPopper = () => {
        if (!this.popper) return;

        this.detachDocumentListeners();

        for (const node of this.portalledNodes) {
            this.host.appendChild(node);
        }

        this.portalledNodes = [];

        this.popper.parentNode?.removeChild(this.popper);
        this.popper = undefined;
        this.popperShadow = undefined;
        this.popperInner = undefined;
    };

    private bubbleRequestClose = (e: any) => {
        this.requestClose.emit(e);
    };

    private getParentNode = (): HTMLElement | null => {
        const parent = this.host.parentNode as any;

        if (!parent) return null;

        if ('host' in parent) {
            return parent.host;
        }

        return parent;
    };

    private positionPopper = () => {
        const parentNode = this.getParentNode();

        if (!parentNode || !this.popperShadow) return;

        const clientRect = parentNode.getBoundingClientRect();

        const position = calcPosition(clientRect, {
            attachmentY: this.attachmentY,
            positionY: this.positionY,
            offsetY: this.offsetY,
            attachmentX: this.attachmentX,
            positionX: this.positionX,
            offsetX: this.offsetX,
        });

        this.popperShadow.setPosition(position);
    };
}
