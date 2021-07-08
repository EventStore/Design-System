import { Component, h, Host, Fragment, VNode } from '@stencil/core';
import { Switch, Route, router, Link } from '@eventstore/router';
import { MDXComponentMap } from '@eventstore/stencil-markdown-plugin';

import { DocsPage } from 'utils/pages';
import { sitemap } from 'sitemap';

@Component({
    tag: 'docs-root',
    styleUrl: 'docs-root.css',
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
                <docs-header />
                <Switch>
                    <Route exact url={'/'} routeRender={() => <docs-home />} />
                    {sitemap.map((section) =>
                        section.children.map(({ title, ...lib }) => (
                            <Route
                                url={`/${lib.slug}`}
                                routeRender={() => (
                                    <docs-package
                                        packageTitle={title}
                                        {...lib}
                                    />
                                )}
                            />
                        )),
                    )}
                    <Route routeRender={() => <div>{'404!'}</div>} />
                </Switch>
            </Host>
        );
    }

    renderPages = ({ title, url, children, Page }: DocsPage): VNode => (
        <>
            {Page && (
                <Route exact url={url}>
                    <docs-page pageTitle={title}>
                        <Page components={this.components} />
                    </docs-page>
                </Route>
            )}
            {children && children.map(this.renderPages)}
        </>
    );

    components: MDXComponentMap = {
        h1: 'docs-page-title',
        a: Link,
        code: ({ class: className }: any, children, utils) => {
            let code = '';

            utils.forEach(children, (node) => {
                code += node.vtext;
            });

            if (className === 'language-mermaid') {
                return <docs-mermaid code={code} />;
            }

            return (
                <docs-code
                    language={className.replace('language-', '')}
                    code={code}
                />
            );
        },
    };
}
