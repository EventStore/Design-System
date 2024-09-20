import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    something: string;
    option: boolean;
    somethingElse: string;
}

/**
 * textarea-input
 * @group inputs
 */
@Component({
    tag: 'textarea-input-demo',
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
                <form onSubmit={this.onSubmit}>
                    <f2-textarea-input
                        placeholder={'Something Else'}
                        {...this.form.connect('somethingElse')}
                    />
                    <f2-textarea-input
                        placeholder={'Something'}
                        {...this.form.connect('something')}
                    />
                    <pre slot={'data'}>
                        {JSON.stringify(this.form.data, null, 2)}
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
