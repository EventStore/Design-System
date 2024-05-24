import { Component, h, Prop, Host, State, Element } from '@stencil/core';

import type { ConfirmModalOptions } from './types';
import type { IconDescription } from '../../es-icon/types';

/**
 * An action with a confirmation modal.
 */
@Component({
    tag: 'es-action-with-confirmation',
    styleUrl: '../action.css',
    shadow: true,
})
export class EsActionWithConfirmation {
    @Element() host!: HTMLEsActionWithConfirmationElement;

    /** If the action is within an `es-action-dropdown`. */
    @Prop({ reflect: true, attribute: 'dropdown-item' }) dropdownItem = false;
    /** The action to take when the button is clicked. */
    @Prop() action!: () => any;
    /** if the action should be disabled. */
    @Prop() disabled: boolean = false;
    /** The icon to show for the action. */
    @Prop() icon!: IconDescription;
    /** If a dot should be shown on the action, to indicate attention being required. */
    @Prop() dot?: HTMLEsBadgeElement['color'];
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
                    variant={'minimal'}
                    title={this.host.textContent ?? undefined}
                    disabled={this.disabled}
                >
                    <es-badge
                        slot={this.dropdownItem ? 'before' : undefined}
                        variant={'dot'}
                        color={this.dot}
                        count={this.dot ? 1 : 0}
                    >
                        <es-icon icon={this.icon} size={20} />
                    </es-badge>
                    {this.dropdownItem && <slot />}
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
