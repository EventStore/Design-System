/* eslint-disable no-console */

export interface LogFn {
    (...args: any[]): void;
    once: (...args: any[]) => void;
}

export interface Logger {
    log: LogFn;
    warn: LogFn;
    error: LogFn;
    groupCollapsed: LogFn;
    groupEnd: LogFn;
}

export interface LogEvent {
    level: 'info' | 'warn' | 'error';
    group: any[][];
    logger: string;
    message: any[];
}
type Subscription = (event: LogEvent) => void;
const subscriptions = new Set<Subscription>();

const isBrowser =
    typeof process === 'undefined' || process?.versions?.node == null;

interface createLogger {
    (name: string, color?: string): Logger;
    subscribe(fn: Subscription): () => void;
}

/**
 * Create a standardised logger, and subscribe to logs. Used across Design System libraries.
 *
 * | Argument   | Description                                                                                    | Required |
 * | ---------- | ---------------------------------------------------------------------------------------------- | -------- |
 * | name       | The name of your logger.                                                                       | yes      |
 * | background | A css background for your logger namespace. Allows it to be easily differentiated at a glance. |          |
 *
 * Example:
 *
 * ```ts
 * import { createLogger } from '@kurrent-ui/utils';
 * const logger = createLogger('Documentation', 'blue');
 *
 * logger.log('hello');
 *
 * // node
 * // [Documentation] hello
 *
 * // browser (name has a 'blue' background)
 * // (Documentation) hello
 * ```
 *
 * ## `logger`
 *
 * The returned output of `createLogger`. Maps closely to `console`.
 *
 * | Method           | Description                  | Logs to console  | Calls subscriptions |
 * | ---------------- | ---------------------------- | ---------------- | ------------------- |
 * | `log`            | An info level log.           | development only | always              |
 * | `warn`           | An warn level log.           | development only | always              |
 * | `error`          | An error level log.          | always           | always              |
 * | `log.once`       | Logs at an info level once.  | development only | always              |
 * | `warn.once`      | Logs at an warn level once.. | development only | always              |
 * | `error.once`     | Logs at an error level once. | always           | always              |
 * | `groupCollapsed` | Start a collapsed log group. | development only |                     |
 * | `groupEnd`       | Close a log group            | development only |                     |
 *
 * ## `createLogger.subscribe`
 *
 * Adds a subsciption to all calls to loggers. Returns an unsubscribe function. If a subscription throws an error, it will be silently ignored.
 *
 * ```ts
 * import { createLogger } from '@kurrent-ui/utils';
 *
 * const unsubscribe = createLogger.subscribe((logEvent) => {
 *     navigator.clipboard.writeText(JSON.stringify(logEvent));
 * });
 *
 * const logger = createLogger('Documentation', 'blue');
 *
 * logger.log('hello');
 *
 * // subscription called with:
 * // {
 * //     level: 'info',
 * //     logger: 'Documentation',
 * //     message: ['hello'],
 * //     group: [],
 * // }
 *
 * logger.groupCollapsed('my group');
 *
 * logger.warn('hello again', { an: 'object' });
 *
 * // subscription called with:
 * // {
 * //     level: 'warn',
 * //     message: ['hello again', { an: 'object' }],
 * //     logger: 'Documentation',
 * //     group: [['my group']],
 * // }
 *
 * logger.groupEnd();
 *
 * unsubscribe();
 * // subscription removed
 * ```
 *
 * **logEvent**
 * | Key | Value | Description |
 * | --- | ----- | ----------- |
 * | level | `'info'` \| `'warn'` \| `'error'` | The log level called. |
 * | message | `any[]` | The arguments passed to the logging function. |
 * | logger | `string` | Which logger was called. |
 * | group | `any[][]` | An array of the log groups the logger was called in, with the arguments passed to each group. |
 */
export function createLogger(name: string, color = 'black'): Logger {
    const styles = [
        `background: ${color}`,
        'border-radius: 0.5em',
        'color: white',
        'font-weight: bold',
        'padding: 2px 0.5em',
    ];

    const group: any[] = [];
    const createLogFunction = (method: keyof Omit<Console, 'Console'>) => {
        const log = (...args: any[]): void => {
            if (method === 'groupCollapsed') {
                group.push(args);
            } else if (method === 'groupEnd') {
                group.pop();
            }

            if (process.env.NODE_ENV !== 'production' || method === 'error') {
                const prefix =
                    group.length || !name
                        ? []
                        : isBrowser
                        ? [`%c${name}`, styles.join(';')]
                        : [`[${name}]`];

                (console[method] as any)(...prefix, ...args);
            }

            if (method !== 'error' && method !== 'warn' && method !== 'log') {
                return;
            }

            const event: LogEvent = {
                level: method === 'log' ? 'info' : method,
                group,
                logger: name,
                message: args,
            };

            for (const fn of Array.from(subscriptions)) {
                try {
                    fn(event);
                } catch (error) {
                    // silently fail.
                }
            }
        };

        const logged: Record<string, true> = {};

        log.once = (...args: any[]) => {
            const ident = args.toString();

            if (!logged[ident]) {
                logged[ident] = true;
                log(...args);
            }
        };

        return log;
    };

    return {
        log: createLogFunction('log'),
        warn: createLogFunction('warn'),
        error: createLogFunction('error'),
        groupCollapsed: createLogFunction('groupCollapsed'),
        groupEnd: createLogFunction('groupEnd'),
    };
}

createLogger.subscribe = (fn: Subscription) => {
    subscriptions.add(fn);

    return () => {
        subscriptions.delete(fn);
    };
};
