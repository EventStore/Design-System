import { Component, h, Host, Prop } from '@stencil/core';

export type EsCalloutVariant = 'tip' | 'warning' | 'error';

@Component({
    tag: 'es-callout',
    styleUrl: 'es-callout.css',
    shadow: true,
})
export class EsCallout {
    @Prop() heading!: string;
    @Prop({ reflect: true }) variant: EsCalloutVariant = 'tip';
    @Prop() icon?: string;

    render() {
        return (
            <Host>
                <es-icon icon={this.getIcon()} />
                <h1>{this.heading}</h1>
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
