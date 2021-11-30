// Adapted from the https://github.com/ReactTraining/history and converted to TypeScript

import type { Listener, LocationSegments, Prompt } from '../types';
import { logger } from './logger';

export const createTransitionManager = () => {
    let prompt: Prompt | string | null;
    let listeners: Array<Listener> = [];

    const setPrompt = (nextPrompt: Prompt | string | null) => {
        if (prompt != null) {
            logger.warn('A history supports only one prompt at a time');
        }

        prompt = nextPrompt;

        return () => {
            if (prompt === nextPrompt) {
                prompt = null;
            }
        };
    };

    const confirmTransitionTo = (
        location: LocationSegments,
        action: string,
        getUserConfirmation: (
            result: string,
            cb: (success: boolean) => void,
        ) => void,
        callback: (success: boolean) => void,
    ) => {
        // TODO: If another transition starts while we're still confirming
        // the previous one, we may end up in a weird state. Figure out the
        // best way to handle this.
        if (prompt != null) {
            const result =
                typeof prompt === 'function'
                    ? prompt(location, action)
                    : prompt;

            if (typeof result === 'string') {
                if (typeof getUserConfirmation === 'function') {
                    getUserConfirmation(result, callback);
                } else {
                    logger.warn(
                        'A history needs a getUserConfirmation function in order to use a prompt message',
                    );

                    callback(true);
                }
            } else {
                // Return false from a transition hook to cancel the transition.
                callback(result !== false);
            }
        } else {
            callback(true);
        }
    };

    const appendListener = (fn: Listener) => {
        let isActive = true;

        const listener: Listener = (location, action) => {
            if (isActive) {
                fn(location, action);
            }
        };

        listeners.push(listener);

        return () => {
            isActive = false;
            listeners = listeners.filter((item) => item !== listener);
        };
    };

    const notifyListeners: Listener = (location, action) => {
        listeners.forEach((listener) => listener(location, action));
    };

    return {
        setPrompt,
        confirmTransitionTo,
        appendListener,
        notifyListeners,
    };
};
