import {
    Component,
    h,
    Prop,
    Event,
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

    /** Triggered when the user has indicated that they want to close the modal. */
    @Event() requestClose!: EventEmitter;
    /** Triggered when the user has indicated that they want to close the modal.  */
    @Event() requestDeletion!: EventEmitter;

    render() {
        return (
            <es-modal role={'alert'}>
                <h2 slot={'header'}>{this.preHeading}</h2>
                <h1 slot={'header'}>{this.heading}</h1>
                <p>
                    {typeof this.body === 'string' ? this.body : h(this.body)}
                </p>
                {!!this.warning && <p class={'important'}>{this.warning}</p>}
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
                >
                    {this.confirm}
                </es-button>
            </es-modal>
        );
    }
}
