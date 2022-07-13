import { Component, h, Host, State } from '@stencil/core';
import { theme } from '@eventstore-ui/theme';
import type { IconDescription } from '@eventstore-ui/components';

import { ICON_NAMESPACE } from '../../icons/namespace';

/** A theme picker dropdown for the header */
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
                <es-header-dropdown icon={this.activeIcon()} caret={false}>
                    <es-theme-picker />
                </es-header-dropdown>
            </Host>
        );
    }

    private activeIcon = (): IconDescription => [
        ICON_NAMESPACE,
        `${theme.shade}-${theme.contrast}-theme`,
    ];
}
