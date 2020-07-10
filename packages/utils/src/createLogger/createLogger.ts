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

const subscribe = (fn: Subscription) => {
    subscriptions.add(fn);

    return () => {
        subscriptions.delete(fn);
    };
};

const isBrowser =
    typeof process === 'undefined' || process?.versions?.node == null;

const createLogger = (name: string, color = 'black'): Logger => {
    const styles = [
        `background: ${color}`,
        'border-radius: 0.5em',
        'color: white',
        'font-weight: bold',
        'padding: 2px 0.5em',
    ];

    const group: any[] = [];
    const createLogFunction = (method: keyof typeof console) => {
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

                console[method](...prefix, ...args);
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
};

createLogger.subscribe = subscribe;

export { createLogger };
