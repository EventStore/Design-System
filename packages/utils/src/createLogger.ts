/* eslint-disable no-console */
import { Build } from '@stencil/core';

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

export const createLogger = (name: string, color = 'black'): Logger => {
    const styles = [
        `background: ${color}`,
        'border-radius: 0.5em',
        'color: white',
        'font-weight: bold',
        'padding: 2px 0.5em',
    ];

    let inGroup = 0;
    const createLogFunction = (method: keyof typeof console) => {
        const log = (...args: any[]): void => {
            if (Build.isBrowser || method === 'error') {
                const prefix =
                    inGroup || !name
                        ? []
                        : Build.isBrowser
                        ? [`%c${name}`, styles.join(';')]
                        : [`[${name}]`];

                console[method](...prefix, ...args);

                if (method === 'groupCollapsed') {
                    inGroup += 1;
                }
                if (method === 'groupEnd') {
                    inGroup -= 1;
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
