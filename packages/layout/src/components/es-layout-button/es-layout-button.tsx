import {
    Component,
    h,
    Listen,
    Method,
    Prop,
    Event,
    type EventEmitter,
    Host,
} from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';
import { theme } from '@eventstore-ui/theme';

/**
 * A button for the sidebar, sidebar-dropdown, and header-dropdown.
 * @part button - The button element.
 */
@Component({
    tag: 'es-layout-button',
    styleUrl: 'es-layout-button.css',
    shadow: true,
})
export class LayoutButton {
    /** If the button should display as active */
    @Prop() active: boolean = false;
    /** Display an icon on the left. */
    @Prop() icon?: IconDescription;
    /** If the button should be disabled. */
    @Prop() disabled: boolean = false;
    /** Apply an indent to the left of the button, for basic nesting. */
    @Prop({ reflect: true }) level?: number;
    /** Display a dot on the icon, to attract attention to the button.  */
    @Prop() alertLevel?: HTMLEsBadgeElement['color'];
    /** Display a counter in place of the icon. */
    @Prop() count?: number;
    /** If the parent popup should close when clicked. */
    @Prop() closeOnClick: boolean = false;

    /** When deciding the active child, if multiple are active, the highest priority wins. */
    @Prop() priority: number = 0;

    /** Triggers the parent popup to close. */
    @Event() requestClose!: EventEmitter;

    /** If the button is currently active */
    @Method()
    async isActive(): Promise<boolean> {
        return !this.disabled && this.active;
    }

    @Listen('click', { capture: true }) handleClick(e: MouseEvent) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        if (this.closeOnClick) {
            this.requestClose.emit();
        }
    }

    render() {
        return (
            <Host high-contrast={theme.isHighContrast()}>
                <button
                    class={{ disabled: this.disabled, active: this.active }}
                    aria-disabled={this.disabled}
                    part={'button'}
                >
                    {this.count != null ? (
                        <es-counter
                            count={this.count}
                            variant={'filled'}
                            color={this.alertLevel}
                        />
                    ) : (
                        !!this.icon && (
                            <es-badge
                                count={this.alertLevel ? 1 : 0}
                                variant={'dot'}
                                color={this.alertLevel}
                            >
                                <es-icon icon={this.icon} />
                            </es-badge>
                        )
                    )}
                    <span class="inner">
                        <slot />
                    </span>
                </button>
            </Host>
        );
    }
}
