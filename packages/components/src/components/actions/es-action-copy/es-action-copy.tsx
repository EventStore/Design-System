import { Component, h, Prop, Element } from '@stencil/core';

import { toast } from '../../../utils/toast';
import type { ToastOptions } from '../../toast/types';
import { ICON_NAMESPACE } from '../../../icons/namespace';
import type { IconDescription } from '../../es-icon/types';

/**
 * An action to copy a piece of text.
 * @slot - The label for the action, applied to the button, or shown in a dropdown.
 */
@Component({
    tag: 'es-action-copy',
    styleUrl: '../action.css',
    shadow: true,
})
export class YActionCopy {
    @Element() host!: HTMLEsActionElement;

    /** If the action is within an `es-action-dropdown`. */
    @Prop({ reflect: true, attribute: 'dropdown-item' }) dropdownItem = false;
    /** The value to be copied when clicked. */
    @Prop() value!: string;
    /** If the action should be disabled. */
    @Prop() disabled: boolean = false;
    /** The icon to show for the action. */
    @Prop() icon: IconDescription = [ICON_NAMESPACE, 'copy'];
    /** The details of the toast to be popped, when successfully copied. */
    @Prop() toast!: ToastOptions;

    render() {
        return (
            <es-button
                onClick={this.copy}
                variant={'minimal'}
                title={this.host.textContent ?? undefined}
                disabled={this.disabled}
            >
                <es-icon
                    icon={this.icon}
                    size={20}
                    slot={this.dropdownItem ? 'before' : undefined}
                />
                {this.dropdownItem && <slot />}
            </es-button>
        );
    }

    private copy = async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await navigator.clipboard.writeText(this.value);
            toast.success({
                icon: [ICON_NAMESPACE, 'copy'],
                ...this.toast,
            });
        } catch (error) {
            toast.error({
                title: 'Failed to copy',
                message: error instanceof Error ? error.message : String(error),
            });
        }
    };
}
