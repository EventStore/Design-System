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
                <es-header-dropdown icon={this.activeIcon()} caret={false}>
                    <es-theme-picker />
                </es-header-dropdown>
            </Host>
        );
    }

    private activeIcon = (): IconDescription => [
        ES_LAYOUT,
        `${theme.shade}-${theme.contrast}-theme`,
    ];
}
