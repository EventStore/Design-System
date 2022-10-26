interface RateLimit<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): void;
    clear(): void;
    flush(): void;
}

/**
 * Rate Limit a function, ignoring subsiquent calls until the timeout has passed.
 *
 * | Argument | Description                                      | Required |
 * | -------- | ------------------------------------------------ | -------- |
 * | fn       | The function to rate limit.                      | yes      |
 * | ms       | The minimum amount of time between calls (in ms) | yes      |
 *
 * Example:
 *
 * ```ts
 * import { rateLimit } from '@eventstore-ui/utils';
 * const rateLimitedLog = rateLimit(console.log, 200);
 *
 * for (let i = 0; i < 1000; i++) {
 *     rateLimitedLog(`Hello ${i}`);
 *     await delay(50);
 * }
 * // console
 * // Hello 0
 * // Hello 4
 * // Hello 9
 * // Hello 13
 * // Hello 17
 * // etc..
 * ```
 *
 * ## `RateLimit.clear`
 *
 * Cancels the queued function call.
 * Example:
 *
 * ```ts
 * import { rateLimit } from '@eventstore-ui/utils';
 * const rateLimitedLog = rateLimit(console.log, 200);
 * rateLimitedLog('hello');
 * rateLimitedLog('hello');
 * rateLimitedLog('hello');
 * rateLimitedLog('hello');
 * debouncedLog.clear();
 * // console (Nothing logged)
 * ```
 *
 * ## `RateLimit.flush`
 *
 * Immediately calls the queued function call.
 * Example:
 *
 * ```ts
 * import { rateLimit } from '@eventstore-ui/utils';
 * const rateLimitedLog = rateLimit(console.log, 200);
 * rateLimitedLog('hello');
 * rateLimitedLog('hello');
 * rateLimitedLog('hello');
 * rateLimitedLog('hello');
 * rateLimitedLog.flush();
 * // console (Immediately)
 * // hello
 * ```
 */
export function rateLimit<T extends (...args: any[]) => any>(
    fn: T,
    ms: number,
): RateLimit<T> {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let action: () => void;
    let frame: ReturnType<typeof requestAnimationFrame> = -1;

    function RateLimit(...args: Parameters<T>) {
        action = () => {
            timeoutId = undefined;
            return fn(...args);
        };
        if (frame !== -1 || timeoutId) return;
        frame = requestAnimationFrame(() => {
            frame = -1;
            timeoutId = setTimeout(action, ms);
        });
    }

    RateLimit.clear = () => {
        clearTimeout(timeoutId!);
        cancelAnimationFrame(frame);
    };

    RateLimit.flush = () => {
        clearTimeout(timeoutId!);
        cancelAnimationFrame(frame);
        action?.();
    };

    return RateLimit;
}
