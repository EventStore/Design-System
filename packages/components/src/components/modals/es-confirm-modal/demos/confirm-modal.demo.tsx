import { Component, h, Host, Prop } from '@stencil/core';

/**
 * Confirm Modal
 * @group Modals
 */
@Component({
    tag: 'es-confirm-modal-demo',
    styleUrl: './confirm-modal-demo.css',
    shadow: true,
})
export class Demo {
    @Prop() open = false;

    render() {
        return (
            <Host>
                <es-portal
                    backdrop
                    open={this.open}
                    onRequestClose={this.requestClose}
                    renderElement={this.renderModal}
                />
                <p>
                    {'Despite being intended to be used with '}
                    <pre>{'es-action-with-confirmation'}</pre>
                    {' or '}
                    <pre>{'es-button-with-confirmation'}</pre>
                    {', '}
                    <pre>{'es-confirm-modal'}</pre>
                    {' can be used standalone.'}
                </p>
                <es-button variant={'outline'} onClick={this.openModal}>
                    {'Open confirm modal'}
                </es-button>
            </Host>
        );
    }

    private renderModal = () => (
        <es-confirm-modal
            onRequestDeletion={this.deleteAndClose}
            preHeading={'Group name'}
            heading={'Confirm Modal'}
            body={
                'Deleting this group will remove it from your organization. This operation cannot be undone.'
            }
            warning={'Are you sure you want to proceed in deleting this group?'}
            typeToConfirm={'Yes I do'}
            confirm={'Delete group'}
        />
    );

    private openModal = () => {
        this.open = true;
    };

    private requestClose = () => {
        this.open = false;
    };

    private deleteAndClose = () => {
        alert('deleted!');
        this.open = false;
    };
}
