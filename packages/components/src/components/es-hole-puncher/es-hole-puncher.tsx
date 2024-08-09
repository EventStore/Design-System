import { Component, h, Element, Prop, Host } from '@stencil/core';

/**
 * Punches a hole through all parent shadow DOMs into the light DOM.
 * Any slotted chlid will be moved into the light, and a chain of slots
 * brings the slotted children back into position.
 */
@Component({
    tag: 'es-hole-puncher',
    shadow: true,
})
export class EsHolePuncher {
    @Element() host!: Element;

    /** Prefix the generated slot name, to allow easier identification in the DOM */
    @Prop() namePrefix: string = 'hole';

    private uniqueId!: string;
    private slotChain: HTMLSlotElement[] = [];
    private slottedElements: Element[] = [];

    componentWillLoad() {
        this.uniqueId = `${this.namePrefix}-${Math.random()
            .toString(16)
            .slice(2)}`;
    }

    componentDidLoad() {
        let $parent = this.host;
        let $host = ($parent.getRootNode() as ShadowRoot).host;

        while ($host) {
            const $slot = document.createElement('slot');
            $slot.setAttribute('name', this.uniqueId);
            $slot.setAttribute('slot', this.uniqueId);
            $parent.appendChild($slot);

            this.slotChain.push($slot);

            $parent = $host;
            $host = ($parent.getRootNode() as ShadowRoot).host;
        }

        const $slot = this.host.shadowRoot!.querySelector('slot');

        if (!$slot) throw new Error('No slot found');

        $slot
            .assignedNodes({ flatten: true })
            .filter(
                ($node): $node is Element =>
                    $node.nodeType === Node.ELEMENT_NODE,
            )
            .forEach(($el) => {
                $el.setAttribute('slot', this.uniqueId);
                $parent.appendChild($el);
                this.slottedElements.push($el);
            });
    }

    disconnectedCallback() {
        this.slotChain.forEach(($slot) => $slot.remove());
        this.slotChain = [];

        const $slot = this.host.shadowRoot!.querySelector('slot');

        this.slottedElements.forEach(($node) => {
            $slot?.appendChild($node);
        });
        this.slottedElements = [];
    }

    render() {
        return (
            <Host>
                <slot />
                <slot name={this.uniqueId} />
            </Host>
        );
    }
}
