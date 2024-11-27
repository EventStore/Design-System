import { router } from '@kurrent-ui/router';
import { Component, h } from '@stencil/core';
import '@kurrent-ui/sequences';

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
            <l2-display-error error={error}>
                <c2-button>{'Do something else'}</c2-button>
            </l2-display-error>
        );
    }
}
