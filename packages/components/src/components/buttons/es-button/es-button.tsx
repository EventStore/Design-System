import { Component, h, Prop, Element, Listen, Host } from '@stencil/core';
import { theme } from '@eventstore/theme';
import type { ButtonVariant } from '../types';

/**
 * A button.
 * @slot before - Placed before the main content with correct padding.
 * @slot after - Placed after the main content with correct padding.
 * @part button - The internal button element.
 * @part inner - The inner span, wrapping the default slot.
 */
@Component({
    tag: 'es-button',
    styleUrl: '../button.css',
    shadow: true,
})
export class Button {
    @Element() host!: HTMLElement;

    /** Which styling variant to use. */
    @Prop({ reflect: true }) variant: ButtonVariant = 'default';
    /** If the button is disabled. Prevents the user from interacting with the button: it cannot be pressed or focused. */
    @Prop({ reflect: true }) disabled?: boolean;
    /** The default behavior of the button. */
    @Prop() type: string = 'button';
    /** The form element to associate the button with (it's form owner). */
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
            <Host high-contrast={theme.isHighContrast()} dark={theme.isDark()}>
                <button
                    tabindex={this.tabindex}
                    type={this.type}
                    form={this.form}
                    disabled={this.disabled}
                    part={'button'}
                >
                    <slot name={'before'} />
                    <span part={'inner'}>
                        <slot />
                    </span>
                    <slot name={'after'} />
                </button>
            </Host>
        );
    }
}
