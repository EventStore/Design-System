import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    options: Set<string>;
    options2: Set<string>;
    options3: Set<string>;
}

/** multi-checkbox-field demo. */
@Component({
    tag: 'multi-checkbox-field-demo',
    shadow: true,
})
export class Demo {
    private form = createValidatedForm<Example>({
        options: new Set(['option2']),
        options2: new Set(['option2']),
        options3: new Set(['option2']),
    });

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <form onSubmit={this.onSubmit}>
                    <f2-multi-checkbox-field
                        label={'Options'}
                        documentation={
                            'Allows you to select from multiple checkboxes'
                        }
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
                    <f2-multi-checkbox-field
                        disabled
                        label={'Disabled options'}
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
                        {...this.form.connect('options2')}
                    />
                    <f2-multi-checkbox-field
                        label={'Invalid options'}
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
                        {...this.form.connect('options3')}
                        invalid
                        messages={{ error: ['This is not right.'] }}
                    />
                    <pre>
                        {JSON.stringify(
                            this.form.data,
                            (_, v) => (v instanceof Set ? Array.from(v) : v),
                            2,
                        )}
                    </pre>
                    <button>{'submit'}</button>
                </form>
            </Host>
        );
    }

    private onSubmit = (e: Event) => {
        e.preventDefault();

        // eslint-disable-next-line no-console
        console.log(new FormData(e.target as HTMLFormElement));
    };
}
