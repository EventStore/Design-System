import type { InternalRouter } from './internalRouter';

declare global {
    interface Window {
        [INTERNAL_ROUTER]: InternalRouter;
    }
}

export const INTERNAL_ROUTER = Symbol.for('internal-router');
