import { h, Component, Prop } from '@stencil/core';
import { MatchResults, Route, Link } from '@eventstore/router';

@Component({
    tag: 'test-demo-six',
})
export class TestDemoSix {
    @Prop() pages?: string[];
    @Prop() match: MatchResults | null = null;

    render() {
        return [
            <span>
                Demo 6 Test Page
                <br />
            </span>,
            <Route exact url={'/demo6/'}>
                <h1>One</h1>
                <Link url={'/demo6/asdf'}>{'Next'}</Link>
            </Route>,
            <Route
                url={'/demo6/:any*'}
                routeRender={(props) => [
                    <h1>{'Two:'}</h1>,
                    <pre>{JSON.stringify(props.match, null, 2)}</pre>,
                    <Link url={'/demo6/'}>{'Back'}</Link>,
                ]}
            />,
        ];
    }
}
