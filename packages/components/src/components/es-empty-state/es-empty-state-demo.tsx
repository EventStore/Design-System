import { Component, h, Host } from '@stencil/core';

export type EmptyStateLayout = 'horizontal' | 'vertical';

/** Basic es-empty-state demo */
@Component({
    tag: 'es-empty-state-demo',
    shadow: true,
})
export class EmptyState {
    render() {
        return (
            <Host>
                <es-empty-state
                    header={'Example empty state'}
                    body={<es-button>{'There are no items'}</es-button>}
                >
                    <p slot="illustration">{'Illustration here'}</p>
                    <p slot="foot">{'Footer goes here'}</p>
                </es-empty-state>
                <hr />
                <es-empty-state
                    header={'Example empty state'}
                    body={'No items to show'}
                    layout="horizontal"
                >
                    <p slot="illustration">{'Illustration here'}</p>
                    <p slot="foot">{'Footer goes here'}</p>
                </es-empty-state>
            </Host>
        );
    }
}
