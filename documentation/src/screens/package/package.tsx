import { Redirect, Route, Switch } from '@eventstore-ui/router';
import { Component, h, Prop } from '@stencil/core';
import { Host, Watch } from '@stencil/core/internal';
import { Lib, sitemap } from 'sitemap';
import { ReflectionKind } from 'utils/typedoc/reflectionKind';
import { isFunctionalComponentDeclaration } from 'utils/typedoc/declaration';
import { Anchor, extractAnchors } from 'utils/extractAnchors';
import type { SomeReflection } from 'utils/typedoc/types';
import type { DeclarationReflection } from 'typedoc';

@Component({
    tag: 'docs-package',
    styleUrl: 'package.css',
    shadow: true,
})
export class DocsPackage {
    @Prop() lib!: Lib;

    private utils?: SomeReflection[];
    private types?: SomeReflection[];
    private functionalComponents?: SomeReflection[];
    private anchors?: Anchor[];

    @Watch('lib')
    componentWillLoad() {
        this.utils = this.extractUtils();
        this.types = this.extractTypes();
        this.functionalComponents = this.extractFunctionalComponents();

        if (
            !this.lib.stencilDocs &&
            !this.utils &&
            !this.types &&
            !this.functionalComponents
        ) {
            this.anchors = extractAnchors(this.lib.readme);
        } else {
            this.anchors = undefined;
        }
    }

    render() {
        return (
            <Host>
                <es-sidebar>
                    <es-layout-section sectionTitle={'Package'}>
                        <es-sidebar-dropdown
                            defaultTitle={'Package'}
                            defaultIcon={'gift'}
                        >
                            {sitemap.map(({ title, children }) => (
                                <es-layout-section title={title}>
                                    {children.map(
                                        ({ title, packageJson, slug }) => (
                                            <es-layout-link
                                                url={`/${slug}`}
                                                icon={packageJson.name}
                                            >
                                                {title}
                                            </es-layout-link>
                                        ),
                                    )}
                                </es-layout-section>
                            ))}
                        </es-sidebar-dropdown>
                    </es-layout-section>
                    {this.lib.stencilDocs && (
                        <es-layout-section sectionTitle={'Components'}>
                            {this.lib.stencilDocs.components.map(({ tag }) => (
                                <es-layout-link
                                    key={tag}
                                    url={`/${this.lib.slug}/components/${tag}`}
                                >
                                    {tag}
                                </es-layout-link>
                            ))}
                        </es-layout-section>
                    )}
                    {this.functionalComponents && (
                        <es-layout-section
                            sectionTitle={'Functional Components'}
                        >
                            {this.functionalComponents.map(({ name }) => (
                                <es-layout-link
                                    key={name}
                                    url={`/${this.lib.slug}/functional-components/${name}`}
                                >
                                    {name}
                                </es-layout-link>
                            ))}
                        </es-layout-section>
                    )}
                    {this.utils && (
                        <es-layout-section sectionTitle={'Utils'}>
                            {this.utils.map(({ name }) => (
                                <es-layout-link
                                    key={name}
                                    url={`/${this.lib.slug}/utils/${name}`}
                                >
                                    {name}
                                </es-layout-link>
                            ))}
                        </es-layout-section>
                    )}
                    {this.types && (
                        <es-layout-section sectionTitle={'Types'}>
                            {this.types.map(({ name }) => (
                                <es-layout-link
                                    key={name}
                                    url={`/${this.lib.slug}/types/${name}`}
                                >
                                    {name}
                                </es-layout-link>
                            ))}
                        </es-layout-section>
                    )}

                    {this.anchors?.map(({ id, name, level }) => (
                        <es-layout-link
                            level={level - 1}
                            key={id}
                            url={`#${id}`}
                        >
                            {name}
                        </es-layout-link>
                    ))}
                </es-sidebar>
                <Switch>
                    <Route exact url={`/${this.lib.slug}`}>
                        <docs-readme lib={this.lib} />
                    </Route>
                    {this.lib.stencilDocs?.components.map((doc) => (
                        <Route
                            exact
                            url={`/${this.lib.slug}/components/${doc.tag}`}
                        >
                            <docs-component-docs lib={this.lib} comp={doc} />
                        </Route>
                    ))}
                    {this.functionalComponents?.map((doc) => (
                        <Route
                            exact
                            url={`/${this.lib.slug}/functional-components/${doc.name}`}
                        >
                            <docs-functional-component-docs
                                lib={this.lib}
                                doc={doc}
                            />
                        </Route>
                    ))}
                    {this.utils?.map((doc) => (
                        <Route
                            exact
                            url={`/${this.lib.slug}/utils/${doc.name}`}
                        >
                            <docs-util-docs lib={this.lib} doc={doc} />
                        </Route>
                    ))}
                    {this.types?.map((doc) => (
                        <Route
                            exact
                            url={`/${this.lib.slug}/types/${doc.name}`}
                        >
                            <docs-type-docs lib={this.lib} doc={doc} />
                        </Route>
                    ))}
                    <Route>
                        <Redirect url={`/${this.lib.slug}`} />
                    </Route>
                </Switch>
            </Host>
        );
    }

    private extractKinds = (
        kinds: number[],
        check: (d: SomeReflection) => boolean = () => true,
    ) => () => {
        if (!this.lib.typeDocs) return;
        const { project, lookup } = this.lib.typeDocs;
        if (!project.groups) return;

        const modules = project.groups
            .filter((group) => group.kind === (ReflectionKind.Module as number))
            .flatMap((group: any) => group.children ?? [])
            .flatMap(
                (id) => (lookup.get(id)! as DeclarationReflection).groups!,
            );

        const names = [...project.groups, ...modules]
            .filter((group) => kinds.includes(group.kind))
            .flatMap((group: any) => group.children ?? [])
            .map((id) => lookup.get(id)!)
            .filter((item) => !item.flags.isExternal)
            .filter(check)
            .sort((a, b) => this.fileName(a).localeCompare(this.fileName(b)));

        if (!names.length) return;
        return names;
    };

    private fileName = ({ name, sources }: SomeReflection): string =>
        `${sources?.[0].fileName ?? ''}${name}`;

    private extractUtils = this.extractKinds(
        [
            ReflectionKind.Variable,
            ReflectionKind.Function,
            ReflectionKind.Class,
        ],
        (d) => !isFunctionalComponentDeclaration(d),
    );
    private extractFunctionalComponents = this.extractKinds(
        [ReflectionKind.Function],
        (d) => isFunctionalComponentDeclaration(d),
    );
    private extractTypes = this.extractKinds(
        [
            ReflectionKind.Interface,
            ReflectionKind.TypeLiteral,
            ReflectionKind.TypeParameter,
            ReflectionKind.TypeAlias,
        ],
        (item) =>
            !item.comment?.tags?.some(({ tagName }) => tagName === 'props'),
    );
}
