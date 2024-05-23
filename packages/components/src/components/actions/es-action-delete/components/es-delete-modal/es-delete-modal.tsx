import {
    Component,
    h,
    Prop,
    Event,
    State,
    type EventEmitter,
    type FunctionalComponent,
} from '@stencil/core';

/**
 * A modal to confirm the deletion of something.
 */
@Component({
    tag: 'es-delete-modal',
    styleUrl: 'es-delete-modal.css',
    shadow: true,
})
export class DeleteModal {
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
    /** String required to be typed to enable the delete button. */
    @Prop() typeToDelete?: string;

    /** Triggered when the user has indicated that they want to close the modal. */
    @Event() requestClose!: EventEmitter;
    /** Triggered when the user has indicated that they want to close the modal.  */
    @Event() requestDeletion!: EventEmitter;

    @State() typed = '';
    @State() copied = false;

    render() {
        return (
            <es-modal role={'alert'}>
                <h2 slot={'header'}>{this.preHeading}</h2>
                <h1 slot={'header'}>{this.heading}</h1>
                <p>
                    {typeof this.body === 'string' ? this.body : h(this.body)}
                </p>
                {!!this.warning && <p class={'important'}>{this.warning}</p>}
                {!!this.typeToDelete && (
                    <label class={'type_to_delete'}>
                        {'To confirm type '}
                        <pre onClick={this.clickPre}>
                            {this.typeToDelete}
                            <es-popover open={this.copied}>
                                {'Copied to clipboard'}
                            </es-popover>
                        </pre>
                        {' in the box below.'}
                        <input
                            type={'text'}
                            name={'type_to_delete'}
                            placeholder={this.typeToDelete}
                            onInput={this.onInputChange}
                            value={this.typed}
                        />
                    </label>
                )}
                <es-button
                    variant={'cancel'}
                    slot={'footer'}
                    onClick={this.requestClose.emit}
                >
                    {'Cancel'}
                </es-button>
                <es-button
                    variant={'delete'}
                    slot={'footer'}
                    onClick={this.requestDeletion.emit}
                    disabled={this.deleteDisabled()}
                >
                    {this.confirm}
                </es-button>
            </es-modal>
        );
    }

    private removeCopiedTimeout!: ReturnType<typeof setTimeout>;
    private clickPre = async () => {
        if (!this.typeToDelete) return;

        try {
            await navigator.clipboard.writeText(this.typeToDelete);

            if (this.copied) return;
            this.copied = true;
            clearTimeout(this.removeCopiedTimeout);
            this.removeCopiedTimeout = setTimeout(() => {
                this.copied = false;
            }, 1_000);
        } catch (error) {
            // oh well
        }
    };

    private onInputChange = (e: InputEvent) => {
        const input = e.target as HTMLInputElement;
        this.typed = input.value;
    };

    private deleteDisabled = () => {
        if (!this.typeToDelete) return false;
        return !!this.typeToDelete.localeCompare(this.typed, 'en', {
            sensitivity: 'base',
        });
    };
}
