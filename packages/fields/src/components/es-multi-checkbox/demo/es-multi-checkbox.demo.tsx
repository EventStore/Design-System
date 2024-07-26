import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    something: string;
    options: Record<string, boolean>;
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
        options: {
            option1: false,
            option2: false,
            option3: false,
        },
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
                    ]}
                >
                    <es-input
                        slot={'something'}
                        label={'Something'}
                        placeholder={'Something'}
                        {...this.form.connect('something')}
                    />
                    <es-multi-checkbox
                        slot={'options'}
                        options={[
                            {
                                label: 'Customer / user profile data',
                                value: 'option1',
                            },
                            {
                                label: 'Sales / transaction data',
                                value: 'option2',
                            },
                            { label: 'Time series data', value: 'option4' },
                            {
                                label: 'Location / geospacial',
                                value: 'option5',
                            },
                            {
                                label: 'User activity / messaging data',
                                value: 'option6',
                            },
                            {
                                label: 'Catalog / inventory data',
                                value: 'option7',
                            },
                            { label: 'Vector embeddings', value: 'option8' },
                            { label: 'Streaming data', value: 'option9' },
                            { label: 'Not Sure', value: 'option10' },
                            { label: 'Other', value: 'option11' },
                        ]}
                        {...this.form.connect('options')}
                    />
                    <es-input
                        slot={'something-else'}
                        label={'Something Else'}
                        placeholder={'Something Else'}
                        {...this.form.connect('somethingElse')}
                    />
                </es-accordian>
            </Host>
        );
    }
}
