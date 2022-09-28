import { h, FunctionalComponent } from '@stencil/core';

export interface LoadingTextProps {
    /** The expected loaded text length. */
    expectedLength: number;
    /** Adds a random number of chars (up to the passed amount) */
    variance?: number;
    /** Auto wraps the passed string in an es-copy */
    copy?: boolean;
}

/**
 * Displays an es-loading-text if the passed child is empty.
 */
export const LoadingText: FunctionalComponent<LoadingTextProps> = (
    { copy = false, ...props },
    children,
) =>
    children.every((t) => t == null) ? (
        <es-loading-text {...props} />
    ) : copy ? (
        <es-copy>{children}</es-copy>
    ) : (
        children
    );
