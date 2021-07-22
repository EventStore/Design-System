import { Route, Switch } from '@eventstore/router';
import { Component, h, Prop } from '@stencil/core';
import { Host } from '@stencil/core/internal';
import { Lib } from 'sitemap';

@Component({
    tag: 'docs-package',
    styleUrl: 'package.css',
    shadow: true,
})
export class DocsPackage {
    @Prop() lib!: Lib;

    render() {
        return (
            <Host>
                <docs-sidebar>
                    <docs-sidebar-section sectionTitle={'Package'}>
                        <docs-sidebar-dropdown active={this.lib} />
                    </docs-sidebar-section>
                    <docs-sidebar-section sectionTitle={'Components'}>
                        {this.lib.stencilDocs?.components.map(({ tag }) => (
                            <docs-sidebar-link url={`/${this.lib.slug}/${tag}`}>
                                {tag}
                            </docs-sidebar-link>
                        ))}
                    </docs-sidebar-section>
                </docs-sidebar>
                <main>
                    <Switch>
                        <Route
                            exact
                            url={`/${this.lib.slug}`}
                            routeRender={() => {
                                const Readme = this.lib.readme;
                                return <Readme />;
                            }}
                        />
                        {this.lib.stencilDocs?.components.map((doc) => (
                            <Route exact url={`/${this.lib.slug}/${doc.tag}`}>
                                <docs-component-docs
                                    lib={this.lib}
                                    comp={doc}
                                />
                            </Route>
                        ))}
                    </Switch>
                </main>
            </Host>
        );
    }
}
