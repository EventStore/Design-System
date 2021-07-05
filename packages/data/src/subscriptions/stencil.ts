import { forceUpdate, getRenderingRef, getElement } from '@stencil/core';
import type { ObservableMap } from '../types';

type Element = any;

const $keys = Symbol('keys');

export const stencilSubscription = <T>({ on }: ObservableMap<T>) => {
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
        const elm = getRenderingRef();
        if (elm) {
            addToMapSet(elementsToUpdate, propName, elm);
        }
    });

    on('keys', () => {
        const elm = getRenderingRef();
        if (elm) {
            addToMapSet(elementsToUpdate, $keys, elm);
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
        elementsToUpdate.forEach((elms) => elms.forEach(forceUpdate));
    });
};

const addToMapSet = <K, V>(map: Map<K, Set<V>>, key: K, value: V) => {
    if (!map.has(key)) {
        map.set(key, new Set());
    }

    map.get(key)!.add(value);
};
