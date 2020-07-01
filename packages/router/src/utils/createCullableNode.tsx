import { h, VNode, FunctionalUtilities } from '@stencil/core';

type CullNode = () => void;

const CULLABLE = 'cullable';

let key = 0;

export const createCullableNode = (
    cullNode: CullNode,
    utils: FunctionalUtilities,
): VNode[] => {
    return utils.map([<div />], (node) => ({
        ...node,
        vtag: null as any,
        vattrs: {
            ...node.vattrs,
            cull: cullNode,
        },
        vkey: `CULLABLE-${key++}`,
        vtext: '\n',
        vname: CULLABLE,
    }));
};

export const cullDecendants = (
    children: VNode[],
    utils: FunctionalUtilities,
) => {
    utils.forEach(children, (child) => {
        if (child.vname === CULLABLE) {
            child.vattrs?.cull?.();
        }

        if (child.vchildren) {
            cullDecendants(child.vchildren, utils);
        }
    });
};
