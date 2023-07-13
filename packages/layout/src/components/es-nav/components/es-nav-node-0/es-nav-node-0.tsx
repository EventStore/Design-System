import { Component, h, Prop, State, Watch } from '@stencil/core';

import { router } from '@eventstore-ui/router';

import { ParentNode, LeafNode, ParentNodeStatus } from '../NavNodes';

import type { NavNode } from '../../types';
import { activeWithin } from '../../utils/activeWithin';

/** @internal */
@Component({
    tag: 'es-nav-node-0',
    styleUrl: 'es-nav-node-0.css',
    scoped: true,
})
export class EsNavNode_0 {
    @Prop() node!: NavNode;
    @Prop() active!: boolean;
    @Prop() toggleRequest!: () => void;

    @State() status: ParentNodeStatus = ParentNodeStatus.closed;
    @State() activeChild?: number;

    private toggleTimeout?: ReturnType<typeof setTimeout>;
    private frame?: ReturnType<typeof requestAnimationFrame>;
    private nav?: HTMLElement;
    private unsubscribe?: () => void;

    componentWillLoad() {
        if (this.active) {
            this.status = ParentNodeStatus.open;
        }

        this.autoActive();
        this.unsubscribe = router.history.listen(() => {
            this.autoActive();
        });
    }

    disconnectedCallback() {
        this.unsubscribe?.();
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
                    navRef={this.captureNav}
                    status={this.status}
                    onPress={this.toggleRequest}
                >
                    {this.node.children.map((node, i) => (
                        <es-nav-node-1
                            node={node}
                            active={this.activeChild === i}
                            toggleRequest={() => this.setActiveChild(i)}
                        />
                    ))}
                </ParentNode>
            );
        }

        return <LeafNode {...this.node} />;
    }

    private setActiveChild = (index: number) => {
        if (this.activeChild === index) {
            this.activeChild = undefined;
        } else {
            this.activeChild = index;
        }
    };

    private captureNav = (nav?: HTMLElement) => {
        this.nav = nav;
    };

    private autoActive = () => {
        if ('children' in this.node) {
            this.activeChild = this.node.children.findIndex(
                (node) => 'children' in node && activeWithin(node),
            );
        }
    };

    private transition = (via: ParentNodeStatus, to: ParentNodeStatus) => {
        if (this.status === to) return;
        clearTimeout(this.toggleTimeout!);
        this.status = via;
        this.toggleTimeout = setTimeout(() => {
            this.status = to;
        }, 300);
    };
}
