import { router } from '@eventstore/router';
import type { NavParentNode } from '../types';

export const activeWithin = (node: NavParentNode): boolean => {
    return node.children.some((child) => {
        if ('children' in child) return activeWithin(child);
        return !!router.match({
            path: child.match ?? child.url,
            exact: true,
        });
    });
};
