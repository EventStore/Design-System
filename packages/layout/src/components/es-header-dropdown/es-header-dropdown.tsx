import { Component, h, Host, Prop, State, Element } from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';

import { ICON_NAMESPACE } from '../../icons/namespace';
import { router } from '@eventstore-ui/router';
import { theme } from '@eventstore-ui/theme';
import type { HeaderDropdownButtonVariant } from './types';

/**
 * A dropdown for the header.
 * @part counter - the counter
 */
@Component({
    tag: 'es-header-dropdown',
    styleUrl: 'es-header-dropdown.css',
    shadow: true,
})
export class HeaderDropdown {
    @Element() host!: HTMLEsHeaderDropdownElement;

    /** Which styling variant to use. */
    @Prop({ reflect: true }) variant: HeaderDropdownButtonVariant = 'default';
    /** Icon for use in the button. */
    @Prop() icon?: IconDescription;
    /** text for use in the button. */
    @Prop() buttonText?: string;
    /** If a caret should be rendered. */
    @Prop() caret: boolean = true;
    /** If the button should be disabled. */
    @Prop() disabled: boolean = false;
    /** Apply an indent to the left of the button, for basic nesting. */
    @Prop({ reflect: true }) level?: number;
    /** Display a dot on the icon, to attract attention to the button.  */
    @Prop() alertLevel?: HTMLEsBadgeElement['color'];
    /** Display a counter in place of the icon. */
    @Prop() count?: number;

    @State() dropdownOpen: boolean = false;

    private unsubscribe?: () => void;

    componentWillLoad() {
        this.unsubscribe = router.history.listen(() => {
            this.dropdownOpen = false;
        });
    }

    disconnectedCallback() {
        this.unsubscribe?.();
    }

    render() {
        return (
            <Host>
                <es-button
                    onClick={this.toggleDropdown}
                    class={{
                        header_button: true,
                        open: this.dropdownOpen,
                        circle: !this.buttonText && !this.caret,
                    }}
                    disabled={this.disabled}
                >
                    {this.count != null ? (
                        <es-counter
                            count={this.count}
                            variant={'filled'}
                            color={this.alertLevel}
                            slot={!this.buttonText ? undefined : 'before'}
                            part={'counter'}
                        />
                    ) : (
                        !!this.icon && (
                            <es-badge
                                count={this.alertLevel ? 1 : 0}
                                variant={'dot'}
                                color={this.alertLevel}
                                slot={!this.buttonText ? undefined : 'before'}
                            >
                                <es-icon icon={this.icon} />
                            </es-badge>
                        )
                    )}
                    {this.buttonText}
                    {this.caret && (
                        <es-icon
                            icon={[ICON_NAMESPACE, 'caret']}
                            slot={'after'}
                            class={{ caret: true, open: this.dropdownOpen }}
                            size={14}
                        />
                    )}
                </es-button>
                <es-popover
                    arrow
                    trapFocus
                    closeOnEsc
                    closeOnBlur
                    closeOnClickOutside
                    open={this.dropdownOpen}
                    onRequestClose={this.closeDropdown}
                    popperClass={theme.isHighContrast() ? 'high-contrast' : ''}
                    placement={'bottom-end'}
                    offset={12}
                    zIndex={10000}
                >
                    <slot />
                </es-popover>
            </Host>
        );
    }

    private toggleDropdown = () => {
        this.dropdownOpen = !this.dropdownOpen;
    };

    private closeDropdown = () => {
        this.dropdownOpen = false;
    };
}
