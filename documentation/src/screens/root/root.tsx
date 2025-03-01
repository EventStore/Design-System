import { Component, h, Host } from '@stencil/core';
import { Switch, Route, router } from '@kurrent-ui/router';
import { sitemap } from 'sitemap';

@Component({
    tag: 'docs-root',
    styleUrl: 'root.css',
})
export class Root {
    componentWillLoad() {
        router.init({
            titleSuffix: ' - Kurrent Design System',
        });
    }

    render() {
        return (
            <Host>
                <l2-header>
                    <c2-button-link
                        external
                        slot={'right'}
                        url={'https://github.com/EventStore/Design-System'}
                    >
                        <c2-icon icon={'github'} />
                    </c2-button-link>
                    <l2-theme-dropdown slot={'right'} />
                </l2-header>
                <Switch>
                    <Route exact url={'/'} routeRender={() => <docs-home />} />
                    {sitemap.sections.map((section) =>
                        section.children.map((slug) => (
                            <Route
                                url={`/${slug}`}
                                routeRender={() => (
                                    <docs-package slug={slug} key={slug} />
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
