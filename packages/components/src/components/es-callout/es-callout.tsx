import { Component, h, Host, Prop } from '@stencil/core';

export type EsCalloutVariant = 'tip' | 'warning' | 'error';

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
    /**
     * Heading text.
     */
    @Prop() heading!: string;
    /**
     * Which color set to use.
     */
    @Prop({ reflect: true }) variant: EsCalloutVariant = 'tip';
    /**
     * Override the variant icon.
     */
    @Prop() icon?: string;

    render() {
        return (
            <Host>
                <es-icon part={'icon'} icon={this.getIcon()} />
                <h1 part={'heading'}>{this.heading}</h1>
                <slot />
            </Host>
        );
    }

    private getIcon = () => {
        if (this.icon) return this.icon;

        switch (this.variant) {
            case 'error':
            case 'warning':
                return 'warning';
            case 'tip':
            default:
                return 'lightbulb';
        }
    };
}
