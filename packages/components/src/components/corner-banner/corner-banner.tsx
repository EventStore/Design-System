import { Component, h, Prop, Host } from '@stencil/core';

export type CornerBannerVariant = 'error' | 'warning' | 'success' | 'info';

/**
 * Display a banner with text in the corner.
 */
@Component({
    tag: 'c2-corner-banner',
    styleUrl: 'corner-banner.css',
    shadow: true,
})
export class YCornerBanner {
    /** Which styling variant to use. */
    @Prop({ reflect: true }) variant: CornerBannerVariant = 'info';
    /** Y location of the banner */
    @Prop() y: 'top' | 'bottom' = 'top';
    /** X location of the banner. */
    @Prop() x: 'left' | 'right' = 'left';

    render() {
        return (
            <Host {...{ [this.y]: true, [this.x]: true }}>
                <slot />
            </Host>
        );
    }
}
