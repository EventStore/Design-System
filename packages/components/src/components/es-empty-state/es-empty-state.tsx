import { Component, h, Host, Prop, type VNode } from '@stencil/core';
import type { EmptyStateLayout } from './types';

/**
 * Display an empty state with an illustration and a message.
 */
@Component({
    tag: 'es-empty-state',
    styleUrl: 'es-empty-state.css',
    shadow: true,
})
export class EmptyState {
    /** The header of the empty state. */
    @Prop() header!: string;
    /** The body of the empty state. */
    @Prop() body!: string | VNode;
    /** The layout of the empty state. */
    @Prop() layout: EmptyStateLayout = 'vertical';

    render() {
        return (
            <Host class={this.layout}>
                <div class={'inner'}>
                    <slot name={'illustration'} />
                    <div class={'text'}>
                        <es-page-title>{this.header}</es-page-title>
                        <p class={'body'}>{this.body}</p>
                    </div>
                    <slot name={'foot'} />
                </div>
            </Host>
        );
    }
}
