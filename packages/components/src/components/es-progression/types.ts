import type { IconDescription } from '../es-icon/types';

export type CheckpointState = 'active' | 'complete' | 'inactive';

export interface Checkpoint {
    id: string;
    title: string;
    disabled?: true;
    color?: (state: CheckpointState) => string | undefined;
    icon?: (state: CheckpointState) => IconDescription | undefined;
}
