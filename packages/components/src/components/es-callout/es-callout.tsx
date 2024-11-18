import { Component, h, Host, Prop } from '@stencil/core';
import { theme } from '@kurrent-ui/theme';
import type { IconDescription } from '../../components/es-icon/types';

export type EsCalloutVariant = 'tip' | 'info' | 'warning' | 'error';

/**
 * Calls out a piece of information.
 * @part heading - Targets the heading text.
 * @part icon - Targets the icon.
 */
@Component({
    tag: 'es-callout',
    styleUrl: 'es-callout.css',
    shadow: true,
})
export class EsCallout {
    /** Heading text. */
    @Prop() heading!: string;
    /** Which color set to use. */
    @Prop({ reflect: true }) variant: EsCalloutVariant = 'tip';
    /** Override the variant icon. */
    @Prop() icon?: IconDescription;

    render() {
        return (
            <Host high-contrast={theme.isHighContrast()}>
                <h1 part={'heading'}>{this.heading}</h1>
                <slot />
            </Host>
        );
    }
}
