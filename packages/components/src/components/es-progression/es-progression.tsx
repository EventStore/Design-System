import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ICON_NAMESPACE } from '../../icons/namespace';
import type { IconDescription } from '../es-icon/types';
import type { Checkpoint, CheckpointState } from './types';

interface TransformedCheckpoint extends Omit<Checkpoint, 'color' | 'icon'> {
    state: CheckpointState;
    icon?: IconDescription;
    color: string;
    inactiveColor: string;
}

/**
 * A wizard progression bar.
 * @part checkpoint - A checkpoint button
 * @part [state] - The current state of the checkpoint button.
 * @part blob - An indicator blob.
 * @part center - A central icon in the indicator blob.
 * @part connection - A connection between two checkpoints.
 */
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
    /** Set custom colors for all checkpoints */
    @Prop() colors?: Partial<Record<CheckpointState, string>>;
    /** Set custom icons for all checkpoints */
    @Prop() icons?: Partial<Record<CheckpointState, IconDescription>>;

    private transformedCheckpoints: TransformedCheckpoint[] = [];

    componentWillRender() {
        const activeIndex = this.checkpoints.findIndex(
            ({ id }) => id === this.location,
        );
        this.transformedCheckpoints = this.checkpoints.map((checkpoint, i) => {
            const active = checkpoint.id === this.location;
            const completed = activeIndex > i;
            const state = active
                ? 'active'
                : completed
                ? 'complete'
                : 'inactive';

            return {
                ...checkpoint,
                state,
                icon: this.icon(checkpoint, state),
                color: this.color(checkpoint, state),
                inactiveColor: this.color(checkpoint, 'inactive'),
            };
        });
    }

    render() {
        // Array is flattened so each child has a key.
        return this.transformedCheckpoints.flatMap(
            (
                {
                    id,
                    title,
                    disabled = false,
                    color,
                    inactiveColor,
                    icon,
                    state,
                },
                i,
            ) => {
                const next = this.transformedCheckpoints[i + 1];
                return [
                    <button
                        key={id}
                        type={'button'}
                        part={`checkpoint ${state}`}
                        class={state}
                        disabled={disabled}
                        tabindex={state === 'active' ? -1 : 0}
                        onClick={() => this.progressionRequest.emit(id)}
                        style={{
                            '--checkpoint-color': color,
                        }}
                    >
                        <div class={'blob'} part={'blob'}>
                            <es-icon
                                part={'center'}
                                class={{ center: true, custom: !!icon }}
                                icon={icon ?? [ICON_NAMESPACE, 'circle']}
                                size={16}
                            />
                        </div>
                        {title}
                    </button>,
                    !!next && (
                        <svg
                            key={`${id}-${next.id}`}
                            height={30}
                            width={100}
                            class={'connection'}
                            part={'connection'}
                        >
                            <defs>
                                <linearGradient id={`stroke_${id}-${next.id}`}>
                                    <stop
                                        offset="0%"
                                        stop-color={
                                            state === 'active'
                                                ? inactiveColor
                                                : color
                                        }
                                    />
                                    <stop
                                        offset="100%"
                                        stop-color={next.color}
                                    />
                                </linearGradient>
                            </defs>
                            <rect
                                x={0}
                                width={100}
                                y={13}
                                height={4}
                                fill={`url(#stroke_${id}-${next.id})`}
                            />
                        </svg>
                    ),
                ];
            },
        );
    }

    private icon = (checkpoint: Checkpoint, state: CheckpointState) =>
        checkpoint.icon?.(state) ?? this.icons?.[state];

    private color = (checkpoint: Checkpoint, state: CheckpointState) =>
        checkpoint.color?.(state) ??
        this.colors?.[state] ??
        this.defaultColors[state];

    private defaultColors: Record<CheckpointState, string> = {
        active: 'var(--color-secondary)',
        complete: 'var(--color-secondary)',
        inactive: 'var(--color-shade-30)',
    };
}
