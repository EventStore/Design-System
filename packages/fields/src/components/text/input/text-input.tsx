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

/** A text input. */
@Component({
    tag: 'f2-text-input',
    styleUrl: '../../input.css',
    formAssociated: true,
    shadow: true,
})
export class TextInput {
    @AttachInternals() internals?: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string>>;
    /** Emitted on keyup of enter, if no modifier keys are held. */
    @Event() enter!: EventEmitter;

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
    /** If the input is currently invalid. */
    @Prop() invalid?: boolean;
    /** Pass props directly to the input. */
    @Prop() inputProps?: Record<string, any>;

    componentDidLoad() {
        this.internals?.setFormValue(this.value);
    }

    render() {
        return (
            <Host>
                <input
                    {...(this.inputProps ?? {})}
                    class={{ input: true, invalid: !!this.invalid }}
                    part={'input'}
                    value={this.value}
                    onInput={this.onInput}
                    onKeyUp={this.onKeyUp}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    tabindex={this.readonly ? -1 : undefined}
                />
                <slot />
            </Host>
        );
    }

    private onKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.altKey && !e.metaKey) {
            this.enter.emit();
        }
    };

    private onInput = (e: InputEvent) => {
        const value = (e.target as HTMLInputElement).value ?? '';
        this.internals?.setFormValue(value);
        this.fieldchange.emit({
            name: this.name,
            value,
        });
    };
}
