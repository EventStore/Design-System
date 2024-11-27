import { Component, h, Host, Prop, State, Element } from '@stencil/core';
import type { IconDescription } from '@kurrent-ui/components';

import { ICON_NAMESPACE } from '../../icons/namespace';
import { router } from '@kurrent-ui/router';
import { theme } from '@kurrent-ui/theme';

/**
 * A dropdown for the header.
 * @part counter - the counter
 */
@Component({
    tag: 'l2-header-dropdown',
    styleUrl: 'header-dropdown.css',
    shadow: true,
})
export class HeaderDropdown {
    @Element() host!: HTMLL2HeaderDropdownElement;

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
    @Prop() alertLevel?: HTMLC2BadgeElement['color'];
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
                <c2-button
                    onClick={this.toggleDropdown}
                    class={{
                        header_button: true,
                        open: this.dropdownOpen,
                    }}
                    disabled={this.disabled}
                >
                    {this.count != null ? (
                        <c2-counter
                            count={this.count}
                            variant={'filled'}
                            color={this.alertLevel}
                            slot={!this.buttonText ? undefined : 'before'}
                            part={'counter'}
                        />
                    ) : (
                        !!this.icon && (
                            <c2-badge
                                count={this.alertLevel ? 1 : 0}
                                variant={'dot'}
                                color={this.alertLevel}
                                slot={!this.buttonText ? undefined : 'before'}
                            >
                                <c2-icon icon={this.icon} />
                            </c2-badge>
                        )
                    )}
                    {this.buttonText}
                    {this.caret && (
                        <c2-icon
                            icon={[ICON_NAMESPACE, 'caret']}
                            slot={'after'}
                            class={{ caret: true, open: this.dropdownOpen }}
                            size={14}
                        />
                    )}
                </c2-button>
                <c2-popover
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
                >
                    <slot />
                </c2-popover>
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
