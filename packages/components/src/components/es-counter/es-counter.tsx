import { Component, h, Prop, Host, Watch, State } from '@stencil/core';

export type CounterVariant = 'filled' | 'outline' | 'minimal';

@Component({
    tag: 'es-counter',
    styleUrl: 'es-counter.css',
    shadow: true,
})
export class Counter {
    @Prop() count: number = 0;
    @Prop() size: number = 24;
    @Prop({ reflect: true }) variant: CounterVariant = 'filled';
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
            <Host class={{ pulse: this.pulsing }}>
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
                    <text x={'50%'} dy={'70%'} text-anchor={'middle'}>
                        {this.count > 999 ? '999+' : `${this.count}`}
                    </text>
                </svg>
            </Host>
        );
    }
}
