import { Component, h, Host, Prop } from '@stencil/core';
import type { EmptyStateLayout } from './types';

/**
 * Display an empty state with an illustration and a message.
 * Intended for use as `Page`'s `renderEmptyState`.
 * @slot illustration - The illustration to display.
 * @slot foot - The footer content to display.
 * @part inner - The container of the empty state.
 * @part text - The text container of the empty state.
 * @part title - The title of the empty state.
 * @part body - The body of the empty state.
 */
@Component({
    tag: 'l2-empty-state',
    styleUrl: 'empty-state.css',
    shadow: true,
})
export class EmptyState {
    /** The header of the empty state. */
    @Prop() header!: string;
    /** The layout of the empty state. */
    @Prop() layout: EmptyStateLayout = 'vertical';

    render() {
        return (
            <Host class={this.layout}>
                <div class={'inner'} part="inner">
                    <slot name={'illustration'} />
                    <div class={'text'} part="text">
                        <l2-page-title part="title">
                            {this.header}
                        </l2-page-title>
                        <p class={'body'} part="body">
                            <slot />
                        </p>
                    </div>
                    <slot name={'foot'} />
                </div>
            </Host>
        );
    }
}
