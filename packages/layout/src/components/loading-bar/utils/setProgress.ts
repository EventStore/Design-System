import type { LoadingBarStatus } from '../types';

const BARS = Symbol.for('k-layout/bars');
type BarMap = Map<string, HTMLL2LoadingBarElement>;

declare global {
    interface Window {
        [BARS]?: BarMap;
    }
}

const bars: BarMap = (window[BARS] = window[BARS] ?? new Map());

/**
 *  Sets the progress of the bar with passed name (if available).
 */
export const setProgress =
    (
        /** The name of the bar to set progress on. */
        name: string,
    ) =>
    (
        /** The completion percentage (0 - 100) */
        completion: number,
        /** The status of the bar. */
        status?: LoadingBarStatus,
    ) => {
        bars.get(name)?.progress(completion, status);
    };

export const registerAsBar = (name: string, bar: HTMLL2LoadingBarElement) => {
    bars.set(name, bar);
    return () => {
        bars.delete(name);
    };
};
