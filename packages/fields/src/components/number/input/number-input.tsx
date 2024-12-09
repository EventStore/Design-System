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

/**
 * A number based input.
 * Values should be passed around as strings, as numbers can round / floating point / overflow etc if a number type is used.
 * @part unit - The unit indicator
 */
@Component({
    tag: 'f2-number-input',
    styleUrl: 'number-input.css',
    formAssociated: true,
    shadow: true,
})
export class NumberInput {
    @AttachInternals() internals?: ElementInternals;

    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<string>>;
    /** Emitted on keyup of enter, if no modifier keys are held. */
    @Event() enter!: EventEmitter;

    /** The name of the field. */
    @Prop({ reflect: true }) name!: string;
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
    /** Display a unit beside the input. */
    @Prop() unit?: string;
    /** Pass props directly to the input. */
    @Prop() inputProps?: Record<string, any>;

    componentDidLoad() {
        this.internals?.setFormValue(this.value);
    }

    render() {
        return (
            <Host>
                <div class={'input_wrapper'}>
                    <input
                        {...(this.inputProps ?? {})}
                        class={{ input: true, invalid: !!this.invalid }}
                        part={'input'}
                        type={'text'}
                        inputmode={'numeric'}
                        value={this.value}
                        onInput={this.onInput}
                        onKeyDown={this.onKeyDown}
                        onKeyUp={this.onKeyUp}
                        placeholder={this.placeholder}
                        disabled={this.disabled}
                        readonly={this.readonly}
                    />
                    {!!this.unit && (
                        <span class={'unit'} part={'unit'}>
                            {this.unit}
                        </span>
                    )}
                </div>
                <slot />
            </Host>
        );
    }

    private onKeyDown = (e: KeyboardEvent) => {
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

    private onInput = (e: Event) => {
        const value = (e.target as HTMLInputElement).value ?? '';
        this.internals?.setFormValue(value);
        this.fieldchange.emit({
            name: this.name,
            value,
        });
    };
}
