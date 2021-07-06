import { forceUpdate, getRenderingRef, getElement } from '@stencil/core';
import type { Store } from '../stores/createStore';

type Element = any;

const $keys = Symbol('keys');

export const stencilSubscription = <T>({ on }: Store<T>) => {
    // If we are not in a stencil project, we do nothing.
    // This function is not really exported by @stencil/core.
    if (typeof getRenderingRef !== 'function') return;

    type Key = symbol | keyof T;

    const elementsToUpdate = new Map<Key, Set<Element>>();

    const refreshElements = (key: Key) => {
        if (!elementsToUpdate.has(key)) return;

        const elements = Array.from(elementsToUpdate.get(key)!);

        for (const el of elements) {
            if (getElement(el)?.isConnected) {
                forceUpdate(el);
            } else {
                elementsToUpdate.get(key)?.delete(el);

                if (elementsToUpdate.get(key)?.size === 0) {
                    elementsToUpdate.delete(key);
                }
            }
        }
    };

    on('dispose', () => {
        elementsToUpdate.clear();
    });

    on('get', (propName) => {
        const el = getRenderingRef();
        if (el) {
            addToMapSet(elementsToUpdate, propName, el);
        }
    });

    on('keys', () => {
        const el = getRenderingRef();
        if (el) {
            addToMapSet(elementsToUpdate, $keys, el);
        }
    });

    on('set', (propName) => {
        refreshElements(propName);
    });

    on('delete', (propName) => {
        refreshElements($keys);
        requestAnimationFrame(() => {
            refreshElements(propName);
        });
    });

    on('insert', () => {
        refreshElements($keys);
    });

    on('reset', () => {
        elementsToUpdate.forEach((elements) => elements.forEach(forceUpdate));
    });
};

const addToMapSet = <K, V>(map: Map<K, Set<V>>, key: K, value: V) => {
    if (!map.has(key)) {
        map.set(key, new Set());
    }

    map.get(key)!.add(value);
};
