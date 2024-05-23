import { Component, h, Host, Prop, State } from '@stencil/core';
import { ICON_NAMESPACE } from '../../../icons/namespace';
import type { IconDescription } from '../../es-icon/types';

/**
 * A dropdown to display more actions than can be reasonably fit in a row.
 * All child actions must have the `dropdownItem` prop set.
 */
@Component({
    tag: 'es-action-dropdown',
    styleUrl: 'es-action-dropdown.css',
    shadow: true,
})
export class ESActionDropdown {
    /** The icon to show for the action. */
    @Prop() icon: IconDescription = [ICON_NAMESPACE, 'more'];

    @State() dropdownOpen: boolean = false;

    render() {
        return (
            <Host>
                <es-button
                    variant={'minimal'}
                    onClick={this.toggleDropdown}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <es-icon icon={this.icon} size={20} />
                </es-button>
                <es-popover
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
