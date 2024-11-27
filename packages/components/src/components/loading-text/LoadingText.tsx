import { h, type FunctionalComponent } from '@stencil/core';

export interface LoadingTextProps {
    /** The expected loaded text length. */
    expectedLength: number;
    /** Adds a random number of chars (up to the passed amount) */
    variance?: number;
    /** Auto wraps the passed string in an c2-copy */
    copy?: boolean;
}

/**
 * Displays an c2-loading-text if the passed child is empty.
 */
export const LoadingText: FunctionalComponent<LoadingTextProps> = (
    { copy = false, ...props },
    children,
) =>
    children.every((t) => t == null) ? (
        <c2-loading-text {...props} />
    ) : copy ? (
        <c2-copy>{children}</c2-copy>
    ) : (
        children
    );
