import type { IconDescription } from '../icon/types';

export type CheckpointState = 'active' | 'complete' | 'inactive';

export interface Checkpoint {
    id: string;
    title: string;
    disabled?: true;
    readonly?: boolean;
    color?: (state: CheckpointState) => string | undefined;
    icon?: (state: CheckpointState) => IconDescription | undefined;
}
