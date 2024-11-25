import { Component, h, Prop, State, Watch } from '@stencil/core';
import { sequences, MIN, MAX } from '../../sequences';

/**
 * Displays a sequence illustration.
 * If number isn't set, it will display one at random.
 */
@Component({
    tag: 'kurrent-sequence',
    styleUrl: 'sequence.css',
    shadow: true,
})
export class Sequence {
    /** Select the sequence to display. */
    @Prop() number?: number;

    @State() paths: string[] = [];

    componentWillLoad() {
        this.loadPaths();
    }

    @Watch('number')
    async loadPaths() {
        const n =
            this.number ?? Math.floor(Math.random() * (MAX - MIN + 1) + MIN);

        const sequence = Math.max(
            Math.min(Math.floor(n), MAX),
            MIN,
        ) as keyof typeof sequences;

        this.paths = await sequences[sequence];
    }

    render() {
        return (
            <svg
                width={'100%'}
                height={'100%'}
                viewBox={'0 0 378 385'}
                fill={'currentColor'}
                xmlns={'http://www.w3.org/2000/svg'}
            >
                {this.paths.map((d) => (
                    <path d={d} />
                ))}
            </svg>
        );
    }
}
