import { Component, h, Prop, Element, Listen } from '@stencil/core';
import { ButtonVariant, ButtonColor } from './types';

@Component({
    tag: 'es-button',
    styleUrl: 'es-button.css',
    shadow: true,
})
export class Button {
    @Element() host!: HTMLElement;

    @Prop({ reflect: true }) variant: ButtonVariant = 'filled';
    @Prop({ reflect: true }) color: ButtonColor = 'primary';
    @Prop({ reflect: true }) disabled?: boolean;
    @Prop() type: string = 'button';
    @Prop() form?: string;

    private tabindex?: string;

    @Listen('keyup') handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'Enter' || e.key === ' ') {
            this.host.dispatchEvent(new MouseEvent('click'));
        }
    }

    @Listen('click', { capture: true }) handleClick(e: MouseEvent) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    connectedCallback() {
        if (this.host.hasAttribute('tabindex')) {
            this.tabindex = this.host.getAttribute('tabindex')!;
        }
    }

    render() {
        return (
            <button
                tabindex={this.tabindex}
                type={this.type}
                form={this.form}
                disabled={this.disabled}
            >
                <slot name={'before'} />
                <span>
                    <slot />
                </span>
                <slot name={'after'} />
            </button>
        );
    }
}
