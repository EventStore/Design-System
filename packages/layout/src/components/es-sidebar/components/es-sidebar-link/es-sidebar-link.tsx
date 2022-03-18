import { Component, h, Prop } from '@stencil/core';
import { Link } from '@eventstore/router';
import type { IconDescription } from '@eventstore/components';

/** A link for the sidebar */
@Component({
    tag: 'es-sidebar-link',
    styleUrl: 'es-sidebar-link.css',
    shadow: true,
})
export class SidebarLink {
    /** Where to link to. */
    @Prop() url?: string;
    /** When to display as active. Uses the `url` by default. */
    @Prop() urlMatch?: string;
    /** Display an icon on the left. */
    @Prop() icon?: IconDescription;
    /** If the link should be disabled. */
    @Prop() disabled: boolean = false;
    /** Apply an indent to the left of the link, for basic nesting. */
    @Prop({ reflect: true }) level?: number;
    /** Display a dot on the icon, to attract attention to the link.  */
    @Prop() alertLevel?: HTMLEsBadgeElement['color'];

    render() {
        return (
            <Link
                url={this.disabled ? undefined : this.url}
                urlMatch={this.urlMatch}
                class={`${this.disabled ? 'disabled' : ''}`}
                aria-disabled={this.disabled}
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
