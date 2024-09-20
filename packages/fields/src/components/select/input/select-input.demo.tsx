import { Component, h, Host, Listen, State } from '@stencil/core';
import type { FieldChange } from '../../../types';
import type { RenderSelectOption } from '../types';

/**
 * select-input
 * @group inputs
 */
@Component({
    tag: 'select-input-demo',
    shadow: true,
})
export class Demo {
    @State() value: string | null = null;

    @Listen('fieldchange')
    onChange(e: CustomEvent<FieldChange<string>>) {
        this.value = e.detail.value;
    }

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <form onSubmit={this.onSubmit}>
                    <f2-select-input
                        name={'hello'}
                        placeholder={'hello'}
                        options={this.options}
                        value={this.value}
                        renderOption={this.renderOption}
                    />
                    <pre slot={'data'}>{this.value}</pre>
                    <button>{'submit'}</button>
                </form>
            </Host>
        );
    }

    private renderOption: RenderSelectOption = (h, { name, value }) => (
        <select-option-demo name={name} value={value} />
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

    private onSubmit = (e: Event) => {
        e.preventDefault();

        // eslint-disable-next-line no-console
        console.log(new FormData(e.target as HTMLFormElement));
    };
}
