import { Component, h, Prop, State, Watch } from '@stencil/core';

import { ParentNode, LeafNode, ParentNodeStatus } from '../NavNodes';

import type { NavNode } from '../../types';

/** @internal */
@Component({
    tag: 'es-nav-node-1',
    styleUrl: 'es-nav-node-1.css',
    scoped: true,
})
export class EsNav_1 {
    @Prop() node!: NavNode;
    @Prop() active!: boolean;
    @Prop() toggleRequest!: () => void;

    @State() status: ParentNodeStatus = ParentNodeStatus.closed;

    private toggleTimeout?: ReturnType<typeof setTimeout>;
    private frame?: ReturnType<typeof requestAnimationFrame>;
    private nav?: HTMLElement;

    componentWillLoad() {
        if (this.active) {
            this.status = ParentNodeStatus.open;
        }
    }

    @Watch('active')
    activeChanged(after: boolean, previous: boolean) {
        if (previous && !after) {
            return this.transition(
                ParentNodeStatus.closing,
                ParentNodeStatus.closed,
            );
        }

        return this.transition(ParentNodeStatus.opening, ParentNodeStatus.open);
    }

    transition = (via: ParentNodeStatus, to: ParentNodeStatus) => {
        if (this.status === to) return;
        clearTimeout(this.toggleTimeout!);
        this.status = via;
        this.toggleTimeout = setTimeout(() => {
            this.status = to;
        }, 500);
    };

    @Watch('status')
    slideNav(status: ParentNodeStatus) {
        if (!this.nav) return;
        cancelAnimationFrame(this.frame!);
        switch (status) {
            case ParentNodeStatus.opening: {
                this.nav.style.height = '0px';
                this.frame = requestAnimationFrame(() => {
                    if (!this.nav) return;
                    const wrap =
                        this.nav.firstElementChild?.getBoundingClientRect();
                    this.nav.style.height = wrap ? `${wrap.height}px` : 'auto';
                });
                break;
            }
            case ParentNodeStatus.closing: {
                const { height } = this.nav.getBoundingClientRect();
                this.nav.style.height = `${height}px`;
                this.frame = requestAnimationFrame(() => {
                    if (!this.nav) return;
                    this.nav.style.height = '0px';
                });
                break;
            }
            case ParentNodeStatus.open: {
                this.nav.style.height = 'auto';
                break;
            }
            case ParentNodeStatus.closed: {
                this.nav.style.height = '0px';
                break;
            }
        }
    }

    render() {
        if ('children' in this.node) {
            return (
                <ParentNode
                    {...this.node}
                    status={this.status}
                    onPress={this.toggleRequest}
                    navRef={this.captureNav}
                >
                    {this.node.children.map((node) => (
                        <es-nav-node-2 node={node} />
                    ))}
                </ParentNode>
            );
        }

        return <LeafNode {...this.node} />;
    }

    private captureNav = (nav?: HTMLElement) => {
        this.nav = nav;
    };
}
