import { Component, h, Prop, Host, Watch, State } from '@stencil/core';

export type CounterVariant = 'filled' | 'outline' | 'minimal';
export type CounterColor = 'error' | 'warning' | 'okay';

/** A pill display of an number, that pulses on change. Caps out at 999. */
@Component({
    tag: 'es-counter',
    styleUrl: 'es-counter.css',
    shadow: true,
})
export class Counter {
    /** The number to display */
    @Prop() count: number = 0;
    /** The height of the counter that the rest of the dimensions scale from */
    @Prop() size: number = 24;
    /** The display style of the counter. */
    @Prop({ reflect: true }) variant: CounterVariant = 'filled';
    /** Choose the color variant of the counter */
    @Prop() color?: CounterColor;

    @State() pulsing: boolean = false;

    private timeout!: ReturnType<typeof setTimeout>;

    disconnectCallback() {
        clearTimeout(this.timeout);
    }

    @Watch('count') pulse() {
        this.pulsing = true;
        this.timeout = setTimeout(() => (this.pulsing = false), 300);
    }

    render() {
        const height = this.size;
        const width =
            this.count > 999
                ? this.size * 2.2
                : this.count > 99
                ? this.size * 1.6
                : this.size;

        return (
            <Host
                class={{
                    pulse: this.pulsing,
                    [this.color ?? '']: this.color !== null,
                }}
            >
                <svg
                    xmlns={'http://www.w3.org/2000/svg'}
                    height={height}
                    width={width}
                >
                    <rect
                        x={1}
                        y={1}
                        width={width - 2}
                        height={height - 2}
                        rx={this.size / 2}
                    />
                    <text
                        x={'50%'}
                        dy={'70%'}
                        text-anchor={'middle'}
                        style={{ fontSize: `${this.size * 0.54}px` }}
                    >
                        {this.count > 999 ? '999+' : `${this.count}`}
                    </text>
                </svg>
            </Host>
        );
    }
}
