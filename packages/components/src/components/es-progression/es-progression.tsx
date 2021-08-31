import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

export interface Checkpoint {
    id: string;
    title: string;
    disabled?: true;
}

/** A wizard progression bar. */
@Component({
    tag: 'es-progression',
    styleUrl: 'es-progression.css',
    shadow: true,
})
export class Progression {
    /** Emitted when a checkpoint is clicked. */
    @Event({ bubbles: true }) progressionRequest!: EventEmitter<string>;

    /** A list of checkpoints to display. */
    @Prop() checkpoints!: Checkpoint[];
    /** The current active location. */
    @Prop() location!: string;

    render() {
        const activeIndex = this.checkpoints.findIndex(
            ({ id }) => id === this.location,
        );

        return this.checkpoints.map(
            ({ id, title, disabled = false }, i, { length }) => {
                const active = id === this.location;
                const last = i === length - 1;
                const completed = activeIndex > i;

                return [
                    <button
                        key={id}
                        type={'button'}
                        class={{ active, disabled, completed }}
                        disabled={disabled}
                        tabindex={active ? -1 : 0}
                        onClick={() => this.progressionRequest.emit(id)}
                    >
                        <svg width={30} height={30} class={'blob'}>
                            <g fill={'transparent'}>
                                <circle
                                    class={'center'}
                                    cx={15}
                                    cy={15}
                                    r={8}
                                />
                                <circle
                                    stroke-width={2}
                                    class={'outline'}
                                    cx={15}
                                    cy={15}
                                    r={14}
                                />
                            </g>
                        </svg>
                        {title}
                    </button>,
                    !last && (
                        <svg
                            height={30}
                            width={100}
                            class={{ connection: true, completed }}
                        >
                            <line
                                x1={0}
                                x2={100}
                                y1={15}
                                y2={15}
                                stroke={'transparent'}
                                stroke-width={4}
                            />
                        </svg>
                    ),
                ];
            },
        );
    }
}
