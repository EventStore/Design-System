import { Component, h, Prop } from '@stencil/core';
import { Link } from '@eventstore/router';

import { ButtonVariant, ButtonColor } from '../types';

@Component({
    tag: 'es-button-link',
    styleUrl: '../button.css',
    shadow: true,
})
export class ButtonLink {
    @Prop({ reflect: true }) variant: ButtonVariant = 'filled';
    @Prop({ reflect: true }) color: ButtonColor = 'primary';
    @Prop({ reflect: true }) disabled?: boolean;
    @Prop() url?: string;
    @Prop() forceRefresh?: boolean;

    @Prop() anchorClass: string = '';
    @Prop() anchorRole?: string;
    @Prop() anchorTitle?: string;
    @Prop() anchorTabIndex?: string;
    @Prop() anchorId?: string;
    @Prop() target?: string;
    @Prop() ariaHaspopup?: string;
    @Prop() ariaPosinset?: string;
    @Prop() ariaSetsize?: number;
    @Prop() ariaLabel?: string;

    render() {
        return (
            <Link
                url={this.url}
                forceRefresh={this.forceRefresh}
                class={`anchor ${this.anchorClass}`}
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
