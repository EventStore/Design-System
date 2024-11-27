import { Component, h, Host, Prop } from '@stencil/core';

/**
 * Confirm Modal
 * @group Modals
 */
@Component({
    tag: 'confirm-modal-demo',
    styleUrl: './confirm-modal-demo.css',
    shadow: true,
})
export class Demo {
    @Prop() open = false;

    render() {
        return (
            <Host>
                <c2-portal
                    backdrop
                    open={this.open}
                    onRequestClose={this.requestClose}
                    renderElement={this.renderModal}
                />
                <p>
                    {'Despite being intended to be used with '}
                    <pre>{'c2-action-with-confirmation'}</pre>
                    {' or '}
                    <pre>{'c2-button-with-confirmation'}</pre>
                    {', '}
                    <pre>{'c2-confirm-modal'}</pre>
                    {' can be used standalone.'}
                </p>
                <c2-button variant={'outline'} onClick={this.openModal}>
                    {'Open confirm modal'}
                </c2-button>
            </Host>
        );
    }

    private renderModal = () => (
        <c2-confirm-modal
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
