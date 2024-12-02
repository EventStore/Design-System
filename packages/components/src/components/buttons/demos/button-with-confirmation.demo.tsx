import { Component, h, Host } from '@stencil/core';

import { K_COMPONENTS_ICON_NAMESPACE } from '../../..';

/**
 * Button With Confirmation
 * @group Buttons
 */
@Component({
    tag: 'button-with-confirmation-demo',
    styleUrl: './button-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <c2-button-with-confirmation
                    action={() => alert('deleted!')}
                    typeToConfirm={'I want to delete'}
                    modal={{
                        preHeading: 'Group name',
                        heading: 'c2-button-confirmation',
                        body: 'Deleting this group will remove it from your organization. This operation cannot be undone.',
                        warning:
                            'Are you sure you want to proceed in deleting this group?',
                        confirm: 'Delete group',
                    }}
                >
                    <c2-icon
                        icon={[K_COMPONENTS_ICON_NAMESPACE, 'trash']}
                        slot={'after'}
                    />
                    {'Delete group'}
                </c2-button-with-confirmation>
            </Host>
        );
    }
}
