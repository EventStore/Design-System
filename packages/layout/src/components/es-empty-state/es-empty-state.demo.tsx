import { Component, h, Host } from '@stencil/core';

/** es-empty-state demo */
@Component({
    tag: 'es-empty-state-demo',
    styles: `
        :host {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            width: 100dvw;
            height: 100vh;
        }
        es-empty-state {
            height: 100%;
        }
        hr {
            flex: none;
            width: 100%;
        }
    `,
    shadow: true,
})
export class EmptyState {
    render() {
        return (
            <Host>
                <es-empty-state header={'Create a new group'}>
                    <es-illustration-group slot={'illustration'} />
                    {
                        'Creating a new group will allow for the grouping of members with the same access.'
                    }
                    <es-button slot={'foot'} variant={'outline'}>
                        {'New group'}
                        <es-icon icon={'plus'} slot={'after'} />
                    </es-button>
                </es-empty-state>
            </Host>
        );
    }
}
