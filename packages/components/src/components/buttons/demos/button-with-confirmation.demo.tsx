import { Component, h, Host } from '@stencil/core';

import { ES_COMPONENTS_ICON_NAMESPACE } from '../../..';

/**
 * Button With Confirmation
 * @group Buttons
 */
@Component({
    tag: 'es-button-with-confirmation-demo',
    styleUrl: './button-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <es-button-with-confirmation
                    action={() => alert('deleted!')}
                    typeToConfirm={'I want to delete'}
                    modal={{
                        preHeading: 'Group name',
                        heading: 'es-button-confirmation',
                        body: 'Deleting this group will remove it from your organization. This operation cannot be undone.',
                        warning:
                            'Are you sure you want to proceed in deleting this group?',
                        confirm: 'Delete group',
                    }}
                >
                    <es-icon
                        icon={[ES_COMPONENTS_ICON_NAMESPACE, 'trash']}
                        slot={'after'}
                    />
                    {'Delete group'}
                </es-button-with-confirmation>
            </Host>
        );
    }
}
