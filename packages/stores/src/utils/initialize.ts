import { forceUpdate, getRenderingRef, getElement } from '@stencil/core';
import { $interestFinders } from '../symbols';

declare global {
    interface Window {
        [$interestFinders]: Set<InterestFinder>;
    }
}

interface InterestFinder {
    forceUpdate: (ref: any) => boolean;
    getRenderingRef: typeof getRenderingRef;
    getElement: typeof getElement;
}

window[$interestFinders] = window[$interestFinders] ?? new Set();

if (typeof getRenderingRef === 'function') {
    window[$interestFinders].add({
        getRenderingRef,
        // force update returns boolean if it fails but is typed wrong
        forceUpdate: forceUpdate as any,
        getElement,
    });
}
