import {
    Component,
    h,
    Prop,
    Event,
    State,
    type EventEmitter,
    type FunctionalComponent,
} from '@stencil/core';
import type { ButtonVariant } from '../../buttons/types';

/**
 * A modal to confirm an action.
 * @part preheading - The h2 above the heading.
 * @part heading - The h1 heading.
 * @part body - The body of the modal.
 * @part warning - The warning text (if provided).
 * @part type_to_confirm - The type to confirm label (if enabled).
 * @part cancel - The cancel button.
 * @part confirm - The confirm button.
 */
@Component({
    tag: 'es-confirm-modal',
    styleUrl: 'es-confirm-modal.css',
    shadow: true,
})
export class ConfirmModal {
    /** Text to display above the heading. */
    @Prop() preHeading!: string;
    /** Text to display in the heading. */
    @Prop() heading!: string;
    /** Text or component to display in the body of the modal. */
    @Prop() body!: string | FunctionalComponent;
    /** Text to display in red below the body. */
    @Prop() warning?: string;
    /** Text to display within the confirm button. */
    @Prop() confirm!: string;
    /** Button variant for the confirm button. */
    @Prop() confirmVariant: ButtonVariant = 'delete';
    /** String required to be typed to enable the confirm button. */
    @Prop() typeToConfirm?: string;

    /** Triggered when the user has indicated that they want to close the modal. */
    @Event() requestClose!: EventEmitter;
    /** Triggered when the user has indicated that they want to close the modal.  */
    @Event() requestDeletion!: EventEmitter;

    @State() typed = '';
    @State() copied = false;

    render() {
        return (
            <es-modal role={'alert'}>
                <h2 slot={'header'} part={'preheading'}>
                    {this.preHeading}
                </h2>
                <h1 slot={'header'} part={'heading'}>
                    {this.heading}
                </h1>
                <p part={'body'}>
                    {typeof this.body === 'string' ? this.body : h(this.body)}
                </p>
                {!!this.warning && (
                    <p class={'important'} part={'warning'}>
                        {this.warning}
                    </p>
                )}
                {!!this.typeToConfirm && (
                    <label class={'type_to_confirm'} part={'type_to_confirm'}>
                        {'To confirm type '}
                        <pre onClick={this.clickPre}>
                            {this.typeToConfirm}
                            <es-popover open={this.copied}>
                                {'Copied to clipboard'}
                            </es-popover>
                        </pre>
                        {' in the box below.'}
                        <input
                            type={'text'}
                            name={'type_to_confirm'}
                            placeholder={this.typeToConfirm}
                            onInput={this.onInputChange}
                            value={this.typed}
                        />
                    </label>
                )}
                <es-button
                    variant={'cancel'}
                    slot={'footer'}
                    part={'cancel'}
                    onClick={this.requestClose.emit}
                >
                    {'Cancel'}
                </es-button>
                <es-button
                    variant={this.confirmVariant}
                    slot={'footer'}
                    part={'confirm'}
                    onClick={this.requestDeletion.emit}
                    disabled={this.confirmDisabled()}
                >
                    {this.confirm}
                </es-button>
            </es-modal>
        );
    }

    private removeCopiedTimeout!: ReturnType<typeof setTimeout>;
    private clickPre = async () => {
        if (!this.typeToConfirm) return;

        try {
            await navigator.clipboard.writeText(this.typeToConfirm);

            if (this.copied) return;
            this.copied = true;
            clearTimeout(this.removeCopiedTimeout);
            this.removeCopiedTimeout = setTimeout(() => {
                this.copied = false;
            }, 1_000);
        } catch (_error) {
            // oh well
        }
    };

    private onInputChange = (e: InputEvent) => {
        const input = e.target as HTMLInputElement;
        this.typed = input.value;
    };

    private confirmDisabled = () => {
        if (!this.typeToConfirm) return false;
        return !!this.typeToConfirm.localeCompare(this.typed, 'en', {
            sensitivity: 'base',
        });
    };
}
