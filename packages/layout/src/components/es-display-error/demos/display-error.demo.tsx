import { router } from '@eventstore-ui/router';
import { Component, h } from '@stencil/core';
import '@eventstore-ui/illustrations';

/**
 * Display Error
 * @group Page State
 */
@Component({
    tag: 'display-error-demo',
    styleUrl: 'display-error-demo.css',
    shadow: true,
})
export class Demo {
    componentWillLoad() {
        router.init({ root: '/display-error-demo' });
    }

    render() {
        const error = new Error("Oh no! It's all gone wrong.");
        return (
            <es-display-error error={error}>
                <es-button>{'Do something else'}</es-button>
            </es-display-error>
        );
    }
}
