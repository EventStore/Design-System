import { Component, h, Prop, Fragment, Host } from '@stencil/core';
import type { JsonDocs, JsonDocsProp } from '@stencil/core/internal';
import { TableCells } from '@eventstore/components';

@Component({
    tag: 'docs-component-docs',
    styleUrl: 'component-docs.css',
    shadow: true,
})
export class DocsPackage {
    @Prop() comp!: JsonDocs['components'][0];

    render() {
        return (
            <Host>
                <docs-breadcrumb
                    crumbs={[
                        { name: 'Components', path: '/components' },
                        {
                            name: this.comp.tag,
                            path: `./${this.comp.tag}`,
                        },
                    ]}
                />
                <header>
                    <h1>{this.comp.tag}</h1>
                    <es-icon
                        size={45}
                        icon={
                            this.comp.encapsulation === 'shadow'
                                ? 'shadow'
                                : 'light'
                        }
                        title={
                            this.comp.encapsulation === 'shadow'
                                ? 'Shadow DOM'
                                : 'Light DOM'
                        }
                    />
                </header>
                <p>{this.comp.docs}</p>
                {Object.entries(this.comp.usage).map(([name, usage]) => (
                    <docs-usage key={name} usage={usage} />
                ))}
                {!!this.comp.props.length && (
                    <>
                        <h2>{'Props'}</h2>
                        <es-table
                            key={'props'}
                            cells={this.propsCells}
                            rows={this.comp.props}
                            rowClass={this.propsRowClass}
                        />
                    </>
                )}
                {!!this.comp.styles.length && (
                    <>
                        <h2>{'CSS variables'}</h2>
                        <es-table
                            key={'css'}
                            cells={this.cssCells}
                            rows={this.comp.styles}
                        />
                    </>
                )}
            </Host>
        );
    }

    private propsCells: TableCells<JsonDocsProp> = {
        name: {
            title: 'Name',
            cell: ({ data: { name, deprecation } }) => (
                <pre class={{ depreciated: !!deprecation }}>{name}</pre>
            ),
        },

        docs: {
            title: 'Description',
            cell: ({ data: { docs, deprecation } }) => (
                <>
                    <span class={{ depreciated: !!deprecation }}>{docs}</span>
                    {deprecation && <span>{deprecation}</span>}
                </>
            ),
        },
        type: {
            title: 'Type',
            cell: ({ data: { values } }) =>
                values.map(({ type, value }, i, c) => (
                    <>
                        <pre class={type}>{value ?? type}</pre>
                        {i !== c.length - 1 && <span>{'or'}</span>}
                    </>
                )),
            class: 'types',
        },
        default: {
            title: 'Default',
            cell: ({ data: { default: d } }) =>
                d ? (
                    <pre class={d.startsWith("'") ? 'string' : 'default'}>
                        {d.replace(/'/g, '')}
                    </pre>
                ) : null,
        },
        extras: {
            title: '',
            cell: ({ data: { mutable, reflectToAttr, required, attr } }) => (
                <>
                    {required && (
                        <es-icon icon={'required'} title={'Required'} />
                    )}
                    {mutable && <es-icon icon={'mutable'} title={'Mutable'} />}
                    {reflectToAttr && (
                        <es-icon
                            icon={'reflect-to-attr'}
                            title={`Reflects To Attribute: "${attr}"`}
                        />
                    )}
                </>
            ),
        },
    };

    private propsRowClass = ({ required }: JsonDocsProp) => ({
        required,
    });

    private cssCells: TableCells<JsonDocsProp> = {
        name: {
            title: 'Name',
        },
        docs: {
            title: 'Description',
        },
    };
}
