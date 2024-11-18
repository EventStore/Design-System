import { Component, forceUpdate, h, Host, State } from '@stencil/core';
import type { CounterVariant, CounterColor } from '../types';

const random = (max: number, min: number = 0) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

/** Counter */
@Component({
    tag: 'es-counter-demo',
    shadow: true,
})
export class Counter {
    private variant: CounterVariant[] = ['filled', 'outline', 'minimal'];
    private colors: CounterColor[] = ['error', 'okay', 'warning'];
    private quantity = 600;

    @State() counts = Array.from({ length: this.quantity }, () => random(800));
    @State() variants = Array.from(
        { length: this.quantity },
        (): [variant: CounterVariant, color: CounterColor] => [
            this.variant[random(2)],
            this.colors[random(3)],
        ],
    );

    @State() btn0Count = random(800);
    @State() btn1Count = random(800);
    @State() btn2Count = random(800);

    private interval!: ReturnType<typeof setTimeout>;

    componentWillLoad() {
        this.interval = setInterval(() => {
            const key = random(this.quantity);
            this.counts[key] += 1;
            forceUpdate(this);
        }, 10);
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Host
                style={{
                    padding: '10px',
                    display: 'block',
                }}
            >
                <h1>Button color inheritance</h1>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <es-button onClick={() => (this.btn0Count += 1)}>
                        <es-counter slot={'before'} count={this.btn0Count} />
                        {'click me'}
                    </es-button>
                    <es-button
                        onClick={() => (this.btn1Count += 1)}
                        variant={'cancel'}
                    >
                        <es-counter slot={'before'} count={this.btn1Count} />
                        {'Dont click me'}
                    </es-button>
                    <es-button
                        onClick={() => (this.btn2Count += 1)}
                        variant={'delete'}
                    >
                        <es-counter slot={'before'} count={this.btn2Count} />
                        {'Never click me'}
                    </es-button>
                </div>
                <h1>Standalone</h1>
                <div
                    style={{
                        display: 'grid',
                        'grid-template-columns':
                            'repeat(20, minmax(12px, 1fr))',
                        gap: '10px',
                        'align-items': 'center',
                        'justify-content': 'center',
                        'align-content': 'center',
                    }}
                >
                    {this.variants.map(([variant, color], i) => (
                        <es-counter
                            key={i}
                            count={this.counts[i]}
                            variant={variant}
                            color={color}
                        />
                    ))}
                </div>
            </Host>
        );
    }
}
