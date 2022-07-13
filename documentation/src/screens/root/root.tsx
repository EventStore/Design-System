import { Component, h, Host } from '@stencil/core';
import { Switch, Route, router } from '@eventstore-ui/router';
import { sitemap } from 'sitemap';

@Component({
    tag: 'docs-root',
    styleUrl: 'root.css',
})
export class Root {
    componentWillLoad() {
        router.init({
            titleSuffix: ' - Event Store Design System',
        });
    }

    render() {
        return (
            <Host>
                <es-header>
                    <es-theme-dropdown slot={'right'} />
                </es-header>
                <Switch>
                    <Route exact url={'/'} routeRender={() => <docs-home />} />
                    {sitemap.map((section) =>
                        section.children.map((lib) => (
                            <Route
                                url={`/${lib.slug}`}
                                routeRender={() => (
                                    <docs-package lib={lib} key={lib.title} />
                                )}
                            />
                        )),
                    )}
                    <Route routeRender={() => <div>{'404!'}</div>} />
                </Switch>
            </Host>
        );
    }
}
