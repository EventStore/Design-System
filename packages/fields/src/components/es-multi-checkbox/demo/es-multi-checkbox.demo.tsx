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
        options: new Set<string>(),
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
