import { Component, h, Prop, Host } from '@stencil/core';

export type BadgeVariant = 'dot' | HTMLC2CounterElement['variant'];

/**
 * Display a counter or dot beside a component to indicate action being required.
 */
@Component({
    tag: 'c2-badge',
    styleUrl: 'badge.css',
    shadow: true,
})
export class ESBadge {
    /** Select the display variant of the badge */
    @Prop() variant: BadgeVariant = 'filled';
    /** Choose the color variant of the badge */
    @Prop() color: HTMLC2CounterElement['color'] = 'error';
    /** What number to display in the counter (or if the dot should display) */
    @Prop() count!: number;
    /** Show the dot and counter even if the count 0 (or negative) */
    @Prop() showZero = false;
    /** The base size (in px) of the counter (has no effect on the dot) */
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
                    <c2-counter
                        size={this.size}
                        variant={this.variant}
                        count={this.count}
                        color={this.color}
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
