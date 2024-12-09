import { Component, h, Host } from '@stencil/core';

/**
 * placeholder-field
 * @group fields
 */
@Component({
    tag: 'placeholder-field-demo',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <f2-form>
                    <f2-placeholder-field label={'Region'}>
                        {'Please select a provider to see available regions'}
                    </f2-placeholder-field>
                    <f2-placeholder-field
                        label={'Zone'}
                        documentation={
                            "This placeholder can be shown if a field isn't ready yet."
                        }
                    >
                        {'Please select a region to see available zones'}
                    </f2-placeholder-field>
                </f2-form>
            </Host>
        );
    }
}
