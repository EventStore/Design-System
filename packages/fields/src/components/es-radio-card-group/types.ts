import type { RenderFunction } from '../../types';

/** An option to be selected */
export interface RadioCardGroupOption {
    /** The string to be used as a value. */
    value: string;
    /** A name to display. */
    name: string;
    /** A longer description to be displayed. */
    description?: string;
    /** If the option is disabled. */
    disabled?: boolean;
    /** Other values associated with the option. */
    [key: string]: any;
}

export type RenderCard<T extends RadioCardGroupOption> = RenderFunction<
    [
        /** The option to be rendered */
        option: T,
        /** If the option is currently selected */
        active: boolean,
    ]
>;
