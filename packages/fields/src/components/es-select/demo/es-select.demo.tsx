import { Component, h, Host, Listen, State } from '@stencil/core';
import type { FieldChangeEvent } from '../../../types';
import type { RenderSelectOption } from '../types';

/** es-select demo. */
@Component({
    tag: 'es-select-demo',
    shadow: true,
})
export class Demo {
    @State() value: string | null = null;

    @Listen('fieldchange')
    onChange(e: FieldChangeEvent<string>) {
        this.value = e.detail.value;
    }

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <es-select
                    label="hello"
                    name="hello"
                    options={this.options}
                    value={this.value}
                    renderOption={this.renderOption}
                />
            </Host>
        );
    }

    private renderOption: RenderSelectOption = (_, { name, value }) => (
        <es-select-option-demo name={name} value={value} />
    );

    private options = [
        {
            name: 'check',
            value: 'check',
        },
        {
            name: 'chevron',
            value: 'chevron',
        },
        {
            name: 'error',
            value: 'error',
        },
        {
            name: 'info',
            value: 'info',
        },
        {
            name: 'plus',
            value: 'plus',
        },
        {
            name: 'trash',
            value: 'trash',
        },
        {
            name: 'warning',
            value: 'warning',
        },
    ];
}
