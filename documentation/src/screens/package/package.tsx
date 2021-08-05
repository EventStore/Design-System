import { Route, Switch } from '@eventstore/router';
import { Component, h, Prop } from '@stencil/core';
import { Host, Watch } from '@stencil/core/internal';
import { Lib } from 'sitemap';
import { JSONOutput } from 'typedoc';
import { ReflectionKind } from 'utils/typedoc/reflectionKind';
import { isFunctionalComponentDeclaration } from 'utils/typedoc/declaration';

type Dec = JSONOutput.DeclarationReflection;

@Component({
    tag: 'docs-package',
    styleUrl: 'package.css',
    shadow: true,
})
export class DocsPackage {
    @Prop() lib!: Lib;

    private variables?: Dec[];
    private types?: Dec[];
    private functions?: Dec[];
    private functionalComponents?: Dec[];

    @Watch('lib')
    componentWillLoad() {
        this.variables = this.extractVariables();
        this.types = this.extractTypes();
        this.functions = this.extractFunctions();
        this.functionalComponents = this.extractFunctionalComponents();
    }

    render() {
        return (
            <Host>
                <docs-sidebar>
                    <docs-sidebar-section sectionTitle={'Package'}>
                        <docs-sidebar-dropdown active={this.lib} />
                    </docs-sidebar-section>
                    {this.lib.stencilDocs && (
                        <docs-sidebar-section sectionTitle={'Components'}>
                            {this.lib.stencilDocs.components.map(({ tag }) => (
                                <docs-sidebar-link
                                    key={tag}
                                    url={`/${this.lib.slug}/${tag}`}
                                >
                                    {tag}
                                </docs-sidebar-link>
                            ))}
                        </docs-sidebar-section>
                    )}
                    {this.functionalComponents && (
                        <docs-sidebar-section
                            sectionTitle={'Functional Components'}
                        >
                            {this.functionalComponents.map(({ name }) => (
                                <docs-sidebar-link
                                    key={name}
                                    url={`/${this.lib.slug}/functional-components/${name}`}
                                >
                                    {name}
                                </docs-sidebar-link>
                            ))}
                        </docs-sidebar-section>
                    )}
                    {this.functions && (
                        <docs-sidebar-section sectionTitle={'Functions'}>
                            {this.functions.map(({ name }) => (
                                <docs-sidebar-link
                                    key={name}
                                    url={`/${this.lib.slug}/functions/${name}`}
                                >
                                    {name}
                                </docs-sidebar-link>
                            ))}
                        </docs-sidebar-section>
                    )}
                    {this.variables && (
                        <docs-sidebar-section sectionTitle={'Variables'}>
                            {this.variables.map(({ name }) => (
                                <docs-sidebar-link
                                    key={name}
                                    url={`/${this.lib.slug}/variables/${name}`}
                                >
                                    {name}
                                </docs-sidebar-link>
                            ))}
                        </docs-sidebar-section>
                    )}
                    {this.types && (
                        <docs-sidebar-section sectionTitle={'Types'}>
                            {this.types.map(({ name }) => (
                                <docs-sidebar-link
                                    key={name}
                                    url={`/${this.lib.slug}/types/${name}`}
                                >
                                    {name}
                                </docs-sidebar-link>
                            ))}
                        </docs-sidebar-section>
                    )}
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

    private extractKinds =
        (kinds: number[], check: (d: Dec) => boolean = () => true) =>
        () => {
            if (!this.lib.typeDocs) return;
            const { lookup, project } = this.lib.typeDocs;
            if (!project.groups) return;
            const names = project.groups
                .filter((group) => kinds.includes(group.kind))
                .flatMap((group) => group.children ?? [])
                .map((id) => lookup.get(id)!)
                .filter(check)
                .sort(({ name: a }, { name: b }) => a.localeCompare(b));
            if (!names.length) return;
            return names;
        };

    private extractVariables = this.extractKinds([ReflectionKind.Variable]);
    private extractFunctions = this.extractKinds(
        [ReflectionKind.Function],
        (d) => !isFunctionalComponentDeclaration(d),
    );
    private extractFunctionalComponents = this.extractKinds(
        [ReflectionKind.Function],
        (d) => isFunctionalComponentDeclaration(d),
    );
    private extractTypes = this.extractKinds([
        ReflectionKind.Interface,
        ReflectionKind.TypeLiteral,
        ReflectionKind.TypeParameter,
        ReflectionKind.TypeAlias,
    ]);
}
