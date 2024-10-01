import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    option: boolean;
}

/** switch */
@Component({
    tag: 'switch-demo',
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
                    <f2-switch {...this.form.connect('option')} />
                    <f2-switch disabled {...this.form.connect('option')} />
                    <f2-switch {...this.form.connect('option')} invalid />
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
