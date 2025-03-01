import { h, type FunctionalComponent } from '@stencil/core';

import { toast } from '../../utils/toast';
import { ICON_NAMESPACE } from '../../icons/namespace';
import type { ConfirmModalOptions } from '../modals/confirm-modal/types';
import type { IconDescription } from '../icon/types';
import type { ToastOptions } from '../toast/types';

/** @props */
export interface ActionDeleteProps {
    /** If the action is within an `c2-action-dropdown`. */
    dropdownItem?: boolean;
    /** If the action should display it's text content. */
    displayContent?: boolean;
    /** The name of the item to delete. */
    description: string;
    /** The function to call to delete the item. */
    deleteItem: () => Promise<void>;
    /** if the action should be disabled. */
    disabled?: boolean;
    /** The icon to show for the action. */
    icon?: IconDescription;
    /** If the user needs to type the passed description to enable deletion. */
    typeToConfirm?: boolean;
    /** The text to display within the modal. */
    modal: ConfirmModalOptions;
    /** The details of the toast to be popped, when successfully deleted. */
    toast: ToastOptions;
}

/**
 * An action to delete, with confirmation.
 * @usage ./ActionDelete.usage.md
 */
export const ActionDelete: FunctionalComponent<ActionDeleteProps> = ({
    dropdownItem = false,
    displayContent = false,
    description,
    deleteItem,
    disabled = false,
    icon = [ICON_NAMESPACE, 'trash'],
    typeToConfirm = false,
    modal,
    toast,
}) => (
    <c2-action-with-confirmation
        dropdownItem={dropdownItem}
        displayContent={displayContent}
        action={handleDeletion({ deleteItem, description, toast })}
        disabled={disabled}
        icon={icon}
        typeToConfirm={typeToConfirm ? description : undefined}
        modal={modal}
    >
        {`Delete ${description}`}
    </c2-action-with-confirmation>
);

const handleDeletion =
    ({
        deleteItem,
        description,
        toast: toastOptions,
    }: Pick<ActionDeleteProps, 'deleteItem' | 'description' | 'toast'>) =>
    async () => {
        try {
            await deleteItem();
            toast.success({
                icon: [ICON_NAMESPACE, 'trash'],
                ...toastOptions,
            });
        } catch (error) {
            toast.httpError(error, `Failed to delete ${description}`);
        }
    };
