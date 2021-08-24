import { FunctionalComponent } from '@stencil/core';
import router from '../utils/internalRouter';
import { createCullableNode } from '../utils/createCullableNode';

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
        router.action(() => {
            router.setDocumentTitle(title, !!noSuffix);
        }),
        utils,
    );
};
