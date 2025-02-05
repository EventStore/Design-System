import { Component, Host, h } from '@stencil/core';
import type { RouteTab } from '../types';
import { Link, Route, Switch, router } from '@kurrent-ui/router';

/** Tab bar  */
@Component({
    tag: 'tab-bar-demo',
    styleUrl: './tabs-demo.css',
    shadow: true,
})
export class Demo {
    componentWillLoad() {
        router.init({
            root: '/tab-bar-demo/',
        });
    }

    render() {
        return (
            <Host>
                <l2-tab-bar tabs={this.tabs} />
                <Switch>
                    <Route
                        url={'/tab-1'}
                        routeRender={() => <p>{'I am in tab 1'}</p>}
                    />
                    <Route
                        url={'/tab-2'}
                        routeRender={() => <p>{'Welcome to tab 2!'}</p>}
                    />
                    <Route
                        url={'/tab-three'}
                        routeRender={() => (
                            <p>{'Hello 👋. You have reached tab 3.'}</p>
                        )}
                    />
                    <Route
                        url={'/tab-4'}
                        routeRender={() => (
                            <div>
                                <p>{'Tab 4 now'}</p>
                                <br />
                                <Link url={'/tab-1'}>{'go to one'}</Link>
                                <br />
                                <Link url={'/tab-20'}>{'go nowhere'}</Link>
                            </div>
                        )}
                    />
                </Switch>
            </Host>
        );
    }

    private tabs: RouteTab[] = [
        {
            id: 'tab-1',
            title: 'One',
        },
        {
            id: 'tab-2',
            title: 'Two',
            badge: () => true,
        },
        {
            id: 'tab-3',
            title: 'Three',
            url: '/tab-three',
        },
        {
            id: 'tab-4',
            title: 'Four',
        },
    ];
}
