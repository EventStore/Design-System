import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import type { ValidationMessages } from '../../types';
import { Field } from '../Field/Field';

/** A number based input. Values should be passed around as strings, as numbers can round / floating point / overflow etc if a number type is used. */
@Component({
    tag: 'es-number-input',
    styleUrl: 'es-number-input.css',
    shadow: true,
})
export class EsNumberInput {
    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter;
    /** Emitted on keyup of enter, if no modifier keys are held. */
    @Event() enter!: EventEmitter;

    /** The label of the field. */
    @Prop() label!: string;
    /** The name of the field. */
    @Prop() name!: string;
    /** The current value of the field. */
    @Prop() value!: string;
    /** The placeholder for the input. */
    @Prop() placeholder?: string;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** If the field is currently in an error state. */
    @Prop() invalid?: boolean;
    /** The validation messages of the field */
    @Prop() messages?: ValidationMessages;
    /** Display a unit beside the input. */
    @Prop() unit?: string;
    /** Pass props directly to the input. */
    @Prop() inputProps?: Record<string, any>;

    render() {
        return (
            <Field
                label={this.label}
                invalid={this.invalid}
                messages={this.messages}
            >
                <div class={'input_wrapper'}>
                    <input
                        {...(this.inputProps ?? {})}
                        class={'input'}
                        part={'input'}
                        type={'text'}
                        inputmode={'numeric'}
                        name={this.name}
                        onInput={this.onChange}
                        onKeyDown={this.onKeyDown}
                        onKeyUp={this.onKeyUp}
                        placeholder={this.placeholder}
                        disabled={this.disabled}
                        readonly={this.readonly}
                        value={this.value}
                    />
                    {!!this.unit && <span class={'unit'}>{this.unit}</span>}
                </div>
                <slot />
            </Field>
        );
    }

    private onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const target = e.target as HTMLInputElement;
            const n = Number(target?.value);

            if (!Number.isNaN(n)) {
                const amount = e.shiftKey ? 0.1 : 1;
                target.value = `${n + amount * (e.key === 'ArrowUp' ? 1 : -1)}`;
                e.preventDefault();
                this.onChange(e);
            }
        }

        if (
            e.ctrlKey ||
            e.metaKey ||
            e.key.length > 1 ||
            /[0-9.]/.test(e.key)
        ) {
            return;
        }

        e.preventDefault();
    };

    private onKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            this.enter.emit();
        }
    };

    private onChange = (e: any) => {
        this.fieldchange.emit({
            name: this.name,
            value: e?.target?.value,
        });
    };
}
