import { h, Component, Prop } from '@stencil/core';
import { type RouterHistory, type MatchResults } from '@eventstore-ui/router';
import { logger } from '../logger';

@Component({
    tag: 'test-demo-seven',
})
export class TestDemoSeven {
    @Prop() pages?: string[];
    @Prop() match?: MatchResults;
    @Prop() history?: RouterHistory;

    componentWillLoad() {
        logger.log('%c test-demo-seven - componentWillLoad', 'color: red');
    }
    componentDidLoad() {
        logger.log('%c test-demo-seven - componentDidLoad', 'color: orange');
    }
    componentWillUpdate() {
        logger.log('%c test-demo-seven - componentWillUpdate', 'color: green');
    }
    componentDidUpdate() {
        logger.log('%c test-demo-seven - componentDidUpdate', 'color: blue');
    }

    render() {
        return (
            <div>
                <h1>Test Demo Seven</h1>
                <pre>
                    <b>this.pages</b>:<br />
                    {JSON.stringify(this.pages, null, 2)}
                </pre>
                <pre>
                    <b>this.match</b>:<br />
                    {JSON.stringify(this.match, null, 2)}
                </pre>
            </div>
        );
    }
}
