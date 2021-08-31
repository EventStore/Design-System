import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ValidationMessages } from '../../types';
import { Field } from '../Field/Field';

/** A textarea field. */
@Component({
    tag: 'es-textarea',
    styleUrl: 'es-textarea.css',
    shadow: true,
})
export class EsTextArea {
    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter;

    /** The label of the field. */
    @Prop() label!: string;
    /** The name of the field. */
    @Prop() name!: string;
    /** The current value of the field. */
    @Prop() value!: string;
    /** The placeholder for the input. */
    @Prop() placeholder!: string;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** If the field is currently in an error state. */
    @Prop() invalid?: boolean;
    /** The validation messages of the field */
    @Prop() messages?: ValidationMessages;
    /** Pass props directly to the input. */
    @Prop() inputProps?: Record<string, any>;

    render() {
        return (
            <Field
                label={this.label}
                invalid={this.invalid}
                messages={this.messages}
            >
                <textarea
                    {...(this.inputProps ?? {})}
                    class={'input'}
                    part={'input'}
                    value={this.value}
                    onInput={this.onChange}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    tabindex={this.readonly ? -1 : undefined}
                />
            </Field>
        );
    }

    private onChange = (e: any) => {
        this.fieldchange.emit({
            name: this.name,
            value: e?.target?.value,
        });
    };
}
