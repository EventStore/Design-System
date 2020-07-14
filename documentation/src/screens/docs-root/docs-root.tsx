import { Component, h, Host } from '@stencil/core';
import { Switch, Route, router } from '@eventstore/router';
import { MDXComponentMap } from '@eventstore/stencil-markdown-plugin';

import { pages } from 'utils/pages';
import Home from './home.mdx';

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
                <es-header />
                <es-sidebar>
                    {pages.map(({ url, title }) => (
                        <es-sidebar-link icon={'somethign'} url={url}>
                            {title}
                        </es-sidebar-link>
                    ))}
                </es-sidebar>
                <Switch>
                    <Route exact url={'/'}>
                        <es-page pageTitle={'Hello!'}>
                            <Home components={this.components} />
                        </es-page>
                    </Route>
                    {pages.map(({ url, title, Page }) => (
                        <Route exact url={url}>
                            <es-page pageTitle={title}>
                                <Page components={this.components} />
                            </es-page>
                        </Route>
                    ))}
                </Switch>
            </Host>
        );
    }

    components: MDXComponentMap = {
        h1: 'es-page-title',
        a: ({ href, ...props }: any, children) => {
            return (
                <a
                    {...props}
                    href={
                        href.startsWith('../')
                            ? href.replace(/^..\//, './')
                            : href
                    }
                >
                    {children}
                </a>
            );
        },
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
