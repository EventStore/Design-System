import { Component, h, Host, Prop } from '@stencil/core';
import { theme } from '@eventstore/theme';
import type { IconDescription } from '../../components/es-icon/types';
import { ICON_NAMESPACE } from '../../icons/namespace';

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
                <es-icon part={'icon'} icon={this.getIcon()} />
                <h1 part={'heading'}>{this.heading}</h1>
                <slot />
            </Host>
        );
    }

    private getIcon = (): IconDescription => {
        if (this.icon) return this.icon;

        switch (this.variant) {
            case 'error':
            case 'warning':
                return [ICON_NAMESPACE, 'warning'];
            case 'info':
                return [ICON_NAMESPACE, 'info'];
            case 'tip':
            default:
                return [ICON_NAMESPACE, 'lightbulb'];
        }
    };
}
