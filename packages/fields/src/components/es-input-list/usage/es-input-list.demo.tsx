import { Component, h, Listen, State } from '@stencil/core';
import type { FieldChangeEvent } from '../../../types';

/** es-input-list demo. */
@Component({
    tag: 'es-input-list-demo',
    styleUrl: 'es-input-list.demo.css',
    shadow: true,
})
export class Demo {
    @State() value: string[] = [''];

    @Listen('fieldchange')
    onFieldChange(e: FieldChangeEvent<string[]>) {
        this.value = e.detail.value;
    }

    render() {
        return (
            <es-accordian
                sections={[
                    {
                        name: 'input-list',
                    },
                ]}
            >
                <es-input-list
                    label={'Input List'}
                    name={'list'}
                    placeholder={'placeholder'}
                    value={this.value}
                    slot={'input-list'}
                />
            </es-accordian>
        );
    }
}
