import { FunctionalComponent } from '@stencil/core';
import router from '../utils/internalRouter';
import { createCullableNode } from '../utils/createCullableNode';

export interface PageTitleProps {
    noSuffix?: boolean;
}

const PageTitle: FunctionalComponent<PageTitleProps> = (
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

export default PageTitle;
