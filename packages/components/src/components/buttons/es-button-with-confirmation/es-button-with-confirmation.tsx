import { Component, h, Prop, Host, State, Element } from '@stencil/core';

import type { ButtonVariant } from '../types';
import type { ConfirmModalOptions } from '../../modals/es-confirm-modal/types';

/**
 * A button with a confirmation modal.
 * @slot before - Placed before the main content with correct padding.
 * @slot after - Placed after the main content with correct padding.
 * @part button - The button.
 */
@Component({
    tag: 'es-button-with-confirmation',
    shadow: true,
})
export class EsActionWithConfirmation {
    @Element() host!: HTMLEsActionWithConfirmationElement;

    /** Which styling variant to use. */
    @Prop({ reflect: true }) variant: ButtonVariant = 'default';
    /** The default behavior of the button. */
    @Prop() type: string = 'button';
    /** If the button is disabled. Prevents the user from interacting with the button: it cannot be pressed or focused. */
    @Prop() disabled: boolean = false;

    /** The action to be called on click. */
    @Prop() action!: () => any;
    /** If the user needs to type the passed string to enable confirmation. */
    @Prop() typeToConfirm?: string;
    /** The text to display within the modal. */
    @Prop() modal!: ConfirmModalOptions;

    @State() open: boolean = false;

    render() {
        return (
            <Host>
                <es-button
                    onClick={this.requestDeletion}
                    variant={this.variant}
                    disabled={this.disabled}
                    part={'button'}
                >
                    <slot name={'before'} slot={'before'} />
                    <slot />
                    <slot name={'after'} slot={'after'} />
                </es-button>
                {!this.disabled && (
                    <es-portal
                        backdrop
                        open={this.open}
                        onRequestClose={this.closeModal}
                        renderElement={() => (
                            <es-confirm-modal
                                onRequestDeletion={this.takeActionAndClose}
                                typeToConfirm={this.typeToConfirm}
                                {...this.modal}
                            />
                        )}
                    />
                )}
            </Host>
        );
    }

    private requestDeletion = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        this.open = true;
    };

    private closeModal = () => {
        this.open = false;
    };

    private takingAction = false;
    private takeActionAndClose = async () => {
        if (this.takingAction || !this.open) return;
        this.takingAction = true;
        await this.action();
        this.open = false;
        this.takingAction = false;
    };
}
