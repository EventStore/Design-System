import { FunctionalComponent } from '@stencil/core';
import router from '../utils/internalRouter';
import { createCullableNode } from '../utils/createCullableNode';

export interface RedirectProps {
    url: string;
}

const Redirect: FunctionalComponent<RedirectProps> = (
    props,
    _children,
    utils,
) => {
    if (!props.url) return null as any;

    return createCullableNode(
        router.action(() => {
            router.redirect(props.url);
        }),
        utils,
    );
};

export default Redirect;
