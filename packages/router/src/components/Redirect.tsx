import type { FunctionalComponent } from '@stencil/core';

import { INTERNAL_ROUTER } from '../utils/globals';
import { createCullableNode } from '../utils/createCullableNode';

/** @props */
export interface RedirectProps {
    /** The url to redirect to. */
    url: string;
}

/**
 * Redirect to the passed url.
 * @usage ./Redirect.usage.md
 */
export const Redirect: FunctionalComponent<RedirectProps> = (
    props,
    _children,
    utils,
) => {
    if (!props.url) return null as any;

    return createCullableNode(
        window[INTERNAL_ROUTER].action(() => {
            window[INTERNAL_ROUTER].redirect(props.url);
        }),
        utils,
    );
};
