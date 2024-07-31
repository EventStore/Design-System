import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    something: string;
    option: boolean;
    somethingElse: string;
}

/** es-checkbox demo. */
@Component({
    tag: 'es-checkbox-demo',
    shadow: true,
})
export class Demo {
    private form = createValidatedForm<Example>({
        something: '',
        option: false,
        somethingElse: '',
    });

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <es-accordian
                    sections={[
                        {
                            name: 'something',
                            title: 'Something',
                            variant: 'field',
                        },
                        {
                            name: 'option',
                            variant: 'field',
                        },
                        {
                            name: 'something-else',
                            title: 'Something Else',
                            variant: 'field',
                        },
                        {
                            name: 'data',
                            title: 'Form data',
                        },
                    ]}
                >
                    <es-input
                        slot={'something'}
                        label={'Something'}
                        placeholder={'Something'}
                        {...this.form.connect('something')}
                    />
                    <es-checkbox
                        slot={'option'}
                        {...this.form.connect('option')}
                    >
                        {'I agree to the terms and conditions?'}
                    </es-checkbox>
                    <es-input
                        slot={'something-else'}
                        label={'Something Else'}
                        placeholder={'Something Else'}
                        {...this.form.connect('somethingElse')}
                    />
                    <pre slot={'data'}>
                        {JSON.stringify(this.form.data, null, 2)}
                    </pre>
                </es-accordian>
            </Host>
        );
    }
}
