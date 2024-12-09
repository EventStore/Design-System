import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    AttachInternals,
    Watch,
} from '@stencil/core';

import { Field } from 'components/Field';
import type { FieldChange, ValidationMessages, Templated } from 'types';

/** A text input. */
@Component({
    tag: 'f2-text-field',
    styleUrl: '../../field.css',
    formAssociated: true,
    shadow: true,
})
export class TextField {
    @AttachInternals() internals?: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string>>;
    /** Emitted on keyup of enter, if no modifier keys are held. */
    @Event() enter!: EventEmitter;
    /** Emitted when the user requests to edit. */
    @Event({ bubbles: true }) requestEdit!: EventEmitter<string>;

    /** The label of the field. */
    @Prop() label!: string;
    /** The messages to display under the field. */
    @Prop() messages?: ValidationMessages;
    /** If the field is currently invalid. */
    @Prop() invalid?: boolean;
    /** Inline documentation text. */
    @Prop() documentation?: string;
    /** Inline documentation link. */
    @Prop() documentationLink?: string;
    /** Inline documentation link text. */
    @Prop() documentationLinkText?: string;
    /**If the field is templated. */
    @Prop() templated?: Templated;

    /** The name of the input. */
    @Prop({ reflect: true }) name!: string;
    /** The current value of the field. */
    @Prop() value!: string;
    /** The placeholder for the input. */
    @Prop() placeholder!: string;
    /** If the input is disabled. */
    @Prop() disabled?: boolean;
    /** If the input is editable. */
    @Prop() readonly?: boolean;
    /** Pass props directly to the input. */
    @Prop() inputProps?: Record<string, any>;

    @Watch('value')
    componentDidLoad() {
        this.internals?.setFormValue(this.value);
    }

    render() {
        return (
            <Field
                label={this.label}
                messages={this.messages}
                invalid={this.invalid}
                documentation={this.documentation}
                documentationLink={this.documentationLink}
                documentationLinkText={this.documentationLinkText}
                templated={this.templated}
                templatedValue={this.value}
                requestToEdit={this.onRequestToEdit}
            >
                <f2-text-input
                    name={this.name}
                    value={this.value}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    inputProps={this.inputProps}
                    invalid={this.invalid}
                    exportparts={'input'}
                >
                    <slot />
                </f2-text-input>
            </Field>
        );
    }

    private onRequestToEdit = () => {
        this.requestEdit.emit(this.name);
    };
}
