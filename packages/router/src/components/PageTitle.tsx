import type { FunctionalComponent } from '@stencil/core';

import { createCullableNode } from '../utils/createCullableNode';
import { getInternalRouter } from '../utils/getInternalRouter';

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
    const router = getInternalRouter();
    let title = '';

    utils.forEach(children, (node, i) => {
        title += typeof children[i] === 'string' ? children[i] : node.vtext;
    });

    return createCullableNode(
        router.action(() => {
            router.setDocumentTitle(title, !!noSuffix);
        }),
        utils,
    );
};
