import { Component, h, Prop, State } from '@stencil/core';
import { theme } from '@kurrent-ui/theme';
import type { IconDescription } from '@eventstore-ui/components';

import { ICON_NAMESPACE } from '../../icons/namespace';
import type { HeaderDropdownButtonVariant } from '../es-header-dropdown/types';

/** A theme picker dropdown for the header */
@Component({
    tag: 'es-theme-dropdown',
    styleUrl: 'es-theme-dropdown.css',
    shadow: true,
})
export class ThemePicker {
    /** Which styling variant to use. */
    @Prop() variant: HeaderDropdownButtonVariant = 'default';

    @State() dropdownOpen: boolean = false;

    render() {
        return (
            <es-header-dropdown
                icon={this.activeIcon()}
                caret={false}
                variant={this.variant}
            >
                <es-theme-picker />
            </es-header-dropdown>
        );
    }

    private activeIcon = (): IconDescription => [
        ICON_NAMESPACE,
        `${theme.shade}-${theme.contrast}-theme`,
    ];
}
