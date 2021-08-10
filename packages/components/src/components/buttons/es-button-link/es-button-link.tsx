import { Component, h, Prop } from '@stencil/core';
import { Link } from '@eventstore/router';

import { ButtonVariant, ButtonColor } from '../types';

/**
 * Anchor link version of es-button, wraps a `Link` from `@eventstore/router`.
 * @slot before - Placed before the main content with correct padding.
 * @slot after -  Placed after the main content with correct padding.
 */
@Component({
    tag: 'es-button-link',
    styleUrl: '../button.css',
    shadow: true,
})
export class ButtonLink {
    /** Which styling variant to use */
    @Prop({ reflect: true }) variant: ButtonVariant = 'filled';
    /** Which color pair the button should use. */
    @Prop({ reflect: true }) color: ButtonColor = 'primary';
    /** If the link is disabled. Prevents the user from interacting with the link: it cannot be pressed or focused. */
    @Prop({ reflect: true }) disabled?: boolean;
    /** Where the button should link to. */
    @Prop() url?: string;
    /** If the button should navigate within the router context, or force a refresh. */
    @Prop() forceRefresh?: boolean;

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
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    @Prop() ariaHaspopup?: string;
    /**  Defines an element's number or position in the current set of listitems or treeitems. */
    @Prop() ariaPosinset?: string;
    /** Defines the number of items in the current set of listitems or treeitems. */
    @Prop() ariaSetsize?: number;
    /** Fefines a string value that labels the current element. */
    @Prop() ariaLabel?: string;

    render() {
        return (
            <Link
                url={this.url}
                forceRefresh={this.forceRefresh}
                class={`anchor ${this.anchorClass ?? ''}`}
                role={this.anchorRole}
                title={this.anchorTitle}
                tabIndex={this.anchorTabIndex}
                id={this.anchorId}
                ariaHaspopup={this.ariaHaspopup}
                ariaPosinset={this.ariaPosinset}
                ariaSetsize={this.ariaSetsize}
                ariaLabel={this.ariaLabel}
                target={this.target}
                disabled={this.disabled}
            >
                <slot name={'before'} />
                <span>
                    <slot />
                </span>
                <slot name={'after'} />
            </Link>
        );
    }
}
