interface Debounce<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): void;
    clear(): void;
    flush(): void;
}

/**
 * Debounce a function, only making the call if the passed timeout is reached.
 *
 * | Argument | Description                               | Required |
 * | -------- | ----------------------------------------- | -------- |
 * | fn       | The function to debounce.                 | yes      |
 * | ms       | The amount of time to debounce by (in ms) | yes      |
 *
 * Example:
 *
 * ```ts
 * import { debounce } from '@eventstore-ui/utils';
 *
 * const debouncedLog = debounce(console.log, 200);
 *
 * debouncedLog('hello');
 * debouncedLog('hello');
 * debouncedLog('hello');
 * debouncedLog('hello');
 *
 * // console (After 200ms)
 * // hello
 * ```
 *
 * ## `Debounce.clear`
 *
 * Cancels the queued function call.
 *
 * Example:
 *
 * ```ts
 * import { debounce } from '@eventstore-ui/utils';
 *
 * const debouncedLog = debounce(console.log, 200);
 *
 * debouncedLog('hello');
 * debouncedLog('hello');
 * debouncedLog('hello');
 * debouncedLog('hello');
 * debouncedLog.clear();
 *
 * // console (Nothing logged)
 * ```
 *
 * ## `Debounce.flush`
 *
 * Immediately calls the queued function call.
 *
 * Example:
 *
 * ```ts
 * import { debounce } from '@eventstore-ui/utils';
 *
 * const debouncedLog = debounce(console.log, 200);
 *
 * debouncedLog('hello');
 * debouncedLog('hello');
 * debouncedLog('hello');
 * debouncedLog('hello');
 * debouncedLog.flush();
 *
 * // console (Immediately)
 * // hello
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    ms: number,
): Debounce<T> {
    let timeoutId: ReturnType<typeof setTimeout>;
    let action: () => void;
    let frame: ReturnType<typeof requestAnimationFrame> = -1;

    function Debounce(...args: Parameters<T>) {
        action = () => fn(...args);
        if (frame !== -1) return;
        clearTimeout(timeoutId);
        frame = requestAnimationFrame(() => {
            frame = -1;
            timeoutId = setTimeout(action, ms);
        });
    }

    Debounce.clear = () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(frame);
    };

    Debounce.flush = () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(frame);
        action?.();
    };

    return Debounce;
}
