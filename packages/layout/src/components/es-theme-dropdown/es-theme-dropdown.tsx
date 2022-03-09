import { Component, h, Host, State } from '@stencil/core';
import { theme } from '@eventstore/theme';
import type { IconDescription } from '@eventstore/components';

import { ES_LAYOUT } from '../../icons/namespace';

@Component({
    tag: 'es-theme-dropdown',
    styleUrl: 'es-theme-dropdown.css',
    shadow: true,
})
export class ThemePicker {
    @State() dropdownOpen: boolean = false;

    render() {
        return (
            <Host>
                <es-button
                    onClick={this.openDropdown}
                    class={{ open: this.dropdownOpen }}
                    variant={'outline'}
                >
                    <es-icon icon={this.activeIcon()} size={22} />
                </es-button>
                <es-popover
                    backdrop
                    open={this.dropdownOpen}
                    onRequestClose={this.closeDropdown}
                    popperClass={'popper'}
                    attachmentY={'top'}
                    positionY={'bottom'}
                    offsetY={17}
                    attachmentX={'right'}
                    positionX={'right'}
                    trapFocus
                >
                    <es-theme-picker />
                </es-popover>
            </Host>
        );
    }

    private activeIcon = (): IconDescription => [
        ES_LAYOUT,
        `${theme.shade}-${theme.contrast}-theme`,
    ];

    private openDropdown = (e: MouseEvent) => {
        e.stopPropagation();
        this.dropdownOpen = true;
    };

    private closeDropdown = (e: CustomEvent | MouseEvent) => {
        e.stopPropagation();
        this.dropdownOpen = false;
    };
}
