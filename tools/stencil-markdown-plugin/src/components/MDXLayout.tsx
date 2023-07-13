import {
    h,
    type FunctionalComponent,
    type FunctionalUtilities,
    type VNode,
    type ChildNode,
} from '@stencil/core';

/** Map html element tags to a different tag or to FunctionalComponents */
export type MDXComponentMap = Record<string, string | FunctionalComponent>;

// https://github.com/ionic-team/stencil/pull/2548
const convertToPublic = (utils: FunctionalUtilities) => (node: VNode) => {
    let publicNode!: ChildNode;
    utils.forEach([node], (p) => {
        publicNode = p;
    });
    return publicNode;
};

const mapChildren = (
    components: MDXComponentMap,
    utils: FunctionalUtilities,
) => {
    const toChildNode = convertToPublic(utils);

    const mapper = (children: VNode[], depth = 0): VNode[] => {
        const mapped = utils.map(
            children,
            ({ vchildren: childNodes, ...node }) => {
                const vchildren = childNodes
                    ? mapper(childNodes, depth + 1)
                    : childNodes;

                if (typeof node.vtag !== 'string' || !components[node.vtag]) {
                    return { ...node, vchildren };
                }

                const Component = components[node.vtag];

                if (typeof Component === 'string') {
                    return { ...node, vtag: Component, vchildren };
                }

                return toChildNode(
                    <Component key={node.vkey} {...node.vattrs}>
                        {vchildren}
                    </Component>,
                );
            },
        );

        return mapped;
    };

    return mapper;
};

/** @props */
export interface MDXLayoutProps {
    /** Map html element tags to a different tag or to FunctionalComponents  */
    components?: MDXComponentMap;
    /** The surrounding tag (default `'article'`) */
    tag?: string;
    [key: string]: any;
}

/**
 * The resulting component that the markdown import will be rendered as.
 * Example:
 * ```tsx
 *  import Readme from './readme.md';
 *  <Readme components={{ a: es-button-link }} />
 * ```
 */
export const MDXLayout: FunctionalComponent<MDXLayoutProps> = (
    { components = {}, tag: Tag = 'article', ...props },
    children,
    utils,
) => <Tag {...props}>{mapChildren(components, utils)(children)}</Tag>;
