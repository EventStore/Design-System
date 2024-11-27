import { Component, h, Host, State } from '@stencil/core';

/**
 * Portal
 * @group Modals
 */
@Component({
    tag: 'portal-demo',
    styleUrl: './portal-demo.css',
    shadow: true,
})
export class Demo {
    @State() open = false;

    render() {
        return (
            <Host>
                <c2-portal
                    backdrop
                    open={this.open}
                    onRequestClose={this.closeModal}
                    renderElement={this.renderModal}
                />
                <c2-button variant={'outline'} onClick={this.openModal}>
                    {'Open portal'}
                </c2-button>
            </Host>
        );
    }

    private renderModal = () => (
        <c2-modal role={'alert'}>
            <style>{'.important { color: var(--color-error); }'}</style>
            <h2 slot={'header'}>{'Project name'}</h2>
            <h1 slot={'header'}>{'Production'}</h1>
            <p>
                {
                    'Deleting this project will delete all associated clusters and networks. This operation cannot be undone.'
                }
            </p>
            <p class={'important'}>
                {'Are you sure you want to proceed in deleting this project?'}
            </p>
            <c2-button
                variant={'cancel'}
                slot={'footer'}
                onClick={this.closeModal}
            >
                {'Cancel'}
            </c2-button>
            <c2-button
                variant={'delete'}
                slot={'footer'}
                onClick={this.closeModal}
            >
                {'Delete project'}
            </c2-button>
        </c2-modal>
    );

    private openModal = () => {
        this.open = true;
    };

    private closeModal = () => {
        this.open = false;
    };
}
