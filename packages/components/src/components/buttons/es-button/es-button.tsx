import { Component, h, Prop, Element, Listen, Host } from '@stencil/core';
import { theme } from '@kurrent-ui/theme';
import { closest } from '@eventstore-ui/utils';
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

        if (this.type === 'submit') {
            const form = closest(this.host, 'form');

            if (form) {
                e.preventDefault();
                const fakeSubmit = document.createElement('button');
                fakeSubmit.type = 'submit';
                fakeSubmit.style.display = 'none';
                form.appendChild(fakeSubmit);
                fakeSubmit.click();
                fakeSubmit.remove();
            }
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
