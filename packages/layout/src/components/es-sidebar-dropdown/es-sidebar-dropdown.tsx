import { Component, h, Host, Prop, State, Element } from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';
import { router } from '@eventstore-ui/router';
import { theme } from '@eventstore-ui/theme';

import { ICON_NAMESPACE } from '../../icons/namespace';

/**
 * A dropdown for the sidebar. Will automatically take the title and icon of the first active nested `es-layout-link` or `es-layout-button`.
 */
@Component({
    tag: 'es-sidebar-dropdown',
    styleUrl: 'es-sidebar-dropdown.css',
    shadow: true,
})
export class SidebarDropdown {
    @Element() host!: HTMLEsSidebarDropdownElement;

    /** The title to display if no nested es-layout-link or es-layout-button is active */
    @Prop() defaultTitle!: string;
    /** The icon to display if no nested es-layout-link or es-layout-button is active */
    @Prop() defaultIcon!: IconDescription;

    @State() dropdownOpen: boolean = false;
    @State() activeTitle: string = this.defaultTitle;
    @State() activeIcon: IconDescription = this.defaultIcon;

    private unsubscribe?: () => void;
    private links: Array<
        HTMLEsLayoutLinkElement | HTMLEsLayoutButtonElement
    > = [];

    componentWillLoad() {
        this.unsubscribe = router.history.listen(() => {
            this.setActive();
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
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={this.toggleDropdown}
                    class={{ sidebar_button: true, open: this.dropdownOpen }}
                    variant={'minimal'}
                >
                    <es-icon
                        key={
                            Array.isArray(this.activeIcon)
                                ? this.activeIcon.join('-')
                                : this.activeIcon
                        }
                        icon={this.activeIcon}
                        slot={'before'}
                    />
                    <span class={'truncate'}>{this.activeTitle}</span>
                    <es-icon
                        icon={[ICON_NAMESPACE, 'caret']}
                        slot={'after'}
                        class={{ caret: true, open: this.dropdownOpen }}
                        size={14}
                    />
                </es-button>
                <es-popover
                    arrow
                    trapFocus
                    closeOnBlur
                    open={this.dropdownOpen}
                    onRequestClose={this.closeDropdown}
                    popperClass={theme.isHighContrast() ? 'high-contrast' : ''}
                    placement={'bottom'}
                    autoSize={'width'}
                    offset={14}
                >
                    <slot onSlotchange={this.slotChange} />
                </es-popover>
            </Host>
        );
    }

    private toggleDropdown = (e: MouseEvent) => {
        e.stopPropagation();
        this.dropdownOpen = !this.dropdownOpen;
    };

    private closeDropdown = (e: CustomEvent | MouseEvent) => {
        e.stopPropagation();
        this.dropdownOpen = false;
    };

    private slotChange = (e: Event) => {
        if (this.dropdownOpen) return;

        const slot = e.target as HTMLSlotElement;
        if (!slot) return;

        const links: HTMLEsLayoutLinkElement[] = [];

        for (const element of slot.assignedElements()) {
            const childLinks = element.querySelectorAll<
                HTMLEsLayoutLinkElement | HTMLEsLayoutButtonElement
            >('es-layout-link,es-layout-button');
            links.push(...Array.from(childLinks));
        }

        this.links = links;

        this.setActive();
    };

    private setActive = async () => {
        const active = await this.activeLink();

        if (active) {
            this.activeTitle = active.innerText;
            this.activeIcon = active.icon ?? this.defaultIcon;
        } else {
            this.activeTitle = this.defaultTitle;
            this.activeIcon = this.defaultIcon;
        }
    };

    private activeLink = async () => {
        for (const link of this.links) {
            const isActive = await link.isActive();
            if (isActive) return link;
        }
    };
}
