import { Component, h, Element, Host, State, Prop } from '@stencil/core';

import { slottedQuerySelectorAll } from '@eventstore-ui/utils';
import type { Placement } from '@eventstore-ui/components';

@Component({
    tag: 'l2-layout-auto-label',
    styleUrl: 'layout-auto-label.css',
    shadow: true,
})
export class EsLayoutAutoLabel {
    @Element() host!: HTMLL2LayoutAutoLabelElement;

    /** Selector for selecting elements to auto label */
    @Prop() selector = [
        'l2-layout-link:not([disable-auto-label])',
        'l2-layout-button:not([disable-auto-label])',
    ].join(', ');
    /** How to extract the label text */
    @Prop() extractLabel?: ($el: HTMLElement) => string;
    /** Where to place the label */
    @Prop() placement!: Placement;

    @State() label = '';
    @State() open = false;
    @State() target?: HTMLElement;

    private unbindEvents: Array<() => void> = [];

    componentWillLoad() {
        this.captureElements();
    }

    disconnectedCallback() {
        this.unbind();
    }

    render() {
        return (
            <Host>
                <slot />
                <es-popover
                    arrow
                    open={this.open}
                    attachTo={this.target}
                    placement={this.placement}
                >
                    {this.label}
                </es-popover>
            </Host>
        );
    }

    private unbind = () => {
        this.unbindEvents.forEach((fn) => fn());
        this.unbindEvents = [];
    };

    private captureElements = () => {
        this.unbind();

        const $slot = this.host.querySelector('slot');

        if (!$slot) return;

        for (const $el of slottedQuerySelectorAll<HTMLElement>(
            $slot,
            this.selector,
        )) {
            const enter = this.enterPopover($el);
            $el.addEventListener('mouseover', enter);
            $el.addEventListener('mouseout', this.exitPopover);

            this.unbindEvents.push(() => {
                $el.removeEventListener('mouseover', enter);
                $el.removeEventListener('mouseout', this.exitPopover);
            });
        }
    };

    private popoverTimeout!: ReturnType<typeof setTimeout>;

    private enterPopover = ($target: HTMLElement) => (_: MouseEvent) => {
        clearTimeout(this.popoverTimeout);
        this.label =
            this.extractLabel?.($target) ??
            $target.getAttribute('auto-label') ??
            $target.textContent ??
            '';
        this.target = $target;
        this.open = true;
    };

    private exitPopover = (_: MouseEvent) => {
        clearTimeout(this.popoverTimeout);
        this.popoverTimeout = setTimeout(() => {
            this.open = false;
        }, 100);
    };
}
