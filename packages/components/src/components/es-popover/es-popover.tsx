/* eslint-disable no-console */
import {
    Component,
    Prop,
    h,
    Watch,
    Element,
    Event,
    EventEmitter,
    Listen,
} from '@stencil/core';
import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    offset,
    Placement,
} from '@floating-ui/dom';

import { size } from '@floating-ui/core';
import { allowFocus, shadowMutationObserver } from '@eventstore-ui/utils';

export type Constrain = 'none' | 'width' | 'height' | 'both';

/**
 * Attaches a portaled popover, attached to the parent node. Can be used to create dropdowns, tooltips etc. The parent scoped shadow styles are copied to the created portals shadow styles, to allow styling popover contents externally.
 */
@Component({
    tag: 'es-popover',
    styleUrl: 'es-popover.css',
    shadow: true,
})
export class Popover {
    @Element() host!: HTMLElement;

    /** Class name for the popper */
    @Prop() popperClass?: string;
    /** A query selecter to select the element to portal the popper to. */
    @Prop() target = 'body';
    /** Toggles if the popover is open or not. */
    @Prop({ reflect: true }) open: boolean = false;
    /** If the popover should overlay a backdrop, to prevent external clicks. */
    @Prop() backdrop: boolean = false;
    /** What zIndex to place the popover in. */
    @Prop() zIndex?: number;
    /** If the popover should render an arrow. */
    @Prop() arrow: boolean = false;
    /** If the popover should trap focus within, and return focus on close. */
    @Prop({ attribute: 'trap-focus' }) trapFocus: boolean = false;
    /** If the popover should request to close when focus is lost */
    @Prop() closeOnBlur: boolean = false;
    /** If the popover should request to close when clicked outside */
    @Prop() closeOnClickOutside: boolean = false;
    /** If the popover should request to close when esc is pressed */
    @Prop() closeOnEsc: boolean = false;

    /** Pass an element to attach the popover to. (Defaults to the parent element.) */
    @Prop() attachTo?: HTMLElement;
    /** Constrain the size of the popover to the size of the attachment node. */
    @Prop() autoSize: Constrain = 'none';
    /** Constrain the size of the popover inner to the size of the window. */
    @Prop() constrain: Constrain = 'height';
    /** The maximum height to constrain to. */
    @Prop() maxHeight: number = Infinity;
    /** The maximum width to constrain to. */
    @Prop() maxWidth: number = Infinity;
    /** Where to place the popover in relation to the attachment point. */
    @Prop() placement: Placement = 'top';
    /** An array of allowed placements or enable / disable */
    @Prop() flip?: Placement[] | boolean = true;
    /** The offset away from the attachement element in px. */
    @Prop() offset: number = 0;

    /** Triggers when the popover requests to close. */
    @Event() requestClose!: EventEmitter;

    private connected: boolean = false;
    private attached: boolean = false;
    private mutationObserver?: MutationObserver;
    private detachAllowFocus?: ReturnType<typeof allowFocus>;
    private portalledNodes: Array<[node: Node, placeholder: Node]> = [];
    private popper?: HTMLEsPopperElement;
    private popperShadow?: HTMLEsPopperInnerElement;
    private popperInner?: HTMLDivElement;
    private popperArrow?: HTMLDivElement;
    private autoUpdateCleanup?: () => void;

    componentDidLoad() {
        this.connected = true;
        this.mutationObserver = shadowMutationObserver(
            this.host,
            this.positionPopper,
        );

        if (this.open) {
            this.attachPopper();
        }
    }

    disconnectedCallback() {
        this.connected = false;
        this.mutationObserver?.disconnect();

        if (this.open) {
            this.closePopper(false);
        }
    }

    @Watch('popperClass') setPopperClass(
        popperClass?: string,
        previousClass?: string,
    ) {
        if (!this.popperInner) return;

        if (previousClass) {
            for (const className of previousClass.split(' ')) {
                if (!className.length) continue;
                this.popperInner.classList.remove(className);
            }
        }

        if (popperClass) {
            for (const className of popperClass.split(' ')) {
                if (!className.length) continue;
                this.popperInner.classList.remove(className);
            }
        }
    }

