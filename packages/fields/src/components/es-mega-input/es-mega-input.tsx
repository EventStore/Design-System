import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ValidationMessages } from '../../types';
import { Field } from '../Field/Field';

@Component({
    tag: 'es-mega-input',
    styleUrl: 'es-mega-input.css',
    shadow: {
        delegatesFocus: true,
    },
})
export class EsMegaInput {
    @Event({ bubbles: true }) fieldchange!: EventEmitter;

    @Prop() label!: string;
    @Prop() name!: string;
    @Prop() value!: string;
    @Prop() placeholder!: string;
    @Prop() disabled?: boolean;
    @Prop() readonly?: boolean;
    @Prop() invalid?: boolean;
    @Prop() messages?: ValidationMessages;

    render() {
        return (
            <Field
                label={this.label}
                invalid={this.invalid}
                messages={this.messages}
            >
                <input
                    class={'input'}
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
