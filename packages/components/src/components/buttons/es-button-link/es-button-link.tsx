import { Component, h, Prop, Host } from '@stencil/core';
import { theme } from '@eventstore/theme';
import { Link } from '@eventstore/router';

import type { ButtonVariant } from '../types';

/**
 * Anchor link version of es-button, wraps a `Link` from `@eventstore/router`.
 * @slot before - Placed before the main content with correct padding.
 * @slot after -  Placed after the main content with correct padding.
 * @part link - The internal a element.
 * @part inner - The inner span, wrapping the default slot.
 */
@Component({
    tag: 'es-button-link',
    styleUrl: '../button.css',
    shadow: true,
})
export class ButtonLink {
    /** Which styling variant to use */
    @Prop({ reflect: true }) variant: ButtonVariant = 'default';
    /** If the link is disabled. Prevents the user from interacting with the link: it cannot be pressed or focused. */
    @Prop({ reflect: true }) disabled?: boolean;
    /** Where the button should link to. */
    @Prop() url?: string;
    /** If the button should navigate within the router context, or force a refresh. */
    @Prop() forceRefresh?: boolean;
    /** Link is for an external site */
    @Prop() external?: boolean;

    /** Class for the contained anchor element */
    @Prop() anchorClass?: string;
    /** Role for the contained anchor element */
    @Prop() anchorRole?: string;
    /** Title for the contained anchor element */
    @Prop() anchorTitle?: string;
    /** Tab Index for the contained anchor element */
    @Prop() anchorTabIndex?: string;
    /** Id for the contained anchor element */
    @Prop() anchorId?: string;
    /** Target for link (eg: target="_blank") */
    @Prop() target?: string;

    render() {
        return (
            <Host high-contrast={theme.isHighContrast()} dark={theme.isDark()}>
                <Link
                    url={this.url}
                    forceRefresh={this.external || this.forceRefresh}
                    class={this.anchorClass}
                    role={this.anchorRole}
                    title={this.anchorTitle}
                    tabIndex={this.anchorTabIndex}
                    id={this.anchorId}
                    target={this.target ?? this.external ? '_blank' : undefined}
                    rel={this.external ? 'noopener' : undefined}
                    disabled={this.disabled}
                    part={'link'}
                >
                    <slot name={'before'} />
                    <span part={'inner'}>
                        <slot />
                    </span>
                    <slot name={'after'} />
                </Link>
            </Host>
        );
    }
}
