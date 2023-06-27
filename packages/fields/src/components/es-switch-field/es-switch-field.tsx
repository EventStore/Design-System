import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    Method,
    State,
} from '@stencil/core';

import type { IconDescription } from '@eventstore-ui/components';
import type { FieldChange, ValidationMessages } from '../../types';
import { Field } from '../Field/Field';

/** A switchable switch field. */
@Component({
    tag: 'es-switch-field',
    styleUrl: 'es-switch-field.css',
    shadow: true,
})
export class EsSwitchField {
    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<boolean>>;

    /** The label of the field. */
    @Prop() label!: string;
    /** The name of the field. */
    @Prop() name!: string;
    /** The current value of the field. */
    @Prop() value!: boolean;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** If the field is currently in an error state. */
    @Prop() invalid?: boolean;
    /** The validation messages of the field */
    @Prop() messages?: ValidationMessages;

    /** Text to display when switch is on in high contrast mode. */
    @Prop() activeText?: string;
    /** Text to display when switch is off in high contrast mode. */
    @Prop() inactiveText?: string;
    /** Icon to display when switch is on in high contrast mode. */
    @Prop() activeIcon?: IconDescription;
    /** Icon to display when switch is off in high contrast mode. */
    @Prop() inactiveIcon?: IconDescription;

    @State() pending: boolean = false;

    /** Allows you to pause interaction with the input while an operation completes. */
    @Method() async setPending(pending: boolean) {
        await this.switch?.setPending(pending);
    }

    render() {
        return (
            <Field
                label={this.label}
                invalid={this.invalid}
                messages={this.messages}
            >
                <es-switch
                    ref={this.captureSwitch}
                    name={this.name}
                    value={this.value}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    invalid={this.invalid}
                    activeText={this.activeText}
                    inactiveText={this.inactiveText}
                    activeIcon={this.activeIcon}
                    inactiveIcon={this.inactiveIcon}
                />
                <slot />
            </Field>
        );
    }

    private switch?: HTMLEsSwitchElement;
    private captureSwitch = (ref?: HTMLEsSwitchElement) => {
        this.switch = ref;
    };
}
