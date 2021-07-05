import { stencilSubscription } from '../subscriptions/stencil';
import { createObservableMap } from '../utils/observableMap';
import type { ObservableMap } from '../types';

export const createStore = <T extends { [key: string]: any }>(
    defaultState: T,
    shouldUpdate?: (newV: any, oldValue: any, prop: keyof T) => boolean,
): ObservableMap<T> => {
    const map = createObservableMap(defaultState, shouldUpdate);
    stencilSubscription(map);
    return map;
};
