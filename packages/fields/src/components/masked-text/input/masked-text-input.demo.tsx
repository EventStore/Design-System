import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@kurrent-ui/forms';

interface Example {
    something: string;
    option: boolean;
    somethingElse: string;
}

/**
 * masked-text-input
 * @group inputs
 */
@Component({
    tag: 'masked-text-input-demo',
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
                <f2-form onSubmit={this.onSubmit}>
                    <f2-masked-text-input
                        mask={{ mask: '{#}000[aaa]/NIC-`*[**]' }}
                        placeholder={'Something Else'}
                        {...this.form.connect('somethingElse')}
                    />
                    <f2-masked-text-input
                        mask={{
                            mask: 'Ple\\ase fill ye\\ar: 19YY',
                            lazy: false,
                            blocks: {
                                YY: {
                                    mask: '00',
                                },
                            },
                        }}
                        placeholder={'Something'}
                        {...this.form.connect('something')}
                    />
                    <pre slot={'data'}>
                        {JSON.stringify(this.form.data, null, 2)}
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
