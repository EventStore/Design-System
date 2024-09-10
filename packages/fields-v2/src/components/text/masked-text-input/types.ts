/**
 * Options for applying a mask to an input.
 * Uses [imask.js](https://imask.js.org/) internally.
 */
export interface MaskOptions {
    /** The mask to apply. See [imask.js](https://imask.js.org/guide.html#masked-base) */
    mask: any;
    /** If the value should be unmasked on fieldchange */
    unmask?: boolean;
    /** Enables characters overwriting instead of inserting. See [imask.js](https://imask.js.org/guide.html#overwrite) */
    overwrite?: boolean;
    /** Placeholder to use in the mask. */
    placeholderChar?: string;
    /** Make placeholder always visible. */
    lazy?: boolean;
    /** Definitions for a pattern mask. See [imask.js](https://imask.js.org/guide.html#masked-pattern) */
    definitions?: Record<string, any>;
    /** Blocks for a pattern mask. See [imask.js](https://imask.js.org/guide.html#masked-pattern) */
    blocks?: Record<string, any>;
}
