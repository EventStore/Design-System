import { router } from '@eventstore/router';
import { theme } from '@eventstore/theme';
import {
    Component,
    h,
    Element,
    Listen,
    Prop,
    State,
    Host,
} from '@stencil/core';
import type { NavTree } from './types';

/**
 * Constructs a navigation from a NavTree.
 */
@Component({
    tag: 'es-nav',
    styleUrl: 'es-nav.css',
    shadow: true,
})
export class EsNav {
    @Element() host!: HTMLEsNavElement;

    /** The `NavTree` data structure that the navigation menu will be built from.. */
    @Prop() navTree!: NavTree;

    @State() activeChild?: number;

    private unsubscribe?: () => void;

    componentWillLoad() {
        this.unsubscribe = router.history.listen(() => {
            this.activeChild = undefined;
        });
    }

    disconnectedCallback() {
        this.unsubscribe?.();
    }

    @Listen('click', { target: 'window' })
    onExternalClick(event: Event) {
        if (this.activeChild == null) return;
        if (event.composedPath().includes(this.host)) return;
        this.activeChild = undefined;
    }

    @Listen('focusout') handleFocusOut(event: FocusEvent) {
        if (this.activeChild == null) return;
        if (this.host.contains(event.relatedTarget as HTMLElement)) {
            return;
        }
        this.activeChild = undefined;
    }

    @Listen('keydown')
    keyPress(e: KeyboardEvent) {
        if (e.key !== 'Escape') return;
        this.activeChild = undefined;
    }

    render() {
        return (
            <Host high-contrast={theme.isHighContrast()}>
                <nav role={'group'}>
                    {this.navTree.map((node, i) => (
                        <es-nav-node-0
                            node={node}
                            active={this.activeChild === i}
                            toggleRequest={() => this.setActiveChild(i)}
                        />
                    ))}
                </nav>
            </Host>
        );
    }

    private setActiveChild = (index?: number) => {
        if (this.activeChild === index) {
            this.activeChild = undefined;
        } else {
            this.activeChild = index;
        }
    };
}
