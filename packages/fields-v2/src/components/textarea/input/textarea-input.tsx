import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    AttachInternals,
    Host,
} from '@stencil/core';

import type { FieldChange } from 'types';

/** A textarea input. */
@Component({
    tag: 'f2-textarea-input',
    styleUrl: 'textarea-input.css',
    formAssociated: true,
    shadow: true,
})
export class TextAreaInput {
    @AttachInternals() internals!: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string>>;

    /** The name of the input. */
    @Prop({ reflect: true }) name!: string;
    /** The current value of the input. */
    @Prop() value!: string;
    /** The placeholder for the input. */
    @Prop() placeholder!: string;
    /** If the input is disabled. */
    @Prop() disabled?: boolean;
    /** If the input is editable. */
    @Prop() readonly?: boolean;
    /** If the input is currently in an error state. */
    @Prop() invalid?: boolean;
    /** Pass props directly to the input. */
    @Prop() inputProps?: Record<string, any>;

    componentDidLoad() {
        this.internals.setFormValue(this.value);
    }

    render() {
        return (
            <Host>
                <textarea
                    {...(this.inputProps ?? {})}
                    class={{ input: true, invalid: !!this.invalid }}
                    part={'input'}
                    value={this.value}
                    onInput={this.onInput}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    tabindex={this.readonly ? -1 : undefined}
                />
                <slot />
            </Host>
        );
    }

    private onInput = (e: InputEvent) => {
        const value = (e.target as HTMLInputElement).value ?? '';
        this.internals.setFormValue(value);
        this.fieldchange.emit({
            name: this.name,
            value,
        });
    };
}
