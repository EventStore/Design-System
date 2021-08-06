import { Component, h, Prop, Element, Listen } from '@stencil/core';
import { ButtonVariant, ButtonColor } from '../types';

/**
 * A button.
 * @slot before - Placed before the main content with correct padding.
 * @slot after -  Placed after the main content with correct padding.
 */
@Component({
    tag: 'es-button',
    styleUrl: '../button.css',
    shadow: true,
})
export class Button {
    @Element() host!: HTMLElement;

    /**
     * Which styling variant to use
     */
    @Prop({ reflect: true }) variant: ButtonVariant = 'filled';
    /**
     * Which color pair the button should use
     */
    @Prop({ reflect: true }) color: ButtonColor = 'primary';
    /**
     * If the button is disabled. Prevents the user from interacting with the button: it cannot be pressed or focused.
     */
    @Prop({ reflect: true }) disabled?: boolean;
    /**
     * The default behavior of the button.
     */
    @Prop() type: string = 'button';
    /**
     * The form element to associate the button with (its form owner).
     */
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
