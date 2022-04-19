import { Component, h } from '@stencil/core';

import { Route, router, Switch } from '@eventstore/router';

@Component({
    tag: 'demo-root',
    styleUrl: 'demo-root.css',
    shadow: true,
})
export class DemoRoot {
    componentWillLoad() {
        router.init({
            titleSuffix: 'Forms demo',
        });
    }

    render() {
        return (
            <Switch>
                <Route routeRender={() => <form-one />} />
            </Switch>
        );
    }
}
