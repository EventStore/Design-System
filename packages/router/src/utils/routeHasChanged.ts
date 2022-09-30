import type { MatchResults } from './../types';

/** Determindes if the params of two routes differ. */
export const routeHasChanged = (
    next?: MatchResults,
    prev?: MatchResults,
): boolean => {
    if (!next || !prev) return true;

    for (const [key, value] of Object.entries(next.params)) {
        if (prev.params[key] !== value) {
            return true;
        }
    }

    return false;
};
