import { Component, h, Prop } from '@stencil/core';

import { logger } from '../../../../utils/logger';
import type { NavNode } from '../../types';
import { LeafNode } from '../NavNodes';

/** @internal */
@Component({
    tag: 'es-nav-node-2',
    styleUrl: 'es-nav-node-2.css',
    scoped: true,
})
export class EsNavNode_2 {
    @Prop() node!: NavNode;

    render() {
        if ('children' in this.node) {
            logger.warn.once(`Nav tree too deep at ${this.node.title}`);
            return null;
        }

        return <LeafNode {...this.node} />;
    }
}
