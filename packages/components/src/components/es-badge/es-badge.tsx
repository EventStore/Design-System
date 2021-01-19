import { Component, h, Prop, Host } from '@stencil/core';

export type BadgeVariant = 'dot' | HTMLEsCounterElement['variant'];
export type BadgeColor = 'error' | 'warning' | 'okay';

@Component({
    tag: 'es-badge',
    styleUrl: 'es-badge.css',
    shadow: true,
})
export class ESBadge {
    @Prop() variant: BadgeVariant = 'filled';
    @Prop() color: BadgeColor = 'error';
    @Prop() count!: number;
    @Prop() showZero = false;
    @Prop() size?: number;

    renderBadge = () => {
        switch (this.variant) {
            case 'dot': {
                return (
                    <span
                        class={{
                            dot: true,
                            active: this.showZero || this.count > 0,
                        }}
                    />
                );
            }
            default: {
                return (
                    <es-counter
                        size={this.size}
                        variant={this.variant}
                        count={this.count}
                        class={{
                            active: this.showZero || this.count > 0,
                        }}
                    />
                );
            }
        }
    };

    render() {
        return (
            <Host class={this.color}>
                <slot />
                {this.renderBadge()}
            </Host>
        );
    }
}
