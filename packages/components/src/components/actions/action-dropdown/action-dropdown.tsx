import { Component, h, Host, Prop, State } from '@stencil/core';
import { ICON_NAMESPACE } from '../../../icons/namespace';
import type { IconDescription } from '../../icon/types';

/**
 * A dropdown to display more actions than can be reasonably fit in a row.
 * All child actions must have the `dropdownItem` prop set.
 */
@Component({
    tag: 'c2-action-dropdown',
    styleUrl: 'action-dropdown.css',
    shadow: true,
})
export class ESActionDropdown {
    /** The icon to show for the action. */
    @Prop() icon: IconDescription = [ICON_NAMESPACE, 'more'];
    /** If the dropdown should be disabled. */
    @Prop() disabled: boolean = false;

    @State() dropdownOpen: boolean = false;

    render() {
        return (
            <Host>
                <c2-button
                    disabled={this.disabled}
                    variant={'minimal'}
                    onClick={this.toggleDropdown}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <c2-icon icon={this.icon} size={20} />
                </c2-button>
                <c2-popover
                    arrow
                    trapFocus
                    closeOnEsc
                    closeOnClickOutside
                    closeOnBlur
                    onRequestClose={this.closeDropdown}
                    open={this.dropdownOpen}
                    placement={'bottom-end'}
                    offset={8}
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
