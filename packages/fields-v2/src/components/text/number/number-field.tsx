import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    AttachInternals,
    Watch,
} from '@stencil/core';
import { Field } from 'components/Field/Field';

import type { FieldChange, ValidationMessages } from 'types';

/** A number field. */
@Component({
    tag: 'f2-number-field',
    styleUrl: '../../Field/field.css',
    formAssociated: true,
    shadow: true,
})
export class TextField {
    @AttachInternals() internals!: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string>>;

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

    /** The name of the input. */
    @Prop() name!: string;
    /** The current value of the field. */
    @Prop() value!: string;
    /** The placeholder for the input. */
    @Prop() placeholder!: string;
    /** If the input is disabled. */
    @Prop() disabled?: boolean;
    /** If the input is editable. */
    @Prop() readonly?: boolean;
    /** Display a unit beside the input. */
    @Prop() unit?: string;
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
            >
                <f2-number-input
                    name={this.name}
                    value={this.value}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    inputProps={this.inputProps}
                    invalid={this.invalid}
                    unit={this.unit}
                >
                    <slot />
                </f2-number-input>
            </Field>
        );
    }
}
