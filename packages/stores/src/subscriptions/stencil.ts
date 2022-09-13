import { createInterestedParties } from '../utils/interest';
import type { Subscription } from '../types';

const $keys = Symbol('keys');

export const stencilSubscription = <T>(): Subscription<T> => {
    const interestedParties = createInterestedParties();
    return {
        dispose: () => {
            interestedParties.clear();
        },
        get: (propName) => {
            interestedParties.registerInterest(propName);
        },
        keys: () => {
            interestedParties.registerInterest($keys);
        },
        set: (propName) => {
            interestedParties.inform(propName);
        },
        delete: (propName) => {
            interestedParties.inform($keys);
            requestAnimationFrame(() => {
                interestedParties.inform(propName);
            });
        },
        insert: () => {
            interestedParties.inform($keys);
        },
        reset: () => {
            interestedParties.informAll();
        },
    };
};
