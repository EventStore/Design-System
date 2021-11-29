import type { FunctionalComponent } from '@stencil/core';

import { INTERNAL_ROUTER } from '../utils/globals';
import { createCullableNode } from '../utils/createCullableNode';

/** @props */
export interface PageTitleProps {
    /** Set title without suffix */
    noSuffix?: boolean;
}

/**
 * Set the page title.
 * @usage ./PageTitle.usage.md
 */
export const PageTitle: FunctionalComponent<PageTitleProps> = (
    { noSuffix },
    children,
    utils,
) => {
    let title = '';

    utils.forEach(children, (node, i) => {
        title += typeof children[i] === 'string' ? children[i] : node.vtext;
    });

    return createCullableNode(
        window[INTERNAL_ROUTER].action(() => {
            window[INTERNAL_ROUTER].setDocumentTitle(title, !!noSuffix);
        }),
        utils,
    );
};
