import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    Watch,
    AttachInternals,
} from '@stencil/core';
import type { Templated } from '@eventstore-ui/forms';

import { Field } from 'components/Field';
import type { FieldChange, ValidationMessages } from 'types';

/** A textarea field. */
@Component({
    tag: 'f2-textarea-field',
    styleUrl: '../../field.css',
    formAssociated: true,
    shadow: true,
})
export class TextAreaField {
    @AttachInternals() internals!: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string>>;
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
        this.internals.setFormValue(this.value);
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
                <f2-textarea-input
                    name={this.name}
                    value={this.value}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    inputProps={this.inputProps}
                    invalid={this.invalid}
                >
                    <slot />
                </f2-textarea-input>
            </Field>
        );
    }

    private onRequestToEdit = () => {
        this.requestEdit.emit(this.name);
    };
}
