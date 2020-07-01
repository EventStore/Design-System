import { h, Component, Prop } from '@stencil/core';
import { MatchResults, Route, router, RouterHistory } from '@eventstore/router';

@Component({
    tag: 'test-demo-three',
})
export class TestDemoThree {
    @Prop() match?: MatchResults;
    @Prop() history?: RouterHistory;

    pushToPage = (url: string, state: any) => (e: Event) => {
        e.preventDefault();
        this.history?.push(url, state);
    };

    render() {
        return [
            <span>
                Demo 3 Test Page
                <br />
            </span>,
            <Route
                url="/demo3/page1"
                exact={true}
                routeRender={() => (
                    <div>
                        <a
                            href="/demo3/page2"
                            onClick={this.pushToPage('/demo3/page2', {
                                blue: 'blue',
                            })}
                        >
                            History push to /demo3/page2
                        </a>
                        ,
                        <pre>
                            <b>props.match</b>:<br />
                            {JSON.stringify(this.match, null, 2)}
                        </pre>
                        ,
                        <pre>
                            <b>props.history.location</b>:<br />
                            {JSON.stringify(this.history.location, null, 2)}
                        </pre>
                        ,
                        <pre>
                            <b>props.history.location.state</b>:<br />
                            {JSON.stringify(
                                this.history.location.state,
                                null,
                                2,
                            )}
                        </pre>
                    </div>
                )}
            ></Route>,

            <Route
                url="/demo3/page2"
                exact={true}
                routeRender={() => (
                    <div>
                        <a
                            href="/demo3/page1"
                            onClick={this.pushToPage('/demo3/page1', {
                                red: 'red',
                            })}
                        >
                            History push to /demo3/page1
                        </a>
                        ,
                        <pre>
                            <b>props.match</b>:<br />
                            {JSON.stringify(this.match, null, 2)}
                        </pre>
                        ,
                        <pre>
                            <b>router.location</b>:<br />
                            {JSON.stringify(router.location, null, 2)}
                        </pre>
                    </div>
                )}
            ></Route>,
        ];
    }
}
