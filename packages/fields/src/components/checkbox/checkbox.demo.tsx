import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@kurrent-ui/forms';

interface Example {
    option: boolean;
}

/** checkbox */
@Component({
    tag: 'checkbox-demo',
    shadow: true,
})
export class Demo {
    private form = createValidatedForm<Example>({
        option: false,
    });

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <f2-form onSubmit={this.onSubmit}>
                    <f2-checkbox {...this.form.connect('option')}>
                        {'I agree to the terms and conditions'}
                    </f2-checkbox>
                    <f2-checkbox disabled {...this.form.connect('option')}>
                        {'I agree (disabled)'}
                    </f2-checkbox>
                    <f2-checkbox {...this.form.connect('option')} invalid>
                        {'I agree (invalid)'}
                    </f2-checkbox>
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
