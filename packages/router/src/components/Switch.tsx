import type { FunctionalComponent } from '@stencil/core';

import { ROUTE_DELIMITER } from './Route';
import { cullDecendants } from '../utils/createCullableNode';

/**
 * Render the first matching Route child.
 * @usage ./Switch.usage.md
 */
export const Switch: FunctionalComponent = (_props, children, utils) => {
    const index = children.indexOf(ROUTE_DELIMITER as any);
    cullDecendants(children.slice(index), utils);
    return children.slice(0, index);
};
