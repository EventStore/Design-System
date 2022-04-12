import { Component, h } from '@stencil/core';
import { createWorkingData } from '@eventstore/working-data';

interface Data {
    something: string;
    anotherThing: boolean;
    wow: string;
    nested: {
        something: string;
    };
}

/** @internal */
@Component({
    tag: 'dev-root',
    styleUrl: 'dev-root.css',
    shadow: false,
    scoped: false,
})
export class DevRoot {
    private data = createWorkingData<Data>({
        something: {
            initialValue: '',
            checkExists: () => true,
            validations: [
                { validator: (v) => v === 'hello', message: 'Not good' },
                {
                    validator: () => false,
                    message: 'Hi there',
                    validateOn: 'always',
                    severity: 'warning',
                },
            ],
        },
        anotherThing: { initialValue: false },
        wow: { initialValue: '' },
        nested: createWorkingData<Data['nested']>({
            something: {
                initialValue: 'hello',
                validations: [
                    { validator: (v) => v === 'hello', message: 'Not good' },
                    {
                        validator: (v) => v.length > 2,
                        message: (value) => `value is ${value}`,
                        validateOn: 'always',
                        severity: 'warning',
                    },
                    {
                        validator: () => false,
                        message: () => 'value is present',
                        validateOn: 'always',
                        severity: 'info',
                    },
                ],
            },
        }),
    });

    render() {
        return (
            <main>
                <es-input
                    label="Something"
                    placeholder="some thing"
                    {...this.data.connect('something')}
                />
                <es-checkbox {...this.data.connect('anotherThing')} />
                <es-input
                    label="wow"
                    placeholder="omg"
                    {...this.data.connect('wow')}
                />
                <es-input
                    label="Nested"
                    placeholder="something nested"
                    {...this.data.connect('nested', 'something')}
                />
                <es-button onClick={this.submit}>{'Submit'}</es-button>
            </main>
        );
    }

    private submit = () => {
        this.data.submit(async (data) => {
            console.log(data);
        });
    };
}
