import { h, Component } from '@stencil/core';
import { router } from '@eventstore-ui/router';
import { logger } from '../logger';

@Component({
    tag: 'test-deep-component',
})
export class TestDeepComponent {
    componentDidUpdate() {
        logger.log('deepchild DidUpdate');
    }

    render() {
        return (
            <div>
                <pre>
                    <b>router.history</b>:<br />
                    {JSON.stringify(
                        router.history,
                        (key, value) => (key === 'win' ? 'window' : value),
                        2,
                    )}
                </pre>
                <pre>
                    <b>router.location</b>:<br />
                    {JSON.stringify(router.location, null, 2)}
                </pre>
                <button onClick={() => router.history?.push('/')}>
                    {'Back Home'}
                </button>
            </div>
        );
    }
}
