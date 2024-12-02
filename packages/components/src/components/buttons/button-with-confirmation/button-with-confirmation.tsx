import { Component, h, Prop, Host, State, Element } from '@stencil/core';

import type { ButtonVariant } from '../types';
import type { ConfirmModalOptions } from '../../modals/confirm-modal/types';

/**
 * A button with a confirmation modal.
 * @slot before - Placed before the main content with correct padding.
 * @slot after - Placed after the main content with correct padding.
 * @part button - The button.
 */
@Component({
    tag: 'c2-button-with-confirmation',
    shadow: true,
})
export class EsActionWithConfirmation {
    @Element() host!: HTMLC2ActionWithConfirmationElement;

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
                <c2-button
                    onClick={this.requestDeletion}
                    variant={this.variant}
                    disabled={this.disabled}
                    part={'button'}
                >
                    <slot name={'before'} slot={'before'} />
                    <slot />
                    <slot name={'after'} slot={'after'} />
                </c2-button>
                {!this.disabled && (
                    <c2-portal
                        backdrop
                        open={this.open}
                        onRequestClose={this.closeModal}
                        renderElement={() => (
                            <c2-confirm-modal
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
