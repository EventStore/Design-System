import { Component, h, Prop, Host } from '@stencil/core';
import type { JsonDocs } from '@stencil/core/internal';
import type { JSONOutput } from 'typedoc';

import type { Lib } from 'sitemap';
import { extractTypes } from 'utils/typedoc/isIntrinsic';

@Component({
    tag: 'docs-component-docs',
    styleUrl: 'component-docs.css',
    shadow: true,
})
export class DocsPackage {
    @Prop() comp!: JsonDocs['components'][0];
    @Prop() lib!: Lib;

    render() {
        const { tag, encapsulation } = this.comp;
        const relatedTypes = this.findRelatedTypes();

        return (
            <Host>
                <docs-breadcrumb
                    crumbs={[
                        { name: 'Components', path: '/components' },
                        {
                            name: tag,
                            path: `./${tag}`,
                        },
                    ]}
                />
                <header>
                    <h1>{tag}</h1>
                    <es-icon
                        size={45}
                        icon={encapsulation === 'shadow' ? 'shadow' : 'light'}
                        title={
                            encapsulation === 'shadow'
                                ? 'Shadow DOM'
                                : 'Light DOM'
                        }
                    />
                </header>
                <docs-markdown class={'intro'} md={this.comp.docs} />

                {Object.entries(this.comp.usage).map(([name, usage]) => (
                    <docs-usage
                        key={name}
                        identifier={`${tag}-${name}`}
                        usage={usage}
                    />
                ))}

                <docs-props-table id={'props'} props={this.comp.props} />

                {relatedTypes.map((relatedType) => (
                    <docs-type-table
                        id={relatedType.name}
                        key={relatedType.name}
                        declaration={relatedType}
                    />
                ))}

                <docs-slots-table id={'slots'} slots={this.comp.slots} />
                <docs-events-table id={'events'} events={this.comp.events} />
                <docs-methods-table
                    id={'methods'}
                    methods={this.comp.methods}
                />

                <docs-styles-table id={'css'} styles={this.comp.styles} />
                <docs-parts-table id={'parts'} parts={this.comp.parts} />
            </Host>
        );
    }

    private findRelatedTypes = (): JSONOutput.DeclarationReflection[] => {
        const { typeDocs } = this.lib;
        const { props } = this.comp;
        if (!typeDocs) return [];

        const relatedTypes = new Map<
            string,
            JSONOutput.DeclarationReflection
        >();

        for (const prop of props) {
            for (const value of prop.values) {
                for (const relatedType of extractTypes(value.type)) {
                    const typeDoc = typeDocs.lookup.get(relatedType);
                    if (typeDoc) {
                        relatedTypes.set(relatedType, typeDoc);
                    }
                }
            }
        }

        return Array.from(relatedTypes.values());
    };
}
