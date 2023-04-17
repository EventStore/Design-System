import type { FunctionalComponent } from '@stencil/core';

import { createCullableNode } from '../utils/createCullableNode';
import { getInternalRouter } from '../utils/getInternalRouter';

/** @props */
export interface ActionProps {
    /** The action to call */
    action: () => void;
}

/**
 * Call a custom action on routing. The action will be called on every render.
 * @usage ./Action.usage.md
 */
export const Action: FunctionalComponent<ActionProps> = (
    { action },
    _,
    utils,
) => createCullableNode(getInternalRouter().action(action), utils);
