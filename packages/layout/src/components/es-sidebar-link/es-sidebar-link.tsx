import { Component, h, Method, Prop } from '@stencil/core';
import { Link, router } from '@eventstore/router';
import type { IconDescription } from '@eventstore/components';

/**
 * A link for the sidebar.
 * @part link - The link element.
 */
@Component({
    tag: 'es-sidebar-link',
    styleUrl: 'es-sidebar-link.css',
    shadow: true,
})
export class SidebarLink {
    /** Where to link to. */
    @Prop() url?: string;
    /** When to display as active. Uses the `url` by default. */
    @Prop() matchUrl?: string;
    /** Use exact url matching for active. */
    @Prop() matchExact?: boolean;
    /** Use strict url matching for active. */
    @Prop() matchStrict?: boolean;

    /** Display an icon on the left. */
    @Prop() icon?: IconDescription;
    /** If the link should be disabled. */
    @Prop() disabled: boolean = false;
    /** Apply an indent to the left of the link, for basic nesting. */
    @Prop({ reflect: true }) level?: number;
    /** Display a dot on the icon, to attract attention to the link.  */
    @Prop() alertLevel?: HTMLEsBadgeElement['color'];

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

    render() {
        return (
            <Link
                url={this.disabled ? undefined : this.url}
                urlMatch={this.matchUrl}
                strict={this.matchStrict}
                exact={this.matchExact}
                class={`${this.disabled ? 'disabled' : ''}`}
                aria-disabled={this.disabled}
                part={'link'}
            >
                {!!this.icon && (
                    <es-badge
                        count={this.alertLevel ? 1 : 0}
                        variant={'dot'}
                        color={this.alertLevel}
                    >
                        <es-icon icon={this.icon} />
                    </es-badge>
                )}
                <span class="inner">
                    <slot />
                </span>
            </Link>
        );
    }
}
