import type { FunctionalComponent } from '@stencil/core';

import { createCullableNode } from '../utils/createCullableNode';
import { getInternalRouter } from '../utils/getInternalRouter';

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
    if (props.url == null) return null as any;
    const router = getInternalRouter();
    return createCullableNode(
        router.action(() => {
            router.replace(props.url);
        }),
        utils,
    );
};
