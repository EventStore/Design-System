import { h, type FunctionalComponent, Host } from '@stencil/core';
import { Link } from '@kurrent-ui/router';

import { ICON_NAMESPACE } from '../../../icons/namespace';

import { activeWithin } from '../utils/activeWithin';
import type { NavLeafNode, NavParentNode } from '../types';

export const enum ParentNodeStatus {
    open,
    opening,
    closing,
    closed,
}

interface ParentNodeProps extends NavParentNode {
    status: ParentNodeStatus;
    onPress: () => void;
    navRef: (el?: HTMLElement) => void;
}

export const ParentNode: FunctionalComponent<ParentNodeProps> = (
    { status, onPress, navRef, disabled, ...node },
    children,
) => (
    <Host
        role={'treeitem'}
        class={{
            parent_node: true,
            visible: status !== ParentNodeStatus.closed,
            open:
                status === ParentNodeStatus.open ||
                status === ParentNodeStatus.opening,
            active_within: activeWithin(node),
        }}
    >
        <button
            disabled={disabled}
            aria-haspopup
            tabIndex={0}
            class={'node'}
            onClick={onPress}
        >
            {node.title}
            <es-icon
                icon={[ICON_NAMESPACE, 'caret']}
                size={12}
                class={'caret'}
                angle={
                    status === ParentNodeStatus.open ||
                    status === ParentNodeStatus.opening
                        ? 180
                        : 0
                }
            />
        </button>

        <nav role={'group'} ref={navRef}>
            <div class={'nav_inner'}>{children}</div>
        </nav>
    </Host>
);

interface LeafNodeProps extends NavLeafNode {}

export const LeafNode: FunctionalComponent<LeafNodeProps> = (node) => (
    <Host role={'treeitem'} class={'leaf_node'}>
        <Link {...node} class={'node'}>
            {node.title}
        </Link>
    </Host>
);