    @Watch('open') togglePopover(isOpen: boolean) {
        if (isOpen) {
            this.attachPopper();
        } else {
            this.closePopper();
        }
    }

    @Listen('click', { target: 'document' }) onClickOutside(e: MouseEvent) {
        if (!this.closeOnClickOutside) return;
        if (!this.open || !this.popperInner) return;
        const path = e.composedPath();
        if (path.includes(this.host) || path.includes(this.popperInner)) return;
        this.requestClose.emit();
    }

    @Listen('keydown', { target: 'document', capture: true }) onEscPress(
        e: KeyboardEvent,
    ) {
        if (!this.closeOnEsc) return;
        if (e.key !== 'Escape' || e.altKey || e.ctrlKey || e.metaKey) return;
        this.requestClose.emit();
    }

    render() {
        return <slot />;
    }

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
                if (
                    rule.selectorText &&
                    rule.selectorText.startsWith('es-popper-inner')
                ) {
                    to.insertRule(
                        rule.cssText.replace('es-popper-inner', ':host'),
                        to.cssRules.length,
                    );
                } else if (rule.selectorText !== ':host') {
                    to.insertRule(rule.cssText, to.cssRules.length);
                }
            }
        }
    };

    private attachPopper = async () => {
        const target = document.querySelector(this.target);
        if (!target || this.attached) return;

        const parentShadow = this.host.parentNode?.getRootNode() as ShadowRoot;
        const popper = document.createElement('es-popper');
        const shadowStyle = document.createElement('style');
        const popperShadow = document.createElement('es-popper-inner');
        const popperInner = document.createElement('div');

        const assignedNodes =
            this.host.shadowRoot!.querySelector('slot')?.assignedNodes() ?? [];

        popper.style.opacity = '0';
        if (this.zIndex != null) {
            popper.style.zIndex = `${this.zIndex}`;
        }
        popper.setAttribute('backdrop', `${this.backdrop}`);
        popper.setAttribute('trap-focus', `${this.trapFocus}`);
        popperInner.classList.add('inner');

        if (this.popperClass) {
            for (const className of this.popperClass.split(' ')) {
                if (!className.length) continue;
                popperInner.classList.add(className);
            }
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

            if (assignedNodes.find(({ nodeName }) => nodeName === 'SLOT')) {
                const grandParentShadow = parentShadow.host.parentNode?.getRootNode() as ShadowRoot;

                this.adoptStyleRules({
                    from: (grandParentShadow as any)?.adoptedStyleSheets,
                    to: shadowSheet,
                });

                this.adoptStyleRules({
                    from: grandParentShadow?.styleSheets,
                    to: shadowSheet,
                });
            }
        }

        this.portalledNodes = [];

        for (const node of assignedNodes) {
            if (node.nodeName === 'SLOT') {
                const slot = node as HTMLSlotElement;
                for (const slottedNode of slot.assignedNodes()) {
                    const placeholder = this.createPlaceholder();
                    this.portalledNodes.push([slottedNode, placeholder]);
                    slottedNode.parentNode!.replaceChild(
                        placeholder,
                        slottedNode,
                    );
                    popperInner.appendChild(slottedNode);
                }
            } else {
                const placeholder = this.createPlaceholder();
                this.portalledNodes.push([node, placeholder]);
                node.parentNode!.replaceChild(placeholder, node);
                popperInner.appendChild(node);
            }
        }

        popper.addEventListener('requestClose', this.bubbleRequestClose);

        if (this.closeOnBlur) {
            popperInner.addEventListener('mousedown', (e) => {
                e.preventDefault();
            });
            popperInner.addEventListener('focusout', (e) => {
                if (
                    !this.connected ||
                    popperInner.contains(e.relatedTarget as HTMLElement)
                ) {
                    return;
                }
                this.requestClose.emit('blur');
            });
        }

        this.popper = popper;
        this.popperShadow = popperShadow;
        this.popperInner = popperInner;

        if (this.arrow) {
            const popperArrow = document.createElement('div');
            popperArrow.classList.add('arrow');
            popperShadow.shadowRoot?.appendChild(popperArrow);
            this.popperArrow = popperArrow;
        }

        this.attached = true;

        await popper.loaded();
        await this.positionPopper();

        this.attachDocumentListeners();
        setTimeout(this.enterPopper, 50);
    };

    private attachDocumentListeners = () => {
        this.detachAllowFocus = allowFocus(this.popperInner!);
        this.autoUpdateCleanup = autoUpdate(
            this.attachTo ?? this.getParentNode()!,
            this.popperShadow!,
            () => this.positionPopper(),
        );
    };

    private detachDocumentListeners = () => {
        this.detachAllowFocus?.();
        this.autoUpdateCleanup?.();
        this.autoUpdateCleanup = undefined;
    };

    private positionPopper = async () => {
        if (!this.open || !this.popperShadow) return;

        const attachment = this.attachTo ?? this.getParentNode()!;
        const location = await computePosition(attachment, this.popperShadow, {
            placement: this.placement,
            strategy: 'fixed',
            middleware: [
                offset(() => ({
                    mainAxis: this.offset,
                })),
                ...(this.flip
                    ? [
                          flip({
                              fallbackStrategy: 'initialPlacement',
                              fallbackPlacements: Array.isArray(this.flip)
                                  ? this.flip
                                  : undefined,
                          }),
                      ]
                    : []),
                size({
                    padding: 10,
                    apply: ({ width, height, reference }) => {
                        if (!this.popperShadow || !this.popperInner) return;

                        const as = this.autoSize;
                        if (as === 'height' || as === 'both') {
                            this.popperShadow.style.height = `${reference.height}px`;
                        }
                        if (as === 'width' || as === 'both') {
                            this.popperShadow.style.width = `${reference.width}px`;
                        }

                        const c = this.constrain;
                        if (c === 'height' || c === 'both') {
                            this.popperInner.style.maxHeight = `${Math.min(
                                height,
                                this.maxHeight,
                            )}px`;
                        }
                        if (c === 'width' || c === 'both') {
                            this.popperInner.style.maxWidth = `${Math.min(
                                width,
                                this.maxWidth,
                            )}px`;
                        }
                    },
                }),
                ...(this.popperArrow
                    ? [
                          arrow({
                              element: this.popperArrow!,
                          }),
                      ]
                    : []),
            ],
        });

        if (!this.open || !this.popperShadow || !this.popperInner) return;

        this.popperInner.dataset.placement = location.placement;
        this.popperShadow.style.transform = `translate(${location.x}px, ${location.y}px)`;

        if (this.popperArrow && location.middlewareData.arrow) {
            const { x: arrowX, y: arrowY } = location.middlewareData.arrow;
            this.popperArrow.dataset.placement = location.placement;
            Object.assign(this.popperArrow.style, {
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
                right: '',
                bottom: '',
            });
        }
    };

    private enterPopper = () => {
        if (!this.popper) return;
        this.popperInner?.classList.add('entered');
        this.popperArrow?.classList.add('entered');
        this.popper.style.opacity = '1';
        return this.positionPopper();
    };

    private closePopper = (animate = true) => {
        this.popperInner?.classList.add('exiting');
        this.popperInner?.classList.remove('entered');
        this.popperArrow?.classList.add('exiting');
        this.popperArrow?.classList.remove('entered');
        if (animate) {
            setTimeout(this.detachPopper, 400);
        } else {
            this.detachPopper();
        }
    };

    private detachPopper = () => {
        if (!this.popper || !this.attached) return;

        this.detachDocumentListeners();

        for (const [node, placeholder] of this.portalledNodes) {
            placeholder.parentNode?.replaceChild(node, placeholder);
        }

        this.portalledNodes = [];

        this.popper.parentNode?.removeChild(this.popper);
        this.popper = undefined;
        this.popperInner = undefined;
        this.popperArrow = undefined;
        this.attached = false;
    };

    private bubbleRequestClose = (e: any) => {
        if (!this.connected) return;
        this.requestClose.emit(e.detail);
    };

    private getParentNode = (): HTMLElement | null => {
        const parent = this.host.parentNode as any;

        if (!parent) return null;

        if ('host' in parent) {
            return parent.host;
        }

        return parent;
    };

    private createPlaceholder = () => {
        const id = Math.random().toString(16).slice(2);
        return document.createComment(id);
    };
}
