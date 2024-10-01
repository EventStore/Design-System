import { Component, h, Listen, State, Host } from '@stencil/core';
import type { FieldChange } from 'types';

/**
 * text-list-field
 * @group fields
 */
@Component({
    tag: 'text-list-field-demo',
    shadow: true,
})
export class Demo {
    @State() value: string[] = [''];

    @Listen('fieldchange')
    onFieldChange(e: CustomEvent<FieldChange<string[]>>) {
        this.value = e.detail.value;
    }

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <f2-form onSubmit={this.onSubmit}>
                    <f2-text-list-field
                        label={'Text List'}
                        documentation={'Allows you to create a list of strings'}
                        name={'list'}
                        placeholder={'Add a name to your list'}
                        value={this.value}
                    />
                    <pre slot={'data'}>
                        {JSON.stringify(this.value, null, 2)}
                    </pre>
                    <button>{'submit'}</button>
                </f2-form>
            </Host>
        );
    }

    private onSubmit = (e: Event) => {
        e.preventDefault();

        // eslint-disable-next-line no-console
        console.log(new FormData(e.target as HTMLFormElement));
    };
}
