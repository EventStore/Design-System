import { Component, h, Prop, Host, State, Element } from '@stencil/core';

import type { ConfirmModalOptions } from '../../modals/confirm-modal/types';
import type { IconDescription } from '../../icon/types';

/**
 * An action with a confirmation modal.
 */
@Component({
    tag: 'c2-action-with-confirmation',
    styleUrl: '../action.css',
    shadow: true,
})
export class EsActionWithConfirmation {
    @Element() host!: HTMLC2ActionWithConfirmationElement;

    /** If the action is within an `c2-action-dropdown`. */
    @Prop({ reflect: true, attribute: 'dropdown-item' }) dropdownItem = false;
    /** If the action should display it's text content. */
    @Prop() displayContent = false;
    /** The action to take when the button is clicked. */
    @Prop() action!: () => any;
    /** if the action should be disabled. */
    @Prop() disabled: boolean = false;
    /** The icon to show for the action. */
    @Prop() icon!: IconDescription;
    /** If a dot should be shown on the action, to indicate attention being required. */
    @Prop() dot?: HTMLC2BadgeElement['color'];
    /** If the user needs to type the passed string to enable confirmation. */
    @Prop() typeToConfirm?: string;
    /** The text to display within the modal. */
    @Prop() modal!: ConfirmModalOptions;

    @State() open: boolean = false;

    render() {
        const showContent = this.displayContent || this.dropdownItem;

        return (
            <Host>
                <c2-button
                    onClick={this.requestDeletion}
                    variant={'minimal'}
                    title={this.host.textContent ?? undefined}
                    disabled={this.disabled}
                >
                    <c2-badge
                        slot={showContent ? 'before' : undefined}
                        variant={'dot'}
                        color={this.dot}
                        count={this.dot ? 1 : 0}
                    >
                        <c2-icon icon={this.icon} size={20} />
                    </c2-badge>
                    {showContent && <slot />}
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
