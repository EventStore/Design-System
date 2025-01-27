import { h, type FunctionalComponent } from '@stencil/core';

import { toast } from '../../utils/toast';
import { ICON_NAMESPACE } from '../../icons/namespace';
import type { IconDescription } from '../icon/types';
import type { ToastOptions } from '../toast/types';

/** @props */
export interface ActionCopyProps {
    /** If the action is within an `c2-action-dropdown`. */
    dropdownItem?: boolean;
    /** If the action should display it's text content. */
    displayContent?: boolean;
    /** The value to be copied when clicked. */
    value: string;
    /** If the action should be disabled. */
    disabled?: boolean;
    /** The icon to show for the action. */
    icon?: IconDescription;
    /** The details of the toast to be popped, when successfully copied. */
    toast: ToastOptions;
}

/**
 * An action to delete, with confirmation.
 * @usage ./ActionCopy.usage.md
 */
export const ActionCopy: FunctionalComponent<ActionCopyProps> = (
    {
        dropdownItem = false,
        displayContent = false,
        value,
        disabled = false,
        icon = [ICON_NAMESPACE, 'copy'],
        toast,
    },
    children,
) => (
    <c2-action
        dropdownItem={dropdownItem}
        displayContent={displayContent}
        action={copyText({ value, toast })}
        disabled={disabled}
        icon={icon}
    >
        {children}
    </c2-action>
);

const copyText =
    ({
        value,
        toast: toastOptions,
    }: Pick<ActionCopyProps, 'value' | 'toast'>) =>
    async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await navigator.clipboard.writeText(value);
            toast.success({
                icon: [ICON_NAMESPACE, 'copy'],
                ...toastOptions,
            });
        } catch (error) {
            toast.error({
                title: 'Failed to copy',
                message: error instanceof Error ? error.message : String(error),
            });
        }
    };
