import {
    Component,
    h,
    Host,
    Method,
    Prop,
    Element,
    State,
} from '@stencil/core';
import { Link, router } from '@eventstore-ui/router';
import type { IconDescription } from '@eventstore-ui/components';
import { theme } from '@eventstore-ui/theme';

import { bindPanelDetails, type PanelMode } from '../../panel';

/**
 * A link for the sidebar, sidebar-dropdown, and header-dropdown.
 * @part link - The link element.
 * @part counter - The counter element, if rendered.
 * @part badge - The badge element, if rendered.
 * @part icon - The icon element, if rendered.
 */
@Component({
    tag: 'es-layout-link',
    styleUrl: 'es-layout-link.css',
    shadow: true,
})
export class LayoutLink {
    @Element() host!: HTMLEsLayoutLinkElement;

    /** Where to link to. */
    @Prop() url?: string;
    /** When to display as active. Uses the `url` by default. */
    @Prop() matchUrl?: string;
    /** Use exact url matching for active. */
    @Prop() matchExact?: boolean;
    /** Use strict url matching for active. */
    @Prop() matchStrict?: boolean;
    /** If the link is external */
    @Prop() external?: boolean;
    /** If the Link should break out of the router, and force a page load */
    @Prop() forceRefresh?: boolean;
    /** Target for link (eg: target="_blank") */
    @Prop() target?: string;

    /** Display an icon on the left. */
    @Prop() icon?: IconDescription;
    /** If the link should be disabled. */
    @Prop() disabled: boolean = false;
    /** Apply an indent to the left of the link, for basic nesting. */
    @Prop({ reflect: true }) level?: number;
    /** Display a dot on the icon, to attract attention to the link.  */
    @Prop() alertLevel?: HTMLEsBadgeElement['color'];
    /** Display a counter in place of the icon. */
    @Prop() count?: number;

    /** When deciding the active child, if multiple are active, the highest priority wins. */
    @Prop() priority: number = 0;

    @State() panelMode: PanelMode = 'inline';

    /** If the link is currently active */
    @Method()
    async isActive(): Promise<boolean> {
        return (
            !this.disabled &&
            !!router.match({
                path: this.matchUrl ?? this.url,
                exact: this.matchExact,
                strict: this.matchStrict,
            })
        );
    }

    private unbindPanelMode?: () => void;

    connectedCallback() {
        this.unbindPanelMode?.();
        this.unbindPanelMode = bindPanelDetails(this.host, ({ mode }) => {
            this.panelMode = mode;
        });
    }

    disconnectedCallback() {
        this.unbindPanelMode?.();
    }

    render() {
        return (
            <Host high-contrast={theme.isHighContrast()} mode={this.panelMode}>
                <Link
                    url={this.disabled ? undefined : this.url}
                    urlMatch={this.matchUrl}
                    strict={this.matchStrict}
                    exact={this.matchExact}
                    class={this.disabled ? 'disabled' : ''}
                    aria-disabled={this.disabled}
                    part={'link'}
                    target={this.target ?? this.external ? '_blank' : undefined}
                    rel={this.external ? 'noopener' : undefined}
                    external={this.external}
                    forceRefresh={this.forceRefresh}
                >
                    {this.count != null ? (
                        <es-counter
                            count={this.count}
                            variant={'filled'}
                            color={this.alertLevel}
                            part={'counter'}
                        />
                    ) : (
                        !!this.icon && (
                            <es-badge
                                count={this.alertLevel ? 1 : 0}
                                variant={'dot'}
                                color={this.alertLevel}
                                part={'badge'}
                            >
                                <es-icon part={'icon'} icon={this.icon} />
                            </es-badge>
                        )
                    )}
                    {this.panelMode === 'inline' && (
                        <span class={'inner'}>
                            <slot />
                        </span>
                    )}
                </Link>
            </Host>
        );
    }
}
