import { Component, h } from '@stencil/core';

import { Page } from '@kurrent-ui/layout';
import { HTTPError } from '@kurrent-ui/utils';

import { createValidatedForm } from '@eventstore-ui/forms';
import { logger } from '../../utils/logger';

interface MyForm {
    name: string;
    favouriteAnimal: string;
    height: string;
    items: string[];
    agreeToTOS: boolean;
    subForm: SubForm;
}

interface SubForm {
    hello: string;
    good: boolean;
}

@Component({
    tag: 'form-one',
    styleUrl: 'form-one.css',
    shadow: true,
})
export class DemoRoot {
    private form = createValidatedForm<MyForm>({
        name: '',
        favouriteAnimal: '',
        height: {
            initialValue: '',
            message: 'Tell us how tall you are',
            checkExists: () => true,
            validations: [
                {
                    severity: 'warning',
                    validateOn: 'always',
                    validator: async (v) => {
                        const n = parseFloat(v);
                        return n > 2;
                    },
                    message: 'You are too short',
                },
            ],
        },
        items: {
            initialValue: [],
            validations: [
                {
                    validator: async (v) => {
                        return v.length > 2;
                    },
                    message: 'List too short',
                },
                {
                    callOnEach: true,
                    validator: async (v) => {
                        const n = parseFloat(v);
                        return n > 2;
                    },
                    message: 'less than two',
                },
            ],
        },
        agreeToTOS: false,
        subForm: createValidatedForm<SubForm>({
            hello: 'hi',
            good: true,
        }),
    });

    componentWillLoad() {
        this.form.update({
            favouriteAnimal: 'swan',
            name: 'hjo',
        });
    }

    render() {
        return (
            <Page pageTitle="Form One">
                <es-input
                    label={'Name'}
                    placeholder={'Your name'}
                    {...this.form.connect('name')}
                />
                <es-input
                    label={'Favourite Animal'}
                    placeholder={'What do you like?'}
                    {...this.form.connect('favouriteAnimal')}
                />
                <es-number-input
                    label={'height'}
                    placeholder={'how tall?'}
                    unit={'m'}
                    {...this.form.connect('height')}
                />
                <es-input-list
                    label="Items"
                    placeholder="jsjs"
                    {...this.form.connect('items')}
                />
                <es-input
                    label={'Hello'}
                    placeholder={'how tall?'}
                    {...this.form.connect('subForm', 'hello')}
                />
                <es-checkbox {...this.form.connect('agreeToTOS')}>
                    {'do you agree'}
                </es-checkbox>
                <es-button onClick={this.submit} disabled={this.form.frozen}>
                    {'Submit'}
                </es-button>
            </Page>
        );
    }

    private submit = () => {
        if (this.form.frozen) return;
        this.form.submit(async (data) => {
            logger.log('hello?', data);

            throw new HTTPError(new Response(), async () => ({
                title: 'Oh no',
                detail: 'Oh no!',
                fields: {
                    favouriteAnimal: 'Noone likes that',
                },
            }));
        });
    };
}
