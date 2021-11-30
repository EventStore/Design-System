import { h, Component, FunctionalComponent, Host, VNode } from '@stencil/core';
import {
    Route,
    Redirect,
    Link,
    Switch,
    PageTitle,
    RouteRenderProps,
    router,
} from '@eventstore/router';

const PrivateRoute: FunctionalComponent<{
    url: string;
    routeRender: (props: RouteRenderProps) => VNode | VNode[];
}> = ({ url, routeRender }) => (
    <Route
        url={url}
        routeRender={({ history, match }) => {
            if ((window as any).userAuthenticated) {
                return routeRender({ history, match });
            }
            return <Redirect url="/" />;
        }}
    />
);

@Component({
    tag: 'router-demo-app',
})
export class RouterDemoApp {
    componentWillLoad() {
        router.init({ titleSuffix: ' - @eventstore/router' });
    }

    render() {
        return (
            <Host>
                <ul>
                    <li>
                        <Link url="/" exact>
                            Exact Base Link
                        </Link>
                    </li>
                    <li>
                        <Link url="/">Base Link</Link>
                    </li>
                    <li>
                        <Link url="/demo" urlMatch={['/demo', '/demox']} exact>
                            Demo Link
                        </Link>
                    </li>
                    <li>
                        <Link url="/demo2">Demo2 Link</Link>
                    </li>
                    <li>
                        <Link url="/demo3">Demo3 Link</Link>
                    </li>
                    <li>
                        <Link url="/demo3/page1">Demo3 Page1 Link</Link>
                    </li>
                    <li>
                        <Link url="/demo3/page2">Demo3 Page2 Link</Link>
                    </li>
                    <li>
                        <Link url="/demo4">Demo4 Link</Link>
                    </li>
                    <li>
                        <Link url="/route-guard">Test Route Guard</Link>
                    </li>
                    <li>
                        <Link class="what" url="/demo6/">
                            Demo6 Link
                        </Link>
                    </li>
                    <li>
                        <Link tabIndex="1" url="/demo7/">
                            Demo7 Link
                        </Link>
                    </li>
                    <li>
                        <Link url="/demo8">Deep Component Test</Link>
                    </li>
                    <Link element="li" url="/demo9/">
                        Demo9 Link
                    </Link>
                </ul>
                <PageTitle>{'Some Title'}</PageTitle>
                <div class="hold-routes">
                    <Switch>
                        <Route url="/" exact>
                            <div class="content-holder">
                                <span>rendering /</span>
                            </div>
                        </Route>

                        <Route url={['/demo', '/demox']}>
                            <div class="content-holder">
                                <PageTitle>{'DEMO'}</PageTitle>
                                <span>rendering /demo</span>
                                <li>
                                    <Link url="/demo3">Demo3 Link</Link>
                                </li>
                            </div>
                        </Route>

                        <Route url="/demo2">
                            <div class="content-holder">
                                <span>rendering /demo2</span>,
                                <Redirect url="/demo3" />
                            </div>
                        </Route>

                        <Route url={'/demo3'}>
                            <test-demo-three />
                        </Route>

                        <Route
                            url="/demo4"
                            routeRender={({ history, match }) => (
                                <div class="content-holder">
                                    <test-demo-four
                                        {...{ history, match }}
                                    ></test-demo-four>
                                </div>
                            )}
                        />

                        <Route url="/demo5" />

                        <Route url="/demo6">
                            <test-demo-six />
                        </Route>

                        <PrivateRoute
                            url="/demo7"
                            routeRender={(props: any) => (
                                <div class="content-holder">
                                    <test-demo-six {...props}></test-demo-six>
                                </div>
                            )}
                        />

                        <Route url="/demo8">
                            <div class="content-holder">
                                <test-demo-eight></test-demo-eight>
                            </div>
                        </Route>

                        <Route url="/demo9">
                            <div class="content-holder">
                                <PageTitle>{'Demo 9'}</PageTitle>
                                <span>rendering /demo 9</span>
                            </div>
                        </Route>

                        <Route
                            url="/route-guard"
                            routeRender={({ history, match }) => (
                                <div class="content-holder">
                                    <test-route-guard
                                        {...{ history, match }}
                                    ></test-route-guard>
                                </div>
                            )}
                        />

                        <Route>
                            <div class="content-holder">
                                <span>The route is not found</span>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Host>
        );
    }
}
