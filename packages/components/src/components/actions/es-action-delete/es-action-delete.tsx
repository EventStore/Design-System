import { Component, h, Prop, Host, State } from '@stencil/core';

import { toast } from '../../../utils/toast';
import { HTTPError } from '@eventstore-ui/utils';
import type { ToastOptions } from '../../toast/types';
import { ICON_NAMESPACE } from '../../../icons/namespace';
import type { ModalText } from '../types';
import type { IconDescription } from '../../es-icon/types';

/**
 * An action to delete something.
 */
@Component({
    tag: 'es-action-delete',
    styleUrl: '../action.css',
    shadow: true,
})
export class EsActionDelete {
    /** If the action is within an `es-action-dropdown`. */
    @Prop({ reflect: true, attribute: 'dropdown-item' }) dropdownItem = false;
    /** The name of the item being deleted. */
    @Prop() description!: string;
    /** The function to call to delete the item. */
    @Prop() deleteItem!: () => Promise<void>;
    /** if the action should be disabled. */
    @Prop() disabled: boolean = false;
    /** The icon to show for the action. */
    @Prop() icon: IconDescription = [ICON_NAMESPACE, 'trash'];
    /** The text te display within the modal. */
    @Prop() modalText!: ModalText;
    /** The details of the toast to be popped, when successfully deleted. */
    @Prop() toast!: ToastOptions;

    @State() open: boolean = false;

    render() {
        return (
            <Host>
                <es-button
                    onClick={this.requestDeletion}
                    variant={'minimal'}
                    title={`Delete ${this.description}`}
                    disabled={this.disabled}
                >
                    <es-icon
                        icon={this.icon}
                        size={20}
                        slot={this.dropdownItem ? 'before' : undefined}
                    />
                    {this.dropdownItem && `Delete ${this.description}`}
                </es-button>
                {!this.disabled && (
                    <es-portal
                        backdrop
                        open={this.open}
                        onRequestClose={this.closeModal}
                        renderElement={() => (
                            <es-delete-modal
                                onRequestDeletion={this.deleteAndClose}
                                {...this.modalText}
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

    private deleteing = false;
    private deleteAndClose = async () => {
        if (this.deleteing || !this.open) return;
        this.deleteing = true;

        try {
            await this.deleteItem();
            toast.success({
                icon: [ICON_NAMESPACE, 'trash'],
                ...this.toast,
            });
        } catch (error) {
            if (HTTPError.isHTTPError(error)) {
                const details = await error.details();
                toast.error({
                    title: `Failed to delete ${this.description}`,
                    message: details.detail,
                });
            } else {
                toast.error({
                    title: `Failed to delete ${this.description}`,
                    message:
                        error instanceof Error ? error.message : String(error),
                });
            }
        }

        this.open = false;
        this.deleteing = false;
    };
}
