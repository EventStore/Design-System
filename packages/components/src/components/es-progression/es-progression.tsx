import { Component, h, Prop, Event } from '@stencil/core';
import { EventEmitter } from 'events';

export interface Checkpoint {
    id: string;
    title: string;
    disabled?: true;
}

@Component({
    tag: 'es-progression',
    styleUrl: 'es-progression.css',
    shadow: true,
})
export class Progression {
    @Event({ bubbles: true }) progressionRequest!: EventEmitter;

    @Prop() checkpoints!: Checkpoint[];
    @Prop() location!: string;

    render() {
        return this.checkpoints.map(
            ({ id, title, disabled = false }, i, { length }) => {
                const active = id === this.location;
                const last = i === length - 1;

                return [
                    <button
                        key={id}
                        type={'button'}
                        class={{ active, disabled }}
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
                        <svg height={30} width={100} class={'connection'}>
                            <line
                                class={'line'}
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
