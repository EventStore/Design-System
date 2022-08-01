import { Component, h, Prop } from '@stencil/core';
import type { JsonDocs } from '@stencil/core/internal';

import { Page } from '@eventstore-ui/layout';

import type { Lib } from 'sitemap';
import { extractTypes } from 'utils/typedoc/isIntrinsic';
import type { SomeReflection } from 'utils/typedoc/types';

@Component({
    tag: 'docs-component-docs',
    styleUrl: 'component-docs.css',
    shadow: true,
})
export class ComponentDocs {
    @Prop() comp!: JsonDocs['components'][0];
    @Prop() lib!: Lib;

    render() {
        if (!this.comp || !this.lib) return null;

        const { tag, encapsulation } = this.comp;
        const relatedTypes = this.findRelatedTypes();

        return (
            <Page
                pageTitle={tag}
                crumbs={[
                    this.lib.crumb,
                    { name: 'Components', path: './components' },
                    {
                        name: tag,
                        path: `./${tag}`,
                    },
                ]}
                headerRight={() => (
                    <es-icon
                        size={45}
                        icon={encapsulation === 'shadow' ? 'shadow' : 'light'}
                        title={
                            encapsulation === 'shadow'
                                ? 'Shadow DOM'
                                : 'Light DOM'
                        }
                    />
                )}
            >
                <docs-markdown class={'intro'} md={this.comp.docs} />

                {Object.entries(this.comp.usage).map(([name, usage]) => (
                    <docs-usage
                        key={name}
                        identifier={`${tag}-${name}`}
                        usage={usage}
                    />
                ))}

                <docs-props-table id={'props'} props={this.comp.props} />

                {relatedTypes.map((doc) => (
                    <div key={doc.name} id={doc.name}>
                        <h2>{doc.name}</h2>
                        <docs-markdown
                            class={'intro'}
                            md={
                                doc.comment?.text ??
                                doc.comment?.shortText ??
                                ''
                            }
                        />
                        <docs-type-documentation declaration={doc} />
                    </div>
                ))}

                <docs-slots-table id={'slots'} slots={this.comp.slots} />
                <docs-events-table id={'events'} events={this.comp.events} />
                <docs-methods-table
                    id={'methods'}
                    methods={this.comp.methods}
                />

                <docs-styles-table id={'css'} styles={this.comp.styles} />
                <docs-parts-table id={'parts'} parts={this.comp.parts} />
            </Page>
        );
    }

    private findRelatedTypes = (): SomeReflection[] => {
        const { typeDocs } = this.lib;
        const { props } = this.comp;
        if (!typeDocs) return [];

        const relatedTypes = new Map<string, SomeReflection>();

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
