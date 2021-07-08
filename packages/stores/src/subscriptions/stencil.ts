import { forceUpdate, getRenderingRef, getElement } from '@stencil/core';
import { debounce } from '@eventstore/utils';
import { Subscription } from '../types';

type Element = any;

const $keys = Symbol('keys');

const allSubscriptions = new Set<Map<string | number | symbol, Set<Element>>>();

const scheduleCleanup = debounce(() => {
    for (const elementsToUpdate of allSubscriptions) {
        for (const [key, elements] of elementsToUpdate) {
            for (const el of Array.from(elements)) {
                if (getElement(el)?.isConnected) continue;
                elementsToUpdate.get(key)?.delete(el);
                if (elementsToUpdate.get(key)?.size === 0) {
                    elementsToUpdate.delete(key);
                }
            }
        }
    }
}, 2_000);

const addToMapSet = <K, V>(map: Map<K, Set<V>>, key: K, value: V) => {
    if (!map.has(key)) {
        map.set(key, new Set());
    }

    map.get(key)!.add(value);
};

export const stencilSubscription = <T>(): Subscription<T> => {
    // If we are not in a stencil project, we do nothing.
    // This function is not really exported by @stencil/core.
    if (typeof getRenderingRef !== 'function') return {};

    type Key = symbol | keyof T;

    const elementsToUpdate = new Map<Key, Set<Element>>();

    allSubscriptions.add(elementsToUpdate);

    const refreshElements = (key: Key) => {
        if (!elementsToUpdate.has(key)) return;

        for (const el of Array.from(elementsToUpdate.get(key)!)) {
            // force update returns false if it fails but is typed wrong
            const successfullyUpdated = (forceUpdate(el) as unknown) as boolean;

            if (!successfullyUpdated) {
                elementsToUpdate.get(key)?.delete(el);

                if (elementsToUpdate.get(key)?.size === 0) {
                    elementsToUpdate.delete(key);
                }
            }
        }
    };

    return {
        dispose: () => {
            elementsToUpdate.clear();
        },
        get: (propName) => {
            const el = getRenderingRef();
            if (el) {
                addToMapSet(elementsToUpdate, propName, el);
            }
            scheduleCleanup();
        },
        keys: () => {
            const el = getRenderingRef();
            if (el) {
                addToMapSet(elementsToUpdate, $keys, el);
            }
            scheduleCleanup();
        },
        set: (propName) => {
            refreshElements(propName);
            scheduleCleanup();
        },
        delete: (propName) => {
            refreshElements($keys);
            requestAnimationFrame(() => {
                refreshElements(propName);
            });
            scheduleCleanup();
        },
        insert: () => {
            refreshElements($keys);
            scheduleCleanup();
        },
        reset: () => {
            elementsToUpdate.forEach((elements) =>
                elements.forEach(forceUpdate),
            );
            scheduleCleanup();
        },
    };
};
