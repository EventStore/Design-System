import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    something: string;
    options: Set<string>;
    somethingElse: string;
}

/** es-multi-checkbox demo. */
@Component({
    tag: 'es-multi-checkbox-demo',
    shadow: true,
})
export class Demo {
    private form = createValidatedForm<Example>({
        something: '',
        options: new Set(['option2']),
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
                            name: 'options',
                            title: 'What types of data will your project use?',
                            variant: 'field',
                        },
                        {
                            name: 'something-else',
                            title: 'Something Else',
                            variant: 'field',
                        },
                        { name: 'data', title: 'Data' },
                    ]}
                >
                    <es-input
                        slot={'something'}
                        label={'Something'}
                        placeholder={'Something'}
                        {...this.form.connect('something')}
                    />
                    <es-multi-checkbox
                        label={'Options?'}
                        slot={'options'}
                        options={[
                            {
                                name: 'Customer / user profile data',
                                value: 'option1',
                            },
                            {
                                name: 'Sales / transaction data',
                                value: 'option2',
                            },
                            { name: 'Time series data', value: 'option4' },
                            {
                                name: 'Location / geospacial',
                                value: 'option5',
                                disabled: true,
                            },
                            {
                                name: 'User activity / messaging data',
                                value: 'option6',
                            },
                            {
                                name: 'Catalog / inventory data',
                                value: 'option7',
                            },
                            { name: 'Vector embeddings', value: 'option8' },
                            { name: 'Streaming data', value: 'option9' },
                            { name: 'Not Sure', value: 'option10' },
                            { name: 'Other', value: 'option11' },
                        ]}
                        {...this.form.connect('options')}
                    />
                    <es-multi-checkbox
                        disabled
                        label={'Disabled options?'}
                        slot={'options'}
                        options={[
                            {
                                name: 'Sales / transaction data',
                                value: 'option2',
                            },
                            { name: 'Time series data', value: 'option4' },
                            {
                                name: 'Location / geospacial',
                                value: 'option5',
                                disabled: true,
                            },
                        ]}
                        {...this.form.connect('options')}
                    />
                    <es-multi-checkbox
                        label={'Invalid options?'}
                        slot={'options'}
                        options={[
                            {
                                name: 'Sales / transaction data',
                                value: 'option2',
                            },
                            { name: 'Time series data', value: 'option4' },
                            {
                                name: 'Location / geospacial',
                                value: 'option5',
                                disabled: true,
                            },
                        ]}
                        {...this.form.connect('options')}
                        invalid
                    />
                    <es-input
                        slot={'something-else'}
                        label={'Something Else'}
                        placeholder={'Something Else'}
                        {...this.form.connect('somethingElse')}
                    />
                    <pre slot={'data'}>
                        {JSON.stringify(
                            this.form.data,
                            (_, v) => (v instanceof Set ? Array.from(v) : v),
                            2,
                        )}
                    </pre>
                </es-accordian>
            </Host>
        );
    }
}
