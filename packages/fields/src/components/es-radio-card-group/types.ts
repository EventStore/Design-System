import type { RenderFunction } from '../../types';

/** An option to be selected */
export interface RadioCardGroupOption {
    /** The id of the option, to be used as its value. */
    id: string;
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
