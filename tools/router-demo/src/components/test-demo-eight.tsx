import { h, Component } from '@stencil/core';
import { logger } from '../logger';

@Component({
    tag: 'test-demo-eight',
})
export class TestDemoEight {
    componentWillLoad() {
        logger.log('Component is about to be rendered');
    }

    render() {
        return (
            <div>
                <h1>Deep Component Test</h1>
                <test-deep-component></test-deep-component>
            </div>
        );
    }
}
