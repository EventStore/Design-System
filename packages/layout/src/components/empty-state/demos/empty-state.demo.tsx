import { router } from '@eventstore-ui/router';
import { Component, h } from '@stencil/core';
import '@kurrent-ui/sequences';

/**
 * Empty State
 * @group Page State
 */
@Component({
    tag: 'empty-state-demo',
    styleUrl: 'empty-state-demo.css',
    shadow: true,
})
export class Demo {
    componentWillLoad() {
        router.init({ root: '/empty-state-demo' });
    }

    render() {
        return (
            <l2-empty-state header={'Create a new group'}>
                <kurrent-sequence slot={'illustration'} />
                {
                    'Creating a new group will allow for the grouping of members with the same access.'
                }
                <es-button slot={'foot'} variant={'outline'}>
                    {'New group'}
                </es-button>
            </l2-empty-state>
        );
    }
}
