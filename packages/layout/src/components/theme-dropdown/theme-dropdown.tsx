import { Component, h, Prop, State } from '@stencil/core';
import { theme } from '@kurrent-ui/theme';
import type { IconDescription } from '@eventstore-ui/components';

import { ICON_NAMESPACE } from '../../icons/namespace';
import type { HeaderDropdownButtonVariant } from '../header-dropdown/types';

/** A theme picker dropdown for the header */
@Component({
    tag: 'l2-theme-dropdown',
    styleUrl: 'theme-dropdown.css',
    shadow: true,
})
export class ThemePicker {
    /** Which styling variant to use. */
    @Prop() variant: HeaderDropdownButtonVariant = 'default';

    @State() dropdownOpen: boolean = false;

    render() {
        return (
            <l2-header-dropdown
                icon={this.activeIcon()}
                caret={false}
                variant={this.variant}
            >
                <l2-theme-picker />
            </l2-header-dropdown>
        );
    }

    private activeIcon = (): IconDescription => [
        ICON_NAMESPACE,
        `${theme.shade}-${theme.contrast}-theme`,
    ];
}
